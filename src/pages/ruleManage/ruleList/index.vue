<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <br/>
        <el-button type="primary" icon="el-icon-search" @click="search">详情</el-button>
    </div>
</template>
<script>
    export default {
        name: "ruleList",
        data() {
            return {input:''}
        },
        methods: {
            search(){
                this.$store.dispatch('tagViews/addCacheView','ruleList') // 开启页面缓存
                this.$router.push({ path:encodeURI(`/ruleManageList/detail?title=${this.input}`)})
            }
        }
    }
</script>

<style scoped>

</style>