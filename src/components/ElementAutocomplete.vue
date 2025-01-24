<script setup lang="ts">
import {
  h,
  ref,
  createTextVNode,
  cloneVNode,
  VNode,
  nextTick,
} from 'vue';

import {
  VanyRenderer,
  VanyAutocompleteRenderRequest,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElPopover,
} from 'element-plus';
import 'element-plus/es/components/popover/style/css';

import {
  useNamespace,
} from 'element-plus/es';

import ElementAutocompleteSelection from './ElementAutocompleteSelection.vue';

const nsSelect = useNamespace('select');

const props = defineProps<{
  specRequest: VanyAutocompleteRenderRequest,
}>();

const isVisible = ref(false);
const menuWidth = ref(200);

// Ref to the reference element
const refReference = ref();

// Initialize the menu width tracker
nextTick(() => {
  if (!refReference.value) return;
  updateMenuWidth();
  window.addEventListener('resize', updateMenuWidth);
});


// Update menu width to match input
function updateMenuWidth() {
  const el = refReference.value.$el;
  if (!el) return;
  menuWidth.value = (el as HTMLElement).offsetWidth;
}


// Handle the candidates
const refSelections = ref<InstanceType<typeof ElementAutocompleteSelection>>();

props.specRequest.fwdNotifyKeyword.handleUsing((keyword: string) => {
  refSelections.value?.notifyKeyword(keyword);
  isVisible.value = true;
});


// Render function
function render() {
  const defaultAttrs: Record<string, any> = {
    ref: refReference,
  };

  const defaultSlot = VanyRenderer.acceptSlot(props.specRequest.slots.default);
  const defaultSlotNode = VanyVue.acceptSingleVNode(defaultSlot()) as VNode|null;
  const copySlotNode = defaultSlotNode ? cloneVNode(defaultSlotNode, defaultAttrs) : createTextVNode('');

  return [
    copySlotNode,
    h(ElPopover, {
      popperClass: [
        nsSelect.e('popper'),
      ],
      popperStyle: {
        padding: '0 !important',
      },
      virtualRef: refReference,
      visible: isVisible.value,
      placement: 'bottom',
      width: menuWidth.value,
      pure: true,
      virtualTriggering: true,
    }, {
      default: () => h(ElementAutocompleteSelection, {
        ref: refSelections,
        specRequest: props.specRequest,
        onSelected() { isVisible.value = false; },
        onOutside() { isVisible.value = false; },
      }, {
        default: VanyRenderer.acceptOptionalSlot(props.specRequest.slots.item),
      }),
    }),
  ];
}
</script>

<template>
  <render/>
</template>