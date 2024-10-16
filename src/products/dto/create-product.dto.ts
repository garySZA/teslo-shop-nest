import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Product price (optional)',
        nullable: true,
        minimum: 0,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Product description (optional)',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Product slug (optional)',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'Product stock (optional)',
        nullable: true,
        minimum: 0,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        description: 'Product sizes',
        nullable: false,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        isArray: true,
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        description: 'Product type',
        nullable: false,
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({
        description: 'Product tags',
        nullable: false,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: 'Product images (optional)',
        nullable: true,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
