<template>
  <div>
    <NavigationMobileMenu />
    <div id="container">
      <div id="content">
        <NavigationNavbar />
        <NuxtPage />
      </div>
      <NavigationFooter />
      <Messages />
    </div>
  </div>
</template>

<style lang="less">
  @import 'assets/css/config.less';

  #container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 95rem;
    min-height: 100vh;
  }

  #content {
    margin: 0 2em;

    @media (max-width: 480px) {
      margin: 0 1em;
    }
  }
</style>