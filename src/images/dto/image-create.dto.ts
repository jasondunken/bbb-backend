export class CreateImageDto {
    name: string;
    description: string;
    img: {
        data: Buffer;
        contentType: string;
    };
}
