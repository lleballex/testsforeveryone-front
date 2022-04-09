<template>
  <div class="error">
    <slot>{{ getMessage() }}</slot>
  </div>
</template>

<script setup>
  const { unAuthorizated, forbidden, message } = defineProps({
    unAuthorizated: Boolean,
    forbidden: Boolean,
    message: String
  })

  const getMessage = () => {
    if (unAuthorizated) {
      return '😬 Сюда можно только авторизованным пользователям'
    } else if (forbidden) {
      return '😡 Эй, тебе сюда нельзя'
    } else if (message) {
      return message
    } else {
      return '🙀 Кажется, что-то пошло не так'
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .error {
    padding: 6em;
    background: @primary;
    // background-size: 400% 400%;
    border-radius: @radius;
    color: @onPrimary;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
    // animation: gradient 15s ease infinite;

    @media (max-width: 800px) {
      padding: 6em 3em;
    }

    @media (max-width: 480px) {
      padding: 6em 1em;
    }
  }

  @keyframes gradient {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
  }
</style>