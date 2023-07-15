const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    name: "HomeView",
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
