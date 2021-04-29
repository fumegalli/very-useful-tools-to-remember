import { model, Model, Schema, Document, Types } from 'mongoose';

export interface Tool {
  id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

const schema = new Schema(
  {
    id: { type: String, default: Types.ObjectId() },
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

interface ToolModel extends Omit<Tool, 'id'>, Document {}

export const Tool: Model<ToolModel> = model('Tool', schema);
