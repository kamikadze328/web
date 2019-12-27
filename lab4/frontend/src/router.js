import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router);
let UrlOnHelios = '/';

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: UrlOnHelios,
            component: Home
        },
        {
            path: '/main',
            component: () => import('./views/Main.vue'),
            meta: {
                 requiresAuth: true
            }
        },
        {
            path: '*',
            redirect: UrlOnHelios
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('currentUser')) {
            next({
                path: ()=>{
                    router.go(-1)
                }
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;