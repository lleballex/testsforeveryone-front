<template>
  <UsersPage #default="{ data: { tests } }">
    <div>
      <div class="user__main-title title">Популярные проекты</div>
      <UsersTests v-if="tests.length" :tests="tests" />
      <div v-else class="user__main-message">Здесь пока пусто</div>
    </div>
<!--     <div>
      <div class="user__main-title title">Любимые теги</div>
      <div v-if="tags.length" class="user__main-details">...</div>
      <div v-else class="user__main-message">Здесь пока пусто</div>
    </div> -->
  </UsersPage>
</template>