<template>
  <div @click="isActive = !isActive" :class="isActive ? 'active' : ''" class="select">
    <div class="select__header">
      {{ activeKey ? items[activeKey] : 'Выбери' }}
    </div>
    <div class="select__options">
      <div
        v-for="item, key in items"
        v-show="key != activeKey"
        @click="setItem(key)"
        class="select__option"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const { items, modelValue } = defineProps({
    items: Object,
    modelValue: {
      type: String,
      required: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const isActive = ref(false)
  const activeKey = ref('')

  if (modelValue) {
    activeKey.value = modelValue
  }

  const setItem = key => {
    activeKey.value = key
    emit('update:modelValue', key)
    emit('change')
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .select {
    position: relative;
    font-size: 1em;
  }

  .select__header {
    .field();

    background: @secondary;
    color: @onSecondary;
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      opacity: .8;
    }

    .select.active & {
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
  }

  .select__options {
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 0;
    opacity: 0;
    overflow: auto;
    box-sizing: border-box;
    border-bottom-left-radius: @radius;
    border-bottom-right-radius: @radius;
    border: 1px solid @secondary;
    border-top: none;
    transition: @transition;

    .select.active & {
      max-height: 10em;
      opacity: 1;
    }
  }

  .select__option {
    padding: .8em;
    font-size: .9em;
    background: @background;
    transition: @transition;

    &:hover {
      background: @secondary;
      color: @onSecondary;
      cursor: default;
    }
  }
</style>