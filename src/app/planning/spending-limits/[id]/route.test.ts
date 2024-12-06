/**
 * @jest-environment node
 */
import { GET, PATCH, DELETE } from './route';
import { prismaMock } from '@/root/jest.setup';
import {
  spendingLimitMockResponse,
  spendingLimitPatchMockPayload,
} from '../utils/mocks';

describe('SPENDING LIMITS ROUTES', () => {
  describe('GET /spending-limits/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a spending limit with status 200', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual(spendingLimitMockResponse);
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

    it('should return a 404 error if spending limit is not found', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Spending limit not found' });
    });

    it('should return a 500 error if fetching the spending limit fails', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch spending limit'),
      );
      const params = Promise.resolve({ id: '1' });

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await GET({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to fetch spending limit' });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching spending limit:',
        expect.objectContaining({ message: 'Failed to fetch spending limit' }),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('PATCH /spending-limits/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update a spending limit and return it with status 200', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );
      (prismaMock.spendingLimit.update as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => spendingLimitPatchMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual(spendingLimitMockResponse);
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Mock
      const params = Promise.resolve({ id: 'invalid' });

      // Act
      const response = await PATCH(
        { json: async () => spendingLimitPatchMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 404 error if spending limit is not found', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await PATCH(
        { json: async () => spendingLimitPatchMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Spending limit not found' });
    });

    it('should return a 500 error if updating the spending limit fails', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );
      (prismaMock.spendingLimit.update as jest.Mock).mockRejectedValue(
        new Error(),
      );
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => spendingLimitPatchMockPayload } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to update spending limit' });
    });
  });

  describe('DELETE /spending-limits/{id}', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete a spending limit and return it with status 200', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );

      (prismaMock.spendingLimit.delete as jest.Mock).mockResolvedValue({
        message: 'Spending limit deleted',
      });

      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual(
        expect.objectContaining({ message: 'Spending limit deleted' }),
      );
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

    it('should return a 404 error if spending limit is not found', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await DELETE({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Spending limit not found' });
    });

    it('should return a 500 error if deleting the spending limit fails', async () => {
      // Mock
      (prismaMock.spendingLimit.findUnique as jest.Mock).mockResolvedValue(
        spendingLimitMockResponse,
      );

      (prismaMock.spendingLimit.delete as jest.Mock).mockRejectedValue(
        new Error('Failed to delete spending limit'),
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
      expect(result).toEqual({ error: 'Failed to delete spending limit' });

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting spending limit:',
        expect.objectContaining({ message: 'Failed to delete spending limit' }),
      );

      consoleSpy.mockRestore();
    });
  });
});
