"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUpdateUser = void 0;
const express_1 = require("@clerk/express");
const asyncHandler_1 = require("../utils/asyncHandler");
const AppError_1 = require("../utils/AppError");
const User_1 = require("../models/User");
const envelope_1 = require("../utils/envelope");
exports.createUpdateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        throw new AppError_1.AppError(401, "User is not authorized!");
    }
    const clerkUser = await express_1.clerkClient.users.getUser(userId);
    const clerkEmailAddress = clerkUser.emailAddresses.find((user) => user.id === userId) ||
        clerkUser.emailAddresses[0];
    const email = clerkEmailAddress.emailAddress;
    const fullName = [clerkUser.firstName, clerkUser.lastName]
        ?.filter(Boolean)
        .join(" ")
        .trim() || clerkUser.username;
    const raw = process.env.ADMIN_EMAILS || "";
    const adminEmails = new Set(raw
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean));
    // if current user is existing user or not
    const existingUser = await User_1.User.findOne({ clerkUserId: userId });
    const shouldBeAdmin = email ? adminEmails.has(email?.toLowerCase()) : false;
    // role
    const nextRole = existingUser?.role === "admin"
        ? "admin"
        : shouldBeAdmin
            ? "admin"
            : existingUser?.role || "user";
    const newlyCreateDbUser = await User_1.User.findOneAndUpdate({
        clerkUserId: userId,
    }, {
        clerkUserId: userId,
        email,
        name: fullName,
        role: nextRole,
    }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
    });
    res.status(200).json((0, envelope_1.ok)({
        user: {
            id: newlyCreateDbUser._id,
            clerkUserId: newlyCreateDbUser.clerkUserId,
            email: newlyCreateDbUser.email,
            name: newlyCreateDbUser.name,
            role: newlyCreateDbUser.role,
        },
    }));
});
exports.getUser = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        throw new AppError_1.AppError(401, "User is not authorized!");
    }
    const dbUser = await User_1.User.findOne({ clerkUserId: userId });
    if (!dbUser) {
        throw new AppError_1.AppError(404, "User is not found in db!");
    }
    res.status(200).json((0, envelope_1.ok)({
        user: {
            id: dbUser._id,
            clerkUserId: dbUser.clerkUserId,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
        },
    }));
});
