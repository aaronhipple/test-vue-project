<template>
    <div class="message"
        v-bind:class="message.type">
        <i class="close fa fa-times"
            aria-hidden="true"
            v-on:click="removeMessage(index)">
        </i>
        {{ message.text }}
    </div>
</template>

<script>
export default {
    name: 'Message',

    props: {
        message: Object,
        index: Number
    },

    methods: {
        removeMessage (index) {
            this.$parent.messages.splice(index, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.message {
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
</style>