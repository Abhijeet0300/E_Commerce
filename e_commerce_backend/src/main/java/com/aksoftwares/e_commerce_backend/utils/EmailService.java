package com.aksoftwares.e_commerce_backend.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp, String subjectText) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(toEmail);
        helper.setSubject(subjectText);

        String htmlContent = "<html>"
                + "<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;'>"
                + "<div style='background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 500px; margin: auto;'>"
                + "<h2 style='color: #333333; text-align: center;'>Welcome!</h2>"
                + "<p style='color: #555555; font-size: 16px;'>Your One-Time Password (OTP) for registration is:</p>"
                + "<div style='text-align: center; margin: 20px 0;'>"
                + "<span style='font-size: 24px; font-weight: bold; color: #007bff; background-color: #e6f2ff; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;'>"
                + otp
                + "</span>"
                + "</div>"
                + "<p style='color: #777777; font-size: 14px; text-align: center;'>Please enter this code to complete your registration. Do not share this code with anyone. It is only valid for 5 minutes.</p>"
                + "</div>"
                + "</body>"
                + "</html>";

        helper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }
}

