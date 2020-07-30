<template>
    <div class="page page-ruleList">
        <CqTable :table-props="tableProps"></CqTable>
    </div>
</template>
<script>
    import CqTable from  '@components/Table'
    export default {
        name: "ruleList",
        components: {
            CqTable
        },
        data() {
            return {
                tableProps:{
                    data: [
                        {
                            date: '2016-05-02',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄'
                        }],
                    column:[
                        {label:'日期', prop:'data'},
                        {label:'姓名', prop:'name'},
                        {label:'地址', prop:'address'}
                    ]
                }
            }
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