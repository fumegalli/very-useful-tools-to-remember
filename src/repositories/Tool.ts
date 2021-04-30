import { Tool } from '../models/tool';

interface MongoDeleteOne {
  ok?: number;
  n?: number;
  deletedCount?: number;
}

class ToolRepository {
  public static async findAll(): Promise<Tool[]> {
    return Tool.find();
  }

  public static async findByTag(tag: string): Promise<Tool[]> {
    return Tool.find({ tags: tag });
  }

  public static async create(tool: Tool): Promise<Tool> {
    return Tool.create(tool);
  }
  public static async deleteById(id: string | undefined): Promise<MongoDeleteOne> {
    return Tool.deleteOne({ id });
  }
}

export { ToolRepository };