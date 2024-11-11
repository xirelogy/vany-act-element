<script setup lang="ts">
import {
  computed,
  ref,
  useSlots,
  withDefaults,
} from 'vue';

import {
  VanyFormControlRenderService,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElSwitch,
} from 'element-plus';
import 'element-plus/es/components/switch/style/css';

const props = withDefaults(defineProps<{
  disabled: boolean,
  _render: VanyFormControlRenderService<boolean|null>|null,
}>(), {
  disabled: false,
  _render: null,
});

const slots = useSlots();

const inChecked = ref(false);

props._render?.modelValue?.onWatch((modelValue: boolean|null) => {
  inChecked.value = (modelValue === true);
});


/**
 * Effective value translation
 * @param v
 * @returns
 */
function getEffectiveValue(v: string|number|boolean): boolean|undefined {
  if (v === true) {
    return true;
  } else if (v === false) {
    return false;
  }

  return undefined;
}


/**
 * Handle change
 * @param v
 */
function onChange(v: string|number|boolean) {
  const value = getEffectiveValue(v);
  if (value === undefined) return;

  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('change', arguments, v);
}


const activeText = computed(() => {
  if (!slots.default) return '';
  return VanyVue.flattenVNodeAsText(slots.default());
});
</script>

<template>
  <ElSwitch v-model="inChecked" :disabled="props.disabled" :active-text="activeText" @change="onChange"/>
</template>