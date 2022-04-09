<template>
  <div class="navbar">
    <div class="navbar__item navbar__title">
      <NuxtLink to="/" class="navbar__title-link title">Tests for everyone</NuxtLink>
    </div>

    <div class="navbar__menu">
      <div class="navbar__item">
        <NuxtLink to="/" class="navbar__main-link">Тесты</NuxtLink>
        <div v-if="user.isAuthed" class="navbar__extra-menu">
          <NuxtLink to="/tests/solved/" class="navbar__extra-link">Решенные тесты</NuxtLink>
          <NuxtLink to="/tests/my/" class="navbar__extra-link">Мои тесты</NuxtLink>
          <NuxtLink to="/tests/new/" class="navbar__extra-link">Новый тест</NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="user.isAuthed" class="navbar__menu">
      <div class="navbar__item navbar__user">
        <NuxtLink :to="`/users/${user.username}/`" class="navbar__main-link">
          <img v-if="user.image" :src="user.image">
          <img v-else src="~/assets/images/user.svg">
        </NuxtLink>
        <div class="navbar__extra-menu">
          <NuxtLink :to="`/users/${user.username}/settings/`" class="navbar__extra-link">
            Настройки
          </NuxtLink>
          <button @click="logout" class="navbar__extra-link">Выйти</button>
        </div>
      </div>
    </div>

    <div v-else class="navbar__menu">
      <div class="navbar__item">
        <NuxtLink to="/signin/" class="navbar__main-link">Вход</NuxtLink>
      </div>
      <div class="navbar__item primary">
        <NuxtLink to="/signup/" class="navbar__main-link">Регистрация</NuxtLink>
      </div>
    </div>

    <button @click="openMenu" class="navbar__item navbar__bars">
      <icon icon="bars" class="navbar__bars-icon" />
    </button>
  </div>
</template>

<script setup>
  import { useUser } from 'stores'

  const user = useUser()
  const logout = () => {
    user.$reset()
    cookieStore.delete('authToken')
    location.reload()
  }

  const isMenuActive = useState('isMenuActive')
  const openMenu = () => isMenuActive.value = true
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  @mobile: ~'(max-width: 767px)';

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2em 0;
    font-size: 1.1rem;
  }

  .navbar__item {
    padding: 1.2em 1.5em;

    &.primary {
      padding: 0;
    }
  }

  .navbar__title {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .navbar__title-link {
    font-size: 1.3em;
  }

  .navbar__menu {
    display: flex;
    position: relative;

    @media @mobile {
      display: none;
    }
  }

  .navbar__main-link {
    position: relative;
    transition: @transition;

    .navbar__item.primary & {
      display: block;
      padding: .navbar__item()[padding];
      background: @primary;
      color: @onPrimary;
      border-radius: 2em;

      &:after {
        display: none;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: -.7em;
      height: 2px;
      left: 0;
      right: 100%;
      background: @primary;
      transition: @transition;
    }

    &:hover, &.router-link-active {
      color: #ddd;

      &:after {
        right: 0;
      }
    }
  }

  .navbar__extra-menu {
    display: flex;
    flex-direction: column;
    gap: .2em;
    position: absolute;
    top: 3em;
    right: 1.5em;
    z-index: 1;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    border-radius: .6em;
    text-align: right;
    transition: @transition;

    .navbar__main-link:hover + &, &:hover {
      max-height: 15em;
      opacity: 1;
    }
  }

  .navbar__extra-link {
    padding: .5em;
    background: #090909;
    color: @secondary;
    white-space: nowrap;
    font-weight: 400;
    transition: @transition;

    &:hover {
      background: @primary;
      color: @onPrimary;
    }

    &:not(:last-child) {
      border-bottom-right-radius: .3em;
      border-bottom-left-radius: .3em;
    }

    &:not(:first-child) {
      border-top-left-radius: .3em;
      border-top-right-radius: .3em;
    }
  }

  .navbar__user {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;

    .navbar__main-link {
      display: block;
      z-index: 0;

      &:after {
        top: -3px;
        left: -3px;
        right: -3px;
        height: calc(100% + 3px * 2);
        z-index: -1;
        border-radius: 50%;
      }

      img {
        width: 3em;
        border-radius: 50%;
        background: @background;
        border: 4px solid @background;
      }
    }

    .navbar__extra-menu {
      right: 0;
      top: calc(100% + .7em);
    }
  }

  .navbar__bars {
    display: none;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;

    @media @mobile {
      display: initial;
    }
  }

  .navbar__bars-icon {
    font-size: 2em;
  }
</style>