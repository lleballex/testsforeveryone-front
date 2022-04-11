<template>
  <div class="tags-form">
    <div v-if="addedTags.length" class="tags-form__added-tags test__tags">
      <span v-for="tag, index in addedTags" @click="removeTag(index)" class="test__tag">
        {{ tag }}
      </span>
    </div>
    <div ref="inputArea" class="tags-form__input-area">
      <input
        ref="input"
        v-model="tagQuery"
        @focus="showTags"
        @blur="hideTags"
        class="tags-form__input"
        type="text"
        placeholder="Добавить тег"
      >
      <div
        @mouseenter="canHideTags = false"
        @mouseleave="canHideTags = true"
        class="tags-form__available-tags test__tags"
      >
        <span
          v-for="tag, index in tags"
          @click="addTag(index)"
          v-show="tag.toLowerCase().includes(tagQuery.toLowerCase())"
          class="test__tag"
        >
          {{ tag }}
        </span>
      </div>  
    </div>
  </div>
</template>

<script setup>
  const { modelValue } = defineProps({
    modelValue: {
      type: Array,
      default: []
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const input = ref()
  const inputArea = ref()

  const addedTags = ref([])
  const tagQuery = ref('')
  const canHideTags = ref(true)

  const { data: tags } = useLazyFetch('tags/', useApiArgs())

  watch(tags, t => {
    modelValue.forEach(i => addTag(t.indexOf(i)))
  })

  const addTag = index => {
    addedTags.value.push(tags.value.splice(index, 1)[0])
    canHideTags.value = true
    input.value.blur()
    tagQuery.value = ''
    emit('update:modelValue', addedTags.value)
    emit('change')
  }

  const removeTag = index => {
    tags.value.push(addedTags.value.splice(index, 1)[0])
    emit('update:modelValue', addedTags.value)
    emit('change')
  }

  const showTags = () => {
    inputArea.value.classList.add('active')
  }

  const hideTags = event => {
    if(canHideTags.value){
      inputArea.value.classList.remove('active')
    } else {
      input.value.focus()
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';

  .tags-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    font-size: 1em;
  }

  .tags-form__added-tags {
    .test__tag {
      transition: @transition;

      &:hover {
        background: darken(.test__tag()[background], 15%);
        cursor: pointer;
      }
    }
  }

  .tags-form__input-area {
    position: relative;
  }

  .tags-form__available-tags {
    gap: .6em;
    position: absolute;
    padding: .6em;
    top: calc(100% + 1em);
    max-height: 0;
    max-width: 200%;
    width: max-content;
    opacity: 0;
    overflow: hidden;
    visibility: hidden;
    z-index: 1;
    overflow: auto;
    background: #222;
    border-radius: @radius;
    transition: @transition;

    .tags-form__input-area.active & {
      visibility: visible;
      max-height: 10em;
      opacity: 1;
    }

    .test__tag:hover {
      background: @primary;
      cursor: pointer;
    }
  }
</style>