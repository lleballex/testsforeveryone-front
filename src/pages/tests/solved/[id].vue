<template>
  <div>
    <UiLoading v-if="pending" />

    <div v-else class="test">
      <Title>{{ data.test.title }} | Tests for everyone</Title>
      
      <div class="test__header">
        <NuxtLink :to="`/users/${data.test.user.username}/`" class="test__user">
          <img v-if="data.test.user.image" class="test__user-image" :src="data.test.user.image">
          <img v-else class="test__user-image" src="~/assets/images/user.svg">
          <div class="test__user-data">
            <span class="test__user-username">{{ data.test.user.username }}</span>
            <span class="test__user-date">{{ data.test.date_created }}</span>
          </div>
        </NuxtLink>
        <TestsRating
          :id="Number(data.test.id)"
          :rating="data.test.rating"
          :isLiked="data.test.is_liked"
          :isDisliked="data.test.is_disliked"
          class="test__rating"
        />
      </div>

      <div class="test__title title">{{ data.test.title }}</div>

      <div v-if="data.test.tags.length" class="test__tags">
        <span v-for="tag in data.test.tags" class="test__tag">{{ tag }}</span>
      </div>

      <img v-if="data.test.image" class="test__image" :src="data.test.image">

      <div v-if="data.test.description" class="test__description">{{ data.test.description }}</div>

      <div v-for="question, index in data.questions" class="test__question card">
        <div class="test__question-condition">{{ index + 1}}. {{ question.question.condition }}</div>
        <div v-if="question.question.kind == 'RADIO'" class="test__question-radios">
          <label
            v-for="option in question.question.options"
            class="test__question-radio"
            :class="getRadioClass(question, option)"
          >
            <span>{{ option }}</span>
          </label>
        </div>
        <div v-else-if="question.is_right">
          <input class="test__question-input success" :value="question.user_answer" disabled>
        </div>
        <div v-else class="test__question-error-inputs">
          <input class="test__question-input error" :value="question.user_answer" disabled>
          <input class="test__question-input success" :value="question.question.answer" disabled>
        </div>
    </div>

    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const { id } = useRoute().params
  const { data, pending } = useLazyFetch(`tests/solved/${id}/`, useApiArgs())

  const getRadioClass = (question, option) => {
    if (question.question.answer == option) return 'success'
    if (question.user_answer == option && question.question.answer != option) return 'error'
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';

  .test__question-radio {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: -.2em;
      bottom: -.2em;
      right: -.5em;
      left: -.5em;
      z-index: -1;
      border-radius: @radius;
    }

    &.success:after {
      background: #087046;
    }

    &.error:after {
      background: #7e2033;
    }
  }

  .test__question-error-inputs {
    display: flex;
    gap: 2em;
  }

  .test__question-input {
    &.success {
      background: #087046;
    }

    &.error {
      background: #7e2033;
    }
  }
</style>