import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: UserDto, token: string) {
        const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: "Welcome to Nice App! Confirm your Email",
            template: "./confirmation",
            context: {
                name: user.userName,
                url,
            },
        });
    }
}
