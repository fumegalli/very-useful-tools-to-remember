import { Tool } from '../models/tool';

class ToolRepository {
  public static async findAll(): Promise<Tool[]> {
    return Tool.find();
  }
}

export { ToolRepository };