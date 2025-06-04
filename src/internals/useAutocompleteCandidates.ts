import {
  ref,
  ComputedRef,
  computed,
} from 'vue';

import {
  XwError,
} from '@xirelogy/xwts';

import {
  VanyAutocompleteFilterFunction,
} from '@xirelogy/vany';


interface ManagedItem {
  /**
   * If item is active
   */
  isActive: boolean,
  /**
   * Item data
   */
  item: any,
}


/**
 * An item selected
 */
interface NotifyControlKeyEventSelectedResult {
  /**
   * Specific type class
   */
  typeClass: 'selected',
  /**
   * The selected item
   */
  selectedItem: any,
}


/**
 * Result from notifyControlKeyDown() / notifyControlKeyUp()
 */
type NotifyControlKeyEventResult = NotifyControlKeyEventSelectedResult|false;


/**
 * State to manage autocomplete candidates
 */
interface UseAutocompleteCandidates {
  /**
   * If currently loading
   */
  readonly isLoading: ComputedRef<boolean>
  /**
   * If the managed list contains item
   */
  readonly hasItem: ComputedRef<boolean>
  /**
   * The managed list of (candidate) items
   */
  readonly items: ComputedRef<ManagedItem[]>;

  /**
   * Notification of keyword update
   * @param value
   */
  notifyKeyword(value: string): void;

  /**
   * Notification of keyboard pressed from relevant control
   * @param ev
   * @returns
   */
  notifyControlKeyDown(ev: KeyboardEvent): NotifyControlKeyEventResult;

  /**
   * Notification of keyboard lifted from relevant control
   * @param ev
   * @returns
   */
  notifyControlKeyUp(ev: KeyboardEvent): NotifyControlKeyEventResult;

  /**
   * Notification of mouse hovering (enter/leave) to item
   * @param index
   * @param isEnter
   */
  notifyMouseHover(index: number, isEnter: boolean): void;

  /**
   * Check that the given index corresponds to a hovering display
   * May be caused by mouse hovering / key highlight
   * @param index
   * @returns
   */
  isIndexHovering(index: number): boolean;
}


/**
 * Options to useAutocompleteCandidates
 */
interface UseAutocompleteCandidatesOptions {
  /**
   * Filter function
   */
  filter: VanyAutocompleteFilterFunction,
  /**
   * Debounce timer (milliseconds)
   */
  debounceMs: number,
  /**
   * If automatically select (highlight) first available candidate
   */
  autoSelect: boolean,
}


/**
 * Create a state to manage autocomplete candidates
 * @param options
 * @returns
 */
export default function useAutocompleteCandidates(options: UseAutocompleteCandidatesOptions): UseAutocompleteCandidates {

  // Prepare variables
  const items = ref<ManagedItem[]>([]);
  const highlightedIndex = ref<number>(-1);
  const hoveringIndex = ref<number>(-1);
  const isLoading = ref(false);

  let lastFilterCandidate: string|null = null;
  let lastNotifiedCandidate: string|null = null;

  // Evaluate keyword
  async function evaluatedKeyword(): Promise<void> {
    if (lastNotifiedCandidate === lastFilterCandidate) return;
    if (isLoading.value) {
      setTimeout(evaluatedKeyword, options.debounceMs);
      return;
    }
    lastFilterCandidate = lastNotifiedCandidate;

    try {
      // Call loader
      isLoading.value = true;
      const resultItems = await options.filter(lastFilterCandidate ?? '');

      // Clear and reassign
      items.value = [];
      highlightedIndex.value = -1;
      hoveringIndex.value = -1;
      for (const resultItem of resultItems) {
        items.value.push({
          isActive: false,
          item: resultItem,
        });
      }

      if (options.autoSelect && items.value.length > 0) {
        highlightedIndex.value = 0;
      }
    } catch (e) {
      // Error handling
      const _e = XwError.asError(e);
      console.warn('Error while filtering result', _e);
      items.value = []; // Emptied due to error
    } finally {
      isLoading.value = false;
    }
  }

  // Construct and return
  return {
    /**
     * @inheritdoc
     */
    isLoading: computed(() => isLoading.value),

    /**
     * @inheritdoc
     */
    hasItem: computed(() => items.value.length > 0),

    /**
     * @inheritdoc
     */
    items: computed(() => items.value),

    /**
     * @inheritdoc
     */
    notifyKeyword(value: string): void {
      lastNotifiedCandidate = value;
      setTimeout(evaluatedKeyword, options.debounceMs);
    },

    /**
     * @inheritdoc
     */
    notifyControlKeyDown(ev: KeyboardEvent): NotifyControlKeyEventResult {
      // Ignore those with modifiers
      if (ev.ctrlKey || ev.shiftKey || ev.altKey || ev.metaKey) return false;

      // Only react to keyboard when items exist
      if (items.value.length <= 0) return false;

      if (highlightedIndex.value < 0) {
        // When no item selected, capture the down arrow
        if (ev.key === 'ArrowDown') {
          highlightedIndex.value = 0;
        }
      } else {
        // When item selected, up/down arrow to cycle the selection, enter to select
        switch (ev.key) {
          case 'ArrowDown':
            ++highlightedIndex.value;
            if (highlightedIndex.value >= items.value.length) highlightedIndex.value = 0;
            break;
          case 'ArrowUp':
            --highlightedIndex.value;
            if (highlightedIndex.value < 0) highlightedIndex.value = items.value.length - 1;
            break;
          case 'Enter':
            if (highlightedIndex.value >= 0 && highlightedIndex.value < items.value.length) {
              return {
                typeClass: 'selected',
                selectedItem: items.value[highlightedIndex.value].item,
              };
            }
            break;
        }
      }

      return false;
    },

    /**
     * @inheritdoc
     */
    notifyControlKeyUp(ev: KeyboardEvent): NotifyControlKeyEventResult {
      // Ignore those with modifiers
      if (ev.ctrlKey || ev.shiftKey || ev.altKey || ev.metaKey) return false;

      // Only react to keyboard when items exist
      if (items.value.length <= 0) return false;

      return false;
    },

    /**
     * @inheritdoc
     */
    notifyMouseHover(index: number, isEnter: boolean): void {
      if (!isEnter || (index < 0 || index >= items.value.length)) {
        // When leaving / index invalid
        hoveringIndex.value = -1;
      } else {
        // When entering
        hoveringIndex.value = index;
      }
    },

    /**
     * @inheritdoc
     */
    isIndexHovering(index: number): boolean {
      // Ignore invalid index
      if (index < 0 || index >= items.value.length) return false;

      // When hovering index valid, always check using hovering index
      if (hoveringIndex.value >= 0 && hoveringIndex.value < items.value.length) {
        return index === hoveringIndex.value;
      }

      // Check against highlighted index when highlighted index valid
      if (highlightedIndex.value >= 0 || highlightedIndex.value < items.value.length) {
        return index === highlightedIndex.value;
      }

      // Fallback
      return false;
    },
  }
}