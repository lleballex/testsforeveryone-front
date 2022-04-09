<template>
  <div>
    <Title>Вход в аккаунт | Tests for everyone </Title>

    <form @submit.prevent="signIn" class="auth-form card">
      <div class="auth-form__title title">Авторизация</div>
      <input v-model="username" type="text" placeholder="Логин" required>
      <input v-model="password" type="password" placeholder="Пароль" required>
      <div class="auth-form__btns">
        <UiLoadingBtn ref="loading" class="auth-form__btn primary">Войти</UiLoadingBtn>
        <NuxtLink :to="`/signup/${queryPath}`" class="auth-form__btn secondary">
          Регистрация
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { useUser } from 'stores'

  const router = useRouter()
  const route = useRoute()
  const user = useUser()

  const { query } = route
  const queryPath = route.fullPath.replace(route.path, '')

  const username = ref('')
  const password = ref('')
  const loading = ref()

  const signIn = async () => {
    loading.value.start()

    const { data, error } = await useFetch('users/signin/', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      },
      ...useApiArgs()
    })

    loading.value.stop()

    if (error.value) {
      useApiError(error.value, [
        {code: 400, detail: 'Username or password is invalid', message: 'Хм... У тебя где-то ошибка'}
      ])
    } else {
      user.authenticate(username.value)
      cookieStore.set('authToken', data.value)
      query.to ? router.push(query.to) : router.push('/')
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/auth-form.less';
</style>