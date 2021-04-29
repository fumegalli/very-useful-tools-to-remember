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
    it('should be able to return all tools found', async () => {
      const response = await request(app).get('/tools');

      expect(response.status).toBe(200);
      expect(response.body[0]).toEqual(expect.objectContaining(anyTool));
    });

    it('should be able to return all tools containing the tag to filter', async () => {
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

    it('should be able to return an empty array when no tools are found for received tag', async () => {
      const tagToFilter = 'nonexistent_tag';

      const response = await request(app).get(`/tools?tag=${tagToFilter}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('create', () => {
    it('should be able to create a new tool', async () => {
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

    it('should be able to throw ApiError when something goes wrong during request body validation', async () => {
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
});