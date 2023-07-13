import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faGear,
         faFileImport,
         faTrashCan} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faHeart)
library.add(faGear)
library.add(faFileImport)
library.add(faTrashCan)
/* import the fontawesome core */

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { fas } from '@fortawesome/free-solid-svg-icons'


createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

