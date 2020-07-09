<template>
    <el-container>
        <el-header>
            <Header/>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <Aside/>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view :key="key" />
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import Header from  './header'
    import Aside from  './aside' // menu
    import './index.less'
    export default {
        name: "Layout",
        components: {
          Header,
          Aside
        },
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>

</style>