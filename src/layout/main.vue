<script type="text/jsx">
    export default {
        name:'Main',
        render(){
            let {path} = this.$route;
            return(
                <div class="app-main">
                    <router-view key={path} />
                </div>
            )
        }
    }
</script>