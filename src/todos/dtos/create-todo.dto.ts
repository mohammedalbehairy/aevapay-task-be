import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoDto {
    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    description: string
}