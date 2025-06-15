import { AppModel } from "../models/defaultModel.js";

export class AppController {
    static Index(req, res) {
        try {
            res.send("welcome to express API");
            res.status(200);
        } catch (error) {
            console.error('Error rendering index:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export class UserController {
    static async Index(req, res) {
        try {
            const { IdPerson, IdRoleOn, DepartmentCode } = req.query;
            const user = await AppModel.findUser({ IdPerson, IdRoleOn, DepartmentCode });
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Error fetching users"
            });
        }
    }

    static async AddUser(req, res) {
        try {
            const newUser = await AppModel.insertUser(req.body);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async PatchUser(req, res) {
        try {
            const IdPerson = req.params.IdPerson;
            const userData = req.body;
            if (!IdPerson) {
                return res.status(400).json({
                    success: false,
                    message: "User ID is required in URL params",
                });
            }
            const updateUser = await AppModel.updateUser(IdPerson, userData);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updateUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Failed to update user",
            });
        }
    }
}

export class RoleController {
    static async Index(req, res) {
        try {
            const { IdRoleOn, RoleName } = req.query;
            const role = await AppModel.findRole({ IdRoleOn, RoleName });
            res.status(200).json({
                success: true,
                data: role
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Error fetching roles"
            });
        }
    }

    static async AddRole(req, res) {
        try {
            const newRole = await AppModel.insertRole(req.body);
            res.status(201).json({
                success: true,
                message: "Role created successfully",
                data: newRole
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async PatchRole(req, res) {
        try {
            const IdRoleOn = req.params.IdRoleOn;
            const userData = req.body;
            if (!IdRoleOn) {
                return res.status(400).json({
                    success: false,
                    message: "Role ID is required in URL params",
                });
            }
            const updateRole = await AppModel.updateRole(IdRoleOn, userData);
            res.status(200).json({
                success: true,
                message: "Role updated successfully",
                data: updateRole
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Failed to update role",
            });
        }
    }
}

export class DepartmentController {
    static async Index(req, res) {
        try {
            const { IdDept, DeptName, DeptCode } = req.query;
            const dept = await AppModel.findDept({ IdDept, DeptName, DeptCode });
            res.status(200).json({
                success: true,
                data: dept
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Error fetching roles"
            });
        }
    }

    static async AddDept(req, res) {
        try {
            const newDept = await AppModel.inserDept(req.body);
            res.status(201).json({
                success: true,
                message: "Department created successfully",
                data: newDept
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async PatchDept(req, res) {
        try {
            const IdDept = req.params.IdDept;
            const userData = req.body;
            if (!IdDept) {
                return res.status(400).json({
                    success: false,
                    message: "Department ID is required in URL params",
                });
            }
            const updateDept = await AppModel.updateDept(IdDept, userData);
            res.status(200).json({
                success: true,
                message: "Department updated successfully",
                data: updateDept
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Failed to update department",
            });
        }
    }
}