"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const auth_controllers_1 = require("../../controllers/auth.controllers");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/sync", auth_1.requireAuth, auth_controllers_1.createUpdateUser);
exports.authRouter.get("/me", auth_1.requireAuth, auth_controllers_1.getUser);
