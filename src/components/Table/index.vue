<script type="text/jsx">
    export default {
        name: 'CqTable',
        props:{
            tableProps:{
                type:Object,
                default(){
                    return {
                        columns:[],
                        dataSource:[]
                    }
                }
            }
        },
        render() {
            let tableConfig= {
                props:{
                    bordered:true ,
                    ...this.tableProps
                }
            };
            return (
                <a-table {...tableConfig}></a-table>
            )
        }
    }
</script>