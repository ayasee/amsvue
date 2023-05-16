<template>
  <div>
    <el-container>
      <el-header class="homeHeader homeFont">
        <el-button
          @click="backhome"
          style="color: rgb(255, 255, 255)"
          type="text"
          size="small"
          class="homeFont"
          >首页</el-button
        >
        <div style="display: flex">
          <div>
            欢迎您，<span>{{ user.name }}</span>
          </div>
          <el-button
            style="color: rgb(255, 255, 255); margin-left: 10px"
            @click="logout"
            type="text"
            size="small"
            >退出</el-button
          >
        </div>
      </el-header>

      <el-container class="homeContainer">
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            router
            unique-opened
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="/userinfo">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <div v-if="this.$router.currentRoute.path === '/home'">首页</div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    logout() {
      this.getRequest("/logout");
      this.$store.commit("INIT_CURRUSER", null);
      this.$router.replace("/");
    },
    backhome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.homeRouterView {
  margin-top: 10px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  color: #409eff;
  padding-top: 50px;
}

.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
  box-sizing: border-box;
  line-height: 30px;
}

.main {
  position: relative;
  background: #f5f5de;
  padding: 10px;
}

.homeContainer {
  position: relative;
  background: #fefaf1;
}

.homeFont {
  font-weight: 700;
  font-size: 22px;
  color: rgb(255, 255, 255);
}
</style>
