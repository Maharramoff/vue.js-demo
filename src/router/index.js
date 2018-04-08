import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import NotFound from '@/components/NotFound'

const routerOptions = [
    {path: '/', component: 'Index'},
    {path: '/signin', component: 'Signin'},
    {path: '/signup', component: 'Signup'},
    {path: '/home', component: 'Index', meta: {requiresAuth: true}}
];

const routes = routerOptions.map(route =>
{
    return {
        path     : route.path,
        meta     : route.meta,
        component: () => import(`@/components/${route.component}.vue`
    )
}
})

Vue.use(Router);

/*
 export default new Router({
 mode  : 'history',
 routes: [
 ...routes,
 {path: '*', component: NotFound}
 ]
 })
 */

const router = new Router({
    //mode  : 'history',
    routes: [
        ...routes,
        {path: '*', component: NotFound}
    ]
})

router.beforeEach((to, from, next) =>
{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const user         = firebase.auth().currentUser
    if (requiresAuth && !user)
    {
        next('/signin')
    }
    next()
})

export default router