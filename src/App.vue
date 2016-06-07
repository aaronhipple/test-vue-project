<template>
    <header>
        <div id="logo"><a v-link="{name: 'home'}"><i class="fa fa-compass" aria-hidden="true"></i> welcome</a></div>
        <nav>
            <ul>
                <li><a v-link="{name: 'github' }">Github Repositories</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <aside class="messages" v-if="messages.length > 0">
            <div v-for="message in messages" v-bind:class="message.type">
                <i class="close fa fa-times" aria-hidden="true" v-on:click="removeMessage($index)"></i>
                {{ message.text }}
            </div>        
        </aside>
        <router-view
            transition="opacify"
            transition-mode="out-in">
        </router-view>
    </main>
    <footer>
        &copy;Aaron Hipple
    </footer>
</template>

<script>
export default {
    data () {
        return {
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
        }
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
    div {
        text-align: left;
        margin-bottom: 0.5em;
        &:last-child {
            margin-bottom: 0;
        }
        position: relative;
        .close {
            display: block;
            float: right;
            font-size: 1.5em;
            cursor: pointer;
        }
        padding: 0.5em;
        border-radius: 0.5em;
        font-size: 0.75em;
        &.error {
            background: #E69C9C;
            border: 1px solid #EC4848;
            color: #952424;
        }
        &.info {
            background: #E6DF9C;
            border: 1px solid #ECDC48;
            color: #958A24;
        }
    }
}

footer {
    padding: 1em 0;
    background: #F7E7E0;
}

</style>