<script type="text/jsx">
    export default {
        name: 'PageHeader',
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
                                <a-popover trigger="click">
                                    <template slot="content">
                                        <p>修改密码</p>
                                        <p onClick={()=>{this.exit()}}>退出登录</p>
                                    </template>
                                    <span>
                                       {userInfo.userName}
                                        <i className={this.popoverShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'}></i>
                                    </span>
                                </a-popover>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
</script>