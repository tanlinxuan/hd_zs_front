<script type="text/jsx">
    import {mapState} from 'vuex'

    export default {
        name: 'tagView',
        computed: {
            ...mapState({
                visitedViews: state => state.visitedViews,
                activeView: state => state.activeView,
            })
        },
        watch: {  //hotkeyList渲染完后，获取高度
            hotkeyList: function () {
                this.$nextTick(function () {

                });
            }
        },
        methods: {
            removeTag(vm) {  //关闭页面
                this.$store.dispatch('tagViews/removeViewList', vm).then(() => {
                    const {activeView} = this.$store.getters
                    this.$router.push({path: activeView.path})
                })
            },
            changeTag(vm){
                this.$store.dispatch('tagViews/changeViewList', vm).then(() => {
                    this.$router.push({path: vm.path})
                })
            },
            renderTagList() {
                const {visitedViews, activeView} = this.$store.getters
                return visitedViews.map(item => {
                    let showClose = item.name !== 'home' ? true : false;
                    let _html =  <li class={`${item.path === activeView.path ? 'active' : ''}`} key={item.path} closable>
                                <span onClick={()=>{this.changeTag(item)}}>{item.title}</span>
                                {
                                    showClose &&
                                    <i class={`el-icon-close`} onClick={() => {this.removeTag(item)}}>
                                    </i>
                                }
                            </li>
                    return _html;
                })
            }
        },
        render() {
            return (
                <div class="app-tags-view">
                    <span class="prev-view"></span>
                    <div class="views-box">
                        <ul>
                            {
                                this.renderTagList()
                            }
                        </ul>
                    </div>
                    <span class="next-view"></span>
                </div>
            )
        }
    }
</script>