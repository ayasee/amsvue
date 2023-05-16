<template>
  <div class="container">
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      class="loginContainer"
    >
      <el-form-item label="名字" prop="username">
        <el-input
          style="width: 200px"
          type="text"
          auto-complete="off"
          aria-placeholder="输入用户名"
          v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          style="width: 200px"
          type="password"
          auto-complete="off"
          aria-placeholder="输入密码"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>

      <div style="text-align: center">
        <el-button size="normal" type="primary" plain @click="submitLogin"
          >登录</el-button
        >
        <el-button size="normal">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123",
      },
      rules: {
        username: [{ required: true, message: "输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postRequest("/doLogin", this.loginForm).then((resp) => {
            console.log(resp);
            if (resp) {
              this.$store.commit("INIT_CURRUSER", resp.data.data);
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/home" : path
              );
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.loginContainer {
  margin: auto;
  transform: translateY(50%);
  margin-top: 128px;
  width: 270px;
  padding: 15px 35px 15px 35px;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #598458;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

.container {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #6d9c9f;
}
* {
  margin: 0;
  padding: 0;
}
</style>
