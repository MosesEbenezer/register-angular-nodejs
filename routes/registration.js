const router = require('express').Router()

const { register, updateUser, deleteUser, findUser, getAllRegisteredUsers} = require('../collections/registration')

router.post('/register', register)
router.patch('/update_user/:id', updateUser)
router.delete('/delete_user/:id', deleteUser)
router.get('/find_user/:email', findUser)
router.get('/all_users', getAllRegisteredUsers)


module.exports = router