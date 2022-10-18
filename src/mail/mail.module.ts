import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: "smtp.dreamhost.com",
                    secure: true,
                    port: 465,
                    auth: {
                        user: config.get("REGISTRATION_EMAIL"),
                        pass: config.get("REGISTRATION_PW"),
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
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
