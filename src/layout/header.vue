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
            }
        },
        render() {
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
                                            }}>
                                    <p>修改密码</p>
                                    <p>退出登录</p>
                                    <span slot="reference">
                name
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