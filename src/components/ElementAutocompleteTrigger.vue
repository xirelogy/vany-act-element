<script setup lang="ts">
import {
  computed,
} from 'vue';

const styles = computed(() => {
  return {
    display: 'flex',
    flex: '1',
  };
});
</script>

<template>
  <span :style="styles"><slot></slot></span>
</template>