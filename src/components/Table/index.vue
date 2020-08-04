<script type="text/jsx">
    export default {
        name: 'CqTable',
        props:{
            tableProps:Object
        },
        render() {
            let tableConfig= {
                props:{
                    bordered:true ,
                    ...this.tableProps
                }
            }
            return (
                <a-table {...tableConfig}></a-table>
            )
        }
    }
</script>