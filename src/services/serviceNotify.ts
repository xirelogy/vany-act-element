import {
  VNode,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  type VanyServiceRequest,
  type VanyNotifyInstance,
  type VanyNotifyServiceRequest,
  type VanyRenderFunction,
  VanyNotifyOptionsDefault,
  VanyVue,
  VanyNotifyType,
} from '@xirelogy/vany';

import {
  ElMessage,
  ElNotification,
} from 'element-plus';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';


/**
 * Accept the title
 * @param content
 * @returns
 */
function acceptTitle(content: string|VanyRenderFunction|undefined): string {
  if (content === undefined) return '';
  if (typeof content === 'function') {
    return VanyVue.flattenVNodeAsText(content());
  }
  return content;
}


/**
 * Accept the content
 * @param content
 * @returns
 */
function acceptContent(content: string|VanyRenderFunction): string|VNode {
  if (typeof content === 'function') {
    return VanyVue.acceptFunctionAsSingleVNode(content, 'div') as VNode;
  }

  return content;
}


/**
 * Accept notification type
 * @param type
 * @returns
 */
function acceptType(type: VanyNotifyType|undefined) {
  if (type === undefined) return '';
  switch (type) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'error';
    case 'info':
      return 'info';
    default:
      return '';
  }
}


/**
 * Service function
 * @param request
 * @returns
 */
const serviceNotify = (request: VanyServiceRequest): VanyNotifyInstance => {
  const specRequest = request as VanyNotifyServiceRequest;
  const specOptions = specRequest.options;

  const template = specRequest.options.template ?? 'normal';

  switch (template) {
    case 'normal':
      // Normal: using ElNotification
      {
        const elInstance = ElNotification({
          title: acceptTitle(specOptions.title),
          message: acceptContent(specOptions.content),
          position: specOptions.dock ?? VanyNotifyOptionsDefault.dock,
          type: acceptType(specOptions.type),
          duration: specOptions.duration ?? VanyNotifyOptionsDefault.duration,
          showClose: specOptions.closable ?? VanyNotifyOptionsDefault.closable,
          onClick: specOptions.onClick ?? (() => {}),
          onClose: specOptions.onClose ?? (() => {}),
        });

        return {
          /**
           * @inheritdoc
           */
          close() {
            elInstance.close();
          },
        };
      }

    case 'compact':
      {
        const messageType = acceptType(specOptions.type);

        const elInstance = ElMessage({
          message: acceptContent(specOptions.content),
          type: messageType !== '' ? messageType : 'info',
          duration: specOptions.duration ?? 3000,
          showClose: specOptions.closable ?? true,
          onClose: specOptions.onClose ?? (() => {}),
        });

        return {
          /**
           * @inheritdoc
           */
          close() {
            elInstance.close();
          },
        };
      }

    default:
      throw new Error('Unsupported template');
  }


};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerService('notify', serviceNotify);
}
