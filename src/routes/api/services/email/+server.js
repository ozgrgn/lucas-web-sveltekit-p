import CONFIG from '$src/env';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import moment from "moment";
import emailTransaction from "./emailTransaction.js";


let requiredFields = { POST: ['name', 'phone'] };
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
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

		let { lang, name, phone, email, message, treatment } = data;
		let transporter = nodemailer.createTransport({
			host: CONFIG.MAIL.host,
			port: CONFIG.MAIL.port,
			secure: true,
			tls: {
				rejectUnauthorized: false
			},
			auth: {
				user: CONFIG.MAIL.user,
				pass: CONFIG.MAIL.pass
			}
		});

		// let info = await transporter.sendMail(
		// 	"CK HEALTH WEB",
		// 	"admin@palaexport.de",
		// 	"Yeni Rezervasyon",
		// 	emailTransaction(
		// 		moment().format("DD/MM/YYYY,HH:MM"),
		// 		lang,
		// 		name,
		// 		phone,
		// 		email,
		// 		message,
		// 		treatment
		// 	)
		// );
		let info = await transporter.sendMail({
			from: `"Lucas Investment" <${CONFIG.MAIL.from}>`,
			to: "ozgrgn@gmail.com",
			subject: "Yeni Rezervasyon",
			text: '',
			html: emailTransaction(
				moment().format("DD/MM/YYYY"),
				lang,
				name,
				phone,
				email,
				message,
			)
		});
		return json({
			status: true,
			message: 'mail sent successfully'
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
