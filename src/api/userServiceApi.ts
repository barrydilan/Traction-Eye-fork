import { LocalStorageKeys } from "@/constants/localStorage";
import { userServiceClient } from "./apiClient";
import { userServiceEndpoints } from "./endpoints";

export const UserServiceApi = {
	connectReferral: async (referrer_link: string) => {
		try {
			const response = await userServiceClient.post(userServiceEndpoints.connectReferral, {
				referrer_link
			});
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	getUser: async (wallet_address: string) => {
		try {
			const response = await userServiceClient.get(userServiceEndpoints.getUser, {
				params: {
					wallet_address
				}
			});
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	login: async (initData: string) => {
		try {
			const payload = {
				init_data: initData,
			};
			const response = await userServiceClient.post(userServiceEndpoints.auth, payload);
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	addWallet: async (wallet: string, referrer_link?: string) => {
		try {

			const payload = {
				wallet_id: wallet,
				referrer_link
			};
			const response = await userServiceClient.post(userServiceEndpoints.addWallet, payload);
			localStorage.setItem(LocalStorageKeys.firstLogin, "true")
			return response.data;
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
	removeWallet: async (wallet: string): Promise<void> => {
		try {

			const payload = {
				wallet_id: wallet,
			};
			await userServiceClient.post(userServiceEndpoints.removeWallet, payload);
		} catch (error) {
			console.error("Error logging", error);
			throw error;
		}
	},
};
