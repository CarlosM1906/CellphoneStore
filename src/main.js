import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faHome, faChartLine, faPlusCircle, faCartPlus, faPlusSquare, faPlus, faMinus, faTimes, faCheck, faSortNumericDown, faSortNumericUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import { firestorePlugin } from 'vuefire'

library.add(faUserSecret, faHome, faChartLine, faPlusCircle, faCartPlus, faPlusSquare, faTimes, faCheck, faSortNumericDown, faSortNumericUp, faPlus, faMinus, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
