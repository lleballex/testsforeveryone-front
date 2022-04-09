<template>
  <div>
    <Title>Создание аккаунта | Tests for everyone</Title>

    <form @submit.prevent="signUp" class="auth-form card">
      <div class="auth-form__title title">Регистрация</div>
      <input v-model="username" type="text" placeholder="Логин" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль" required   >
      <div class="auth-form__btns">
        <UiLoadingBtn ref="loading" class="auth-form__btn primary">Создать аккаунт</UiLoadingBtn>
        <NuxtLink :to="`/signin/${queryPath}`" class="auth-form__btn secondary">Вход</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
  const router = useRouter()
  const route = useRoute()

  const queryPath = route.fullPath.replace(route.path, '')

  const username = ref('')
  const email = ref('')
  const password = ref('')
  const loading = ref()

  const signUp = async () => {
    loading.value.start()

    const { error } = await useFetch('users/signup/', {
      method: 'POST',
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
      },
      ...useApiArgs()
    })

    loading.value.stop()

    if (error.value) {
      if (error.value.response?.status == 400 && error.value.data) {
        let message = ''

        switch(error.value.data[Object.keys(error.value.data)[0]][0]) {
          case 'Enter a valid email address.':
          message = 'Введи корректный email'
          break
        case 'user with this username already exists.':
          message  = 'Введеный логин уже используется'
          break
        case 'user with this email already exists.':
          message = 'Введеный email уже используется'
          break
        }

        message ? useErrorMsg(message) : useApiError(error.value)
      } else {
        useApiError(error.value)
      }
    } else {
      useSuccessMsg('Супер! Теперь ты можешь войти в свой аккаунт')
      router.push(`/signin/${queryPath}`)
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/auth-form.less';
</style>