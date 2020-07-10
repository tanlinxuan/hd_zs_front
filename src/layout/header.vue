<script type="text/jsx">
    export default {
        name: 'Header',
        data() {
            return {
                popoverShow: false
            };
        },
        methods: {
            setPopoverShow(type) {
                this.popoverShow = type
            },
            exit(){
                let that = this;
                that.$store.dispatch('user/userExit',{}).then(()=>{
                    that.$router.push({ path:'/login'})
                })
            }
        },
        render() {
            const {userInfo} = this.$store.getters
            return (
                <div class="app-header">
                    <div class="logo"></div>
                    <div class="user-info">
                        <ul>
                            <li class="user">
                                <el-popover placement="bottom" width="120" trigger="hover" visible-arrow={false}
                                            on-show={() => {
                                                this.setPopoverShow(true)
                                            }}
                                            on-hide={() => {
                                                this.setPopoverShow(false)
                                            }}
                                >
                                    <p>修改密码</p>
                                    <p onClick={()=>{this.exit()}}>退出登录</p>
                                    <span slot="reference">
                                        <span>{userInfo.userName}</span>
                                        <i class={this.popoverShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}></i>
                                    </span>
                                </el-popover>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
</script>