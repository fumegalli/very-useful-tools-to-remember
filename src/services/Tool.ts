import * as yup from 'yup';
import { CreateToolRequest } from '../controllers/Tool';
import { ApiError } from '../errors/ApiError';
import { Tool } from '../models/tool';
import { ToolRepository } from '../repositories/Tool';

class ToolService {
  public static async findAll(tag: string | undefined): Promise<Tool[]> {
    if (tag) {
      return ToolRepository.findByTag(tag);
    }

    return ToolRepository.findAll();
  }

  public static async create(toolToCreate: CreateToolRequest): Promise<Tool> {
    const schema = yup.object().shape({
      title: yup.string().required(),
      link: yup.string().required(),
      description: yup.string().required(),
      tags: yup.array(yup.string()).required(),
    });

    try {
      await schema.validate(toolToCreate, { abortEarly: false });
    } catch (err) {
      throw new ApiError(err, 400);
    }

    return ToolRepository.create(toolToCreate);
  }

  public static async deleteById(id: string | undefined): Promise<void> {
    const deletedTool = await ToolRepository.deleteById(id);

    if (!deletedTool.deletedCount) {
      throw new ApiError('Tool not found', 404);
    }
}
}

export { ToolService };
