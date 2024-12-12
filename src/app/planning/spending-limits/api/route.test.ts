/**
 * @jest-environment node
 */
import { GET, POST } from './route';
import { prismaMock } from '@/root/jest.setup';
import { spendingLimitMockPayload, spendingLimitMock } from '../utils/mocks';

describe('SPENDING LIMITS ROUTES', () => {
  describe('GET /spending-limits', () => {
    it('should return a 200 with a list of spending limits', async () => {
      // Mock
      (prismaMock.spendingLimit.findMany as jest.Mock).mockResolvedValue([
        spendingLimitMock,
      ]);

      // Act
      const response = await GET();
      const spendingLimits = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(spendingLimits).toEqual([spendingLimitMock]);
    });

    it('should return a 404 error if no spending limit is found', async () => {
      // Mock
      (prismaMock.spendingLimit.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const response = await GET();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'No spending limits found' });
    });

    it('should return a 500 error if fetching spending limits fails', async () => {
      // Mock
      (prismaMock.spendingLimit.findMany as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await GET();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to fetch spending limits' });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching spending limits:',
        new Error('Failed to fetch'),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('POST /spending-limits', () => {
    it('should return a 201 with the created spending limit', async () => {
      // Mock
      (prismaMock.spendingLimit.create as jest.Mock).mockResolvedValue(
        spendingLimitMock,
      );

      // Act
      const response = await POST({
        json: async () => spendingLimitMockPayload,
      } as Request);
      const spendingLimit = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(spendingLimit).toEqual(spendingLimitMock);
    });

    it('should return a 400 error if missing required fields', async () => {
      // Act
      const response = await POST({ json: () => ({}) } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required fields' });
    });

    it('should return a 500 error if creating spending limit fails', async () => {
      // Mock
      (prismaMock.spendingLimit.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await POST({
        json: async () => spendingLimitMockPayload,
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to create spending limit' });

      expect(console.error).toHaveBeenCalledWith(
        'Error creating spending limit:',
        new Error('Failed to create'),
      );

      consoleSpy.mockRestore();
    });
  });
});
