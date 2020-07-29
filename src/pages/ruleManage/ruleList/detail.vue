<template>
    <div>详情 {{title}}</div>
</template>
<script>
    import { getUrlKey} from '@utils/utils'
    export default {
        name: "ruleDetail",
        data() {
            return {
                title: '',
            }
        },
        created() {
            let urlParams = getUrlKey()
            if(urlParams.title){
                this.title = urlParams.title
            }
        },
        methods: {
            search(){
                this.$router.push({ path:`/ruleManageList/detail?title=${this.input}`,})
            }
        }
    }
</script>