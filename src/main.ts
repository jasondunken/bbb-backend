import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // whitelist only allows dto defined properties through in request body
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(process.env.NEST_PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
