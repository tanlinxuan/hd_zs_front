<script type="text/jsx">
    export default {
        name:'Main',
        render(){
            let {path} = this.$route;
            return(
                <div class="app-main">
                    <keep-alive>
                        <router-view key={path} />
                    </keep-alive>
                </div>
            )
        }
    }
</script>