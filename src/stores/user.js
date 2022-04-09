import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        isAuthed: false,
        username: '',
        image: '',
    }),
    actions: {
        authenticate(username) {
            this.isAuthed = true
            this.username = username
        }
    }
})