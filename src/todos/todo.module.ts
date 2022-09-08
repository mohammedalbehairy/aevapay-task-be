import { TodoRepository } from './repository/todo.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './models/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './services/todo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [
    TodoService,
    { provide: 'ITodoRepository', useClass: TodoRepository },
  ],
})
export class TodoModule {}
