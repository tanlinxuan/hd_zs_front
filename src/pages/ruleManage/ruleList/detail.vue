<template>
    <div class="page page-ruleDetail">
        <div>详情 {{title}}</div>
    </div>
</template>
<script>
    import { getUrlKey} from '@utils/utils'
    export default {
        name: "ruleDetail",
        data() {
            return {
                title:'',
            }
        },
        created() {
            let urlParams = getUrlKey()
            if(urlParams.title){
                this.title = urlParams.title
            }
        }
    }
</script>