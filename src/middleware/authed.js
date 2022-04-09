import { useUser } from 'stores'

export default defineNuxtRouteMiddleware(to => {
    if(!useUser().isAuthed) {
        useErrorMsg('😬 Туда можно только авторизованным пользователям')
        return navigateTo(`/signin/?to=${to.fullPath}`)
    }
})