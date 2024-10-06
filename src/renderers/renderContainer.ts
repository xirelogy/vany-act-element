import {
  h,
  VNode,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyContainerRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
} from 'element-plus';

import 'element-plus/es/components/container/style/css';
import 'element-plus/es/components/header/style/css';
import 'element-plus/es/components/main/style/css';
import 'element-plus/es/components/footer/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderContainer = (request: VanyRenderRequest) => {
  const specRequest = request as VanyContainerRenderRequest;

  const children = [] as VNode[];

  if (specRequest.slots.header) {
    children.push(h(ElHeader, {}, {
      default: VanyRenderer.acceptSlot(specRequest.slots.header),
    }));
  }

  children.push(h(ElMain, {}, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  }));

  if (specRequest.slots.footer) {
    children.push(h(ElFooter, {}, {
      default: VanyRenderer.acceptSlot(specRequest.slots.footer),
    }));
  }

  return h(ElContainer, {}, {
    default: () => children,
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('container', renderContainer);
}