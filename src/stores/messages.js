import { defineStore } from 'pinia'

export const useMessages = defineStore('messages', {
    state: () => ({
        messages: [],
        lastId: 0
    }),
    actions: {
        success(text) {
            this.lastId += 1
            this.messages.push({
                id: this.lastId,
                type: 'success',
                text
            })
        },

        error(text) {
            this.lastId += 1
            this.messages.push({
                id: this.lastId,
                type: 'error',
                text
            })
        }
    }
})