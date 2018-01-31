<template>
    <section class="panel">
        <div v-for="(item, index) in consoleList" :key="index" class="row" :class="item.logType">
            <span v-for="(log, i) in item.logs" :key="i" class="log-span">
                {{log}}
            </span>
        </div>
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
        consoleList () {
            if (this.data.rConsole) {
                return this.data.rConsole.logList || [];
            }
            return [];
        },
    },
}
</script>

<style lang="scss" scoped>
.row {
    font-size: 14px;
    width: 100%;
    border-bottom: 1px solid #EEE;
    padding: 6px 10px;
}
.log {
    color: #333;
}
.info {
    color: #6A5ACD;
}
.debug {
    color: #DAA520;
}
.warn {
    color: #FFA500;
    border-color: #FFB930;
    background-color: #FFFACD;
}
.error {
    color: #DC143C;
    border-color: #F4A0AB;
    background-color: #FFE4E1;
}
.log-span {
    white-space: normal;
    word-break: break-all;
}
</style>

