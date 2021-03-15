const express = require("express");
const middleware = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Post = require("../posts/posts-model");
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving users." });
    });
});

router.get("/:id", middleware.validateUserId, (req, res) => {
  console.log("hit", req.user);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

router.post("/", middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body).then((user) => {
    res.status(201).json(user);
  });
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    // const { id } = req.params
    const { id, name } = req.user;
    Users.update(id, req.body).then((count) => {
      console.log(count, "count");
      if (count === 1) {
        Users.getById(id)
          .then((updatedUser) => {
            res.status(202).json(updatedUser);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving users." });
          });
      }
    });
  }
);

router.delete("/:id", middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  Users.remove(req.user.id).then((gone) => {
    console.log("gone", gone);
    res.status(204);
  });
});

router.get("/:id/posts", middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.user.id).then((post) => {
    console.log(post);
    res.status(201).json(post);
  });
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validateUser,
  (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Post.insert(req.body).then((post) => {
      console.log(post);
    });
  }
);

// do not forget to export the router

module.exports = router;
