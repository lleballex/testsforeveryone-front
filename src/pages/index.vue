<template>
  <div>
    <Title>Проекты | Tests for everyone</Title>

    <TestsSearch v-model="tests" />
    
    <TestsList :tests="tests" #default="{ test }">
      <NuxtLink :to="`/users/${test.user.username}/`" class="test-user">
        <img v-if="test.user.image" :src="test.user.image">
        <img v-else src="~/assets/images/user.svg">
        <div>
          <span>{{ test.user.username }}</span>
          <span>{{ test.date_created }}</span>
        </div>
      </NuxtLink>
      <TestsRating
        :id="test.id"
        :rating="test.rating"
        :isLiked="test.is_liked"
        :isDisliked="test.is_disliked"
        class="test-rating"
      />
    </TestsList>
  </div>
</template>

<script setup>
  const { data: tests } = useLazyFetch('tests/', useApiArgs())
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .test-user {
    display: flex;
    align-items: center;
    gap: 1em;
    position: relative;

    > img {
      width: 2.9em;
      border-radius: 50%;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: .2em;

      > span:last-child {
        font-weight: 400;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: -.3em;
      bottom: -.3em;
      left: -.3em;
      right: calc(100% - 2.9em - .3em);
      z-index: -1;
      opacity: 0;
      background: #222;
      border-radius: 2em;
      transition: @transition;
    }

    &:hover:after {
      right: -1em;
      opacity: 1;
    }
  }

  .test-rating {
    align-self: flex-end;
  }
</style>