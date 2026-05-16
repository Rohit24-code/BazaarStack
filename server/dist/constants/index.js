"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAddress = mapAddress;
exports.mapPromo = mapPromo;
function mapAddress(item) {
    return {
        _id: String(item._id || ""),
        fullName: item.fullName,
        address: item.address,
        state: item.state,
        postalCode: item.postalCode,
        isDefault: item.isDefault,
    };
}
function mapPromo(item) {
    return {
        _id: String(item._id || ""),
        code: item.code,
        percentage: item.percentage,
        count: item.count,
        minimumOrderValue: item.minimumOrderValue,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        createdAt: item.createdAt,
    };
}
