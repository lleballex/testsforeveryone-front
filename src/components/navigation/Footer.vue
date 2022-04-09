<template>
  <div>
    <div class="footer card">
      <div v-show="false" class="footer__links">
        <NuxtLink to="/about/" class="footer__link">О проекте</NuxtLink>
        <NuxtLink to="/contact/" class="footer__link">Связаться с нами</NuxtLink>
      </div>
      <div>© 2022 Tests for everyone</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    padding: 2.4em;
    font-size: 1rem;
  }

  .footer__links {
    display: flex;
    gap: 3em;
    font-weight: 400;
  }

  .footer__link {
    transition: @transition;

    &:hover {
      color: #8bcd8c;
      cursor: pointer;
    }
  }
</style>