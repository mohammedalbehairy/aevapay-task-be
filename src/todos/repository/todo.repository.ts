import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map, Observable, of } from 'rxjs';
import { CreateItemDto } from '../dtos/create-item.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Todo, TodoDocument } from '../models/todo.schema';
import { ITodoRepository } from './todo.repository.interface';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDocument>) {}

  create(todoDto: CreateTodoDto): Observable<Todo> {
    const todo = new this.todoModel(todoDto);
    return from(todo.save());
  }

  list(): Observable<any> {
    return from(this.todoModel.find({}));
  }

  async update(todoId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    let todo = await this.todoModel.findByIdAndUpdate(todoId, updateTodoDto, {
      new: true,
      runValidators: true,
    });

    if (!todo) throw new NotFoundException('todo not found');

    return todo;
  }

  async delete(todoId: string): Promise<Todo> {
    let todo = await this.todoModel.findByIdAndDelete(todoId);

    if (!todo) throw new NotFoundException('todo not found');

    return todo;
  }

  async updateTodoIsCompolete(todoId: string): Promise<Todo> {
    let todo = await this.todoModel.findOneAndUpdate(
      { todoId, isCompolete: false },
      { isCompolete: true },
      { new: true, runValidators: true },
    );

    if (!todo)
      throw new HttpException(
        'cant find todo or todo is already Compoleted',
        HttpStatus.BAD_REQUEST,
      );

    return todo;
  }

  async getTodoItems(todoId: string): Promise<Todo> {
    let todo = await this.todoModel.findById(todoId).select('items');

    if (!todo) throw new NotFoundException('todo not found');

    return todo;
  }

  async deleteTodoItem(todoId: string, itemId: string): Promise<Todo> {
    let todo = await this.todoModel.findOneAndUpdate(
      { todoId, 'items._id': itemId },
      { $pull: { items: { _id: itemId } } },
      { new: true, runValidators: true },
    );

    if (!todo) throw new NotFoundException('todo or item not found');

    return todo;
  }

  async AddTodoItem(
    todoId: string,
    createItemDto: CreateItemDto,
  ): Promise<Todo> {
    let todo = await this.todoModel.findByIdAndUpdate(
      todoId,
      { $push: { items: createItemDto } },
      { new: true, runValidators: true },
    );

    if (!todo) throw new NotFoundException('todo not found');

    return todo;
  }

  async updateTodoItemIsCompoleted(
    todoId: string,
    itemId: string,
  ): Promise<Todo> {
    let todo = await this.todoModel.findOneAndUpdate(
      { todoId, 'items._id': itemId, 'items.isCompoleted': false },
      { $set: { 'items.$.isCompoleted': true } },
      { new: true, runValidators: true },
    );

    if (!todo)
      throw new HttpException(
        'cant find todo or item or item is already Compoleted',
        HttpStatus.BAD_REQUEST,
      );

    if (!todo.isCompolete && todo.items.every((item) => item.isCompoleted)) {
      return await this.todoModel.findByIdAndUpdate(
        todoId,
        { isCompolete: true },
        { new: true, runValidators: true },
      );
    } else return todo;
  }

  async updateTodoItem(
    todoId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ): Promise<Todo> {
    let todo = await this.todoModel.findOneAndUpdate(
      { todoId, 'items._id': itemId },
      {
        $set: {
          'items.$.name': updateItemDto.name,
          'items.$.description': updateItemDto.description,
        },
      },
      { new: true, runValidators: true },
    );

    if (!todo) throw new NotFoundException('todo or item not found');

    return todo;
  }
}
