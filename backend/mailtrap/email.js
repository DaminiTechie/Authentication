import { MailtrapClient } from "mailtrap";
import {PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name ) => {
	const recipient = [{email}];
	try{
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid:"e00f891e-ff6d-415d-bdf7-7fae5ba21929",
			template_variables: {
				"company_info_name": "Auth_Company",
				"name": name
			  },

		});
		console.log("welcome Email sent  successfully", response);

	}catch(error){
        console.error(`Error sending Welcome Email`, error);
		throw new Error(`Error sendig Welcome email : ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{email}];
	try {
		const response = await mailtrapClient.send({
			from:sender,
			to:recipient,
			subject:"Reset your password", 
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category:"Password Reset",
		})
	} catch (error) {
		console.error(`Error sending reset password  Email`, error);
		throw new Error(`Error sendig reset password  Email: ${error}`);
		
	}
}

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{email}];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject:"Password Reset Successful",
			html:PASSWORD_RESET_SUCCESS_TEMPLATE,
			category:"Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending reset password  Email`, error);
		throw new Error(`Error sendig reset password  Email: ${error}`);
	}
}


