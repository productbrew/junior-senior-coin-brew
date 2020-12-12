import sgEmail from '@sendgrid/mail';
import { logger } from '@junior-senior-coin-brew/logger';

export async function sendOTPEmail(emailTo: string, token: string) {
  try {
    logger.info(`Sending OTP emali to: ${emailTo}`);

    await sgEmail.send({
      to: emailTo,
      templateId: 'd-7123a8bc03f04c1b8d7d0a5f6a2efdb1',
      dynamicTemplateData: {
        token,
      },
      from: {
        name: '🪙 Coin Brew',
        email: 'lukasz.czyszczonik@gmail.com',
      },
    });
  } catch (error) {
    logger.error(error.message);
  }
}
