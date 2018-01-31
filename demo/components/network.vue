<template>
    <section class="panel">
        <el-table :data="tableData" style="width: 100%" :default-expand-all="true">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div>
                        <div v-if="props.row.header">
                            <div class="row-header">
                                Headers
                            </div>
                            <div class="row-body">
                                <table class="network-table">
                                    <tr v-for="(value, key) in props.row.header" :key="key">
                                        <td>{{key}}</td>
                                        <td>
                                            <div>
                                                {{value}}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div v-if="props.row.getData">
                            <div class="row-header">
                                Qeury String Parameters
                            </div>
                            <div class="row-body">
                                <div class="network-response">{{props.row.getData}}</div>
                                <!-- <table class="network-table">
                                    <tr v-for="(value, key) in props.row.getData" :key="key">
                                        <td>{{key}}</td>
                                        <td>
                                            <div>
                                                {{value}}
                                            </div>
                                        </td>
                                    </tr>
                                </table> -->
                            </div>
                        </div>
                        <div v-if="props.row.postData">
                            <div class="row-header">
                                Form Data
                            </div>
                            <div class="row-body">
                                <div class="network-response">{{props.row.postData}}</div>
                                <!-- <table class="network-table">
                                    <div class="network-response">{{props.row.postData}}</div>
                                    <tr v-for="(value, key) in props.row.postData" :key="key">
                                        <td>{{key}}</td>
                                        <td>
                                            <div>
                                                {{value}}
                                            </div>
                                        </td>
                                    </tr>
                                </table> -->
                            </div>
                        </div>
                        <div v-if="props.row.response">
                            <div class="row-header">
                                Response
                            </div>
                            <div class="row-body">
                                <div class="network-response">{{props.row.response}}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Name" prop="url" width="260">
            </el-table-column>
            <el-table-column label="Method" prop="method">
            </el-table-column>
            <el-table-column label="Status" prop="status">
            </el-table-column>
        </el-table>
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
        reqList () {
            if (this.data.rNetwork) {
                return this.data.rNetwork.reqList || {};
            }
            return {};
        },
        tableData () {
            const tData = [];
            for (let item of Object.keys(this.reqList)) {
                tData.push(this.reqList[item]);
            }
            return tData;
        },
    },
    methods: {
        isObject (val) {
            let jsonVal;
            try {
                jsonVal = JSON.parse(val);
            } catch (err) {
                jsonVal = val;
            }
            return typeof jsonVal === 'object';
        },
        jsonparse (val) {
            return JSON.parse(val);
        },
    }
}
</script>

<style lang="scss" scoped>
.table-expand {
    font-size: 0;
}

.table-expand label {
    width: 90px;
    color: #99a9bf;
}

.table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
}
.row-header {
    font-weight: bold;
}
.row-header, .row-body {
    padding: 3px 6px;
}
.network-table {
    tr {
        background-color: transparent;
    }
    td {
        height: 24px;
        padding: 0 5px;
        border: none;
        background-color: transparent;
        div {
            padding: 0 10px;
            box-sizing: border-box;
            white-space: normal;
            word-break: break-all;
        }
    }
}
.network-response {
    padding: 0 10px;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    max-height: 200px;
    overflow-y: scroll;
}
</style>

<style lang="scss">
.el-table__expanded-cell[class*=cell] {
    padding: 3px 6px !important;
}
</style>


