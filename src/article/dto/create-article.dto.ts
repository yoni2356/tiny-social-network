import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsInt()
    readonly author_id: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly body: string;
}
