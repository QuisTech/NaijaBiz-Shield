
import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pathlib import Path
from typing import List, Optional

class EmailService:
    def __init__(self):
        self.conf = ConnectionConfig(
            MAIL_USERNAME=os.getenv("SMTP_USERNAME", "resend"),
            MAIL_PASSWORD=os.getenv("SMTP_PASSWORD", ""),
            MAIL_FROM=os.getenv("SMTP_FROM", "security@resend.dev"),
            MAIL_PORT=int(os.getenv("SMTP_PORT", 465)),
            MAIL_SERVER=os.getenv("SMTP_SERVER", "smtp.resend.com"),
            MAIL_STARTTLS=False,
            MAIL_SSL_TLS=True,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True
        )
        self.fastmail = FastMail(self.conf)

    async def send_security_report(self, to_email: str, business_name: str, pdf_path: str, assessment_id: int):
        """Send security assessment report via email"""
        
        subject = f"NaijaBiz Shield - Security Assessment Report for {business_name}"
        
        body = f"""
        Dear {business_name},

        Thank you for completing your security assessment with NaijaBiz Shield!

        Your comprehensive security report is attached to this email. This report includes:
        • Your overall security risk score and level
        • Detailed recommendations for improvement
        • Current threat alerts relevant to your business
        • Actionable steps to enhance your security

        Assessment ID: {assessment_id}
        Risk Level: Available in the attached report

        Key Next Steps:
        1. Review the attached report thoroughly
        2. Prioritize the critical and high-priority recommendations
        3. Implement security measures based on your risk level
        4. Consider regular security assessments to maintain protection

        Need Help?
        If you have questions about your report or need assistance implementing security measures, 
        please don't hesitate to contact our security team.

        Stay secure,
        The NaijaBiz Shield Team
        """

        message = MessageSchema(
            subject=subject,
            recipients=[to_email],
            body=body,
            subtype="plain",
            attachments=[pdf_path]
        )

        try:
            await self.fastmail.send_message(message)
            return True
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False

    async def send_welcome_email(self, to_email: str, business_name: str):
        """Send welcome email after assessment completion"""
        subject = "Welcome to NaijaBiz Shield - Your Security Assessment is Ready"
        
        body = f"""
        Dear {business_name},

        Welcome to NaijaBiz Shield! We're processing your security assessment and will send 
        your comprehensive report shortly.

        What to expect in your report:
        • Detailed security risk analysis
        • Personalized recommendations
        • Current threat intelligence
        • Actionable improvement steps

        Your security is our priority. We're committed to helping Nigerian businesses 
        protect themselves against evolving cyber threats.

        If you don't receive your report within 10 minutes, please check your spam folder 
        or contact our support team.

        Stay secure,
        The NaijaBiz Shield Team
        """

        message = MessageSchema(
            subject=subject,
            recipients=[to_email],
            body=body,
            subtype="plain"
        )

        try:
            await self.fastmail.send_message(message)
            return True
        except Exception as e:
            print(f"Error sending welcome email: {str(e)}")
            return False

email_service = EmailService()


