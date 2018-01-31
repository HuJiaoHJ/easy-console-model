<template>
    <section class="panel">
        <el-radio-group v-model="activeTab" style="margin-bottom: 30px;">
            <el-radio-button label="cookie">Cookies</el-radio-button>
            <el-radio-button label="localStorage">LocalStorage</el-radio-button>
        </el-radio-group>
        <v-storage-table :tableData="tableData"></v-storage-table>
    </section>
</template>

<script>
import vStorageTable from './storage-table.vue';
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            activeTab: 'cookie',
        };
    },
    components: {
        vStorageTable,
    },
    computed: {
        cookieList () {
            if (this.data.rStorage) {
                return this.data.rStorage.cookieList || [];
            }
            return [];
        },
        localStorageList () {
            if (this.data.rStorage) {
                return this.data.rStorage.localStorageList || [];
            }
            return [];
        },
        tableData () {
            return this[`${this.activeTab}List`] || [];
        },
    },
}
</script>

<style lang="scss" scoped>
.storage-tab {
    font-size: 14px;
}
</style>


