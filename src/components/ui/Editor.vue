<template>
  <div @input="update" class="editor" :placeholder="placeholder" contenteditable>
    {{ modelValue }}
  </div>
</template>

<script setup>
  const { placeholder, lineWrap, modelValue } = defineProps({
    placeholder: String,
    lineWrap: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const update = ({ target }) => {
    if (!lineWrap && target.innerText.includes('\n')) {
      const selection = document.getSelection()
      const range = document.createRange()

      range.setStart(target, 0)
      range.setEnd(selection.anchorNode, selection.anchorOffset)

      const pos = range.toString().length

      target.innerText = target.innerText.replaceAll('\n', '')

      range.setStart(target.firstChild, pos)
      range.collapse(true)

      selection.removeAllRanges()
      selection.addRange(range)
    }

    emit('update:modelValue', target.innerText)
  }
</script>

<style scoped lang="less">
  .editor {
    outline: none;
    cursor: text;

    &:empty:after {
      content: attr(placeholder);
      color: #555;
    }
  }
</style>