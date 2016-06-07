import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import GitHub from './components/GitHub'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

var router = new VueRouter({
    history: true
    // root: '/vue'
})

router.map({
    '/': {
        name: 'home',
        component: Home
    },
    '/github': {
        name: 'github',
        component: GitHub
    },
    '/github/:query': {
        name: 'github.query',
        component: GitHub
    },
    '/github/:query/:page': {
        name: 'github.query.paged',
        component: GitHub
    },
    '/404': {
        name: '404',
        component: NotFound
    }
})

router.redirect({
    '*': '/404'
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})

router.start(App, 'app')
