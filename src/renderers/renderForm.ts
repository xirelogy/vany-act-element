import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyFormRenderRequest,
  VanyRenderAttributes,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElForm,
} from 'element-plus';
import 'element-plus/es/components/form/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderForm = (request: VanyRenderRequest) => {
  const specRequest = request as VanyFormRenderRequest;

  // Virtual forms are always inline
  if (specRequest.virtual) {
    specRequest.inline = true;
  }

  const attrs = new VanyRenderAttributes({
    ...specRequest.attrs,
    inline: specRequest.inline,
    disabled: specRequest.disabled,
  }, false);

  if (specRequest.virtual) {
    attrs.mergeAttrsClassSpec('vany-form-virtual');
    attrs.values['label-position'] = 'right';
  } else {
    attrs.values['label-position'] = 'top';
  }
  attrs.values['require-asterisk-position'] = 'right';

  if (!attrs.values['action']) {
    attrs.values['action'] = 'javascript:void(0);';
  }

  const defaultSlotFunction = VanyRenderer.acceptSlot(specRequest.slots.default);
  const defaultSlot = specRequest.submitButton ?
    () => {
      return [
        defaultSlotFunction(),
        h('input', {
          type: 'submit',
          style: {
            width: '0px',
            height: '0px',
            opacity: '0',
          },
        }),
      ];
    } : defaultSlotFunction;

  return h(ElForm, attrs.values, {
    default: defaultSlot,
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('form', renderForm);
}