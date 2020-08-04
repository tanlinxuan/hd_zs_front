<script type="text/jsx">
    import './index.less'
    export default {
        name: "Search",
        data(){
            return {
                searchForm: this.$form.createForm(this, { name: 'searchForm' }),
            }
        },
        props:{
            searchArray:Object
        },
        methods: {
            formatValues(value){ //格式化参数 ，去掉undefind
                let formatValue={};
                for (let key in value){
                    if (value[key]){
                        formatValue[key] = value[key]
                    }
                }
                return formatValue;
            },
            onSearch(e) { // 查询接口
                let that = this;
                e.preventDefault();
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        let params = that.formatValues(values)
                        that.$emit('search',params)
                    }
                });
            },
            onResetField(){ //重置
                this.searchForm.resetFields();
                this.$emit('search',{})
            },
            renderformItem(item){ // 根据type ,生成表单项
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
            renderFormDom(fromArr){  // 通过配置文件 ，生成 表单项
                const {getFieldDecorator} = this.searchForm; //表单包装器
                let formLayout={
                    labelCol: { span: 6 },
                    wrapperCol: { span: 16 }
                }
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
                        <a-col span={6}>
                            <a-form-item {...formConfig}>
                                {
                                    getFieldDecorator(code,{...options})(formItem)
                                }
                            </a-form-item>
                        </a-col>
                    )
                })
            },
        },
        render() {
          let fromArr = this.searchArray || []
          return  <a-form id="searchForm" form={this.searchForm} onSubmit={e => this.onSearch(e)}>
              <a-row gutter={10}>
                  <a-col span={19}>
                      <a-row>{this.renderFormDom(fromArr)}</a-row>
                  </a-col>
                  <a-col span={1}>
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
