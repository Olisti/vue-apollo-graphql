import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Books from '../views/Books.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Books',
        component: Books
    }
];

const router = new VueRouter({
    routes
});

export default router;
