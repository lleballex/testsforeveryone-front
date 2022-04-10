import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive('outsideclick', {
        beforeMount(el, binding) {
            el.outsideclick = event => {
                if(!el.contains(event.target)) {
                    binding.value()
                }
            }
            document.body.addEventListener('click', el.outsideclick)
        },
        unmounted(el, binding) {
            document.body.removeEventListener('click', el.outsideclick)
        }
    })
})