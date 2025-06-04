<script setup lang="ts">
import {
  computed,
  useTemplateRef,
} from 'vue';

import {
  xw,
} from '@xirelogy/xwts';

import {
  VanyAutocompleteRenderRequest,
  VanyAutocompleteItemContext,
} from '@xirelogy/vany';

import {
  useLocale,
  useNamespace,
} from 'element-plus/es';

import {
  onClickOutside,
} from '@vueuse/core';

const { t } = useLocale();
const nsScrollbar = useNamespace('scrollbar');
const nsSelect = useNamespace('select');

const props = defineProps<{
  specRequest: VanyAutocompleteRenderRequest,
}>();

const emits = defineEmits<{
  'selected': [],
  'outside': [],
}>();

const slots = defineSlots<{
  /**
   * Item display
   * @param context
   */
  default: (context: VanyAutocompleteItemContext) => any,
}>();

import useAutocompleteCandidates from '../internals/useAutocompleteCandidates';

const candidates = useAutocompleteCandidates({
  filter: props.specRequest.filter,
  debounceMs: props.specRequest.debounceMs,
  autoSelect: props.specRequest.autoSelect,
});

// Main DIV classes
const mainClasses = computed(() => {
  const ret = [];

  if (candidates.hasItem.value) {
    ret.push(nsScrollbar.b());
  } else {
    ret.push(nsSelect.b('dropdown'));
  }

  return ret;
});

// Handle click outside
const refMain = useTemplateRef('main');

onClickOutside(refMain, () => {
  emits('outside');
});


/**
 * Notification of keyword changed
 * @param keyword
 */
function notifyKeyword(keyword: string) {
  candidates.notifyKeyword(keyword);
}


/**
 * Notification of keyboard pressed from relevant control
 * @param ev
 */
function notifyControlKeyDown(ev: KeyboardEvent) {
  const resp = candidates.notifyControlKeyDown(ev);
  if (resp === false) return;

  switch (resp.typeClass) {
    case 'selected':
      // An item is selected as a result
      props.specRequest.notifySelected(resp.selectedItem, true);
      emits('selected');
      break;
  }
}


/**
 * Notification of keyboard lifted from relevant control
 * @param ev
 */
function notifyControlKeyUp(ev: KeyboardEvent) {
  const resp = candidates.notifyControlKeyUp(ev);
  if (resp === false) return;

  switch (resp.typeClass) {
    case 'selected':
      // An item is selected as a result
      props.specRequest.notifySelected(resp.selectedItem, true);
      emits('selected');
      break;
  }
}


/**
 * Handle selection
 * @param value
 */
function onSelected(value: any) {
  props.specRequest.notifySelected(value, true);
  emits('selected');
}


// Expose functions
defineExpose({
  notifyKeyword,
  notifyControlKeyDown,
  notifyControlKeyUp,
});
</script>

<template>
  <div ref="main" :class="mainClasses">
    <div v-if="candidates.hasItem.value" :class="[
      nsSelect.be('dropdown', 'wrap'),
      nsScrollbar.e('wrap'),
      nsScrollbar.em('wrap', 'hidden-default'),
    ]">
      <li v-for="(candidateItem, candidateIndex) of candidates.items.value"
        :class="[
          nsSelect.be('dropdown', 'item'),
          nsSelect.is('selected', candidateItem.isActive),
          nsSelect.is('hovering', candidates.isIndexHovering(candidateIndex)),
        ]"
        role="option"
        :aria-selected="candidateItem.isActive"
        @mouseenter="() => { candidates.notifyMouseHover(candidateIndex, true); }"
        @mouseleave="() => { candidates.notifyMouseHover(candidateIndex, false); }"
        @click="onSelected(candidateItem.item)"
      >
        <slot
          :isActive="candidateItem.isActive"
          :value="candidateItem.item"
        >
          {{ xw.normalizeString(candidateItem.item) }}
        </slot>
      </li>
    </div>
    <div v-else-if="candidates.isLoading.value" :class="nsSelect.be('dropdown', 'loading')">
      <span>{{ t('el.select.loading') }}</span>
    </div>
    <div v-else :class="nsSelect.be('dropdown', 'empty')">
      <span>{{ t('el.select.noMatch') }}</span>
    </div>
  </div>
</template>