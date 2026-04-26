import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { AdminDashboard, ViewData, adminSettings,} from '../controllers/admin.controller.js';
import {
   cmsHeader, cmsAbout,
   cmsServices, cmsProjects,
   cmsNewProject, cmsNewProjectEdit,
   cmsContact, cmsExperience,
   cmsNewExperience, cmsEditExperience, 
   cmsBlog, cmsNewBlog, cmsEditBlog,  
  } from '../controllers/admin.controller.js';
import {
   updateCmsHeader, postNewAboutContent,
   postNewServicesContent, cmsPostProjects,
   cmsBodyProject, cmsUpdateProject,
   cmsDeleteProject, cmsPostContact, 
   cmsPostExperience, cmsUpdateExperience, cmsDeleteExperience, cmsPostBlog, 
   cmsUpdateBlog, cmsDeleteBlog, logout
  } from '../controllers/post/backend/cms.controller.js';
  import { updateAdminSettings } from '../controllers/post/backend/settings.controller.js';


import { upload } from '../database/config/multer.js';
import multer from 'multer';


const router = express.Router();

router.get("/dashboard", isAuthenticated, AdminDashboard);

router.get("/settings", isAuthenticated, adminSettings)

router.get("/api/view-data", isAuthenticated, ViewData);

router.get("/cms/header", isAuthenticated, cmsHeader);

router.get("/cms/about", isAuthenticated, cmsAbout);

router.get("/cms/services", isAuthenticated, cmsServices);

router.get("/cms/project", isAuthenticated, cmsProjects);

router.get("/cms/new/project", isAuthenticated, cmsNewProject);

router.get("/cms/project/:id", isAuthenticated, cmsNewProjectEdit);

router.get("/cms/contact", isAuthenticated, cmsContact)

router.get("/cms/experience", isAuthenticated, cmsExperience);

router.get("/cms/new/experience", isAuthenticated, cmsNewExperience);

router.get("/cms/experience/:id", isAuthenticated, cmsEditExperience);

router.get("/cms/blog", isAuthenticated, cmsBlog);

router.get("/cms/new/blog", isAuthenticated, cmsNewBlog);

router.get("/cms/blog/:id", isAuthenticated, cmsEditBlog);



// Post routes
router.post("/cms/header", isAuthenticated, updateCmsHeader);

router.post("/settings", isAuthenticated, updateAdminSettings);

router.post("/cms/about", 
  isAuthenticated, 
  upload.single("imageUploadAbout"), 
  postNewAboutContent
);

  router.post("/cms/services", isAuthenticated, postNewServicesContent);

  router.post("/cms/project", isAuthenticated, cmsPostProjects);

  router.post("/cms/new/project", isAuthenticated, upload.single("projectImage"), cmsBodyProject);

  router.post("/cms/project/:id", isAuthenticated, upload.single("updateprojectImage"), cmsUpdateProject);

  router.post("/cms/project/delete/:id", isAuthenticated, cmsDeleteProject);

  router.post("/cms/contact", isAuthenticated, cmsPostContact)

  router.post("/cms/experience", isAuthenticated, cmsPostExperience);

  router.post("/cms/experience/:id", isAuthenticated, cmsUpdateExperience);

  router.post("/cms/experience/delete/:id", isAuthenticated, cmsDeleteExperience);

  router.post("/cms/blog", isAuthenticated, cmsPostBlog);

  router.post("/cms/new/blog", isAuthenticated, upload.single("blogImage"), cmsPostBlog);

  router.post("/cms/blog/:id", isAuthenticated, upload.single("updateBlogImage"), cmsUpdateBlog);

  router.post("/cms/blog/delete/:id", isAuthenticated, cmsDeleteBlog);

  router.post("/logout", isAuthenticated, logout);

  



export default router;