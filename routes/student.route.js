const router = require('express').Router();
const { getAllStudent, addNewStudent, updateStudent, deleteStudent, getSingleStudent } = require('../controllers/student.controller');


//get all students
router.route('/').get(getAllStudent).post(addNewStudent);
router.route('/:id').put(updateStudent).delete(deleteStudent).get(getSingleStudent);

module.exports = router;