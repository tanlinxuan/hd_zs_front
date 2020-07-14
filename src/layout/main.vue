<template>
    <div class="app-main">
        <el-tabs v-model="activePath.name" type="card" closable>
            <el-tab-pane
                    v-for="item in pageTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name">
                <router-view :key="item.path" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/jsx">
    import { mapState } from 'vuex'
    export default {
        name:'Main',
        data() {
            return {

            }
        },
        computed:{
            ...mapState({
                pageTabs: state => state.pageTab.pageInfo.pageTabs,
                activePath: state => state.pageTab.pageInfo.activePath,
            }),
        },
        methods: {

        }
    }
</script>