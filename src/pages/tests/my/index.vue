<template>
  <div>
    <Title>Мои тесты | Tests for everyone</Title>

    <UiError v-if="tests && tests.length == 0" message="У тебя еще нет ни одного теста" />

    <TestsList v-else :tests="tests" url="/tests/my/[id]/" #default="{ test }">
      <div class="test-options">
        <button @click="toggleMenu(test.id)" class="test-options__btn">
          <icon icon="ellipsis-vertical" />
        </button>
        <div v-show="showedMenuId == test.id" class="test-options__menu">
          <NuxtLink :to="`/tests/my/${test.id}/`" class="test-options__menu-item">
            Управление
          </NuxtLink>
          <NuxtLink :to="`/tests/my/${test.id}/update/`" class="test-options__menu-item">
            Редактировать
          </NuxtLink>
          <button @click="deleteTest(test.id)" class="test-options__menu-item">
            Удалить
          </button>
        </div>
      </div>
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

  const showedMenuId = ref(0)
  const toggleMenu = id => {
    showedMenuId.value == id ? showedMenuId.value = 0 : showedMenuId.value = id
  }

  const deleteTest = async id => {
    if (confirm('Ты точно хочешь удалить этот тест?')) {
      const { error } = await useFetch(`tests/own/${id}/`, {
        method: 'DELETE',
        ...useApiArgs()
      })

      if (error.value) {
        useApiError(error.value)
      } else {
        useSuccessMsg('Тест удален')
        refresh()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .test-options {
    position: absolute;
    top: 1em;
    right: 1em;
    text-align: right;
  }

  .test-options__btn {
    width: 1.7em;
    height: 1.7em;
    background: #000;
    border-radius: .3em;
    box-shadow: 0 0 6px 2px #0a0a0a;
    transition: @transition;

    &:hover {
      transform: scale(1.1);
    }
  }

  .test-options__menu {
    margin-top: 1em;
    box-shadow: 0 0 9px 1px #222;
    overflow: hidden;
    border-radius: @radius;
    text-align: left;
  }

  .test-options__menu-item {
    display: block;
    padding: .5em 1em;
    width: 100%;
    background: @background;
    text-align: left;
    transition: @transition;

    &:hover {
      background: #0a0a0a;
      cursor: pointer;
    }

    &:first-child {
      padding-top: 1em;
    }

    &:last-child {
      padding-bottom: 1em;
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