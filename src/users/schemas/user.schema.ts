// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  toObject(): { [x: string]: any; password: any; } {
    throw new Error('Method not implemented.');
  }
  toJSON() {
      throw new Error('Method not implemented.');
  }
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Agrega un virtual para que "id" retorne el valor de "_id"
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Configura el esquema para incluir virtuales al convertir a JSON
UserSchema.set('toJSON', { virtuals: true });
