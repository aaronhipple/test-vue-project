import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import NotFound from './components/NotFound'
import GitHub from './components/GitHub'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(require('vue-resource'))

var router = new VueRouter({
    history: true,
    titleBase: 'testVue',
    root: '/'
})

router.map({
    '/': {
        name: 'home',
        component: Home,
        title: 'Home'
    },
    '/github': {
        name: 'github',
        component: GitHub,
        title: 'Repo Search'
    },
    '/github/:query': {
        name: 'github.query',
        component: GitHub,
        title: function () {
            return 'Repo Search: ' + this.params.query
        }
    },
    '/github/:query/:page': {
        name: 'github.query.paged',
        component: GitHub,
        title: function () {
            return 'Repo Search: ' + this.params.query + ' (page ' + this.params.page + ')'
        }
    },
    '/404': {
        name: '404',
        component: NotFound,
        title: 'Not Found'
    }
})

router.redirect({
    '*': '/404'
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})

router.afterEach(function (t) {
    var titleBase = router.app.$get('titleBase')

    switch (typeof t.to.title) {
    case 'function':
        document.title = titleBase + ' | ' + t.to.title()
        break
    case 'string':
        document.title = titleBase + ' | ' + t.to.title
        break
    default:
        document.title = titleBase
    }
})

router.start(App, 'app')
