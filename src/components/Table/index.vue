<script type="text/jsx">
    export default {
        name: 'CqTable',
        data() {
            return {}
        },
        props:{
            tableProps:{
                type: Object,
                default:()=>{
                    return {
                        data:[], //data
                        column:[], //header 配置
                    }
                }
            }
        },
        methods: {},
        render() {
            return (
                <el-table v-bind="this.tableProps">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
            )
        }
    }
</script>