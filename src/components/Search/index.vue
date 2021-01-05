<script type="text/jsx">
    /**
     * 搜索功能模块
     * @author 谭邻宣
     * @date 2020/7/26 11:34
     **/
    import CqSearchSelect from '@components/CqSearchSelect'
    import moment from 'moment'
    import './index.less'
    const formBaseHeight = 64;//常量:表单域基础高度 , 单行64px , 用于计算表单域 展开收起 height 值
    export default {
        name: "Search",
        components: {
            CqSearchSelect
        },
        data(){
            return {
                searchForm: this.$form.createForm(this, { name: 'searchForm' }), //包装form 表单域
               // formHeight:formBaseHeight, //当前表单域高度 , 默认 64
                formCol: 0 , // 表单域行数
                colItems:0, //单行显示个数
                isTrigger:false, //高度控制器
                formData:{  //不受控组件值缓存

                },
                formatList:[]
            }
        },
        props:{
            searchArray:Array
        },
        watch:{
            searchArray(newV , oldV){
                let formatDict=['rangePicker'];
                this.formatList=[];
                this.formatList = newV.map(item=>{  //预设日期格式队列 ，返回值时format
                    if(formatDict.indexOf(item.type)>-1){
                       return item.code
                    }
                })
            }
        },
       created() {
            let length =  this.searchArray.length, // 表单项长度
                windowWidth = document.documentElement.scrollWidth, // 屏幕分辨率
                colItems = windowWidth > 1366 ? 4 : 3;  //单行显示个数(标屏1920： 4  其他： 3)
            if(length){
                this.formCol =Math.ceil(length/colItems);
                this.colItems = colItems;
            }
       },
        computed:{
            formHeight(){
                let isTrigger = this.isTrigger;
                return  isTrigger? formBaseHeight*this.formCol : formBaseHeight
            }
        },
        methods: {
            /***
             * 格式化参数 ，undefined
             * @param value
             * @returns {{}}
             */
            formatValues(value){
                let formatValue={};
                for (let key in value){
                    if (value[key]){ //去掉 undefined
                        if(this.formatList.length && this.formatList.indexOf(key)>-1){  //判断是否为日期组件
                            if(Object.prototype.toString.call(value[key]) === '[object Array]'){ // 判断是否数组
                                formatValue[key] = value[key].map(item=>{
                                  return  moment(item).format('YYYY-MM-DD')
                                })
                            }else{
                                formatValue[key] = moment(value[key]).format('YYYY-MM-DD')
                            }
                        }else{
                            formatValue[key] = value[key]
                        }
                    }
                }
                return formatValue;
            },
            /**
             * 像父组件暴露查询事件
             * @param e
             */
            onSearch(e) {
                e.preventDefault();
                let params = this.searchForm.getFieldsValue();
                this.$emit('search',this.formatValues({...params,...this.formData}))
            },
            onChange(value){
                this.formData = { ...this.formData , ...value}
            },
            /**
             * 重置表单域
             */
            onResetField(){
                this.searchForm.resetFields();
                this.$emit('search',null)
            },
            //返回 select option
            renderSelectOption(data = []){
                return data.map(itm=>{
                    return <a-select-option key={itm.value} value={itm.value} >{itm.label}</a-select-option>
                })
            },


            /***
             * 根据type ,生成表单项
             * @param item
             * @returns {*}
             */
            renderformItem(item){
                const {label ,data, type ,itemProps } = item;
                let props = {  //预定义表单项配置
                    props:{
                        placeholder:`请输入` + label,
                        type:type?type:'text'
                    }
                }
                let _html = <a-input {...props}/>;
                if (type) {
                    switch (type) {
                        case 'select':   //静态data下拉,支持模糊筛选过滤
                            props = {
                                props:{
                                    placeholder:`请选择` + label,
                                    allowClear:true,
                                    ...itemProps
                                }
                            }
                            // 模糊匹配筛选过滤
                            if(itemProps?.showSearch){
                                props.props.filterOption=(target, config)=>{
                                    return (
                                        config.componentOptions.children[0].text.toLowerCase().indexOf(target.toLowerCase()) >= 0
                                    );
                                }
                            }
                            _html = <a-select {...props}>{this.renderSelectOption(data)}</a-select>
                            break;
                        case 'searchSelect':   //远程模糊筛选
                            _html = <cq-search-select searchProps={item} onChange={this.onChange}></cq-search-select>
                            break;
                        case 'rangePicker':
                            _html = <a-range-picker/>
                            break
                    }
                }
                return _html;
            },
            /***
             * 遍历表单项配置 ，生成表单结构
             * @param fromArr
             * @returns {*}
             */
            renderFormDom(fromArr){
                const {getFieldDecorator} = this.searchForm; //表单包装器
                let formLayout={
                    labelCol: { span: 6 },
                    wrapperCol: { span: 16 }
                }
                let colSpan= 24/this.colItems ; //根据每行显示个数 ，设置col span
                //遍历表单配置 ， 生成 formItem
                return fromArr.map(item=>{
                    const {label , options , code} = item;
                    let formConfig= {
                        props:{
                            label,
                            colon:false,
                            ...formLayout
                        }
                    }
                    let formItem=this.renderformItem(item);
                    return(
                        <a-col span={colSpan} key={code}>
                            <a-form-item {...formConfig}>
                                {
                                    getFieldDecorator(code,{...options})(formItem)
                                }
                            </a-form-item>
                        </a-col>
                    )
                })
            },
            /***
             * 根据表单项长度，返回 控制器
             * @param length
             */
            setTrigger(length){
                this.isTrigger = !this.isTrigger ;
            }
        },
        render() {
          let fromArr = this.searchArray || [];
          return  <a-form id="searchForm" form={this.searchForm} onSubmit={e => this.onSearch(e)}>
              <a-row>
                  <a-col span={18}>
                      <div style={{height:this.formHeight+'px' , overflow:'hidden'}}>
                          <a-row>
                                {
                                    fromArr.length && this.renderFormDom(fromArr)
                                }
                          </a-row>
                      </div>
                  </a-col>
                  <a-col span={2} style={{lineHeight:'40px'}}>
                      {
                          this.formCol > 1 &&  //超过一行 ，则加载控制按钮
                          <span class="sim-link search-trigger-btn" onClick={e=>this.setTrigger()}>
                              {
                                  this.isTrigger?<a-icon type="up" />:<a-icon type="down" />
                              }
                              {
                                  this.isTrigger?'收起':'展开'
                              }
                          </span>
                      }
                  </a-col>
                  <a-col span={4} class="search-btn-box">
                      <a-button onClick={e=>this.onResetField()}>重置</a-button>
                      <a-button type="primary" html-type="submit" class="search-button">搜索</a-button>
                  </a-col>
              </a-row>
            </a-form>
        }
    }
</script>
