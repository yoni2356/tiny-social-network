import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsInt()
    readonly user_id: number;

    @IsNotEmpty()
    @IsInt()
    readonly article_id: number;

    @IsNotEmpty()
    @IsString()
    readonly content: string; 
}
