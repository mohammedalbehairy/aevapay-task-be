import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TodoIdDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  todoId: string;
}
