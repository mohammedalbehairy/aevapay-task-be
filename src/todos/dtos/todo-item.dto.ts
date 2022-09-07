import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TodoItemDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  todoId: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  itemId: string;
}
