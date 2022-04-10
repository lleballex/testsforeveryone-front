<template>
  <div class="test">
    <Title>Создание теста | Tests for everyone</Title>

    <UiEditor
      v-model="title"
      class="test__title title"
      placeholder="Название"
      :lineWrap="false"
    />

    <TestsTagsForm v-model="tags" />

    <div class="test__image">
      <img v-if="image" :src="image">
      <div class="test__image-control" :class="image ? '' : 'active'">
        <span @click="setImage" class="test__image-icon">
          <icon icon="image" />
        </span>
        <span v-if="image" @click="image = ''" class="test__image-icon">
          <icon icon="trash" />
        </span>
      </div>
    </div>

    <UiEditor v-model="description" class="test__description" placeholder="Описание" />

    <TestsQuestionsEditor ref="questions" />

    <button @click="create" class="test__submit">
      <span class="test__submit-text">
        <icon v-if="loading" icon="bug" spin class="test__submit-loading" />
        <span>Опубликовать</span>
      </span>
      <icon icon="arrow-right" class="test__submit-icon" />
    </button>

    <UiCropper ref="cropper" v-model="image" :aspectRatio="4/3" />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const title = ref('')
  const tags = ref([])
  const image = ref('')
  const description = ref('')
  const questions = ref()
  const loading = ref(false)

  const create = async () => {
    if (!title.value) {
      useErrorMsg('Сначала введи название')
    } else {
      const qstns = questions.value.getQuestions()

      if (qstns) {
        let data = {
          title: title.value,
          tags: tags.value,
          description: description.value,
          questions: qstns
        }

        if (image.value) data.image = image.value

        loading.value = true

        const { error } = await useFetch('tests/', {
          method: 'POST',
          body: data,
          ...useApiArgs()
        })

        loading.value = false

        if (error.value) {
          useApiError(error.value)
        } else {
          useSuccessMsg('Супер! Теперь у тебя еще больше тестов')
          useRouter().push('/')
        }
      }
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
      padding-top: calc(3 / 4 * 100%);
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