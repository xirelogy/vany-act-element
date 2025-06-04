<script setup lang="ts">
import {
  _used,
} from '@xirelogy/xwts';

import {
  h,
  ref,
  nextTick,
} from 'vue';

import {
  VanyRenderer,
  VanyAutocompleteRenderRequest,
} from '@xirelogy/vany';

import {
  ElPopover,
} from 'element-plus';
import 'element-plus/es/components/popover/style/css';

import {
  useNamespace,
} from 'element-plus/es';

import ElementAutocompleteTrigger from './ElementAutocompleteTrigger.vue';
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
  // Try to derive using $el convention
  const $el = refReference.value.$el;
  if ($el) {
    const _el = $el as HTMLElement;
    menuWidth.value = _el.offsetWidth;

    // Observe for changes
    (new ResizeObserver((entries) => {
      _used(entries);
      menuWidth.value = _el.offsetWidth;
    })).observe(_el);

    return;
  }

  console.warn('ElementAutocomplete.updateMenuWidth: child element width unsupported');
}


// Handle the candidates
const refSelections = ref<InstanceType<typeof ElementAutocompleteSelection>>();

props.specRequest.fwdNotifyKeyword.handleUsing((keyword: string) => {
  refSelections.value?.notifyKeyword(keyword);
  isVisible.value = true;
});

props.specRequest.fwdNotifyControlKeyDown.handleUsing((ev: KeyboardEvent) => {
  refSelections.value?.notifyControlKeyDown(ev);
});

props.specRequest.fwdNotifyControlKeyUp.handleUsing((ev: KeyboardEvent) => {
  refSelections.value?.notifyControlKeyUp(ev);
});

props.specRequest.fwdNotifyControlBlur.handleUsing(() => {
  // Dismiss any pending selections
  isVisible.value = false;
});


// Render function
function render() {
  const copySlotNode = h(ElementAutocompleteTrigger, {
    ref: refReference,
  }, {
    default: VanyRenderer.acceptSlot(props.specRequest.slots.default),
  })

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