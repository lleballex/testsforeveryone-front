<template>
  <div class="rating">
    <icon
      @click="like"
      icon="chevron-up"
      class="rating__btn"
      :class="isLiked && isAuthed ? 'active' : ''"
    />
    <span>{{ rating }}</span>
    <icon
      @click="dislike"
      icon="chevron-down"
      class="rating__btn"
      :class="isDisliked && isAuthed ? 'active' : ''"
    />
  </div>
</template>

<script setup>
  import { useUser } from 'stores'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    id: Number,
    rating: Number,
    isLiked: Boolean,
    isDisliked: Boolean,
  })

  const emit = defineEmits(['update:modelValue'])

  const { isAuthed } = storeToRefs(useUser())

  const rating = ref(props.rating)
  const isLiked = ref(props.isLiked)
  const isDisliked = ref(props.isDisliked)

  const fetch = async action => {
    if (!isAuthed.value) {
      useErrorMsg('Для этого нужно авторизоваться')
      return null
    }
    const { data, error } = await useFetch(`tests/${props.id}/${action}/`, {
      method: 'POST',
      ...useApiArgs()
    })
    if (error.value) {
      useApiError(error.value)
      return null
    }
    return data.value
  }

  const like = async () => {
    const data = await fetch('like')

    if (data) {
      rating.value = data.rating
      isLiked.value = data.is_liked
      isDisliked.value = false
    }
  }

  const dislike = async () => {
    const data = await fetch('dislike')

    if (data) {
      rating.value = data.rating
      isDisliked.value = data.is_disliked
      isLiked.value = false
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .rating {
    display: flex;
    align-items: center;
    gap: .5em;
  }

  .rating__btn {
    font-size: 1.1em;
    transition: @transition;

    &:hover {
      transform: scale(1.3);
      cursor: pointer;
    }

    &.active {
      color: #A5F332;
    }
  }

  // mismatches

  .rating > span:nth-child(3) {
    display: none;
  }
</style>