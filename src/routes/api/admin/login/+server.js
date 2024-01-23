import { json } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';
import Model from '../Model';
import { checkPassword } from '$lib/utils/bcrypt.js';
import CONFIG from '$src/env';

let requiredFields = { POST: ['email', 'password'] };
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.json();

		if (requiredFields['POST']) {
			requiredFields['POST'].map((value) => {
				if (!data[value]) {
					throw new Error(
						JSON.stringify({
							en: `${value} field is required`,
							tr: `${value} alanı zorunlu`
						})
					);
				}
			});
		}

		let { email, password } = data;

		const admin = await Model.Admin.findOne({ email });
		if (!admin) {
			throw new Error(
				JSON.stringify({
					en: 'Admin not found!',
					tr: 'Admin bulunamadı !'
				})
			);
		}

		let check = await checkPassword(admin.password, password);
		if (!check) {
			throw new Error(
				JSON.stringify({
					en: 'Wrong password or email',
					tr: 'Yanlış şifre veya mail'
				})
			);
		}

		const expiresIn = Math.floor(Date.now() / 1000) + 43200;
		const token = jsonwebtoken.sign(
			{
				adminId: admin._id.toString(),
				fullName: admin.fullName,
				email: admin.email,
				exp: expiresIn,
				type: 'admin',
				super: admin.super,
				permissions: admin && admin.permissionGroup && admin.permissionGroup.permissions
			},
			CONFIG.JWT_SECRET
		);

		cookies.set('jwt', token, { path: '/' });

		return json({
			status: true,
			admin,
			token,
			email: admin.email,
			adminId: admin.id,
			fullName: admin.fullName
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
