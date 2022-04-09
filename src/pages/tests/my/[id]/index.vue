<template>
  <UiLoading v-if="pending" />

  <div v-else class="my-test">
    <div class="test">
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
      <div class="test__title title">{{ test.title }}</div>
      <div v-if="test.tags.length" class="test__tags">
        <span v-for="tag in test.tags" class="test__tag">{{ tag }}</span>
      </div>
      <img v-if="test.image" class="test__image" :src="test.image">
      <div v-if="test.description" class="test__description">{{ test.description }}</div>
      <div v-for="question, index in test.questions" class="test__question card">
        <div class="test__question-condition">{{ index + 1}}. {{ question.condition }}</div>
        <div v-if="question.kind == 'RADIO'" class="test__question-radios">
          <label v-for="option in question.options" class="test__question-radio">
            <UiRadio :checked="option == question.answer" :disabled="true" />
            <span>{{ option }}</span>
          </label>
        </div>
        <div v-else>
          <input class="test__question-input" :value="question.answer" disabled>
        </div>
      </div>
    </div>

    <div class="my-test__solutions">
      <table v-if="test.solutions.length" class="my-test__solutions-table">
        <tr>
          <th>Пользователь</th>
          <th>Ответы</th>
          <th>Начало</th>
          <th>Конец</th>
        </tr>
        <tr v-for="solution in test.solutions" @click="showSolution(solution)">
          <td>{{solution.user.username}}</td>
          <td>{{solution.right_answers}} / {{solution.questions.length}}</td>
          <td>{{solution.date_started}}</td>
          <td>{{solution.date_ended}}</td>
        </tr>
      </table>
      <div v-else class="my-test__solutions-message">
        Этот тест еще никто не решал
      </div>
      <UiModal ref="modal">
        <template #title>
          Title
        </template>
        <template #main>
          <div class="my-test__modal-questions">
            <div v-for="question, index in solution.questions" class="my-test__modal-question">
              <div>{{ index + 1 }}. {{ question.question.condition }}</div>
              <div class="my-test__modal-answer" :class="question.is_right ? 'success' : 'error'">
                <span>{{ question.user_answer }}</span>
                <span v-if="!question.is_right">{{ question.question.answer }}</span>
              </div>
            </div>
          </div>
        </template>
      </UiModal>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const { id } = useRoute().params
  const { data: test, pending } = await useLazyFetch(`tests/own/${id}/`, useApiArgs())

  const modal = ref()
  const solution = ref({})
  const showSolution = s => {
    solution.value = s
    modal.value.toggle()
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';
  @import 'assets/css/test.less';

  .my-test {
    display: flex;
    gap: 3em;
    font-size: 1rem;
  }

  .test, .my-test__solutions {
    flex-shrink: 1;
    width: 50%;
  }

  .my-test__solutions-table {
    width: 100%;
    text-align: center;
    border-spacing: 0;

    th {
      background: #007f7f;
      color: #fff;
      padding: .9em;

      &:first-child {
        border-top-left-radius: @radius;
      }

      &:last-child {
        border-top-right-radius: @radius;
      }
    }

    td {
      padding: 1em .9em;
      border-bottom: 2px solid #007f7f;
      transition: @transition;
    }

    tr:hover td {
      color: #007f7f;
      cursor: pointer;
    }
  }

  .my-test__solutions-message {
    text-align: center;
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 1.1em;
  }

  .my-test__modal-questions {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .my-test__modal-question {
    display: flex;
    flex-direction: column;
    gap: .6em;
  }

  .my-test__modal-answer {
    display: flex;

    > span {
      width: 100%;
      padding: .5em;
      text-align: center;

      &:first-child {
        border-top-left-radius: .5em;
        border-bottom-left-radius: .5em;
      }

      &:last-child {
        border-top-right-radius: .5em;
        border-bottom-right-radius: .5em
      }
    }

    &.success > span {
      background: #087046;
    }

    &.error > span {
      &:first-child {
        background: #7e2033;
      }

      &:last-child {
        background: #087046;
      }
    }
  }
</style>