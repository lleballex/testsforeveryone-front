import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBroom } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faBug, faStar, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faImage, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin(({ vueApp }) => {
    library.add(faBroom)
    library.add(faPlus, faXmark, faCheck)
    library.add(faBars, faMagnifyingGlass)
    library.add(faChevronUp, faChevronDown)
    library.add(faBug, faStar, faPenToSquare)
    library.add(faImage, faTrash, faArrowRight)
    library.add(faEllipsisVertical)
    vueApp.component('icon', FontAwesomeIcon)
})

// import { defineNuxtPlugin } from '#app'
// import Icon from '~/components/IconHelp.vue'

// export default defineNuxtPlugin(({ vueApp }) => {
//     vueApp.component('icon', Icon)
// })