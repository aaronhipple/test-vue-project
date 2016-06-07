<template>
    <div class="github">
        <h1>GitHub Repositories</h1>
        <input type="text" v-model="query" v-on:keyup.enter="queryForResults" placeholder="Enter your query to begin" debounce="500" />
        <div class="results" v-if="results.length > 0">
            <git-hub-result
                transition="blink"
                transition-mode="out-in"
                v-for="result in results"
                :result="result">
            </git-hub-result>
        </div>

        <div class="pagination" v-if="pages > 1">
            <ul>
                <li v-for="n in pagesToShow()" v-on:click="changePage(n)" v-bind:class="{'active': isActive(n) }">{{ n }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import GitHubResult from './GitHubResult'

export default {

    name: 'GitHub',

    components: {
        GitHubResult
    },

    data () {
        return {
            query: (typeof this.$route.params.query !== 'undefined') ? this.$route.params.query : '',
            page: 1,
            perPage: 15,
            pages: 0,
            results: []
        }
    },

    methods: {
        pagesToShow () {
            var toShow = 10
            var n = this.page - 5
            var items = []

            if (n < 1) {
                n = 1
            }
            if (n > this.pages - 5) {
                n = n - 5
            }

            for (var i = n; i < n + toShow; i++) {
                if (i > 0 && i <= this.pages) {
                    items.push(i)
                }
            }

            if (this.page > 1) {
                items.unshift('<')
            }
            if (this.page > 2) {
                items.unshift('«')
            }
            if (this.page < this.pages) {
                items.push('>')
            }
            if (this.page < this.pages - 1) {
                items.push('»')
            }

            return items
        },
        isActive (n) {
            if (this.query.trim() === '') {
                return false
            }
            return n === this.page
        },
        changePage (n) {
            if (n === '>') {
                (this.page < this.pages) ? this.page++ : null
            } else if (n === '<') {
                (this.page > 1) ? this.page-- : null
            } else if (n === '»') {
                this.page = this.pages
            } else if (n === '«') {
                this.page = 1
            } else {
                this.page = n
            }
            this.$router.go({
                name: 'github.query.paged',
                params: {
                    page: this.page,
                    query: this.query
                }
            })
        },
        queryForResults () {
            if (this.query === '') {
                this.results = []
                this.pages = 0
                this.page = 1
                return
            }

            this.$http({url: 'https://api.github.com/search/repositories?page=' + this.page + '&per_page=' + this.perPage + '&q=' + encodeURIComponent(this.query), method: 'GET'}).then(function (response) {
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
                console.log(response)
                this.$set('results', [])
                var message = response.statusText + ' (' + response.status + '): '
                if (typeof response.data.message !== 'undefined') {
                    message += '\n'
                    message += response.data.message
                }
                this.$parent.addMessage('error', message)
            })
        }
    },

    watch: {
        query (newVal, oldVal) {
            if (newVal.trim() === '') {
                this.$router.go({name: 'github'})
                return
            }

            this.$router.go({
                name: 'github.query',
                params: {
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
                this.$set('query', to.params.query)
                this.queryForResults()
            }
        }
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
    transition: all 1s ease-in-out;
    margin: 1em auto;
    text-align: left;
}

.blink-transition {
    transition: opacity 50ms ease;
    opacity: 1;
}

.blink-enter, .blink-leave {
    opacity: 0;
}

.pagination {
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 0.25em;
        min-width: 2em;
        min-height: 2em;
        line-height: 2em;
        cursor: pointer;
        &.active {
            background: #ddc;
            border-radius: 3em;
        }
    }
}

</style>
