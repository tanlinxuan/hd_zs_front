<template>
    <div class="page page-ruleList">
        <Search :search-array="searchArray" @search="search($event)"/>
        <CqTable :table-props="tableProps"></CqTable>
    </div>
</template>
<script type="text/jsx">
    import CqTable from  '@components/Table'
    import Search from  '@components/Search'
    export default {
        name: "ruleList",
        components: {
            CqTable,
            Search
        },
        data() {
            return {
                tableProps:{
                    columns:[],
                    dataSource:[]
                },
                searchArray:[ //表单项配置
                    {label:'姓名', code: 'userName'},
                    {label:'地址', code: 'address'},
                    {label:'类型', type:'select', code: 'moutype'},
                    {label:'类型', type:'select', code: 'moutype1'}
                ]
            }
        },
        created() {
            const columns=[
                {
                        title: '序号',
                        dataIndex: 'index',
                        width:'100px',
                        customRender:(text, record, index)=>{
                         return <span>{index+1}</span>
                        }
                    },
                {
                    title: '日期',
                    dataIndex: 'date',
                    width:'200px',
                },
                {
                    title: '姓名',
                    dataIndex: 'name',
                    width:'200px'
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                },
                {
                        title: '操作',
                        key: 'index',
                        fixed: 'right',
                        width:'200px',
                        customRender:(text, record, index)=>{
                            return <a-button type="link" block onClick={()=>{this.goDetailPage(record) }}>查看</a-button>
                        }
                    }
            ],
                dataSource= [
                    {
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1516 弄'
                }];
            this.tableProps = {columns,dataSource}
        },
        methods: {
            search(value){
                console.log(`请求数据`,value)
                this.$message.success({
                    content: `请求数据` + value
                })
            },
            goDetailPage(record){ //页面跳转详情页
                this.$store.dispatch('tagViews/addCacheView','ruleList') // 开启页面缓存
                this.$router.push({ path:encodeURI(`/ruleManageList/detail?title=${record.address}`)})
            }
        }
    }
</script>