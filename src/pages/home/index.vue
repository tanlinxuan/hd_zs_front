<template>
    <div class="page page-home">
        <TreeChart/>
    </div>
</template>
<script>
    import TreeChart from  '@components/TreeChart'
    export default {
        name: "home",
        components: {
            TreeChart
        },
        computed: {
            count () {
                return 'home'
            }
        }
    }
</script>