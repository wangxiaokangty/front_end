<template>
  <!-- 主容器 -->
  <div>
    <!-- 导航栏 -->
    <nav>
      <!-- 路由链接到不同的页面 -->
      <router-link to="/BlogLogin">BlogLogin</router-link> |
      <router-link to="/Blogs">Blogs</router-link> |
      <router-link to="/BlogEdit">BlogEdit</router-link> |
<!--       <router-link to="/BlogDetail">BlogDetail</router-link> -->
    </nav>
    <!-- 路由视图，用于展示当前路由对应的组件 -->
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
// 引入路由页面组件
import BlogLogin from "@/views/BlogLogin.vue";
import Blogs from "@/views/Blogs.vue";
import BlogDetail from "@/views/BlogDetail.vue";

// 请注意，您还需要引入BlogEdit组件
// import BlogEdit from "@/views/BlogEdit.vue";
</script>
