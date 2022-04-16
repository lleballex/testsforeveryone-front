<template>
  <UiLoading v-if="pending" />

  <UiError v-else-if="!test" />

  <div v-else class="test">
    <Title>{{ test.title }} | Tests for everyone</Title>

    <div class="test__header">
      <NuxtLink :to="`/users/${test.user.username}/`" class="test__user">
        <img v-if="test.user.image" class="test__user-image" :src="test.user.image">
        <img v-else class="test__user-image" src="~/assets/images/user.svg">
        <div class="test__user-data">
          <span class="test__user-username">{{ test.user.username }}</span>
          <span class="test__user-date">{{ test.date_created }}</span>
        </div>
      </NuxtLink>
      <TestsRating
        :id="Number(id)"
        :rating="test.rating"
        :isLiked="test.is_liked"
        :isDisliked="test.is_disliked"
        class="test__rating"
      />
    </div>

    <div class="test__title-area">
      <div class="test__title title">{{ test.title }}</div>
      <TestsOptions
        class="test__options"
        :id="id"
        :isOwner="test.user.username == user.username"
        :afterRemoving="goHome"
      />
    </div>

    <div v-if="test.tags.length" class="test__tags">
      <span v-for="tag in test.tags" class="test__tag">{{ tag }}</span>
    </div>

    <img v-if="test.image" class="test__image" :src="test.image">

    <div v-if="test.description" class="test__description">{{ test.description }}</div>

    <div v-if="user.isAuthed" v-for="question, index in test.questions" class="test__question card">
      <div class="test__question-condition">{{ index + 1}}. {{ question.condition }}</div>
      <div v-if="question.kind == 'RADIO'" class="test__question-radios">
        <label v-for="option in question.options" class="test__question-radio">
          <input
            v-model="answers[index]"
            :value="option"
            :name="index"
            type="radio"
          >
          <span class="radio"></span>
          <span>{{option}}</span>
        </label>
      </div>
      <div v-else>
        <input
          v-model="answers[index]"
          class="test__question-input"
          :type="question.kind"
          placeholder="Твой ответ"
        >
      </div>
    </div>

    <button v-if="user.isAuthed" @click="solve" class="test__submit">
      <span class="test__submit-text">
        <icon v-if="loading" icon="bug" spin class="test__submit-loading" />
        <span>Проверить</span>
      </span>
      <icon icon="arrow-right" class="test__submit-icon" />
    </button>

    <div v-else class="test__auth-message">
      Чтобы решить тест, нужно
      <NuxtLink class="test__auth-message-link" :to="`/signin/?to=/tests/${id}/`">
        авторизоваться
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { useUser } from 'stores'

  const user = useUser()
  const router = useRouter()

  const id = Number(useRoute().params.id)
  const { data, pending } = await useLazyFetch(`tests/${id}/`, useApiArgs())
  const test = ref(data.value?.test)

  watch(data, d => {
    if (d.status == 200) {
      test.value = d.test
    } else if (d.status == 403 && d.detail == 'You have already solved this test') {
      router.push(`/tests/solved/${d.solved_id}/`)
    }
  })

  const answers = ref([])
  const startDate = new Date().getTime()
  const loading = ref(false)

  const solve = async () => {
    if (!confirm('Ты точно хочешь завершить тест?')) return

    var check = answers.value.every(item => {
      return Boolean(item) || typeof(item) == 'number'
    })

    if (!check || answers.value.length != test.value.questions.length) {
      return useErrorMsg('Сначала дай ответы на все вопросы')
    }

    loading.value = true

    const { data, error } = await useFetch(`tests/${id}/`, {
      method: 'POST',
      body: {
        answers: answers.value,
        start_date: startDate,
        end_date: new Date().getTime()
      },
      ...useApiArgs()
    })

    if (error.value) {
      useApiError(error.value)
    } else {
      router.push(`/tests/solved/${data.value}/`)
    }
  }

  const goHome = () => router.push('/')
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';

  //radio

  input[type="radio"], input[type="checkbox"] {
    display: none;
  }

  .radio, .checkbox {
    display: inline-block;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    border: 1px solid @secondary;
    box-sizing: border-box;
    font-size: 1.1rem;
    transition: .3s;
  }

  .radio {
    border-radius: 50%;
  }

  .checkbox {
    border-radius: 20%;
  }

  .radio:hover,
  input[type="radio"]:checked + .radio {
    border-width: .3em;
    cursor: pointer;
  }

  .checkbox:hover,
  input[type="checkbox"]:checked + .checkbox {
    border-width: .5em;
    cursor: pointer;
  }

  .test__auth-message {
    padding: 3em;
    border-radius: @radius;
    background: #3a3a3a;
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
  }

  .test__auth-message-link {
    position: relative;
    color: #007f7f;

    &:after {
      content: '';
      position: absolute;
      bottom: -.3em;
      left: 0;
      right: 100%;
      height: 2px;
      background: #007f7f;
      transition: @transition;
    }

    &:hover:after {
      right: 0;
    }
  }
</style>