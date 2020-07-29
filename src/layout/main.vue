<template>
    <div class="app-main">
        <TagView/>
        <div class="component">
            <transition name="slide-fade" mode="out-in">
                <keep-alive :include="keepAlive">
                    <router-view :key="key"/>
                </keep-alive>
            </transition>
        </div>
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