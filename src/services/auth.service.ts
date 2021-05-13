import { Credentials, RefreshResponse, Tokens } from '@/store/auth/auth.model';
import axios from 'axios';

export default {
	userId: '',
	path: `${process.env.VUE_APP_SITE_URL}/auth`,

	async login({ username, password }: Credentials) {
		this.userId = username;

		const url = `${this.path}/authorize`;

		const body = {
			'user': username,
			'pass': password,
		};
		const config = {
			headers: {
				// "Content-type": "application/json; charset=UTF-8",
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		// FIXME: werkt nog niet met de API
		return await axios.post<Tokens>(url, body, config);
	},

	async refresh(refreshToken: string) {
		const url = `${this.path}/token`;

        const body = {
			'refresh_token': refreshToken,
		};
		const config = {
			headers: {
				// "Content-type": "application/json; charset=UTF-8",
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		return await axios.post<RefreshResponse>(url, body, config);
	},
    
	isDemo(): boolean {
		return this.userId === 'x037';
	},
};
