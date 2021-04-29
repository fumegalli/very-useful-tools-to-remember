import { Tool } from "../models/tool";
import { ToolRepository } from "../repositories/Tool";

class ToolService {
  public static async findAll(tag: string | undefined): Promise<Tool[]> {
    if (tag) {
      return ToolRepository.findByTag(tag);
    }

    return ToolRepository.findAll();
  }
}

export { ToolService };
