import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        isAuthed: false,
        username: '',
        image: '',
    }),
    actions: {
        authenticate({ username, image }) {
            this.isAuthed = true
            this.username = username
            this.image = image
        }
    }
})