<template>
    <div class="hello">
        <h1>Welcome</h1>
        <p>Welcome to FSM's test Vue app. Check out <a v-link="{ name: 'github' }">the GitHub repository search</a>.</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'Home'
        }
    }
}
</script>