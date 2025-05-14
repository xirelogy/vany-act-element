<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useTemplateRef,
  withDefaults,
} from 'vue';

import {
  xw,
} from '@xirelogy/xwts';

import {
  VanyUi,
  VanyFormControlRenderService,
  VanyOptionable,
  VanySelectOptionSourceFunction,
  VanySelectRenderService,
  VanyRenderFunctionComponent,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElSelect,
  ElOption,
} from 'element-plus';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/option/style/css';

type BroadRenderFunction = () => any;

const props = withDefaults(defineProps<{
  multiple?: boolean, // Include to drop
  clearable?: boolean,
  disabled?: boolean,
  _render: VanyFormControlRenderService<string|null>|null,
  _renderManaged: VanySelectRenderService|null,
}>(), {
  multiple: false,
  disabled: false,
  _render: null,
  _renderManaged: null,
});

const isManaged = computed(() => props._renderManaged !== null);

const isLoading = ref(false);

const inValue = ref('');

const inOptions = ref<VanyOptionable[]>([]);

const refInput = useTemplateRef('input');


/**
 * Live check for valid value in selected options
 * @param value
 * @return
 */
function isValueValidLive(value: string): boolean {
  for (const option of (refInput.value?.optionsArray ?? [])) {
    const _option = option as InstanceType<typeof ElOption>;
    if (_option.value == value) return true;
  }

  return false;
}


props._render?.modelValue?.onWatch((modelValue: string|null) => {
  inValue.value = modelValue ?? '';
  nextTick(() => {
    if (!isValueValidLive(inValue.value) && inValue.value !== '') {
      props._render?.notifyBadModelValue(inValue.value);
    }
  });
});

props._render?.onFocus(async () => {
  if (!refInput.value) return false;
  await refInput.value!.focus();
  return true;
});


function onInput() {
  props._render?.notifyEvent('input', arguments);
}

function onBlur() {
  props._render?.notifyEvent('blur', arguments);
}

function onChange(value: string|null) {
  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('change');
}


/**
 * Check if the given value is valid among the current options
 * @param value
 */
function isValueValid(value: string): boolean
{
  for (const inOption of inOptions.value) {
    if (inOption.value === value) return true;
  }

  return false;
}


// Handle managed options
if (props._renderManaged) {
  props._renderManaged.onRefreshOptions(async (source: VanySelectOptionSourceFunction) => {
    await VanyUi.busyWhile(isLoading, async () => {
      inOptions.value = await xw.asAsyncTarget(source());
    });
  });

  props._renderManaged.onEnsureSelect(() => {
    if (isValueValid(inValue.value)) return;
    const firstValue = inOptions.value[0]?.value ?? '';
    if (isValueValid(firstValue)) {
      onChange(firstValue);
    }
  });
}

/**
 * Flatten option label
 * @param value
 * @returns
 */
function flattenOptionLabel(value: string|BroadRenderFunction): string {
  if (typeof value === 'function') {
    return VanyVue.flattenVNodeAsText(value());
  }

  return value;
}
</script>

<template>
  <ElSelect ref="input" v-model="inValue" :loading="isLoading" :clearable="props.clearable" :disabled="props.disabled" @input="onInput" @blur="onBlur" @change="onChange">
    <ElOption v-if="isManaged" v-for="inOption in inOptions"
      :key="inOption.value"
      :value="inOption.value"
      :label="flattenOptionLabel(inOption.label)"
      :disabled="inOption.disabled ?? false"
    >
      <VanyRenderFunctionComponent :fn="VanyVue.acceptFunctionOrTextAsFunction(inOption.label)"/>
    </ElOption>
    <slot v-else></slot>
  </ElSelect>
</template>