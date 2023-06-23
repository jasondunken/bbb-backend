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
import { CommentsModule } from "./comments/comments.module";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { APP_FILTER } from "@nestjs/core";
import { NotFoundExceptionFilter } from "./auth/filters/notfound.filter";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URL),
        JournalsModule,
        AuthModule,
        ImagesModule,
        MailModule,
        CommentsModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "src/_static/bitbytebytes.io"),
            renderPath: "/",
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        MailService,
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter,
        },
    ],
})
export class AppModule {}
