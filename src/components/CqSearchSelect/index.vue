<script type="text/jsx">
    /**
     * 远程模糊查询下拉框
     * @author 谭邻宣
     * @date 2020/9/30 14:35
     **/
    import {debounce} from "@utils/utils";
    export default {
        name: "CqSearchSelect",
        data() {
            this.fetch = debounce(this.fetch, 800);  //节流控制阀
            return {
                selectData:[],  //数据容器
                isFetch:false,   // 判断是否发起请求
                loading:false   // 加载状态
            }
        },
        props:{
            searchProps:Object
        },
        methods:{
            //筛选
            async fetch(value){
                if(!value || value === ''){
                    this.isFetch = false;
                    return  this.isFetch
                }
                this.selectData = [];
                this.loading = true ;
                this.isFetch = true ;
                this.selectData = await this.searchProps.data(value)
                this.loading = false
            },
            // 焦点离开事件
            onblur(){
               // this.selectData = [] ; //清空上一次加载data
                this.isFetch = false;
            },
            onSelect(value){
                let {code} = this.searchProps;
                this.$emit('change',{[code]:value})
            },
            //返回 select option
            renderSelectOption(data = []){
                return data.map(itm=>{
                    return <a-select-option key={itm.value} value={itm.value} >{itm.label}</a-select-option>
                })
            },
            //无数据时 ，根据状态 返回下拉 dom
            notFoundContent() {
                let {label} = this.searchProps
                let text = this.isFetch ? `暂未查到相关信息` : `输入${label}，可模糊匹配`
                return this.loading ? <div class="no-found">加载中...</div> : <div class="no-found">{text}</div>
            }
        },
        render() {
           let {label ,itemProps} = this.searchProps
           let props = {
                props:{
                    placeholder:`请输入` + label,
                    allowClear:true,
                   // getPopupContainer: triggerNode => triggerNode.parentNode || document.body,
                    showSearch:true,   //开启模糊匹配
                    filterOption:false, //关闭静态筛选
                    notFoundContent:this.notFoundContent(),
                    ...itemProps  // 自定义属性覆盖
                },
                on:{
                    search:this.fetch , // 筛选事件
                    select:this.onSelect,  //选中值事件回调
                    blur:this.onblur
                }
            }
            return (
                <a-select {...props}>{this.renderSelectOption(this.selectData)}</a-select>
            )
        }
    }
</script>
<style scoped type="text/less">
    .no-found{
        height:40px;
        line-height:30px
    }
    .select-loading{
        text-align: center;
        margin-top: 20px;
    }
</style>
