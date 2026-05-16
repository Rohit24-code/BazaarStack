"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSettingsRouter = void 0;
const auth_1 = require("../../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const setting_controllers_1 = require("../../controllers/admin/setting.controllers");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fieldSize: 5 * 1024 * 1024,
        files: 10,
    },
});
exports.adminSettingsRouter = (0, express_1.Router)();
exports.adminSettingsRouter.use(auth_1.requireAdmin);
exports.adminSettingsRouter.get("/settings/banners", setting_controllers_1.getBanners);
exports.adminSettingsRouter.post("/settings/banners", upload.array("images", 10), setting_controllers_1.addBanners);
