import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    @MaxLength(150)
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsBoolean()
    completado?: boolean;
}