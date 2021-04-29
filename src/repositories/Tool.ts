import { Tool } from '../models/tool';

class ToolRepository {
  public static async findAll(): Promise<Tool[]> {
    return Tool.find();
  }

  public static async findByTag(tag: string): Promise<Tool[]> {
    return Tool.find({ tags: tag });
  }
}

export { ToolRepository };