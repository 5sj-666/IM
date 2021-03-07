<template>
    <article class="">

    </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<style scoped lang="styl">
    article {
        width: 100%;
        height: 100vh;
        background-color: cyan;
    }
</style>
