import { Router } from "express";
import { authorize, ensureFirstLoginCompleted, protect } from "../../../common/middlewares/auth.js";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { ROLES } from "../../../common/constants/roles.js";
import { createAdmin, disableAdmin, getAnalytics, listAdmins } from "../controller/admin.controller.js";
import { adminIdParamSchema, createAdminSchema, emptyAdminQuerySchema } from "../validation/admin.validation.js";

const adminRouter = Router();

adminRouter.use(protect, ensureFirstLoginCompleted);

adminRouter.post("/users/admins", authorize(ROLES.SUPER_ADMIN), validateRequest(createAdminSchema), createAdmin);
adminRouter.patch("/users/admins/:adminId/disable", authorize(ROLES.SUPER_ADMIN), validateRequest(adminIdParamSchema), disableAdmin);
adminRouter.get("/users/admins", authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN), validateRequest(emptyAdminQuerySchema), listAdmins);
adminRouter.get("/analytics", authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN), validateRequest(emptyAdminQuerySchema), getAnalytics);

export default adminRouter;

