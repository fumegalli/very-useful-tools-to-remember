import { Tool } from "../models/tool";
import { ToolRepository } from "../repositories/Tool";

class ToolService {
  public static async findAll(): Promise<Tool[]> {
    return ToolRepository.findAll();
  }
}

export { ToolService };
