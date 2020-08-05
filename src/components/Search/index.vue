<script type="text/jsx">
    import './index.less'
    const formBaseHeight = 64;//常量:表单域基础高度 , 单行64px , 用于计算表单域 展开收起 height 值
    export default {
        name: "Search",
        data(){
            return {
                searchForm: this.$form.createForm(this, { name: 'searchForm' }), //包装form 表单域
               // formHeight:formBaseHeight, //当前表单域高度 , 默认 64
                formCol: 0 , // 表单域行数
                colItems:0, //单行显示个数
                isTrigger:false, //高度控制器
            }
        },
        props:{
            searchArray:Array
        },
       created() {
            let length =  this.searchArray.length, // 表单项长度
                windowWidth = document.documentElement.scrollWidth, // 屏幕分辨率
                colItems = windowWidth > 1366 ? 4 : 3;  //单行显示个数(标屏1920： 4  其他： 3)
            if(length){
                this.formCol =Math.ceil(length/colItems);
                this.colItems = colItems;
               // this.isTrigger = formCol > 1;
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
             * 格式化参数 ，去掉undefind
             * @param value
             * @returns {{}}
             */
            formatValues(value){
                let formatValue={};
                for (let key in value){
                    if (value[key]){
                        formatValue[key] = value[key]
                    }
                }
                return formatValue;
            },
            /**
             * 像父组件暴露查询事件
             * @param e
             */
            onSearch(e) {
                let that = this;
                e.preventDefault();
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        let params = that.formatValues(values)
                        that.$emit('search',params)
                    }
                });
            },
            /**
             * 重置表单域
             */
            onResetField(){
                this.searchForm.resetFields();
                this.$emit('search',{})
            },
            /***
             * 根据type ,生成表单项
             * @param item
             * @returns {*}
             */
            renderformItem(item){
                const {label , options , code , child ,type} = item;
                let _html = '' ;
                if (type) {
                    switch (type) {
                        case 'select':
                            _html = <a-select>
                                <a-select-option key="1">选项1</a-select-option>
                                <a-select-option key="2">选项2</a-select-option>
                            </a-select>
                            break;
                        default:
                            _html = <a-input type={type} placeholder={`请输入` + label}/>
                    }
                } else {
                    _html = <a-input type='text' placeholder={`请输入` + label}/>
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
                    const {label , options , code , child ,type} = item;
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
