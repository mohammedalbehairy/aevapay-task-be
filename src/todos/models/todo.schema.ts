import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Item, ItemSchema } from './item.schema';

@Schema({ timestamps: true })
export class Todo {
  @Prop({
    required: true,
    unique: true,
    default: () => {
      return uuidv4();
    },
  })
  _id: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
    default: false,
  })
  isCompolete: boolean;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    type: [ItemSchema],
    default: [],
  })
  items: Item[];
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
