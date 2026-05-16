"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboardRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const dashboard_controllers_1 = require("../../controllers/admin/dashboard.controllers");
exports.adminDashboardRouter = (0, express_1.Router)();
exports.adminDashboardRouter.use(auth_1.requireAdmin);
exports.adminDashboardRouter.get("/dashboard/lite", dashboard_controllers_1.adminDashboard);
