import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "landing" },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/account",
    name: "User",
    meta: { layout: "user", auth: true },
    component: () => import("@/views/User/Profile.vue"),
  },
  {
    path: "/",
    name: "HistoryView",
    meta: { layout: "user", auth: true },
    component: () => import("@/views/User/HistoryView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    meta: { layout: "auth" },
    component: () => import("@/views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "auth" },
    component: () => import("@/views/Auth/Register.vue"),
  },
  {
    path: "/reset-password",
    name: "Reset",
    meta: { layout: "auth" },
    component: () => import("@/views/Auth/Reset.vue"),
  },
  {
    path: "/cabinet",
    name: "Main",
    meta: { layout: "cabinet", auth: true },
    component: () => import("@/views/Cabinet/Main.vue"),
  },
  {
    path: "/cabinet/work-list",
    name: "FormWorkList",
    props: true,
    meta: { layout: "cabinet", auth: true },
    component: () => import("@/views/Cabinet/FormWorkList.vue"),
  },
  {
    path: "/list/:id",
    name: "DetailList",
    props: true,
    meta: { layout: "cabinet" },
    component: () => import("@/views/Cabinet/ShowList.vue"),
  },
  {
    path: "/cabinet/:id",
    name: "PrivateDetailList",
    props: true,
    meta: { layout: "cabinet" },
    component: () => import("@/views/Cabinet/PrivateShowList.vue"),
  },
  {
    path: "/public",
    name: "PublicLibrary",
    meta: { layout: "cabinet" },
    component: () => import("@/views/Cabinet/PublicLibrary.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    props: true,
    meta: { layout: "cabinet", auth: true },
    component: () => import("@/views/Cabinet/Jobs.vue"),
  },
  {
    path: "/jobs/manage",
    name: "FormJobManage",
    props: true,
    meta: { layout: "cabinet", auth: true },
    component: () => import("@/views/Cabinet/FormJobManage.vue"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "cabinet", auth: true },
    component: () => import("@/views/Cabinet/History.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiredAuth = to.matched.some((record) => record.meta.auth);

  if (requiredAuth && !currentUser) {
    next({
      name: "Login",
      params: { errorStatus: "Before You should enter in system" },
    });
  } else {
    next();
  }
});

export default router;
