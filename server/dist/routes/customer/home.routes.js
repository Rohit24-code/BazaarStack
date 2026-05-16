"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerHomeRouter = void 0;
const express_1 = require("express");
const home_controllers_1 = require("../../controllers/customer/home.controllers");
exports.customerHomeRouter = (0, express_1.Router)();
exports.customerHomeRouter.get("/home", home_controllers_1.getCustomerHome);
