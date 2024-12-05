const express = require('express')
const FrontController = require('../controllers/FrontControllers')
const AdminController = require('../controllers/admin/AdminController')
const route = express.Router()
const checkAuth = require ('../middleware/auth')
const CourseController = require('../controllers/courseControllers')
const ContactContoller = require('../controllers/contactController')


// frontcontrollers Routing
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',checkAuth,FrontController.contact)
route.get('/profile',checkAuth,FrontController.profile)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)


//insert data
route.post('/insertstudent',FrontController.insertstudent)


//admin controllers
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)
route.get('/admin/studentDisplay',checkAuth,AdminController.studendtDisplay)


route.get('/admin/studentView/:id',checkAuth,AdminController.studentView)
route.get('/admin/studentDelete/:id',checkAuth,AdminController.studentDelete)
route.get('/admin/studentEdit/:id',checkAuth,AdminController.studentEdit)


route.post('/admin/studentUpdate/:id',checkAuth,AdminController.studentUpdate)
route.post('/admin/insertStudent',checkAuth,AdminController.studentInsert)
route.get('/admin/courseDisplay',checkAuth,AdminController.courseDisplay)
route.post('/update_status/:id',checkAuth,AdminController.update_status)

route.get('/admin/profile',checkAuth,AdminController.profile)
route.post('/admin/updateProfile',checkAuth,AdminController.updateProfile)
route.get('/admin/password',checkAuth,AdminController.password)
route.post('/admin/Password',checkAuth,AdminController.changePassword)






// verifylogin 
route.post('/verifyLogin',FrontController.verifyLogin)
route.get('/logout',FrontController.logout)

//course Controllers
 route.post('/course_insert',checkAuth, CourseController.courseinsert)
 route.get('/coursedisplay',checkAuth, CourseController.coursedisplay)
 route.get("/courseView/:id",checkAuth,CourseController.courseView)
route.get("/courseEdit/:id",checkAuth,CourseController.courseEdit)
route.post("/courseUpdate/:id",checkAuth,CourseController.courseUpdate)
route.get("/courseDelete/:id",checkAuth,CourseController.courseDelete)

  

// contactcontoller
route.post('/contact_insert',checkAuth,ContactContoller.contactinsert)
// route.get('/admin/contactdisplay',checkAuth,AdminController.contactdisplay)


 
  module.exports= route