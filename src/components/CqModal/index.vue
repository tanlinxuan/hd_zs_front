<script type="text/jsx">
    /**
     * 内容弹框组件
     * @author 谭邻宣
     * @date 2020/9/7 16:21
     **/
    import './index.less'
    export default {
        name: "CqModal",
        data() {
            return {
                modalConfig: {  //预定义弹框配置
                    visible:false,
                    title:'',
                    //zIndex:1,
                    bodyStyle:{
                        minHeight:'100px'
                    },
                    getContainer:()=>document.getElementById('app'),
                    cancelText:'取消',
                    okText:'确认'
                }
            }
        },
        props:{
            modalProps:Object,  // 弹框配置
        },
        render() {
            let {props , on} = this.modalProps;
            const modalProps = {
                props:{
                    ...this.modalConfig,
                    ...props
                },
                on
            }
            return <a-modal {...modalProps}>{this.$slots.default}</a-modal>
        }
    }
</script>
