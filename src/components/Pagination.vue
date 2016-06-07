<template>
    <div class="pagination" v-if="pages > 1">
        <ul>
            <li v-for="n in pagesToShow()" v-on:click="changePage(n)" v-bind:class="{'active': isActive(n) }">{{ n }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Pagination',

    methods: {
        pagesToShow () {
            var n = this.page - Math.floor(this.toShow / 2)
            var items = []

            if (n < 1) {
                n = 1
            }
            if (n > this.pages - Math.ceil(this.toShow / 2)) {
                n = Math.ceil(this.toShow / 2)
            }

            for (var i = n; i < n + this.toShow; i++) {
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
        },
        keyHandler (e) {
            // Unmodified keypresses only below this block
            if (e.altKey || e.ctrlKey || e.shiftKey) {
                return
            }

            // Blocking elements
            const blockers = ['INPUT', 'TEXTAREA']
            if (blockers.indexOf(document.activeElement.tagName) > -1) {
                return
            }

            // Arrow key navigation here
            switch (e.keyCode) {
            case 37: // left
                e.preventDefault();
                (this.page > 1) ? this.page-- : null
                break
            // case 38:
            case 39: // right
                e.preventDefault();
                (this.page < this.pages) ? this.page++ : null
                break
            // case 40:
            }
            return
        }
    },

    data () {
        return {
            toShow: 8
        }
    },

    props: {
        items: Array,
        pages: Number,
        page: Number,
        perPage: Number
    },

    ready () {
        window.addEventListener('keyup', this.keyHandler)
    },

    destroyed () {
        window.removeEventListener('keyup', this.keyHandler)
    }
}
</script>

<style lang="scss">

.pagination {
    margin: 1em auto;
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