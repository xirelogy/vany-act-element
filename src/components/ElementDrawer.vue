<script setup lang="ts">
import {
  h,
  ref,
  computed,
  useSlots,
} from 'vue';

import {
  VanyDrawerRenderRequest,
  VanyDrawerRenderService,
  VanyRenderFunctionComponent,
  VanyRenderFunction,
} from '@xirelogy/vany';

import {
  ElDrawer,
} from 'element-plus';
import 'element-plus/es/components/drawer/style/css';

const props = withDefaults(defineProps<{
  specRequest: VanyDrawerRenderRequest,
  _render: VanyDrawerRenderService|null,
}>(), {
  _render: null,
});

const slots = useSlots();

const inValue = ref(false);

const compDirection = computed(() => {
  switch (props.specRequest.dock) {
    case 'left':
      return 'ltr';
    case 'right':
      return 'rtl';
    case 'top':
      return 'ttb';
    case 'bottom':
      return 'btt';
    default:
      return 'rtl';
  }
});

props._render?.modelValue?.onWatch((value: boolean) => inValue.value = value);

function onOpen() {
  props._render?.notifyEvent('show');
}

function onOpened() {
  props._render?.modelValue?.notifyUpdate(true);
  props._render?.notifyEvent('shown');
}

function onClose() {
  props._render?.notifyEvent('hide');
}

function onClosed() {
  props._render?.modelValue?.notifyUpdate(false);
  props._render?.notifyEvent('hidden');
}


/**
 * Extracted context for ElDrawer's header slot
 */
interface ElDrawerHeaderSlotContext {
  /**
   * Close function
   */
  close: () => void,
  /**
   * Title's HTML ID
   */
  titleId: string,
  /**
   * Title's HTML class
   */
  titleClass: string,
}


/**
 * Render the header slot using specific context
 * @param context
 */
 function renderHeaderSlotUsing(context: ElDrawerHeaderSlotContext): VanyRenderFunction {
  return () => {
    return h('div', {
      id: context.titleId,
      class: context.titleClass,
    }, [
      slots.header!(),
    ]);
  };
}
</script>

<template>
  <ElDrawer
    v-model="inValue"
    :direction="compDirection"
    :close-on-click-modal="specRequest.closeOutside"
    :close-on-press-escape="specRequest.closeEscape"
    :show-close="specRequest.closeButton"
    :modal="specRequest.modal"
    :size="specRequest.size ?? '30%'"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
    <template v-if="slots.header" #header="context"><VanyRenderFunctionComponent :fn="renderHeaderSlotUsing(context)" /></template>
    <slot></slot>
    <template v-if="slots.footer" #footer><slot name="footer"></slot></template>
  </ElDrawer>
</template>