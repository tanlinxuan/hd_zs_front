<script type="text/jsx">
    import './index.less'
    export default {
        data() {
            return {
                form: this.$form.createForm(this, { name: 'login' }),
            };
        },
        methods: {
            renderFormDom(fromArr){  // 通过配置文件 ，生成 表单项
                const {getFieldDecorator} = this.form;
                return fromArr.map(item=>{
                    let {label , options , code , child ,type} = item
                    return(
                        <a-form-item label={label}>
                            {
                                getFieldDecorator(code,{...options})(
                                    <a-input type={type} placeholder={`请输入`+label} >
                                        {child}
                                    </a-input>
                                )
                            }
                        </a-form-item>
                    )
                })
            },
            handleSubmit(e) { // 提交
                let that = this;
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.$store.dispatch('user/userLogin',values).then(()=>{
                            that.$router.push({ path:'/home' })
                        })
                    }
                });
            }
        },
        render() {
            const fromArr=[ //表单项配置
                {
                    label:'账户名称',
                    type:'text',
                    code: 'userName',
                    options:{
                        rules: [{ required: true, message: '请输入用户名' }]
                    },
                    child:[<a-icon slot="prefix" type="user"/>]
                },
                {
                    label:'密码',
                    type:'password',
                    code: 'password',
                    options:{
                        rules: [{ required: true, message: '请输入密码' }]
                    },
                    child:[<a-icon slot="prefix" type="lock"/>]
                }
            ] ;
            return(
                <div id="login_page">
                    <a-form id="loginFrom" form={this.from}  onSubmit={e=>this.handleSubmit(e)}  labelCol={{span: 6}}
                    wrapperCol={{span:14}}>
                        {
                            this.renderFormDom(fromArr)
                        }
                    <a-form-item>
                        <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
                    </a-form-item>
                </a-form>
        </div>)
        }
    }
</script>
