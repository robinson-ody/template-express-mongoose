const controller = require('./user.controller');

module.exports = router => {
  router.post('/user', controller.register);
  router.post('/login', controller.login);
};
