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
});