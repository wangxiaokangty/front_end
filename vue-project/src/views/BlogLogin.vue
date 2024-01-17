<template>
  <div>

    <el-container>

      <el-header>
        <!-- Logo图片，注意这里的src应该使用 :src 来绑定动态路径 -->
        <img :src="require('@/assets/logo.png')" alt="">
      </el-header>

      <el-main>
        <!-- 表单包裹器 -->
        <div class="form-wrapper">
          <!-- 表单组件 -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

            <!-- 用户名表单项 -->
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <!-- 密码表单项 -->
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="Please input password" show-password></el-input>
            </el-form-item>

            <!-- 表单操作按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>
        </div>

      </el-main>

    </el-container>

  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      // 表单数据对象
      ruleForm: {
        username: 'markerhub',
        password: '111111'
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 提交表单方法
    submitForm(formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交表单
          this.$axios.post('/login', this.ruleForm).then(res => {
            const jwt = res.headers['authorization'];
            const userInfo = res.data.data;

            // 更新Vuex状态
            this.$store.commit("SET_TOKEN", jwt);
            this.$store.commit("SET_USERINFO", userInfo);

            // 导航到博客页面
            this.$router.push("/blogs");
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
  }
}
</script>

<style scoped>
.el-header {
  text-align: center;
  padding: 10px 0;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;

}

.form-wrapper {
  max-width: 500px;

  width: 100%;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px;
  background: #FFFFFF;
}

.demo-ruleForm {
  margin: 0 auto;
}
</style>

