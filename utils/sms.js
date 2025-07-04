import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = async (message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: '+91YOUR_VERIFIED_PHONE_NUMBER' // Use your own verified number here
    });
  } catch (error) {
    console.error('Error sending SMS:', error.message);
  }
};
