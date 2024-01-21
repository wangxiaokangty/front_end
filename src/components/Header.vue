<template>
  <div class="m-content">
    <h3>欢迎来到小丑博客</h3>
    <div class="block">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <div>{{ user.username }}</div>
    </div>

    <div class="maction">
      <el-divider direction="vertical"></el-divider>
      <!-- <router-link :to="{ name: 'BlogDetail', params: { blogId: blog.id } }">-->
<!--      <router-link :to="{ name: 'BlogAdd'}">小丑</router-link>-->
      <el-button type="primary" @click="click1">主页</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="success" @click="click2">发表博客</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="danger" @click="logout">退出登录</el-button>

      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>

    </div>

  </div>
</template>

<script>
import pic from "@/assets/123.jpg"

export default {
  name: "Header",
  data() {
    return {
      user: {
        username: '请先登录',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      hasLogin: false
    }
  },
  methods: {
    click1(){
      this.$router.push("/Blogs")
    },
    click2(){
      this.$router.push("/blog/add")
    },

    logout() {
      const _this = this
      _this.$axios.get("/logout", {
        headers: {
          "token": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/BlogLogin")

      })
    }
  },
  created() {
    console.log("测试")
    let useinfo = JSON.parse(sessionStorage.getItem("userInfo"))
    console.log(useinfo.username)
    if(useinfo) {
      this.user.username = useinfo.username

      this.hasLogin = true
    }

  }
}
</script>

<style scoped>

.m-content {
  max-width: 960px;
  margin-left: 77px;
  text-align: center;
}
.maction {
  margin: 10px 0;
}

</style>
