<template>
  <!-- 主容器 -->
  <div class="mcontainer">
    <!-- 引入自定义的头部组件 -->
    <Header />

    <!-- 博客列表和分页器的容器 -->
    <div class="block">
      <!-- 时间线组件，用于展示博客条目 -->
      <el-timeline>
        <!-- 遍历blogs数组，为每个博客创建一个时间线条目 -->
        <!-- 注意：在Vue 3中，v-for和v-bind:key应该一起使用 -->
        <el-timeline-item v-for="blog in blogs" :key="blog.id" :timestamp="blog.created" placement="top">
          <!-- 卡片组件，显示博客的标题和描述 -->
          <el-card>
            <h4>
              <!-- 路由链接，点击后跳转到博客详情页 -->
              <!-- 注意：Vue 3中路由用法保持不变 -->
              <router-link :to="{ name: 'BlogDetail', params: { blogId: blog.id } }">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!-- 分页器组件 -->
      <!-- 注意：在Vue 3/Element Plus中，事件和属性可能有所不同 -->
      <el-pagination class="mpage" background layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize"
        :total="total" @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入自定义的头部组件
import Header from "../components/Header";

export default {
  name: "Blogs",
  components: { Header },
  data() {
    return {
      blogs: [],
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    handlePageChange(newPage) {
      // 使用axios获取数据
      this.$axios.get(`/blogs?currentPage=${newPage}`)
        .then(response => {
          const data = response.data.data;
          this.blogs = data.records;
          this.currentPage = data.current;
          this.total = data.total;
          this.pageSize = data.size;
        })
        .catch(error => {
          console.error('Error fetching blogs:', error);
        });
    }
  },
  created() {
    this.handlePageChange(this.currentPage);
  }
}
</script>

<style scoped>
/* 分页器样式 */
.mpage {
  margin: 0 auto;
  /* 自动外边距实现居中 */
  text-align: center;
  /* 文本居中 */
}
</style>
