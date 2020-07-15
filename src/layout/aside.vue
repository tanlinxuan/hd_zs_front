<script type="text/jsx">
    import menu from '@router/mock'
    export default {
        name:'Aside',
        data() {
            return {
                isCollapse: false,
                menuData:menu||[],
                renderMenu:data=>{ //递归返回菜单列表
                    return data.map(item => {
                        let { children ,name ,title ,isMenu} = item;
                        if (children && children.length) {
                            return (<el-submenu index={name}>
                                <template slot="title">
                                    <span slot="title">{title}</span>
                                </template>
                                {
                                    this.renderMenu(children)
                                }
                            </el-submenu>)
                        } else {
                            return (isMenu && <el-menu-item onClick={()=>this.handSelect(item)} >
                                <span slot="title">{title}</span>
                            </el-menu-item>)
                        }
                    })
                },
            };
        },
        methods: {
            handSelect(item){
                this.$router.push({ path:item.path})
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        render(){
            return(
                <div class="app-aside">
                    <el-menu default-active="1-4-1"
                             router={true}
                             on-open={this.handleOpen}
                             on-close={this.handleClose}
                             collapse={this.isCollapse}>
                    {
                        this.renderMenu(this.menuData)
                    }
                   </el-menu>
                </div>
            )
        }
    }
</script>