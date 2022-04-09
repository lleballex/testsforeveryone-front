<template>
  <div class="user-tests">
    <NuxtLink
      v-for="test in tests"
      :to="`/tests/${test.id}/`"
      class="user-tests__test"
    >
      <img v-if="test.image" class="user-tests__test-image" :src="test.image">
      <div class="user-tests__test-info">
        <div class="user-tests__test-title title">
          {{ test.title }}
        </div>
        <div style="flex-shrink: 0;">
          <icon class="user-tests__test-icon" icon="star" />
          <span>{{ test.rating }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
  const { tests } = defineProps({
    'tests': Object
  })
</script>

<style lang="less" scoped>
   @import 'assets/css/config.less';

  .user-tests {
    display: flex;
    flex-wrap: wrap;
    gap: 1.8em;
  }

  .user-tests__test {
    position: relative;
    width: calc(50% - .user-tests()[gap] / 2);
    border-radius: @radius;
    overflow: hidden;
  }

  .user-tests__test-image {
    width: 100%;
    transition: @transition;

    .user-tests__test:hover & {
      transform: scale(1.5);
    }
  }

  .user-tests__test-info {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;;
    position: absolute;
    padding: 1em;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
  }

  .user-tests__test-title {
    transition: @transition;

    .user-tests__test:hover & {
      color: #1abc9c;
    }
  }

  .user-tests__test-icon {
    margin-right: .3em;
  }
</style>