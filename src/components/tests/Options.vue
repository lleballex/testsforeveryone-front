<template>
  <div class="test-options">
    <button v-outsideclick="hideMenu" @click="isShowed = !isShowed" class="test-options__btn">
      <icon icon="ellipsis-vertical" />
    </button>
    <div v-show="isShowed" class="test-options__menu">
      <div @click="share" class="test-options__menu-item">Поделиться</div>
      <div v-if="isOwner">
        <NuxtLink :to="`/tests/my/${id}/`" class="test-options__menu-item">
          Управление
        </NuxtLink>
        <NuxtLink :to="`/tests/my/${id}/update/`" class="test-options__menu-item">
          Редактировать
        </NuxtLink>
        <div @click="remove" class="test-options__menu-item">Удалить</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { id, isOwner, afterRemoving } = defineProps({
    id: Number,
    isOwner: {
      type: Boolean,
      default: false
    },
    afterRemoving: {
      type: Function,
      required: false
    }
  })

  const isShowed = ref(false)
  const hideMenu = () => isShowed.value = false

  const share = () => {
    navigator.clipboard.writeText(`http://codeem.ru/tests/${id}/`).then(
      success => useSuccessMsg('Ссылка на тест скопирована'),
      err => useErrorMsg('Хм... Не получилось')
    )
  }

  const remove = async () => {
    if (confirm('Ты точно хочешь удалить этот тест?')) {
      const { error } = await useFetch(`tests/own/${id}/`, {
        method: 'DELETE',
        ...useApiArgs()
      })

      if (error.value) {
        useApiError(error.value)
      } else {
        useSuccessMsg('Супер! Тест удален')
        if (afterRemoving) afterRemoving()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .test-options {
    position: relative;
  }

  .test-options__btn {
    transition: @transition;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }

  .test-options__menu {
    margin-top: 1em;
    padding: .5em 0;
    position: absolute;
    right: 0;
    z-index: 1;
    background: @background;
    border-radius: @radius;
    overflow: hidden;
    box-shadow: 0 0 6px 1px #1a1a1a;
  }

  .test-options__menu-item {
    display: block;
    padding: .8em 1.4em;
    text-align: left;
    transition: @transition;

    &:hover {
      background: #0a0a0a;
      cursor: pointer;
    }
  }
</style>