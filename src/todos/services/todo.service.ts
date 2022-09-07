import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dtos/create-item.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo } from '../models/todo.schema';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.create(createTodoDto);
  }

  async getTodos(): Promise<Todo[]> {
    return await this.todoRepository.list();
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
