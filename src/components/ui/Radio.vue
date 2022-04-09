<template>
  <div class="radio-container">
    <input v-if="!disabled &&! !checked" :value="value" :name="name" type="radio">
    <input v-else-if="!disabled && checked" :value="value" :name="name" type="radio" checked>
    <input v-else-if="disabled && !checked" :value="value" :name="name" type="radio" disabled>
    <input v-else :value="value" :name="name" type="radio" checked disabled>
    <span class="radio"></span>
  </div>
</template>

<script setup>
  const { value, name, disabled, checked } = defineProps({
    value: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .radio-container {
    display: flex;
  }

  input[type="radio"] {
    display: none;

    + .radio {
      display: inline-block;
      flex-shrink: 0;
      width: 1em;
      height: 1em;
      border: 1px solid @secondary;
      box-sizing: border-box;
      border-radius: 50%;
      font-size: 1.1rem;
      transition: .3s;
    }

    &:not([disabled]) + .radio:hover,
    &:checked + .radio {
      border-width: .3em;
      cursor: pointer;
    }
  }
</style>