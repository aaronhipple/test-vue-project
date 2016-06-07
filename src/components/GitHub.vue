<template>
    <div class="github">
        <h1>GitHub Repo Search</h1>
        <input id="githubSearch" type="text"
            placeholder="Enter your query to begin"
            v-model="query"
            debounce="500" />

        <pagination
            :items.sync="results"
            :page.sync="page"
            :pages.sync="pages"
            :per-page.sync="perPage">
        </pagination>

        <div class="results"
            v-bind:class="{ 'loading': loading }">
            <git-hub-result
                transition="blink"
                transition-mode="out-in"
                v-for="result in results"
                :result="result">
            </git-hub-result>
        </div>
    </div>
</template>

<script>
import GitHubResult from './GitHubResult'
import Pagination from './Pagination'

export default {

    name: 'GitHub',

    components: {
        GitHubResult,
        Pagination
    },

    data () {
        return {
            query: (typeof this.$route.params.query !== 'undefined') ? this.$route.params.query : '',
            page: 1,
            perPage: 15,
            pages: 0,
            results: [],
            loading: false,
            title: 'GitHub Repository Search'
        }
    },

    methods: {
        queryForResults () {
            this.results = []

            if (this.query === '') {
                this.pages = 0
                this.page = 1
                return
            }

            this.$set('loading', true)

            this.$http({url: 'https://api.github.com/search/repositories?page=' + this.page + '&per_page=' + this.perPage + '&q=' + encodeURIComponent(this.query), method: 'GET'}).then(function (response) {
                this.$set('loading', false)
                if (response.data.total_count > 1000) {
                    this.pages = Math.ceil(1000 / this.perPage)
                } else {
                    this.pages = Math.ceil(response.data.total_count / this.perPage)
                }

                if (response.data.total_count > 0) {
                    this.$set('results', response.data.items)
                } else {
                    this.$set('results', [])
                    this.$parent.addMessage('info', 'No results found for ' + this.query)
                }
            }, function (response) {
                this.$set('loading', false)
                console.log(response)
                this.$set('results', [])
                var message = response.statusText + ' (' + response.status + '): '
                if (typeof response.data.message !== 'undefined') {
                    message += '\n'
                    message += response.data.message
                }
                this.$parent.addMessage('error', message)
            })
        },
        keyHandler (e) {
            // Search (ctrl+alt+f)
            if (!e.shiftKey && e.altKey && e.ctrlKey && e.keyCode === 70) {
                e.preventDefault()
                document.getElementById('githubSearch').focus()
                document.getElementById('githubSearch').select()
                return
            }
        }
    },

    watch: {
        query (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$set('page', 1)
                this.$set('pages', 0)
                this.$set('results', [])
            }

            if (newVal.trim() === '') {
                this.$router.go({
                    name: 'github'
                })
                return
            }

            this.$router.go({
                name: 'github.query',
                params: {
                    query: this.query
                }
            })
        },
        page (newVal, oldVal) {
            this.$router.go({
                name: 'github.query.paged',
                params: {
                    page: newVal,
                    query: this.query
                }
            })
        }
    },

    route: {
        data ({ to }) {
            if (typeof to.params.query === 'undefined') {
                return
            }
            if (to.params.query.trim() !== '') {
                if (to.params.page) {
                    this.$set('page', parseInt(to.params.page))
                }
            }
            this.$set('query', to.params.query)
            this.queryForResults()
        }
    },

    ready () {
        window.addEventListener('keyup', this.keyHandler)
    },

    destroyed () {
        window.removeEventListener('keyup', this.keyHandler)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

input[type=text] {
    padding: 0.5em 1em;
    border: 0;
    border-bottom: 3px solid transparentize(#868380, 0.8);
    &:focus, &:active {
        border: 0;
        border-bottom: 3px solid transparentize(#868380, 0.5);
    }
}

.results {
    transition: all 100ms ease;
    min-height: 20vh;
    border-radius: 0.5em;
    background: rgba(0,0,0,0.0);
    box-shadow: 0 0 0.5em 0.5em rgba(0,0,0,0.0);
    &.loading {
        min-height: 50vh;
        background: rgba(0,0,0,0.066);
        box-shadow: 0 0 0.5em 0.5em rgba(0,0,0,0.066);
    }
    width: 100%;
    margin: 1em auto;
    text-align: left;
}

.blink-transition {
    transition: opacity 300ms ease;
    opacity: 1;
}

.blink-enter, .blink-leave {
    opacity: 0;
}

</style>
