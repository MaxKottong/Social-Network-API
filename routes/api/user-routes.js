const userController = require('../../controllers/user-controller');
const router = require('express').Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:userId/friends/:friendId')
    .post(userController.addFriend)
    .delete(userController.deleteFriend);

module.exports = router;