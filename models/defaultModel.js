import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export class AppModel {
    static async findUser({ IdPerson, IdRoleOn, DepartmentCode }) {
        try {
            const whereClause = {};

            if (IdPerson) whereClause.IdPerson = Number(IdPerson);
            if (IdRoleOn) whereClause.IdRoleOn = Number(IdRoleOn);
            if (DepartmentCode) { whereClause.Department = { DepartmentCode: DepartmentCode } };

            const user = await prisma.systemPersonal.findMany({
                where: whereClause,
                select: {
                    IdPerson: true,
                    Username: true,
                    UserEmail: true,
                    Department: {
                        select: {
                            DepartmentName: true,
                            DepartmentCode: true
                        }
                    },
                    RoleOn: {
                        select: { RoleName: true }
                    }
                }
            });
            return user;
        } catch (error) {
            throw new Error("Failed to retrieve user");
        }
    }

    static async insertUser(userData) {
        try {
            const user = await prisma.systemPersonal.create({
                data: {
                    Username: userData.Username,
                    Password: userData.Password,
                    UserEmail: userData.UserEmail,
                    Status: userData.Status ?? 'A',
                    IdDepartment: userData.IdDepartment,
                }
            });
            return user;
        } catch (error) {
            console.error("❌ Error inserting user:", error);
            throw new Error("Failed to insert user");
        }
    }

    static async updateUser(userData) {
        try {
            const user = await prisma.systemPersonal.update({
                where: { IdPerson },
                data: userData
            });
            return user;
        } catch (error) {
            console.error("❌ Error updating user:", error);
            throw new Error("Failed to update user");
        }
    }

    static async findRole({ IdRoleOn, RoleName }) {
        try {
            const whereClause = {};

            if (IdRoleOn) whereClause.IdRoleOn = Number(IdRoleOn);
            if (RoleName) whereClause.RoleName = RoleName;

            const role = await prisma.roleOn.findMany({
                where: whereClause,
                select: {
                    IdRoleOn: true,
                    RoleName: true,
                }
            });
            return role;
        } catch (error) {
            throw new Error("Failed to retrieve role");
        }
    }

    static async insertRole(userData) {
        try {
            const role = await prisma.roleOn.create({
                data: {
                    RoleName: userData.RoleName,
                }
            });
            return role;
        } catch (error) {
            console.error("❌ Error inserting role:", error);
            throw new Error("Failed to insert role");
        }
    }

    static async updateRole(IdRoleOn, userData) {
        try {
            const role = await prisma.roleOn.update({
                where: { IdRoleOn: Number(IdRoleOn) },
                data: userData
            });
            return role;
        } catch (error) {
            console.error("❌ Error updating role:", error);
            throw new Error("Failed to update role");
        }
    }

    static async findDept({ IdDept, DeptName, DeptCode }) {
        try {
            const whereClause = {};

            if (IdDept) whereClause.IdDepartment = Number(IdDept);
            if (DeptName) whereClause.DepartmentName = DeptName;
            if (DeptCode) whereClause.DepartmentCode = DeptCode;

            const dept = await prisma.department.findMany({
                where: whereClause,
                select: {
                    IdDepartment: true,
                    DepartmentName: true,
                    DepartmentCode: true
                }
            });
            return dept;
        } catch (error) {
            throw new Error("Failed to retrieve department");
        }
    }

    static async inserDept(userData) {
        try {
            const dept = await prisma.department.create({
                data: {
                    DepartmentName: userData.DepartmentName,
                    DepartmentCode: userData.DepartmentCode
                }
            });
            return dept;
        } catch (error) {
            console.error("❌ Error inserting department:", error);
            throw new Error("Failed to insert department");
        }
    }

    static async updateDept(IdDepartment, userData) {
        try {
            const dept = await prisma.department.update({
                where: { IdDepartment: Number(IdDepartment) },
                data: userData
            });
            return dept;
        } catch (error) {
            console.error("❌ Error updating role:", error);
            throw new Error("Failed to update role");
        }
    }
}