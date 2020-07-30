<template>
    <div class="page page-home">
        <div>{{count}}</div>
    </div>
</template>
<script>
    export default {
        name: "home",
        computed: {
            count () {
                return 'home'
            }
        }
    }
</script>