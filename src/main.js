import Vue from 'vue';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';
import router from './router';
import VueCompositionApi from '@vue/composition-api';
import VueChatScroll from 'vue-chat-scroll'

Vue.use(firestorePlugin);
Vue.use(VueCompositionApi);
Vue.use(VueChatScroll);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
