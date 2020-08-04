<script type="text/jsx">
    export default {
        name: 'tagView',
        data(){
            return {
                viewMarginLeft:0, //容器 left
            }
        },
        computed: {
            activeView(){
                return this.$store.getters.activeView
            }
        },
        watch: {
            activeView(){
                this.$nextTick(()=>{
                    let baseWidth=document.getElementById('appTagsView').clientWidth-60, //最小宽度
                        ul = document.getElementById('viewsBox'), // tags 容器
                        childrenWidth=0, // 所有tags 宽度和
                        activeTag=null; //当前选中的标签
                    for(let i =0 ;i<ul.children.length ; i++){
                        childrenWidth+=ul.children[i].clientWidth;
                        if(ul.children[i].className === "active"){
                            activeTag=ul.children[i];
                        }
                    }
                    if(childrenWidth > baseWidth){ //子元素width之和 大于 最小width
                        ul.style.width=childrenWidth+'px';
                        let offsetActive = activeTag.offsetLeft+activeTag.clientWidth,
                            offsetUl = baseWidth+ul.offsetLeft;
                        if( offsetActive> offsetUl){
                            this.viewMarginLeft = -(offsetActive-offsetUl)
                        }else{
                            this.viewMarginLeft = 0
                        }
                    }else{
                        ul.style.width=baseWidth+'px';
                    }
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
            prevView(type){  //tag 过多 ，左右切换
                let baseWidth=document.getElementById('appTagsView').clientWidth-60, //最小宽度
                    ul = document.getElementById('viewsBox'), // tags 容器
                    childrenWidth=0; // 子元素宽度集合
                for(let i =0 ;i<ul.children.length ; i++){
                    childrenWidth+=ul.children[i].clientWidth;
                }
                if(childrenWidth < baseWidth){ return false}  // 子元素未超出 ，return false
                let max=0, //最大margin left
                    min = baseWidth- childrenWidth - ul.children.length +1 ; // 最小margin left
                let ulMarginLeft = parseInt(ul.style.marginLeft); //ul 当前 margin left 值
                let marginLeft = 0 ;
                let prevWidth = childrenWidth / ul.children.length ; // 每次切换多少PX
                if(type === 'prev'){
                    marginLeft = (ulMarginLeft + prevWidth)> max ? max : ulMarginLeft + prevWidth
                }else{
                    marginLeft = (ulMarginLeft - prevWidth)< min ? min : ulMarginLeft - prevWidth
                }
                this.viewMarginLeft = marginLeft
            },
            renderTagList() {
                const {visitedViews, activeView} = this.$store.getters
                return visitedViews.map(item => {
                    let showClose = item.name !== 'home' ? true : false;
                    let _html =  <li class={`${item.path === activeView.path ? 'active' : ''}`} key={item.path} closable>
                                <span onClick={()=>{this.changeTag(item)}}>{item.title}</span>
                                {
                                    showClose &&
                                    <a-icon type="close" onClick={() => {this.removeTag(item)}} />
                                }
                            </li>
                    return _html;
                })
            }
        },
        render() {
            return (
                <div id="appTagsView" class="app-tags-view">
                    <span class="prev-view" onClick={()=>{this.prevView('prev') }}></span>
                    <div class="views-box">
                        <ul id="viewsBox" style={{marginLeft:this.viewMarginLeft+'px'}}>
                            {
                                this.renderTagList()
                            }
                        </ul>
                    </div>
                    <span class="next-view" onClick={()=>{this.prevView('next') }}></span>
                </div>
            )
        }
    }
</script>