<template>
  <UiLoading v-if="pending" />

  <div v-else class="test">
    <Title>Редактирование теста | Tests for everyone</Title>

    <UiEditor
      v-model="test.title"
      class="test__title title"
      placeholder="Название"
      :lineWrap="false"
    />

    <TestsTagsForm v-model="test.tags" />

    <div class="test__image">
      <img v-if="test.image" :src="test.image">
      <div class="test__image-control" :class="test.image ? '' : 'active'">
        <span @click="setImage" class="test__image-icon">
          <icon icon="image" />
        </span>
        <span v-if="test.image" @click="test.image = ''" class="test__image-icon">
          <icon icon="trash" />
        </span>
      </div>
    </div>

    <UiEditor v-model="test.description" class="test__description" placeholder="Описание" />

    <button @click="update" class="test__submit">
      <span class="test__submit-text">
        <icon v-if="loading" icon="bug" spin class="test__submit-loading" />
        <span>Сохранить</span>
      </span>
      <icon icon="arrow-right" class="test__submit-icon" />
    </button>

    <UiCropper ref="cropper" v-model="test.image" :aspectRatio="10/7" />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const { id } = useRoute().params
  const { data: test, pending } = await useFetch(`tests/own/${id}/`, {
    method: 'POST',
    lazy: true,
    ...useApiArgs()
  })

  const loading = ref(false)
  const update = async () => {
    loading.value = true

    let body = {
      title: test.value.title,
      tags: test.value.tags,
      description: test.value.description
    }

    if (!test.value.image.startsWith('http')) body.image = test.value.image

    const { error } = await useFetch(`tests/own/${id}/`, {
      method: 'PUT',
      body: body,
      ...useApiArgs()
    })

    loading.value = false

    if (error.value) {
      useApiError(error.value)
    } else {
      useSuccessMsg('Супер! Твой тест обновлен')
      useRouter().push('/tests/my/')
    }
  }

  // cropper

  const cropper = ref()
  const setImage = () => cropper.value.chooseImage()
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';

  .test__image {
    position: relative;
    overflow: hidden;
    background: @primary;

    &:after {
      content: '';
      display: block;
      padding-top: calc(7 / 10 * 100%);
    }

    > img {
      position: absolute;
      width: 100%;
    }
  }

  .test__image-control {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    visibility: hidden;
    background: rgba(0, 0, 0, .5);
    transition: @transition;

    &.active, .test__image:hover & {
      opacity: 1;
      visibility: visible;
    }
  }

  .test__image-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    background: @background;
    font-size: 1.2em;
    transition: @transition;

    &:hover {
      background: @onBackground;
      color: @background;
      cursor: pointer;
    }
  }
</style>