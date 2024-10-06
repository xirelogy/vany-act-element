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
   * If item is hovering
   */
  isHovering: boolean,
  /**
   * Item data
   */
  item: any,
}


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
}


/**
 * Create a state to manage autocomplete candidates
 * @param filter Filter function
 * @param debounceMs Debounce timer (milliseconds)
 * @returns
 */
export default function useAutocompleteCandidates(
  filter: VanyAutocompleteFilterFunction,
  debounceMs: number,
): UseAutocompleteCandidates {

  // Prepare variables
  const items = ref<ManagedItem[]>([]);
  const isLoading = ref(false);

  let lastFilterCandidate: string|null = null;
  let lastNotifiedCandidate: string|null = null;

  // Evaluate keyword
  async function evaluatedKeyword(): Promise<void> {
    if (lastNotifiedCandidate === lastFilterCandidate) return;
    if (isLoading.value) {
      setTimeout(evaluatedKeyword, debounceMs);
      return;
    }
    lastFilterCandidate = lastNotifiedCandidate;

    try {
      // Call loader
      isLoading.value = true;
      const resultItems = await filter(lastFilterCandidate ?? '');

      // Clear and reassign
      items.value = [];
      for (const resultItem of resultItems) {
        items.value.push({
          isActive: false,
          isHovering: false,
          item: resultItem,
        });
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
      setTimeout(evaluatedKeyword, debounceMs);
    },
  }
}