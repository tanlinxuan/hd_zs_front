<template>
    <div class="app-main">
        <TagView/>
        <transition name="fade-transform" mode="out-in">
            <router-view/>
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
    }
</script>