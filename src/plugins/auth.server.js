import { defineNuxtPlugin } from '#app'
import { useUser } from 'stores'

export default defineNuxtPlugin(async ({ vueApp, ssrContext }) => {
    const authToken = useCookie('authToken')?.value

    if (authToken) {
        await $fetch('http://localhost:8000/api/users/signin/', {
            headers: {
                'Auth-Token': authToken
            }
        }).then(response => {
            useUser().authenticate(response)
        }).catch(error => {
            console.log(error)
        })
    }
})