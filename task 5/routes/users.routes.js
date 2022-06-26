const router = require('express').Router()
const userController = require('../controller/users.contoller')

router.get('/', userController.home)

router.get('/add', userController.add)
router.post('/add', userController.addPost)

router.get('/edit/:id', userController.edit)
router.post('/edit/:id', userController.editPost)

router.get('/show/:id', userController.show)

router.get('/delete/:id', userController.delete)

router.get('/change-status/:id', userController.changeStatus)

module.exports = router