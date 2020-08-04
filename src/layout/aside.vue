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
                        let { children ,name ,title ,isMenu,icon} = item;
                        if (children && children.length) {
                            return (
                                <a-sub-menu key={name}>
                                    <span slot="title">
                                        {
                                            icon && <a-icon type={icon}/>
                                        }
                                        <span>{title}</span>
                                    </span>
                                    {
                                        this.renderMenu(children)
                                    }
                                </a-sub-menu>
                            )
                        } else {
                            return (
                                isMenu &&
                                <a-menu-item key={name} onClick={()=>this.handSelect(item)} >
                                    {title}
                                </a-menu-item>)
                        }
                    })
                },
            };
        },
        methods: {
            handSelect(item){
                this.$router.push({ path:item.path})
            },
            onOpenChange(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        render(){
            return(
                <div class="app-aside">
                    <a-menu mode="inline"  onOpenChange={this.onOpenChange}>
                        {
                            this.renderMenu(this.menuData)
                        }
                    </a-menu>
                </div>
            )
        }
    }
</script>