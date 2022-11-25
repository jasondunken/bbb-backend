import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";

import { JournalsModule } from "./journals/journals.module";
import { ImagesModule } from "./images/images.module";
import { MailModule } from "./mail/mail.module";
import { MailService } from "./mail/mail.service";
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        JournalsModule,
        AuthModule,
        ImagesModule,
        MailModule,
        CommentsModule,
    ],
    controllers: [AppController],
    providers: [AppService, MailService],
})
export class AppModule {}
