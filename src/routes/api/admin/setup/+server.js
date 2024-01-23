import { json } from '@sveltejs/kit';
import Model from '../Model';
import { hashPassword } from '$lib/utils/bcrypt.js';
import CONFIG from '$src/env';

export const POST = async () => {
	try {
		console.log('starting setup with admin');
		let findSuper = await Model.Admin.findOne({ email: CONFIG.SUPER.email });
		if (findSuper) {
			throw new Error(
				JSON.stringify({
					en: 'Super already initialized.',
					tr: 'Super admin zaten var'
				})
			);
		}
		let newAdmin = await new Model.Admin({
			fullName: 'Super admin',
			email: CONFIG.SUPER.email,
			password: await hashPassword(CONFIG.SUPER.password),
			super: true
		}).save();

		console.log('new admin created:', newAdmin);

		return json({
			status: true,
			newAdmin
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
