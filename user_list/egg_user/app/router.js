'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get("/user",controller.user.userlist)
  router.get("/detail",controller.user.getdetail);
  router.get("/delete",controller.user.getdel);
  router.post("/add",controller.user.addlist);
  router.get("/update",controller.user.right)
};
