type ElementTableColumnObject = any;


/**
 * Argument of ElementTableColumn's default slot
 */
export interface ElementTableColumnDefaultSlotArg {
  $index: number;
  row: any;
  column: ElementTableColumnObject;

  cellIndex: number;  // Not documented
}