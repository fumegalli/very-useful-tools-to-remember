import request from 'supertest';
import { app } from '../../src/app';
import { CreateToolRequest } from '../../src/controllers/Tool';
import { Tool } from '../../src/models/tool';

const anyTool: Tool = {
  link: 'any_link',
  tags: ['any_tag'],
  title: 'any_title',
  description: 'any_description',
};

describe('Tool tests', () => {
  beforeEach(async () => {
    await Tool.deleteMany({});

    await new Tool(anyTool).save();
  });

  describe('findAll', () => {
    it('should return status 200 and all tools found', async () => {
      const response = await request(app).get('/tools');

      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual(expect.objectContaining(anyTool));
    });

    it('should return status 200 and an array containing the filtered tool by tag', async () => {
      const tagToFilter = 'node';
      const toolWithNode: Tool = {
        link: 'any_link',
        tags: [tagToFilter, 'any_tag'],
        title: 'any_title',
        description: 'any_description',
      };

      await new Tool(toolWithNode).save();

      const response = await request(app).get(`/tools?tag=${tagToFilter}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toEqual(expect.objectContaining(toolWithNode));
    });

    it('should return status 200 and an empty array when no tools are found for received tag', async () => {
      const tagToFilter = 'nonexistent_tag';

      const response = await request(app).get(`/tools?tag=${tagToFilter}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return status 200 and a body containing the created tool with its id', async () => {
      const requestBody: CreateToolRequest = {
        link: 'https://www.fastify.io/',
        tags: ['web', 'framework', 'node', 'http2'],
        title: 'Fastify',
        description: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
      };

      const response = await request(app).post('/tools').send(requestBody);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(requestBody));
      expect(response.body.id).toEqual(expect.any(String));
    });

    it('should return status 400 with a message when the description field is missing in request body', async () => {
      const requestBody = {
        link: 'missing_description',
        tags: ['missing', 'description'],
        title: 'missing_description',
      };

      const response = await request(app).post('/tools').send(requestBody);

      expect(response.status).toBe(400);
      expect(response.body.message.errors[0]).toEqual('description is a required field')
    });
  });

  describe('delete', () => {
    it('should return status 204 when delete by id successfully', async () => {
      const toolToDelete: Tool = {
        link: 'any_link',
        tags: ['any_tag'],
        title: 'any_title',
        description: 'any_description',
      };

      const { id } = await new Tool(toolToDelete).save();

      const response = await request(app).delete(`/tools/${id}`);

      expect(response.status).toBe(204);
    });

    it('should return status 404 when no tool is found for received id', async () => {
      const nonexistentId = 'nonexistent_id';

      const response = await request(app).delete(`/tools/${nonexistentId}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Tool not found' });
    });
  });
});