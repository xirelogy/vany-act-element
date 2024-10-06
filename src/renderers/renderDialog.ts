import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyDialogRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementDialog from '../components/ElementDialog.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderDialog = (request: VanyRenderRequest) => {
  const specRequest = request as VanyDialogRenderRequest;
  const attrs = {
    ...specRequest.attrs,
  } as Record<string, any>;

  attrs._render = specRequest._render;

  const slots = {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  } as Record<string, any>;

  if (specRequest.slots.header) slots.header = VanyRenderer.acceptSlot(specRequest.slots.header);
  if (specRequest.slots.footer) slots.footer = VanyRenderer.acceptSlot(specRequest.slots.footer);

  return h(ElementDialog, attrs, slots);
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('dialog', renderDialog);
}
