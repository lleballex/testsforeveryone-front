<template>
  <div class="search">
    <form @submit.prevent="search" class="search__input-area">
      <input
        @input="updateQueryHandler"
        v-model="query"
        class="search__input"
        type="text"
        placeholder="Поиск тестов"
      >
      <icon @click="search" class="search__icon" icon="magnifying-glass" />
    </form>
    <div class="search__options">
      <TestsTagsForm @change="search" v-model="tags" class="search__tags" />
      <UiSelect
        @change="search"
        v-model="sorting"
        class="search__sorting"
        :items="{'new': 'Сначала новые', 'old': 'Сначала старые'}"
      />
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['update:modelValue'])

  const query = ref('')
  const sorting = ref('new')
  const tags = ref([])

  const search = () => {
    emit('update:modelValue', null)

    useFetch('tests/', {
      lazy: true,
      params: {
        query: query.value,
        sorting: sorting.value,
        tags: tags.value.join(',')
      },
      ...useApiArgs()
    }).then(({ data }) => {
      emit('update:modelValue', data.value)
    })
  }

  const updateQueryHandler = () => {
    if (!query.value) search()
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .search {
    display: flex;
    flex-direction: column;
    gap: 2em;
    margin: 0 auto;
    margin-bottom: 3.5em;
    width: 38em;
    max-width: 100%;
    font-size: 1rem;
  }

  .search__input-area {
    position: relative;
  }

  .search__input {
    padding-right: 3em;
    width: 100%;
    box-sizing: border-box;
  }

  .search__icon {
    position: absolute;
    top: 1em;
    right: 1em;
    height: calc(100% - 1em * 2);
    transition: @transition;

    &:hover {
      transform: scale(1.3);
      cursor: pointer;
    }
  }

  .search__options {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1em;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  .search__tags :deep(.tags-form__input-area), .search__sorting {
    flex-shrink: 0;
    width: 12em;
  }

  .search__tags {
    flex-grow: 1;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: flex-start;
    gap: inherit;
  }

  .search__tags :deep(.tags-form__added-tags) {
    flex-grow: 1;
    justify-content: center;
  }

  .search__tags :deep(.tags-form__input) {
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 460px) {
    .search__tags :deep(.tags-form__available-tags) {
      max-width: 150%;
    }
  }
</style>