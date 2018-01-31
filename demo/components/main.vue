<style>
.el-tab-pane {
    height: 600px;
}
.panel {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
</style>

<template>
    <section>
        <el-row>
            <el-col>
                <el-tabs type="border-card" v-model="activeTab">
                    <el-tab-pane v-for="item in tabs" :key="item" :label="item" :name="item">
                        <component :is="currentView" :data="remoteConsoleData"></component>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </section>
</template>

<script>

import vConsole from './console.vue';
import vNetwork from './network.vue';
import vElement from './element.vue';
import vStorage from './storage.vue';

const tabOptions = ['Console', 'Network', 'Element', 'Storage'];

export default {
    props: {
        remoteConsoleData: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            tabs: tabOptions,
            activeTab: tabOptions[0],
        };
    },
    watch: {
        RemoteConsole (val) {
            console.log(val);
        }    
    },
    computed: {
        currentView () {
            return `v-${this.activeTab.toLowerCase()}`;
        },
    },
    components: {
        vConsole,
        vNetwork,
        vElement,
        vStorage,
    },
}
</script>

