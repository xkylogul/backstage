<template>
  <div id="app" class="nprogress">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 html,body,#app{
  height:100%;
  margin:0;
  padding:0
}
.nprpgress{
    background: green !important;
}
</style>
