import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider } from './graphql/vue-apollo';
import './styles/global.scss';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount('#app');
