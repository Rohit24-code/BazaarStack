"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = exports.updateAddressController = exports.postAddressController = exports.getAddressController = void 0;
const constants_1 = require("../../constants");
const auth_1 = require("../../middleware/auth");
const User_1 = require("../../models/User");
const AppError_1 = require("../../utils/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const envelope_1 = require("../../utils/envelope");
const helpers_1 = require("../../utils/helpers");
exports.getAddressController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const user = await User_1.User.findById(dbUser._id);
    const foundUser = (0, helpers_1.requireFound)(user, "User not found");
    const addresses = (foundUser.addresses || []);
    const items = addresses
        ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
        .map(constants_1.mapAddress);
    res.status(200).json((0, envelope_1.ok)({ items }));
});
exports.postAddressController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const fullName = String(req.body.fullName || "").trim();
    const state = String(req.body.state || "").trim();
    const postalCode = String(req.body.postalCode || "").trim();
    const address = String(req.body.address || "").trim();
    (0, helpers_1.requireText)(fullName, "Full name is required");
    (0, helpers_1.requireText)(state, "State is required");
    (0, helpers_1.requireText)(postalCode, "Postal code is required");
    (0, helpers_1.requireText)(address, "Address is required");
    const user = await User_1.User.findById(dbUser._id);
    const foundUser = (0, helpers_1.requireFound)(user, "User not found");
    const addresses = (foundUser.addresses || []);
    const shouldMarkDefault = req.body.isDefault === true || addresses.length === 0;
    if (shouldMarkDefault) {
        addresses.forEach((address) => (address.isDefault = false));
    }
    addresses.push({
        fullName,
        state,
        postalCode,
        address,
        isDefault: shouldMarkDefault,
    });
    foundUser.addresses = addresses;
    await foundUser.save();
    const items = addresses
        ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
        .map(constants_1.mapAddress);
    res.status(200).json((0, envelope_1.ok)({ items }));
});
exports.updateAddressController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    // const address = await
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const addressId = String(req.params.addressId || "").trim();
    const fullName = String(req.body.fullName || "").trim();
    const state = String(req.body.state || "").trim();
    const postalCode = String(req.body.postalCode || "").trim();
    const address = String(req.body.address || "").trim();
    (0, helpers_1.requireText)(fullName, "Full name is required");
    (0, helpers_1.requireText)(state, "State is required");
    (0, helpers_1.requireText)(postalCode, "Postal code is required");
    (0, helpers_1.requireText)(address, "Address is required");
    const user = await User_1.User.findById(dbUser._id);
    const foundUser = (0, helpers_1.requireFound)(user, "User not found");
    const addresses = (foundUser.addresses || []);
    const getAddressToEdit = addresses.find((address) => String(address._id) === addressId);
    if (!getAddressToEdit) {
        throw new AppError_1.AppError(404, "Address not found");
    }
    const shouldMarkDefault = req.body.isDefault === true || addresses.length === 0;
    if (shouldMarkDefault) {
        addresses.forEach((address) => (address.isDefault = false));
    }
    getAddressToEdit.fullName = fullName;
    getAddressToEdit.state = state;
    getAddressToEdit.postalCode = postalCode;
    getAddressToEdit.address = address;
    if (shouldMarkDefault) {
        getAddressToEdit.isDefault = true;
    }
    await foundUser.save();
    const items = [...foundUser.addresses]
        ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
        .map(constants_1.mapAddress);
    res.status(200).json((0, envelope_1.ok)({ items }));
});
exports.deleteAddressController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    // const address = await
    const dbUser = await (0, auth_1.getDbUserFromReq)(req);
    const addressId = String(req.params.addressId || "").trim();
    const user = await User_1.User.findById(dbUser._id);
    const foundUser = (0, helpers_1.requireFound)(user, "User not found");
    const addresses = (foundUser.addresses || []);
    const addressToBeDeletedIndex = addresses.findIndex((currentAddress) => String(currentAddress._id) === addressId);
    if (addressToBeDeletedIndex < 0) {
        throw new AppError_1.AppError(404, "Address not found");
    }
    const wasDefault = addresses[addressToBeDeletedIndex].isDefault;
    addresses.splice(addressToBeDeletedIndex, 1);
    if (wasDefault &&
        addresses.length > 0 &&
        !addresses.some((address) => address.isDefault)) {
        addresses[0].isDefault = true;
    }
    await foundUser.save();
    const items = [...foundUser.addresses]
        .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
        .map(constants_1.mapAddress);
    res.json((0, envelope_1.ok)({ items }));
});
