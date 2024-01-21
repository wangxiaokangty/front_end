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
  <!-- 主容器 -->
  <div class="xiaochou1">
    <!-- 引入自定义的头部组件 -->
    <Header></Header>

    <!-- 内容部分 -->
    <div class="m-content">
      <!-- 表单组件 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 标题表单项 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <!-- 摘要表单项 -->
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <!-- 内容表单项，使用mavon-editor作为Markdown编辑器 -->
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>

        <!-- 表单操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>



<script>
import Header from "../components/Header";

export default {
  name: "BlogEdit",
  components: { Header },
  data() {
    return {
      // 表单数据
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 提交表单方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送POST请求提交表单数据
          this.$axios.post('/blog/edit', this.ruleForm).then(res => {
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push("/blogs");
              }
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    // 在组件创建时根据blogId加载博客数据
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$axios.get(`/blog/${blogId}`).then(res => {
        const blog = res.data.data;
        this.ruleForm = { ...blog };
      });
    }
  }
}
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.xiaochou1 {
  width: 70%;
  height: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  max-width: 960px;
  margin-left: 200px;
}

</style>
