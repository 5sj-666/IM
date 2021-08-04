<template>
  <div class="about">
    <h1 @click="add()">This is an about page!! {{count}}</h1>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    const add = () => {
      count.value++;
    };
    return {
      count,
      add
    };
  }
};
</script>
<style scoped>
h1 {
  color: cyan;
}
</style>