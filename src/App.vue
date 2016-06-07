<template>
    <header>
        <div id="logo"><a v-link="{name: 'home'}"><i class="fa fa-compass" aria-hidden="true"></i> testVue</a></div>
        <nav>
            <ul>
                <li><a v-link="{name: 'github' }">GitHub Repo Search</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <aside class="messages" v-if="messages.length > 0">
            <message
                v-for="message in messages"
                :message="message"
                :index="$index">
            </message>
        </aside>
        <router-view
            transition="opacify"
            transition-mode="out-in">
        </router-view>
    </main>
    <footer>
        &copy;2016 FootSteps Marketing
    </footer>
</template>

<script>
import Message from './components/Message'

export default {
    components: {
        Message
    },

    data () {
        return {
            'titleBase': 'testVue',
            'messages': []
        }
    },

    methods: {
        addMessage (type, text) {
            this.messages.push({
                type: type,
                text: text
            })
        },
        removeMessage (index) {
            this.messages.splice(index, 1)
        },
        keyHandler (e) {
            // Unmodified keypresses only below this block
            if (e.altKey || e.ctrlKey || e.shiftKey) {
                return
            }

            if (e.keyCode === 27) {
                if (this.messages.length) {
                    e.preventDefault()
                    this.removeMessage(this.messages.length - 1)
                }
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

    ready () {
        window.addEventListener('keyup', this.keyHandler)
    },

    destroyed () {
        window.removeEventListener('keyup', this.keyHandler)
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    color: #2c3e50;
    font-family: Source Sans Pro, Helvetica, sans-serif;
}

a {
    color: #B9424A;
    text-decoration: none;
    border-bottom: 3px solid transparentize(#B9424A, 0.85);
    &:hover {
        border-bottom: 3px solid transparentize(#B9424A, 0.5);
    }
}

#logo {
    height: 100px;
    margin: auto;
    font-size: 100px;
    line-height: 1;
    text-align: center;
    i {
        color: #F29621;
    }
    a {
        color: #2c3e50;
        border-bottom: 0;
    }
}

.opacify-transition {
    transition: opacity 100ms ease;
    opacity: 1;
}

.opacify-enter {
    opacity: 0;
}
.opacify-leave {
    opacity: 0;
}

header {
    background: #E7D3CA;
    padding: 1em 0;
}

header, footer {
    box-shadow: 0 0 0.5em 0.125em rgba(0,0,0,0.25);
}

header nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
        display: inline-block;
        margin: 0;
        a {
            display: block;
            margin: 0 0.25em;
            padding: 0.25em;
            &.v-link-active {
                font-weight: bold;
            }
        }
    }
}

main {
    flex: 1;
    width: 100%;
    padding: 1em;
    max-width: 40em;
    margin: auto;
    :first-child {
        margin-top: 0;
    }
    :last-child {
        margin-bottom: 0;
    }
}

.messages {
    padding: 1em 0;
    max-width: 30em;
    margin: auto;
}

footer {
    padding: 1em 0;
    background: #F7E7E0;
}

</style>