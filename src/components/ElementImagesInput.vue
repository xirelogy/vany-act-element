<script setup lang="ts">
import {
  ref,
  nextTick,
  watch,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyFormControlRenderService,
  VanyImagesInputRenderRequest,
} from '@xirelogy/vany';

const props = defineProps<{
  /**
   * Specific request
   */
  specRequest: VanyImagesInputRenderRequest,
  /**
   * Rendering service
   */
  _render?: VanyFormControlRenderService<string[]|null>|null,
}>();


/**
 * A state containing image
 */
interface ImageState {
  /**
   * Image value
   */
  value: string,
}

const imageStates = ref<ImageState[]>([]);
const uploadState = ref<string|null>(null);
const isError = ref(false);


// Value binding
props._render?.modelValue?.onWatch((modelValue: string[]|null) => {
  const states = [];
  for (const v of (modelValue ?? [])) {
    states.push({
      value: v,
    });
  }
  imageStates.value = states;
  uploadState.value = null;
});

// Value binding: post updates
function postUpdates() {
  const result = [] as string[];
  for (const imageState of imageStates.value) {
    result.push(imageState.value);
  }

  props._render?.modelValue?.notifyUpdate(result);
  props._render?.notifyEvent('change');
}

// Monitor for new image uploaded
watch(() => uploadState.value, (newValue: string|null, oldValue: string|null) => {

  // File uploaded
  if (oldValue === null && newValue !== null) {

    nextTick(async () => {
      await nextTick();
      imageStates.value.push({
        value: newValue,
      });
      uploadState.value = null;
      postUpdates();
    });
  }
});

// Monitor for image deletion (via change signal)
function onChanged(value: string|null, index: number) {
  if (value !== null) return;
  nextTick(() => {
    imageStates.value.splice(index, 1);
    postUpdates();
  });
};


// Handle error
props._render?.onValidated((success: boolean|null) => {
  isError.value = success === false;
});
</script>

<template>
  <div class="vany-element-images-upload vany-std-flex-hor">
    <VanyImageInput v-for="(imageState, index) in imageStates"
      v-model="imageState.value"
      :disabled="props.specRequest.disabled"
      :deletable="true"
      :accept="props.specRequest.accept"
      :uploader="props.specRequest.uploader"
      :display-width="props.specRequest.displayWidth"
      :display-height="props.specRequest.displayHeight"
      @change="(value: string|null) => onChanged(value, index)"
    />
    <VanyImageInput
      v-if="!props.specRequest.disabled"
      v-model="uploadState"
      :deletable="false"
      :accept="props.specRequest.accept"
      :uploader="props.specRequest.uploader"
      :display-width="props.specRequest.displayWidth"
      :display-height="props.specRequest.displayHeight"
    />
  </div>
</template>

<style lang="scss" scoped>
.vany-element-images-upload {
  width: 100%;

  > :not(:first-child) {
    margin-left: 8px;
  }
}
</style>

<style lang="scss">

</style>