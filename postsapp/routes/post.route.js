const router = require('express').Router()
const postController = require('../controller/post.controller')

router.get('/', postController.home)

router.get('/add', postController.add)

router.get('/addPost', postController.addPost)  // dah 3lshan ageeb el saf7a nafsha
router.post('/addPost', postController.addPostLogic)    // dah 3lshan a5od el content beta3t el saf7a

router.get('/edit', postController.edit)

router.get('/single/:id', postController.single)

router.get('/delete/:id', postController.delete)

router.get('/edit/:id', postController.edit)
router.post('/edit/:id', postController.editPostLogic)

module.exports = router