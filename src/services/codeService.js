import request from "../utils/request";

export const createCodeApi = (data) => request.post('/enduser/giftcode/check', data).then(({ data }) => data);
export const createCustomerApi = (data) => request.post('/enduser/phone/create', data).then(({ data }) => data).catch(err => err);

