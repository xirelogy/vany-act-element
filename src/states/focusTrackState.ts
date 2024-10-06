import {
  inject,
} from 'vue';


/**
 * Injection key
 */
export const KEY = Symbol();


/**
 * An event listening function
 */
type EventFunction = (ev?: Event) => void;


/**
 * State class
 */
export class FocusTrackState {
  /**
   * Focus (focus-in) handler
   */
  onFocus: EventFunction;
  /**
   * Blur (focus-out) handler
   */
  onBlur: EventFunction;


  /**
   * @constructor
   * @param onFocus
   * @param onBlur
   */
  constructor(onFocus: EventFunction, onBlur: EventFunction) {
    this.onFocus = onFocus;
    this.onBlur = onBlur;
  }
}


/**
 * Create a new focus tracking state
 * @param onFocus
 * @param onBlur
 * @returns
 */
export function createFocusTrackState(onFocus: EventFunction, onBlur: EventFunction): FocusTrackState {
  return new FocusTrackState(onFocus, onBlur);
}


/**
 * Register the focus/blur function, if tracked
 * @param attrs
 */
export function registerFocusBlurIfTracked(attrs: Record<string, any>): void {
  const injected = inject<FocusTrackState|null>(KEY, null);
  if (injected === null) return;

  if (attrs.onfocus) {
    const oldfocus = attrs.onfocus;
    attrs.onfocus = (ev: Event) => {
      injected.onFocus(ev);
      oldfocus(ev);
    }
  } else {
    attrs.onfocus = injected.onFocus;
  }

  if (attrs.onblur) {
    const oldblur = attrs.onblur;
    attrs.onblur = (ev: Event) => {
      injected.onBlur(ev);
      oldblur(ev);
    }
  } else {
    attrs.onblur = injected.onBlur;
  }
}
