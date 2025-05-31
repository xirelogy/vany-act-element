<script setup lang="ts">
import {
  VanyCloseRenderService,
} from '@xirelogy/vany';

import {
  ElButton,
  ElIcon,
} from 'element-plus';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/icon/style/css';

import { Close as IconClose } from '@element-plus/icons-vue';


const props = withDefaults(defineProps<{
  _render: VanyCloseRenderService|null,
}>(), {
  _render: null,
});
</script>

<template>
  <ElButton size="large" link @click="props._render?.notifyClick">
    <ElIcon><IconClose /></ElIcon>
  </ElButton>
</template>