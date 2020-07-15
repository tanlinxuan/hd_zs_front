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
                    <Main/>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    import Header from  './header'
    import Aside from  './aside' // menu
    import Main from  './main' // menu
    import './index.less'
    export default {
        name: "Layout",
        components: {
          Header, //头部
          Aside, // 左侧菜单
          Main  // body
        }
    }
</script>

<style scoped>

</style>