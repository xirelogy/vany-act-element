import {
  h,
  ref,
} from 'vue';

import {
  XwError,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyFormItemRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElFormItem,
} from 'element-plus';
import 'element-plus/es/components/form-item/style/css';

import ElementFocusHint from '../components/ElementFocusHint.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderFormItem = (request: VanyRenderRequest) => {
  const specRequest = request as VanyFormItemRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    required: specRequest.required,
  } as Record<string, any>;

  const rawDefaultSlot = VanyRenderer.acceptSlot(specRequest.slots.default);
  let defaultSlot = rawDefaultSlot;

  const hintContent = VanyRenderer.acceptSlot(specRequest.slots.hint)();
  if (hintContent !== null) {
    defaultSlot = () => {
      return h(ElementFocusHint, { }, {
        default: rawDefaultSlot,
        content: () => hintContent,
      });
    };
  }

  // Assign as reference
  const refCtrl = ref<InstanceType<typeof ElFormItem>>();
  attrs.ref = refCtrl;

  // Subscribe and handle validation result
  specRequest._render?.onValidated((success: boolean|null, message: string|Error) => {
    if (refCtrl.value === null) return;
    if (success === null) {
      refCtrl.value!.clearValidate();
    } else if (!success) {
      refCtrl.value!.validateState = 'error';
      refCtrl.value!.validateMessage = XwError.asString(message);
    } else {
      refCtrl.value!.validateState = 'success';
      refCtrl.value!.validateMessage = '';
    }
  });

  return h(ElFormItem, attrs, {
    default: defaultSlot,
    label: VanyVue.acceptSlotOrTextAsSlot(specRequest.slots.label, specRequest.label),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('form-item', renderFormItem);
}