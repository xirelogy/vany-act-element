// Copied from 'vue'
export interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): {
      $props: P;
  };
}