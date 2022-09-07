import { CreateItemDto } from '../dtos/create-item.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo } from '../models/todo.schema';

export interface ITodoRepository {
  create(body: CreateTodoDto): Promise<Todo>;
  list(): Promise<Todo[]>;
  update(todoId: string, body: UpdateTodoDto): Promise<Todo>;
  delete(todoId: string): Promise<Todo>;
  updateTodoIsCompolete(todoId: string): Promise<Todo>;
  getTodoItems(todoId: string): Promise<Todo>;
  deleteTodoItem(todoId: string, itemId: string): Promise<Todo>;
  AddTodoItem(todoId: string, createItemDto: CreateItemDto): Promise<Todo>;
  updateTodoItemIsCompoleted(todoId: string, itemId: string): Promise<Todo>;
  updateTodoItem(
    todoId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ): Promise<Todo>;
}
