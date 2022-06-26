const postController = require('../controller/post.controller')
const router = require('express').Router()

router.post('/insert',postController.insert)
router.get('/all',postController.showAll)
router.get('/single/:id',postController.showSingle)
router.delete('/delete/:id',postController.delete)
router.patch('/update/:id',postController.update)

module.exports = router
