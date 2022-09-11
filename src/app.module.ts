import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { JournalsModule } from "./journals/journals.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [MongooseModule.forRoot("mongodb://localhost/testdb"), JournalsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
