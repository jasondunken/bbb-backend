import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";

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
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_URL,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB_NAME,
            entities: [],
            // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data. 
            synchronize: true,
        }),
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
