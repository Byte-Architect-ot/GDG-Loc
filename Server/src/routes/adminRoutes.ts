import express from "express"
import { adminSignup } from "../controllers/signupController.js";
import { adminLogin } from "../controllers/loginController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addYearGroup, deleteYearGroup, editYearGroup } from "../controllers/yearControllers.js";
import { addEvent, deleteEvent, editEvent } from "../controllers/eventControllers.js";
import { addMembers, deleteMember, editMember } from "../controllers/memberControllers.js";
import { imageUpload } from "../middlewares/multerMiddleware.js";
import { addOrEditThumbnail, deleteThumbnail } from "../controllers/thumbnailimageControllers.js";
import { addSubImages, deleteSubImage } from "../controllers/eventSubimageControllers.js";
import { deleteMemberImage, uploadMemberImage } from "../controllers/memberImages.js";
const adminRouter = express.Router();

adminRouter.post('/signup', adminSignup);
adminRouter.post('/login', adminLogin);


// year group routes
adminRouter.post('/addyear', authMiddleware, addYearGroup);
adminRouter.post('/edityear/:id', authMiddleware, editYearGroup);
adminRouter.post('/deleteyear/:id', authMiddleware, deleteYearGroup);


//event routes
adminRouter.post('/addevent', authMiddleware, addEvent);
adminRouter.post('/editevent/:id', authMiddleware, editEvent);
adminRouter.post('/deleteevent/:id', authMiddleware, deleteEvent);


// Events image routes
adminRouter.post('/:eventId/thumbnail', authMiddleware, imageUpload.single("thumbnail"), addOrEditThumbnail);
adminRouter.delete('/:eventId/thumbnail', authMiddleware, deleteThumbnail);
adminRouter.post('/:eventId/sub-images', authMiddleware,  imageUpload.array("images", 10), addSubImages);
adminRouter.delete('/:eventId/sub-images/:imageKey', authMiddleware, deleteSubImage);


// member routes
adminRouter.post('/addmembers', authMiddleware, addMembers);
adminRouter.post('/editmember/:id', authMiddleware, editMember);
adminRouter.post('/deletemember/:id', authMiddleware, deleteMember);


// member images routes
adminRouter.post('/member/:memberId/image',authMiddleware, imageUpload.single("image"),uploadMemberImage);
adminRouter.delete('/member/:memberId/image',authMiddleware, imageUpload.single("image"),deleteMemberImage);





export default adminRouter;
