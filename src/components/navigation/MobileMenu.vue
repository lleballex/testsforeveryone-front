<template>
  <div class="menu" :class="isMenuActive ? 'active' : ''">
    <div @click="close" class="menu__background"></div>

    <div class="menu__content">
      <div @click="close" class="menu__item">
        <icon icon="times" class="menu__close" />
      </div>
      <div v-if="user.isAuthed" class="menu__item">
        <NuxtLink :to="`/users/${user.username}/`" class="menu__user">
          <div class="menu__user-image">
            <img v-if="user.image" :src="user.image">
            <img v-else src="~/assets/images/user.svg">
          </div>
          <span>{{ user.username }}</span>
        </NuxtLink>
      </div>
      <div v-if="!user.isAuthed" class="menu__item">
        <NuxtLink to="/signin/" class="menu__link">Вход</NuxtLink>
      </div>
      <div v-if="!user.isAuthed" class="menu__item">
        <NuxtLink to="/signup/" class="menu__link">Регистрация</NuxtLink>
      </div>
      <div class="menu__item">
        <NuxtLink to="/" class="menu__link">Тесты</NuxtLink>
        <NuxtLink v-if="user.isAuthed" to="/tests/solved/" class="menu__link">Решенные тесты</NuxtLink>
        <NuxtLink v-if="user.isAuthed" to="/tests/my/" class="menu__link">Мои тесты</NuxtLink>
        <NuxtLink v-if="user.isAuthed" to="/tests/new/" class="menu__link">Новый тест</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUser } from 'stores'

  const user = useUser()

  const isMenuActive = useState('isMenuActive', () => false)
  const close = () => isMenuActive.value = false

  watch(useRoute(), () => {
    if (isMenuActive.value) close()
  })
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .menu__background, .menu__content {
    z-index: 1;
  }

  .menu__background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    visibility: hidden;
    opacity: 0;
    background: rgba(0, 0, 0, .5);
    transition: @transition;

    .menu.active & {
      visibility: visible;
      opacity: 1;
    }
  }

  .menu__content {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -80vw;
    width: 80vw;
    background: @background;
    font-size: 1.2rem;
    transition: @longTransition;

    .menu.active & {
      right: 0;
    }
  }

  .menu__item {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0 1.3em;
    padding: 1em 0;
    border-bottom: 1px solid #222;

    &:last-child {
      border-bottom: none;
    }
  }

  .menu__close {
    color: @secondary;
    font-size: 1.3em;
  }

  .menu__link {
    transition: @transition;

    &.router-link-active {
      padding: 1em 1.2em;
      border-radius: 2em;
      background: @primary;
      color: @onPrimary;
    }
  }

  .menu__user {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .menu__user-image {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      z-index: -1;
      border-radius: 50%;
      background: @primary;
    }

    > img {
      width: 3em;
      background: @background;
      border-radius: 50%;
      border: 3px solid @background;
    }
  }
</style>