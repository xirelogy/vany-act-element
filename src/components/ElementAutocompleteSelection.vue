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
  default: (context: VanyAutocompleteItemContext) => any,
}>();

import useAutocompleteCandidates from '../internals/useAutocompleteCandidates';

const candidates = useAutocompleteCandidates(props.specRequest.filter, props.specRequest.debounceMs);

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
});
</script>

<template>
  <div ref="main" :class="mainClasses">
    <div v-if="candidates.hasItem.value" :class="[
      nsSelect.be('dropdown', 'wrap'),
      nsScrollbar.e('wrap'),
      nsScrollbar.em('wrap', 'hidden-default'),
    ]">
      <li v-for="candidateItem of candidates.items.value"
        :class="[
          nsSelect.be('dropdown', 'item'),
          nsSelect.is('selected', candidateItem.isActive),
          nsSelect.is('hovering', candidateItem.isHovering),
        ]"
        role="option"
        :aria-selected="candidateItem.isActive"
        @mouseenter="() => { candidateItem.isHovering = true; }"
        @mouseleave="() => { candidateItem.isHovering = false; }"
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