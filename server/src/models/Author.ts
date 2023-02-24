import mongoose, { Document, Schema } from "mongoose";

export interface Iauthor {
  name: string;
}

export interface IauthorModel extends Iauthor, Document {}

const AuthorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IauthorModel>("Author", AuthorSchema);
