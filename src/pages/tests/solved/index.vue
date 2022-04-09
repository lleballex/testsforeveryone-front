<template>
  <div>
    <Title>Решенные тесты | Tests for everyone</Title>

    <UiError v-if="tests && tests.length == 0" message="У тебя еще нет ни одного решенного теста" />

    <TestsList v-else :tests="tests" url="/tests/solved/[id]/" #default="{ test }">
      <div>{{ test.date_ended }}</div>
      <div class="test-info">
        <div class="test-info-group">
          <icon icon="check" class="test-info-icon" />
          <span>{{ test.right_answers }} / {{ test.questions }}</span>
        </div>
      </div>
    </TestsList>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const { data: tests } = useLazyFetch('tests/solved/', useApiArgs())
</script>

<style scoped>
  .test-info {
    display: flex;
    gap: 1em;
  }

  .test-info-group {
    display: flex;
    align-items: center;
    gap: .4em;
  }

  .test-info-icon {
    font-size: 1.2em;
  }
</style>