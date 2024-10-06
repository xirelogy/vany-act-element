<script setup lang="ts">
import {
  _cast,
} from '@xirelogy/xwts';

import {
  computed,
} from 'vue';

import {
  ElConfigProvider,
} from 'element-plus';
import 'element-plus/es/components/config-provider/style/css';

import { getLocaleSingleton } from '../internals/LocaleSingleton';
import en from 'element-plus/es/locale/lang/en';
import { Language } from 'element-plus/es/locale/index.mjs';

// Locale mapping
const locale = computed(() => {
  const selected = getLocaleSingleton().accessCurrent();
  if (selected !== null) return _cast<Language>(selected);
  return en;
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <slot></slot>
  </ElConfigProvider>
</template>