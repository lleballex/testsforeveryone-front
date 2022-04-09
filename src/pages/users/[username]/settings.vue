<template>
  <UiError v-if="!isOwner" forbidden /> 
  
  <UsersPage v-else #default="{ data: { user } }">
    <div>
      <div class="user__main-title title">Логин</div>
      <input
        ref="username"
        :value="user.username"
        class="user-settings__input"
        type="text"
        placeholder="lleballex">
    </div>
    <button @click="updateUser" class="user-settings__input user-settings__submit">Сохранить</button>
  </UsersPage>
</template>

<script setup>
  import { useUser } from 'stores'

  const isOwner = useRoute().params.username == useUser().username

  const username = ref()

  const updateUser = async () => {
    return useErrorMsg('Эта штука пока не работает')

    if (!username.value.value) {
      useErrorMsg('Логин не может быть пустым')
    } else {
      const { data, error } = await useFetch('url', {
        method: 'POST',
        body: {
          username: username.value.value
        },
        ...useApiOptions()
      })

      if (error.value) {
        useApiError(error.value)
      } else {
        useSuccessMsg('Супер! Данные обновлены')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/config.less';

  .user-settings__input {
    width: 100%;
    max-width: 35em;
    box-sizing: border-box;
  }

  .user-settings__submit {
    .field();
    .button.primary();

    margin-top: .5em;
  }
</style>