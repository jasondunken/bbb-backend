import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";

import { JournalsModule } from "./journals/journals.module";

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL), JournalsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
