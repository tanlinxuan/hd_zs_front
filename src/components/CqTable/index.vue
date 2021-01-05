<script type="text/jsx">
    /**
     * 表格模块封装
     * @author 谭邻宣
     * @date 2020/7/13 10:51
     **/
    import './index.less'
    export default {
        name: 'CqTable',
        data(){
            return {
                pagination: {
                    total: 0, //总条数
                    current:1, //当前页码
                    pageSize: 10, // 默认每页显示数量
                    showSizeChanger: true, // 显示可改变每页数量
                    pageSizeOptions: ["10", "20", "50"], // 每页数量选项
                    showTotal: total => <span style={{marginRight:'10px'}}>共 {total} 条</span>, // 显示总数
                    onShowSizeChange: this.onShowSizeChange, // 改变每页数量时更新显示
                    onChange:this.onPageChange, //点击页码事件
                    buildOptionText:pageSizeOptions => `${pageSizeOptions.value}条/页`,
                },
            }
        },
        props:{
            tableProps:{
                type:Object,
                default(){
                    return {
                        columns:[],
                        dataSource:[]
                    }
                }
            },
            total: Number
        },
        methods:{
            onPageChange(page){ //切换页码
                this.pagination.current=page;
                this.paginationChange()
            },
            onShowSizeChange(oldSize,newSize){ // 切换每页加载条数
                this.pagination.pageSize =newSize
                this.pagination.current =1
                this.paginationChange()
            },
            //页码切换回调
            paginationChange(){
                let {current , pageSize }  =  this.pagination
                this.$emit('pageChange',{pageNum:current , pageSize })
            }
        },
        render() {
            this.pagination.total = this.total;
            let tableProps = {...this.tableProps};
            if(!tableProps.dataSource.length){
                tableProps.scroll = void 0
            }
            let tableConfig= {
                props:{
                    bordered:true,
                    locale:{
                        emptyText: '暂无数据'
                    },
                    pagination:this.pagination,
                    ...tableProps
                }
            };
            return (
                <div class="cq_table">
                    <a-table {...tableConfig}></a-table>
                </div>
            )
        }
    }
</script>