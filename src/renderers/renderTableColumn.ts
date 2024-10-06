import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTableColumnRenderRequest,
  VanyRenderRequest,
  VanyVue,
  type VanyTableColumnContext,
  type VanySlotFunction,
} from '@xirelogy/vany';

import { ElementTableColumnDefaultSlotArg } from '../interfaces/ElementTableColumnDefaultSlotArg';

import {
  ElTableColumn,
} from 'element-plus';
import 'element-plus/es/components/table-column/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderTableColumn = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTableColumnRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    columnKey: specRequest.columnKey,
  } as Record<string, any>;

  // Prepare slots
  const children: Record<string, VanySlotFunction|null> = {};

  // Adapt label slot
  children.header = VanyVue.acceptSlotOrTextAsSlot(specRequest.slots.label, specRequest.label);

  // Process default slot and try to extract the content for label
  if (specRequest.slots.default) {
    children.default = (arg: ElementTableColumnDefaultSlotArg) => {
      const _outArg: VanyTableColumnContext = {
        rowIndex: arg.$index,
        columnIndex: arg.cellIndex,
        row: arg.row,
        column: {
          columnKey: specRequest.columnKey,
        },
      };
      return specRequest.slots.default!(_outArg);
    }
  }

  return h(ElTableColumn, attrs, children);
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('table-column', renderTableColumn);
}