<template>
  <div>
    <UiError v-if="error" />

    <div v-else class="user">
      <div class="user__sidebar">
        <img v-if="data?.user.image" class="user__sidebar-image" :src="data.user.image">
        <img v-else class="user__sidebar-image" src="~/assets/images/user.svg">
        <div class="user__sidebar-field">
          <span class="user__sidebar-username">{{ username }}</span>
        </div>
        <div v-if="data?.user.github">
          <NuxtLink :to="data.user.github" target="_blank">GitHub</NuxtLink>
        </div>
      </div>
      <div class="user__main">
        <div class="user__menu">
          <NuxtLink :to="`/users/${username}/`" class="user__menu-link">Основное</NuxtLink>
          <NuxtLink :to="`/users/${username}/tests`" class="user__menu-link">Тесты</NuxtLink>
          <NuxtLink
            v-if="currentUsername == username"
            :to="`/users/${username}/settings`"
            class="user__menu-link"
          >Настройки</NuxtLink>
        </div>
        <div class="user__main-content">
          <UiLoading v-if="!data" />
          <slot v-else :data="data"></slot>
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup>
  import { useUser } from 'stores'
  import { storeToRefs } from 'pinia'

  const { area } = defineProps({
    area: {
      type: String,
      default: 'overview'
    }
  })

  const { username } = useRoute().params
  const { username: currentUsername } = storeToRefs(useUser())

  const { data, error } = await useFetch(`users/${username}/?area=${area}`, {
    lazy: true,
    ...useApiArgs()
  })
</script>

<style scoped lang="less">
  @import 'assets/css/config.less';

  .user {
    display: flex;
    gap: 4em;
    font-size: 1rem;
  }


  // sidebar

  .user__sidebar {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 1.8em;
    flex-shrink: 0;
    width: 25%;
  }

  .user__sidebar-image {
    border-radius: 50%;
  }

  .user__sidebar-field {
    position: relative;

    &:not(:last-child):after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      top: calc(100% + (.user__sidebar()[gap] - 2px) / 2);
      background: @primary;
    }
  }

  .user__sidebar-username {
    display: block;
    font-size: 1.3em;
  }


  // main

  .user__main {
    width: 100%;
  }

  .user__menu {
    display: flex;
    border-bottom: 1px solid #333;
  }

  .user__menu-link {
    position: relative;
    padding: 0 1.2em 1.2em 1.2em;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 100%;
      height: 2px;
      background: @secondary;
      transition: @transition;
    }

    &.router-link-active:after, &:hover:after {
      right: 0;
    }
  }

  .user__main-content {
    display: flex;
    flex-direction: column;
    gap: 2em;
    margin-top: 2em;
  }

  :slotted(.user__main-message) {
    text-align: center;
    font-weight: 400;
    letter-spacing: 1px;
  }

  :slotted(.user__main-title) {
    margin-bottom: 1em;
  }
</style>