/**
 * @jest-environment node
 */
import { PATCH } from './route';
import { prismaMock } from '@/root/jest.setup';
import {
  incomeDistributionMock,
  incomeDistributionPatchPayloadMock,
} from '../../utils/mocks';

describe('MONTHLY INCOME DISTRIBUTION ROUTES', () => {
  describe('PATCH /monthly-income/distribution/[id]', () => {
    it('should return a 200 with the updated income distribution', async () => {
      // Mock
      (prismaMock.incomeDistribution.findUnique as jest.Mock).mockResolvedValue(
        {
          ...incomeDistributionMock,
          percentage: 40,
        },
      );

      (prismaMock.incomeDistribution.findMany as jest.Mock).mockResolvedValue([
        {
          ...incomeDistributionMock,
          percentage: 40,
        },
      ]);

      (prismaMock.incomeDistribution.update as jest.Mock).mockResolvedValue({
        ...incomeDistributionMock,
        percentage: 60,
      });

      // Act
      const response = await PATCH(
        { json: async () => ({ percentage: 60, amount: 500 }) } as Request,
        { params: Promise.resolve({ id: '1' }) },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual({
        ...incomeDistributionMock,
        percentage: 60,
      });
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Act
      const response = await PATCH({ json: async () => ({}) } as Request, {
        params: Promise.resolve({ id: 'invalid' }),
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 400 error if a required field is missing', async () => {
      // Mock
      (prismaMock.incomeDistribution.findUnique as jest.Mock).mockResolvedValue(
        {},
      );

      // Act
      const response = await PATCH({ json: async () => ({}) } as Request, {
        params: Promise.resolve({ id: '1' }),
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required field(s)' });
    });

    it('should return a 400 error if the total percentage exceeds 100%', async () => {
      // Mock
      (prismaMock.incomeDistribution.findUnique as jest.Mock).mockResolvedValue(
        incomeDistributionMock,
      );

      (prismaMock.incomeDistribution.findMany as jest.Mock).mockResolvedValue([
        { ...incomeDistributionMock, percentage: 60 },
        { ...incomeDistributionMock, percentage: 40, id: 2 },
      ]);

      // Act
      const response = await PATCH(
        { json: async () => ({ percentage: 65, amount: 500 }) } as Request,
        { params: Promise.resolve({ id: '1' }) },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Total percentage exceeds 100%' });
    });

    it('should return a 404 error if the income distribution is not found', async () => {
      // Mock
      (prismaMock.incomeDistribution.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      // Act
      const response = await PATCH({ json: async () => ({}) } as Request, {
        params: Promise.resolve({ id: '1' }),
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Monthly distribution not found' });
    });

    it('should return a 500 error if updating an income distribution fails', async () => {
      // Mock
      (prismaMock.incomeDistribution.findUnique as jest.Mock).mockResolvedValue(
        incomeDistributionMock,
      );

      (prismaMock.incomeDistribution.update as jest.Mock).mockRejectedValue(
        new Error('Failed to update income distribution'),
      );

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => incomeDistributionPatchPayloadMock } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to update income distribution' });

      expect(console.error).toHaveBeenCalledWith(
        'Error updating income distribution:',
        new Error('Failed to update income distribution'),
      );

      consoleSpy.mockRestore();
    });
  });
});
