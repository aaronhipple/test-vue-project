<template>
    <div class="result">
        <a v-bind:href="result.owner.url">
            <img class="result-avatar"
                v-bind:src="result.owner.avatar_url"
                v-bind:alt="result.owner.login">
        </a>
        <h3 class="result-title">
            <a
                v-bind:href="result.url"
                v-text="result.full_name">
            </a>
            <small class="result-homepage"
                v-if="result.homepage">
                <a
                    v-bind:href="result.homepage"
                    v-text="result.homepage">
                </a>
            </small>
        </h3>
        <div class="result-description"
            v-if="result.description"
            v-text="result.description">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GitHubResult',

    props: {
        result: Object
    }
}
</script>

<style scoped>
.result {
    margin: 1em 0;
    padding: 1em;
    background: #eee;
    box-shadow: 0 0 0.5em rgba(0,0,0,0.25);
    border-radius: 0.5em;
}

.result-avatar {
    float: right;
    height: 2em;
}

.result-title {
    margin-top: 0;
}

.result-title:last-child {
    margin-bottom: 0;
    
}

.result-title small {
    display: block;
    font-size: 0.7em;
    font-weight: 400;
    font-style: italic;
    margin-top: 0.5em;
}

.result-description {
    font-size: 0.8em;
}
</style>