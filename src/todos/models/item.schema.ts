import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Item {
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
  name: string;

  @Prop({
    required: true,
    default: false,
  })
  isCompoleted: boolean;

  @Prop({
    required: true,
  })
  description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
export type ItemDocument = Item & Document;
