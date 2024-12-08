const { API_CONSTANTS } = require("@/network/NetworkConstants");

class UserApi {
    async getAllUser() {
        try {
            const response = await apiManager.get(API_CONSTANTS.user);
            console.log("feched user:", response);
            return response?.data;
        } catch (err) {
            console.error('[UsersAPI - getAllUsers]: ', err.response?.data);
            throw new Error(err.response?.data?.userMessage);
        }
    }
    
}

export const userApi = new UserApi();