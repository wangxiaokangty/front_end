<template>
  <vue-particles
      color="#70E9C2"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="polygon"
      :particleSize="10"
      linesColor="#70E9C2"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.9"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      style="height: 1100px"
  >
  </vue-particles>
  <div class="xiaochou2">

    <Header/>

    <div class="mblog">

      <h2>{{ blog.title }}</h2>
      <!-- 编辑链接，仅当ownBlog为true时显示 -->
      <el-link icon="el-icon-edit" v-if="ownBlog && blog.id">
        <!-- 路由链接到博客编辑页面 -->
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          这是您的 blog,可以重新编辑
        </router-link>
      </el-link>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 博客内容，使用v-html渲染Markdown转换后的HTML -->
      <div class="markdown-body" v-html="blog.content"></div>
    </div>

  </div>
</template>

<script>
import 'github-markdown-css' // 导入Markdown样式
import Header from "../components/Header";

export default {
  name: "BlogDetail",
  components: {Header},
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: ""
      },
      ownBlog: false // 是否为自己的博客
    }
  },
  created() {
    // 获取路由参数中的blogId
    const blogId = this.$route.params.blogId;
    this.$axios.get(`/blog/${blogId}`).then(res => {
      const blog = res.data.data;
      this.blog = {...blog};

      // 使用markdown-it进行Markdown转换
      const MarkdownIt = require("markdown-it");
      const md = new MarkdownIt();
      this.blog.content = md.render(blog.content);

      // 从对象中获取id
      const userId = JSON.parse(sessionStorage.getItem("userInfo")).id;
      // 打印id或者根据需要进行其他操作


      //判断博客是否为当前用户所拥有
      this.ownBlog = (blog.user_Id === userId);
    });
  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}

.xiaochou2 {
  width: 70%;
  height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  max-width: 960px;
  margin-left: 200px;
}
</style>
