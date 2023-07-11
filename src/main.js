import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
// import { fas } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faHeart)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

