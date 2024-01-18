<template>
  <div>

    <Header/>

    <div class="mblog">

      <h2>{{ blog.title }}</h2>
      <!-- 编辑链接，仅当ownBlog为true时显示 -->
      <el-link icon="el-icon-edit" v-if="ownBlog && blog.id">
        <!-- 路由链接到博客编辑页面 -->
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          编辑
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
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: ""
      },
      ownBlog: true
      // ownBlog: false // 是否为自己的博客
    }
  },
  created() {
    // 获取路由参数中的blogId
    const blogId = this.$route.params.blogId;
    this.$axios.get(`/blog/${blogId}`).then(res => {
      const blog = res.data.data;
      this.blog = { ...blog };

      // 使用markdown-it进行Markdown转换
      const MarkdownIt = require("markdown-it");
      const md = new MarkdownIt();
      this.blog.content = md.render(blog.content);

      // 判断博客是否为当前用户所拥有
      // this.ownBlog = (blog.userId === this.$store.getters.getUser.id);
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
</style>
