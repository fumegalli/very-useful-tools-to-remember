import request from 'supertest';
import { app } from '../../src/app';
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
      expect(response.body[0].id).toEqual(expect.any(String));
    });
  });
});