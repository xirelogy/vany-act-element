<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import {
  xw,
  _cast,
} from '@xirelogy/xwts';

import {
  useVanyElementFocused,
  VanyFormControlRenderService,
  VanyImageInputRenderRequest,
  VanyUi,
} from '@xirelogy/vany';

import {
  ElIcon,
  ElUpload,
  UploadRequestOptions,
} from 'element-plus';
import 'element-plus/es/components/upload/style/css';

import {
  Delete as DeleteIcon,
  Plus as PlusIcon,
} from '@element-plus/icons-vue';

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;

const props = defineProps<{
  /**
   * Specific request
   */
  specRequest: VanyImageInputRenderRequest,
  /**
   * Rendering service
   */
  _render?: VanyFormControlRenderService<string|null>|null,
}>();

const actualDisplayWidth = computed(() => {
  return props.specRequest.displayWidth ?? DEFAULT_WIDTH;
});

const actualDisplayHeight = computed(() => {
  return props.specRequest.displayHeight ?? DEFAULT_HEIGHT;
});

const mainClasses = computed(() => {
  return {
    'vany-element-image-upload': true,
    'is-focused': isFocused.value,
    'is-deletable': props.specRequest.deletable && currentImage.value !== null,
    'is-error': isError.value,
  };
});

const displayStyles = computed(() => {
  return {
    width: actualDisplayWidth.value + 'px',
    height: actualDisplayHeight.value + 'px',
  }
});

const currentImage = ref<string|null>(null);
const refPreview = ref<HTMLDivElement>();
const refCanvas = ref<HTMLCanvasElement>();
const refUpload = ref<InstanceType<typeof ElUpload>>();
const isError = ref(false);
const isUploading = ref(false);


// Focus capturing
const isPreviewFocused = useVanyElementFocused(refPreview);
const isUploaderFocused = useVanyElementFocused(() => refUpload.value?.$el);

const isFocused = computed(() => {
  return isPreviewFocused.value || isUploaderFocused.value;
});


/**
 * Update current image
 * @param setResult
 */
async function updateCurrentImage(setResult?: string|null): Promise<void> {
  const _src = setResult !== undefined ? setResult : currentImage.value;
  if (refCanvas.value && _src !== null) await xw.drawOnCanvas(refCanvas.value, _src);

  if (setResult === undefined) return;
  currentImage.value = setResult;

  props._render?.modelValue?.notifyUpdate(setResult);
  props._render?.notifyEvent('change');
}


/**
 * Handle uploading
 * @params request
 */
async function onUploadFile(request: UploadRequestOptions) {
  await VanyUi.busyWhile(isUploading, async () => {
    const retUrl = await props.specRequest.uploader({file: request.file});
    await updateCurrentImage(retUrl);
  });
}


/**
 * Handle deleting
 */
async function onDelete() {
  if (props.specRequest.disabled) return;
  await updateCurrentImage(null);
}


// Value binding
props._render?.modelValue?.onWatch((modelValue: string|null) => {
  currentImage.value = modelValue;
  updateCurrentImage();
});


// Handle error
props._render?.onValidated((success: boolean|null) => {
  isError.value = success === false;
});
</script>

<template>
  <div :class="mainClasses" :style="displayStyles">
    <div v-show="currentImage" ref="refPreview" class="preview-container" tabindex="0">
      <canvas
        ref="refCanvas"
        class="preview-canvas"
        :width="actualDisplayWidth"
        :height="actualDisplayHeight"
        :style="displayStyles"
      ></canvas>
      <div v-show="props.specRequest.deletable && !props.specRequest.disabled" class="delete-action" tabindex="-1" @click="onDelete">
        <ElIcon><DeleteIcon /></ElIcon>
      </div>
    </div>
    <div v-show="!currentImage" class="upload-container" v-loading="isUploading" :style="displayStyles">
      <ElUpload
        ref="refUpload"
        class="upload-control"
        :show-file-list="false"
        :multiple="false"
        :disabled="props.specRequest.disabled"
        drag
        :accept="props.specRequest.accept"
        :http-request="onUploadFile"
      >
        <div
          class="expand"
          :style="displayStyles"
        >
          <div v-show="!props.specRequest.disabled" class="expand-child">
            <ElIcon><PlusIcon /></ElIcon>
          </div>
        </div>
      </ElUpload>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vany-element-image-upload {
  .preview-container {
    position: relative;
    outline: none;

    .preview-canvas {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      box-sizing: content-box;
    }
    .delete-action {
      position: absolute;
      cursor: pointer;
      line-height: 1px !important;
      margin-top: -8px !important;
      color: var(--el-color-danger);
    }
  }
  .upload-container {
    box-sizing: content-box;
    transition: var(--el-transition-duration-fast);

    .upload-control {
      cursor: pointer;
      width: 100%;
      height: 100%;

      .expand {
        display: flex;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        line-height: 1.2;

        .expand-child {
          margin: auto;
        }
      }
    }
  }
}

.vany-element-image-upload.is-focused {
  .preview-container {
    .preview-canvas {
      border: 2px dashed var(--el-color-primary);
    }
  }
  .upload-container {
    border-color: var(--el-color-primary);
  }
}
</style>

<style lang="scss">
.vany-element-image-upload .el-upload-dragger {
  padding: 0;
}

.vany-element-image-upload.is-deletable {
  margin-bottom: 16px;
}

.vany-element-image-upload.is-error {
  .el-upload-dragger {
    border-color: var(--el-color-danger);
  }
}
</style>