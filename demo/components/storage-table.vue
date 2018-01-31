<template>
    <section>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Name" width="100">
            </el-table-column>
            <el-table-column prop="value" label="Value">
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            required: true,
        },
    },
}
</script>