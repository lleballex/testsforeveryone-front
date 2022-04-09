<template>
  <div>
    <UiLoading v-if="tests == null" />

    <div v-else-if="!tests.length" class="tests-list-message">
      Ничего нет
    </div>
    
    <div v-else class="tests">
      <div v-for="test in tests" class="tests__card card">
        <NuxtLink v-if="test.image" :to="url.replace('[id]', test.id)" class="tests__card-img">
          <img :src="test.image">
        </NuxtLink>
        <NuxtLink :to="url.replace('[id]', test.id)" class="tests__card-title title">
          {{ test.title }}
        </NuxtLink>
        <div v-if="test.tags.length" class="tests__card-tags">
          <span v-for="tag in test.tags">{{ tag }}</span>
        </div>
        <div class="tests__card-extra-data">
          <slot :test="test"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    tests: Array,
    url: {
      type: String,
      default: '/tests/[id]/'
    }
  })

  const { tests } = toRefs(props)
  const { url } = props
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .tests-list-message {
    padding-top: 1em;
    font-size: 1.2em;
    font-weight: 400;
    letter-spacing: 2px;
    text-align: center;
  }

  .tests {
    display: flex;
    flex-wrap: wrap;
    gap: 3em;
    font-size: 1rem;
  }

  .tests__card {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: @padding;
    position: relative;
    box-sizing: border-box;

    @media (max-width: 599px) {
      width: 100%;
    }

    @media (min-width: 600px) and (max-width: 1023px) {
      width: calc(100% / 2 - .tests[gap] / 2);
    }

    @media (min-width: 1024px) {
      width: calc((100% - .tests[gap] * 2) / 3);
    }
  }

  .tests__card-img {
    display: block;
    overflow: hidden;
    border-radius: .3em;

    > img {
      width: 100%;
      transition: @longTransition;

      &:hover {
        transform: scale(1.5);
      }
    }
  }

  .tests__card-title {
    display: block;
    line-height: 1.4em;
    transition: @transition;

    &:hover {
      color: #1abc9c;
    }
  }

  .tests__card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    font-size: .9em;
    font-weight: 400;

    > span {
      display: block;
      padding: .3em .7em;
      border-radius: @radius;
      background: @secondary;
      color: @onSecondary;
    }
  }

  .tests__card-extra-data {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    font-size: .9em;
  }
</style>