import * as partnerService from '../services/partner.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { ApiError } from '../utils/ApiError.js';
export const onboard = catchAsync(async (req, res) => {
    if (!req.user)
        throw new ApiError(401, 'Unauthorized');
    const partner = await partnerService.createPartner(req.user.id);
    res.status(201).send(partner);
});
export const getProfile = catchAsync(async (req, res) => {
    if (!req.user)
        throw new ApiError(401, 'Unauthorized');
    const partner = await partnerService.getPartnerProfile(req.user.id);
    res.send(partner);
});
export const updateStatus = catchAsync(async (req, res) => {
    const partner = await partnerService.updatePartnerStatus(req.params.partnerId, req.body.status);
    res.send(partner);
});
export const getAllPartners = catchAsync(async (req, res) => {
    const partners = await partnerService.getAllPartners(req.query);
    res.send(partners);
});
