import express from 'express';
import { AppController, UserController, RoleController, DepartmentController } from '../controllers/defaultController.js';

const router = express.Router();

router.get('/', AppController.Index);
router.get('/users', UserController.Index);
router.get('/roles', RoleController.Index);
router.get('/dept', DepartmentController.Index);

router.post('/users', UserController.AddUser);
router.post('/roles', RoleController.AddRole);
router.post('/dept', DepartmentController.AddDept);


router.patch('/users/:IdPerson', UserController.PatchUser);
router.patch('/roles/:IdRoleOn', RoleController.PatchRole);
router.patch('/dept/:IdDept', DepartmentController.PatchDept);

export default router;