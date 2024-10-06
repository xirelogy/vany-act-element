import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyProgressRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  VanySlotFunction,
} from '@xirelogy/vany';

import {
  ElProgress,
} from 'element-plus';
import 'element-plus/es/components/progress/style/css';


interface ElProgressDefaultSlotContext {
  percentage: number;
}


/**
 * Wrap the default slot
 * @param specRequest
 */
function wrapDefaultSlot(specRequest: VanyProgressRenderRequest): VanySlotFunction|undefined {
  if (!specRequest.slots.default) return undefined;

  const defaultSlot = VanyRenderer.acceptSlot(specRequest.slots.default);
  return (context: ElProgressDefaultSlotContext) => {
    return defaultSlot({
      value: context.percentage,
    });
  }
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderProgress = (request: VanyRenderRequest) => {
  const specRequest = request as VanyProgressRenderRequest;

  const attrs = {
    ...specRequest.attrs,
    type: 'line',
    percentage: specRequest.value,
    textInside: true,
    strokeWidth: specRequest.barWidth,
    striped: specRequest.template === 'stripe' || specRequest.template === 'animate-stripe',
    stripedFlow: specRequest.template === 'animate-stripe',
  } as Record<string, any>;

  delete attrs.indeterminate;

  switch (specRequest.type) {
    case 'primary':
      delete attrs.color;
      delete attrs.status;
      break;
    case 'success':
      delete attrs.color;
      attrs.status = 'success';
      break;
    case 'warning':
      delete attrs.color;
      attrs.status = 'warning';
      break;
    case 'danger':
      delete attrs.color;
      attrs.status = 'exception';
      break;
    case 'info':
      attrs.color = 'var(--el-color-info)';
      delete attrs.status;
      break;
    default:
      // Aliased as 'primary'
      delete attrs.color;
      delete attrs.status;
      break;
  }

  return h(ElProgress, attrs, {
    default: wrapDefaultSlot(specRequest),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('progress', renderProgress);
}