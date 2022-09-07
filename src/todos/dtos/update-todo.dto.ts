import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateTodoDto {
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