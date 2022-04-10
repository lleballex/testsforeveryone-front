<template>
  <div>
    <Title>Мои тесты | Tests for everyone</Title>

    <UiError v-if="tests && tests.length == 0" message="У тебя еще нет ни одного теста" />

    <TestsList v-else :tests="tests" url="/tests/my/[id]/" #default="{ test }">
      <TestsOptions class="topt" :id="test.id" :isOwner="true" :afterRemoving="refresh" />
      <div>{{ test.date_created }}</div>
      <div class="test-info">
        <div class="test-info-group">
          <icon icon="pen-to-square" class="test-info-icon" />
          <span>{{ test.solutions }}</span>
        </div>
        <div class="test-info-group">
          <icon icon="star" class="test-info-icon" />
          <span>{{ test.rating }}</span>
        </div>
      </div>
    </TestsList>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['authed']
  })

  const { data: tests, refresh } = useLazyFetch('tests/own/', useApiArgs())
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .topt {
    position: absolute !important;
    top: 1.5em;
    right: 1.5em;
    text-align: right;
  }

  .topt :deep(.test-options__btn) {
    width: 1.7em;
    height: 1.7em;
    background: #000;
    border-radius: .3em;
    box-shadow: 0 0 6px 1px #1a1a1a;
    transition: @transition;

    &:hover {
      transform: scale(1.1);
    }
  }

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