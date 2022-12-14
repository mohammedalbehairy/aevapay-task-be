import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateItemDto } from '../dtos/create-item.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo } from '../models/todo.schema';
import { TodoRepository } from '../repository/todo.repository';
import { ITodoRepository } from '../repository/todo.repository.interface';

@Injectable()
export class TodoService {
  constructor(
    @Inject('ITodoRepository') private todoRepository: ITodoRepository,
  ) {}

  createTodo(createTodoDto: CreateTodoDto): Observable<Todo> {
    return this.todoRepository.create(createTodoDto);
  }

  getTodos(): Observable<Todo[]> {
    return this.todoRepository.list();
  }

  async updateTodo(
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoRepository.update(todoId, updateTodoDto);
  }

  async deleteTodo(todoId: string): Promise<Todo> {
    return await this.todoRepository.delete(todoId);
  }

  async updateTodoIsCompolete(todoId: string): Promise<Todo> {
    return await this.todoRepository.updateTodoIsCompolete(todoId);
  }

  async getTodoItems(todoId: string): Promise<Todo> {
    return await this.todoRepository.getTodoItems(todoId);
  }

  async deleteTodoItem(todoId: string, itemId: string): Promise<Todo> {
    return await this.todoRepository.deleteTodoItem(todoId, itemId);
  }

  async AddTodoItem(
    todoId: string,
    createItemDto: CreateItemDto,
  ): Promise<Todo> {
    return await this.todoRepository.AddTodoItem(todoId, createItemDto);
  }

  async updateTodoItemIsCompoleted(
    todoId: string,
    itemId: string,
  ): Promise<Todo> {
    return await this.todoRepository.updateTodoItemIsCompoleted(todoId, itemId);
  }

  async updateTodoItem(
    todoId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ): Promise<Todo> {
    return await this.todoRepository.updateTodoItem(
      todoId,
      itemId,
      updateItemDto,
    );
  }
}
