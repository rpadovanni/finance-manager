/**
 * @jest-environment node
 */
import { GET, PATCH, DELETE } from './route';
import { prismaMock } from '@/root/jest.setup';
import {
  goalMockPayload,
  goalMockResponse,
  patchMockPayload,
} from '../utils/mocks';

describe('GOALS ROUTES', () => {
  describe('GET /goals/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a goal with status 200', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(
        goalMockResponse,
      );
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual(goalMockResponse);
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Mock
      const params = Promise.resolve({ id: 'invalid' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 404 error if goal is not found', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(null);
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Goal not found' });
    });

    it('should return a 500 error if fetching the goal fails', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch goal'),
      );

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to fetch goal' });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching goal:',
        expect.objectContaining({ message: 'Failed to fetch goal' }),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('PATCH /goals/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update a goal and return it with status 200', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(
        goalMockResponse,
      );
      (prismaMock.goal.update as jest.Mock).mockResolvedValue(goalMockResponse);
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => goalMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual(goalMockResponse);
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Mock
      const params = Promise.resolve({ id: 'invalid' });

      // Act
      const response = await PATCH(
        { json: async () => goalMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 404 error if goal is not found', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(null);
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await PATCH(
        { json: async () => goalMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Goal not found' });
    });

    it('should return a 500 error if updating the goal fails', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(
        goalMockResponse,
      );
      (prismaMock.goal.update as jest.Mock).mockRejectedValue(
        new Error('Failed to update goal'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => patchMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to update goal' });

      expect(console.error).toHaveBeenCalledWith(
        'Error updating goal:',
        expect.objectContaining({ message: 'Failed to update goal' }),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('DELETE /goals/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete a goal and return a message with status 200', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(
        goalMockResponse,
      );
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual({ message: 'Goal deleted' });
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Mock
      const params = Promise.resolve({ id: 'invalid' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 404 error if goal is not found', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(null);
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Goal not found' });
    });

    it('should return a 500 error if deleting the goal fails', async () => {
      // Mock
      (prismaMock.goal.findUnique as jest.Mock).mockResolvedValue(
        goalMockResponse,
      );
      (prismaMock.goal.delete as jest.Mock).mockRejectedValue(
        new Error('Failed to delete goal'),
      );

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to delete goal' });

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting goal:',
        expect.objectContaining({ message: 'Failed to delete goal' }),
      );

      consoleSpy.mockRestore();
    });
  });
});
