import { Catch, NotFoundException, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        //console.log("oops 404");
        try {
            response.sendFile("./404-page.html", { root: "src/" });
        } catch (error) {
            console.log("oops! ", error);
        }
    }
}
