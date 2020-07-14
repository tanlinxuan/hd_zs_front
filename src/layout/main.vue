<template>
    <div class="app-main">
        <keep-alive>
        <el-tabs v-model="activePath.name" type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">
            <el-tab-pane
                    v-for="item in pageTabs"
                    :key="item.name"
                    :label="item.title"
                    :routerPath="item.path"
                    :name="item.name">
<!--                <keep-alive>-->
<!--                    <router-view />-->
<!--                </keep-alive>-->
                <router-view />
            </el-tab-pane>
        </el-tabs>
        </keep-alive>
    </div>
</template>

<script type="text/jsx">
    import { mapState } from 'vuex'
    export default {
        name:'Main',
        data() {
            return {}
        },
        computed:{
            ...mapState({
                pageTabs: state => state.pageTab.pageInfo.pageTabs,
                activePath: state => state.pageTab.pageInfo.activePath,
            }),
        },
        methods: {
            tabClick(e){
                let path = e.$attrs.routerPath
                this.$store.dispatch('pageTab/changeTab',path).then(()=>{
                    this.$router.push({ path:path })
                })
            },
            tabRemove(name){
                let event = {};
                this.pageTabs.forEach(item=>{
                    if(item.name === name){event=item}
                })
                this.$store.dispatch('pageTab/closeTab',event.path).then(()=>{
                    this.$router.push({ path:this.activePath.path })
                })
            }
        }
    }
</script>