<template>
  <UsersPage area="tests" #default="{ data: { tests } }">
    <UsersTests v-if="tests.length" :tests="tests" />
    <div v-else class="user__main-message">Здесь пока пусто</div>
  </UsersPage>
</template>