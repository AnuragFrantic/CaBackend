const express = require('express');
const { PostRegister, getallRegister, putRegister, deleteRegister, getbyUser } = require('../Auth/RegisterController');
const { LoginController, getProfile, verifyToken } = require('../Auth/LoginController');
const upload = require('../middleware/multerconfig');


const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require('../controller/Bannercontroller');

const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controller/ContactController');
const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../controller/Service');
const { createServiceDetail, getAllServiceDetails, getServiceDetailById, updateServiceDetail, deleteServiceDetail, getServiceDetailsByService, getServiceDetailByUrl } = require('../controller/ServiceDetail');
const { createRegulatory, getAllRegulatory, getRegulatoryById, updateRegulatory, deleteRegulatory } = require('../controller/Regulatory');
const { createRegulatoryDetail, getAllRegulatoryDetails, getRegulatoryDetailById, updateRegulatoryDetail, deleteRegulatoryDetail, getRegDetailByService, getRegDetialByUrl } = require('../controller/RegulatoryDetail');
const { createWeServe, getAllWeServe, getWeServeById, updateWeServe, deleteWeServe } = require('../controller/WeServe');
const { createWeDo, getAllWeDo, getWeDoById, updateWeDo, deleteWeDoPermanent } = require('../controller/WeDoController');
const { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controller/Testimonial');
const { createOrUpdatePolicy, getAllPolicies, getPolicyByUrl, softDeletePolicy, permanentDeletePolicy } = require('../controller/PolicyController');
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getBlogByurl } = require('../controller/Blogs');
const { createAbout, getAllAboutUs, updateAbout, deleteAbout } = require('../controller/AboutusController');


const router = express.Router();


router.post('/register', PostRegister);

// Get all registered users (Admin access)
router.get('/users', verifyToken, getallRegister);

// Update User Information (Admin access)
router.put('/users', verifyToken, putRegister);

// Delete User (Admin access)
router.delete('/users', verifyToken, deleteRegister);

// Get User by Type
router.get('/users/type', getbyUser);

// User Login
router.post('/login', LoginController);

// Get User Profile
router.get('/profile', verifyToken, getProfile);







//banner


router.post('/banners', upload.single('image'), createBanner);
router.get('/banners', getAllBanners);
router.get('/banners/:id', getBannerById);
router.put('/banners/:id', upload.single('image'), updateBanner);
router.delete('/banners/:id', deleteBanner);



// service


router.post('/service', upload.single('image'), createService);
router.get('/service', getAllServices);
router.get('/service/:id', getServiceById);
router.put('/update_service/:id', upload.single('image'), updateService);
router.delete('/delete_service/:id', deleteService);


// servicedetail 


router.post("/service_detail", upload.single("image"), createServiceDetail);
router.get("/service_detail", getAllServiceDetails);
router.get("/service_detail/:id", getServiceDetailById);
router.get("/service_detail_url/:url", getServiceDetailByUrl);

router.put("/update_detail/:id", upload.single("image"), updateServiceDetail);
router.delete("/delete_detail/:id", deleteServiceDetail);
router.get('/service-details/by-service/:serviceId', getServiceDetailsByService);


// regulatory

router.post("/regulatory", upload.single("image"), createRegulatory);
router.get("/regulatory", getAllRegulatory);
router.get("/regulatory/:id", getRegulatoryById);
router.put("/update_regulatory/:id", upload.single("image"), updateRegulatory);
router.delete("/delete_regulatory/:id", deleteRegulatory);


// regulatorydetail 

router.post("/reg_detail", upload.single("image"), createRegulatoryDetail);
router.get("/reg_detail", getAllRegulatoryDetails);
router.get("/reg_detail/:id", getRegulatoryDetailById);
router.put("/reg_detail/:id", upload.single("image"), updateRegulatoryDetail);
router.delete("/reg_detail/:id", deleteRegulatoryDetail);
router.get('/reg-detail/by-service/:reg_id', getRegDetailByService);
router.get("/regulatory_detail_url/:url", getRegDetialByUrl);





//contact


router.post('/contact', upload.single('image'), createContact);
router.get('/contact', getAllContacts);
router.get('/contact/:id', getContactById);
router.put('/contact/:id', upload.single('image'), updateContact);
router.delete('/contact/:id', deleteContact)



// weserve


router.post("/weserve", upload.single("image"), createWeServe);
router.get("/weserve", getAllWeServe);
router.get("/weserve/:id", getWeServeById);
router.put("/update_weserve/:id", upload.single("image"), updateWeServe);

router.delete("/delete_weserve/:id", deleteWeServe);


// wedo
router.post("/wedo", upload.single("image"), createWeDo);
router.get("/wedo", getAllWeDo);
router.get("/wedo/:id", getWeDoById);
router.put("/update_wedo/:id", upload.single("image"), updateWeDo);
router.delete("/delete_wedo/:id", deleteWeDoPermanent); // Permanent delete


// testimonial 


router.post("/testimonial", upload.single("image"), createTestimonial);
router.get("/testimonial", getAllTestimonials);
router.get("/testimonial/:id", getTestimonialById);
router.put("/update_testimonial/:id", upload.single("image"), updateTestimonial);
router.delete("/delete_testimonial/:id", deleteTestimonial);


// policy 


router.post("/policy", upload.single("image"), createOrUpdatePolicy);
router.get("/policy", getAllPolicies);
router.get("/policy/:url", getPolicyByUrl);
router.delete("/delete_policy/:id", permanentDeletePolicy);


// blogs

router.post("/blogs", upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.get("/blogs_by_url/:url", getBlogByurl);
router.put("/blogs/:id", upload.single("image"), updateBlog);
router.delete("/blogs/:id", deleteBlog);


// about us


router.post("/about", upload.single("image"), createAbout);
router.get("/about", getAllAboutUs);
router.put("/about/:id", upload.single("image"), updateAbout);
router.delete("/about/:id", deleteAbout);





module.exports = router;