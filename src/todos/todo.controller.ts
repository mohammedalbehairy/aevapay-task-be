import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dtos/create-item.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoIdDto } from './dtos/todo-id.dto';
import { TodoItemDto } from './dtos/todo-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './services/todo.service';

@ApiTags('TodoController')
@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  //#region -------------------- TODO --------------------

  @Post('/')
  @ApiOperation({ summary: 'Creating TODO' })
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let todo = await this.todoService.createTodo(createTodoDto);
      return res
        .status(201)
        .json({ error: false, message: 'Todo created succefully', data: todo });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Put(':todoId')
  async updateTodo(
    @Param() params: TodoIdDto,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let todo = await this.todoService.updateTodo(
        params.todoId,
        updateTodoDto,
      );
      return res
        .status(200)
        .json({ error: false, message: 'Todo updated succefully', data: todo });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Delete(':todoId')
  async deleteTodo(@Param() params: TodoIdDto, @Req() req, @Res() res) {
    try {
      await this.todoService.deleteTodo(params.todoId);
      return res
        .status(204)
        .json({ error: false, message: 'Todo deleted succefully', data: [] });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Put(':todoId/isCompolete')
  async updateTodoIsCompolete(
    @Param() params: TodoIdDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let todo = await this.todoService.updateTodoIsCompolete(params.todoId);
      return res.status(200).json({
        error: false,
        message: 'Todo marked as isCompolete succefully',
        data: todo,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  //#endregion ----------------- TODO --------------------

  //#region ----------------- Items --------------------

  @Get(':todoId/items')
  async getTodoItems(@Param() params: TodoIdDto, @Req() req, @Res() res) {
    try {
      let items = await this.todoService.getTodoItems(params.todoId);
      return res.status(200).json({
        error: false,
        message: 'Get Todo items succefully',
        data: items,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Delete(':todoId/items/:itemId')
  async deleteTodoItem(@Param() params: TodoItemDto, @Req() req, @Res() res) {
    try {
      let items = await this.todoService.deleteTodoItem(
        params.todoId,
        params.itemId,
      );
      return res.status(200).json({
        error: false,
        message: 'Item removed from todo succefully',
        data: items,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Post(':todoId/items')
  async AddTodoItem(
    @Param() params: TodoIdDto,
    @Body() createItemDto: CreateItemDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let items = await this.todoService.AddTodoItem(
        params.todoId,
        createItemDto,
      );
      return res.status(200).json({
        error: false,
        message: 'Item added to todo succefully',
        data: items,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Put(':todoId/items/:itemId/isCompoleted')
  async updateTodoItemIsCompoleted(
    @Param() params: TodoItemDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let items = await this.todoService.updateTodoItemIsCompoleted(
        params.todoId,
        params.itemId,
      );
      return res.status(200).json({
        error: false,
        message: 'Item isCompoleted updated succefully',
        data: items,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Put(':todoId/items/:itemId')
  async updateTodoItem(
    @Param() params: TodoItemDto,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      let items = await this.todoService.updateTodoItem(
        params.todoId,
        params.itemId,
        updateItemDto,
      );
      return res.status(200).json({
        error: false,
        message: 'Item updated succefully',
        data: items,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  //#endregion ----------------- Items --------------------
}
