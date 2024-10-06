<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import {
  type VanyInputFrameRenderService,
} from '@xirelogy/vany';

import {
  useNamespace,
} from 'element-plus/es';

const props = defineProps<{
  disabled: boolean,
  _render: VanyInputFrameRenderService,
}>();

const nsInput = useNamespace('input');

const isFocus = ref(false);

const mainClasses = computed(() => {
  return [
    nsInput.b(),
    nsInput.is('disabled', props.disabled),
  ];
});

const wrapperClasses = computed(() => {
  return [
    nsInput.e('wrapper'),
    nsInput.is('focus', isFocus.value),
  ];
});


// Connect the events
props._render.onFocus(onFocus);
props._render.onBlur(onBlur);


function onFocus() {
  isFocus.value = true;
}


function onBlur() {
  isFocus.value = false;
}
</script>

<template>
  <div :class="mainClasses">
    <div :class="wrapperClasses" tabindex="-1" @focus="onFocus" @blur="onBlur">
      <slot></slot>
    </div>
  </div>
</template>