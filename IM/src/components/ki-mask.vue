<template>
    <section class="ki-mask"></section>
    <!-- <section class="ki-mask"></section> -->
</template>
<script>
export default {
    name: "KiMask",
    setup() {}
}
</script>
<style scoped>
    .ki-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(33,33,33,.3);
        z-index: 11;
    }
</style>