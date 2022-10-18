import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: "smtp.dreamhost.com",
                secure: true,
                port: 465,
                auth: {
                    user: process.env.REGISTRATION_EMAIL,
                    pass: process.env.REGISTRATION_PW,
                },
            },
            defaults: {
                from: '"No Reply" <noreply@bitbytebytes.io>',
            },
            template: {
                dir: join(__dirname, "mail/templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
