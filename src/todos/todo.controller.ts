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

  @Get('/')
  @ApiOperation({ summary: 'Get TODOs' })
  async getTodo(@Req() req, @Res() res) {
    try {
      let todos = await this.todoService.getTodos();
      return res.status(201).json({
        error: false,
        message: 'Todos loaded succefully',
        data: todos,
      });
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Put(':todoId')
  @ApiOperation({ summary: 'Update TODO' })
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
  @ApiOperation({ summary: 'Delete TODO' })
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
  @ApiOperation({ summary: 'Set TODO as completed' })
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
  @ApiOperation({ summary: 'List TODO items' })
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
  @ApiOperation({ summary: 'Delete specific item from TODO' })
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
  @ApiOperation({ summary: 'Insert item in TODO' })
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
  @ApiOperation({ summary: 'Update item in the TODO' })
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
