const router = require("express").Router();
const auth = require("../middleware/auth");
const gPostCtrl = require("../controllers/gPostCtrl");

router.route("/g_posts")
  .post(auth, gPostCtrl.createPost)
  .get(auth, gPostCtrl.getgPosts);

  router.route("/g_post/:id")
  .patch(auth, gPostCtrl.updatePost)
  .get(auth, gPostCtrl.getgPost)
  .delete(auth, gPostCtrl.deletePost);

  router.get("/group_posts/:id", auth, gPostCtrl.getGroupPosts);





module.exports = router;
