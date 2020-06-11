<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>-->
  <section id="micro-portal" class="micro-portal">
    <router-link v-show="$route.name" to="/react">login |</router-link>
    <router-link v-show="$route.name" to="/vue">vue</router-link>
    <!-- 微应用加载！ -->
    <router-view v-show="$route.name"></router-view>
    <section v-show="!$route.name" id="frame" class="frame"></section>
  </section>
</template>

<style lang="stylus">
html, body, .micro-portal, .frame, .frame > div {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
