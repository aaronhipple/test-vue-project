<template>
    <div class="not-found">
        <h1>Page Not Found</h1>
        <div class="text">
            <i class="fa fa-frown-o" aria-hidden="true"></i>
            <p>The page you were looking for was not found, but don't give up!</p>
            <p>Head <a v-link="{name: 'home'}">home</a> and try again.</p>
        </div>
    </div>
</template>

<style scoped>
.text i.fa-frown-o {
    font-size: 5em;
    color: #E33232;
}
</style>
