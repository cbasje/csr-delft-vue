import { Toast } from "@capacitor/toast";

export default {
	async notify(message: string) {
		await Toast.show({
			text: message,
			duration: 'short',
		});
	},
};
