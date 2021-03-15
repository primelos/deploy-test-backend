const db = require('../users/users-model')

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get("Origin")}`);
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  console.log('id-id', id);
  db.getById(id)
    .then((found) => {
      req.user = found;
      req.user.id = id
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: "not found" });
    });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  const check = req.body
  console.log('check', check);
  const { name } = req.body
  if(Object.keys(check).length === 0){
    res.status(400).json({ message: "missing user data" });
  }
  if(!name){
    res.status(400).json({ message: "missing required name" });
  }
  next()
}



function validatePost(req, res, next) {
  // DO YOUR MAGIC'
  const check = req.body
  const { text, user_id } = req.body
  if (Object.keys(check).length === 0 ){
    res.status(400).json({ message: "missing user data" });
  }
  if(!text || !user_id ){
    res.status(400).json({ message: "missing required name" });
  }
}

// do not forget to expose these functions to other modules
