<script setup lang="ts">
import {
  ref,
} from 'vue';

import {
  _used,
} from '@xirelogy/xwts';

import {
  VanyMenuRenderService,
} from '@xirelogy/vany';

import {
  ElMenu,
} from 'element-plus';
import 'element-plus/es/components/menu/style/css';

const props = withDefaults(defineProps<{
  defaultActive?: string, // Suppressed
  _render?: VanyMenuRenderService,
}>(), {
  defaultActive: '',
  _render: undefined,
});

const defaultActive = ref('');

// Handle selection request
props._render?.onSelect(async (menuKey: string) => {
  defaultActive.value = menuKey;
});

// Handle selection event
function onSelected(index: string, indexPath: string[], item: any, routerResult?: any) {
  _used({
    indexPath,
    item,
    routerResult,
  });

  props._render?.notifySelected(index);
}
</script>

<template>
  <ElMenu :default-active="defaultActive" @select="onSelected">
    <slot></slot>
  </ElMenu>
</template>