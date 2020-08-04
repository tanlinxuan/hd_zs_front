<template>
    <a-layout>
        <a-layout-header>
            <PageHeader/>
        </a-layout-header>
        <a-layout>
            <a-layout-sider width="220">
                <Aside/>
            </a-layout-sider>
            <a-layout>
                <a-layout-content>
                    <Main/>
                </a-layout-content>
<!--                <a-layout-footer>Footer</a-layout-footer>-->
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
     import PageHeader from  './header'
     import Aside from  './aside'
     import Main from  './main'
    import './index.less'
    export default {
        name: "PageLayout",
        components: {
           PageHeader, //头部
           Aside, // 左侧菜单
           Main  // body
        }
    }
</script>

<style scoped>

</style>