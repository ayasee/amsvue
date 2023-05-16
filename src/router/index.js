import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import UserAccount from "../views/user/UserAccount.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "/userinfo",
        name: "accounts",
        component: UserAccount,
      },
    ],
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
