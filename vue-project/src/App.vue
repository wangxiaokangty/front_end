<template>
  <!-- 主容器 -->
  <div>

<!--     <nav>
      <router-link to="/BlogLogin">BlogLogin</router-link> |
      <router-link to="/Blogs">Blogs</router-link> |
      <router-link to="/blog/add">BlogEdit</router-link> |
      <router-link to="/BlogDetail">BlogDetail</router-link>
    </nav> -->
    <router-view />

  </div>
</template>

<style>
/* 应用基本样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}


/* 导航栏样式 */
nav {
  padding: 30px;
}

/* 导航链接样式 */
nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* 激活状态的导航链接样式 */
nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script setup>

</script>
