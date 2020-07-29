<template>
    <div class="app-main">
        <TagView/>
        <transition name="slide-fade">
            <keep-alive :include="keepAlive">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </div>
</template>
<script type="text/jsx">
    import TagView from  './tagView'
    export default {
        name: 'Main',
        components: {
            TagView
        },
        computed: {
            keepAlive() {
                return this.$store.getters.cachedViews
            },
            key() {
                return this.$route.fullPath
            }
        },
        created() {
            console.log(this.$route)
        }
    }
</script>