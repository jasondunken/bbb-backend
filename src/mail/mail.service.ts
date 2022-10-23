import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: User, token: string) {
        const url = `bitbytebytes.io/validate-user?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Welcome to BitByteBytes.io! Confirm your Email",
            template: "./confirmation",
            context: {
                name: user.userName,
                url,
            },
        });
    }

    async sendPasswordReset(user: User, token: string) {
        const url = `bitbytebytes.io/password-reset?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Password reset link",
            template: "./passwordReset",
            context: {
                name: user.userName,
                url,
            },
        });
    }
}
