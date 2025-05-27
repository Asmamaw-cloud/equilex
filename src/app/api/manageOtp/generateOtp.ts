import nodemailer from 'nodemailer';
import crypto from 'crypto';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const OTP_EXPIRY_MINUTES = 5;
const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret'; // store securely

// 1. Generate a 6-digit OTP
export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// 2. Send OTP via email
export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// 3. Generate a signed token (JWT) containing hashed OTP
export const generateOtpToken = async (email: string, otp: string) => {
  const hashedOtp = await argon2.hash(otp);

  const payload = {
    email,
    hashedOtp,
    exp: Math.floor(Date.now() / 1000) + OTP_EXPIRY_MINUTES * 60,
  };

  return jwt.sign(payload, JWT_SECRET);
};

// 4. Verify token and OTP
export const verifyOtpToken = async (token: string, inputOtp: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      email: string;
      hashedOtp: string;
      exp: number;
    };

    const isValid = await argon2.verify(payload.hashedOtp, inputOtp);
    if (!isValid) {
      throw new Error('Invalid OTP');
    }

    return { valid: true, email: payload.email };
  } catch (err) {
    throw new Error('OTP verification failed or token expired');
  }
};

// 5. OTP entry point (resend example)
export const resendOtp = async (email: string) => {
  try {
    const otp = generateOtp();
    await sendOtpEmail(email, otp);
    const token = await generateOtpToken(email, otp);

    return {
      success: true,
      message: 'OTP sent successfully',
      token, // return this to the client (store in client memory or hidden input)
    };
  } catch (err) {
    console.error('OTP resend error:', err);
    return { success: false, message: 'Failed to send OTP' };
  }
};
