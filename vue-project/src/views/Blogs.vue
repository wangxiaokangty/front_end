<template>
  <!-- 主容器 -->
  <div class="mcontainer">

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


    <div class="welcome-page-center">
      <Header></Header>
      <!-- 时间线组件，用于展示博客条目 -->
      <el-timeline>
        <!-- 遍历blogs数组，为每个博客创建一个时间线条目 -->
        <el-timeline-item v-for="blog in blogs" :key="blog.id" :timestamp="blog.created" placement="top">
          <!-- 卡片组件，显示博客的标题和描述 -->
          <el-card>
            <h4>
              <!-- 路由链接，点击后跳转到博客详情页 -->
              <router-link :to="{ name: 'BlogDetail', params: { blogId: blog.id } }">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!-- 分页器组件 -->
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
          console.log("xiaochou")
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
  margin-left: auto;
  margin-right: auto;
  /* 自动外边距实现居中 */
}

.welcome-page-center {
  width: 70%;
  height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  max-width: 960px;
  margin-left: 200px;
}

</style>
