<script setup lang="ts">
import {
  nextTick,
  ref,
  useTemplateRef,
} from 'vue';

import {
  VanyUi,
  type VanyListMoreFunction,
} from '@xirelogy/vany';

import {
  ElDivider,
  ElIcon,
} from 'element-plus';
import 'element-plus/es/components/divider/style/css';
import 'element-plus/es/components/icon/style/css';

import ElementLoading from './ElementLoading.vue';

import { Close as CloseIcon } from '@element-plus/icons-vue';

const refOuter = useTemplateRef('outer');
const refInner = useTemplateRef('inner');

const props = withDefaults(defineProps<{
  listMore?: VanyListMoreFunction|null,
}>(), {
  listMore: null,
});

const isListMoreRunning = ref(false);
const isListNoMore = ref(false);

nextTick(() => {
  if (props.listMore) {
    refOuter.value!.addEventListener('scroll', () => {
      const outerHeight = refOuter.value!.clientHeight;
      const innerHeight = refInner.value!.clientHeight;
      const scrollTop = refOuter.value!.scrollTop;

      if (!isListNoMore.value && (scrollTop + outerHeight + 1) >= innerHeight) {
        if (isListMoreRunning.value) return;
        VanyUi.busyWhile(isListMoreRunning, async () => {
          refOuter.value!.scrollTop = refInner.value!.clientHeight - refOuter.value!.clientHeight - 1;

          const count = await props.listMore!();
          if (count <= 0) isListNoMore.value = true;
        });
      }
    });
  }

});
</script>

<template>
  <div ref="outer" class="vany-el-list-outer">
    <div ref="inner" class="vany-el-list-inner vany-std-flex-ver">
      <slot></slot>
      <div v-if="isListMoreRunning">
        <slot name="list-more-loading">
          <ElementLoading class="vany-el-loading-reset" />
        </slot>
      </div>
      <div v-if="isListNoMore">
        <slot name="list-more-end">
          <ElDivider><ElIcon color="var(--el-color-danger)"><CloseIcon/></ElIcon></ElDivider>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vany-el-list-outer {
  padding: 8px;
  overflow-y: scroll;

  .vany-el-list-inner {
    > *:not(:first-child) {
      margin-top: 8px;
    }
  }
}

.vany-el-loading-reset {
  position: initial;
  margin-top: 0;
  transform: scale(0.7);
}
</style>