<template>
    <section class="panel">
        <pre class="element-pre">
            {{elementString}}
        </pre>
    </section>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    computed: {
        elementString () {
            if (this.data.rElement) {
                return this.data.rElement.html || '';
            }
            return '';
        },
    },
}
</script>

<style lang="scss" scoped>
.element-pre {
    font-size: 12px;
}
</style>

