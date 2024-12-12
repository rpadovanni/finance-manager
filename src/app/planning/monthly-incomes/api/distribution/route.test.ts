/**
 * @jest-environment node
 */
import { POST } from './route';
import { prismaMock } from '@/root/jest.setup';
import {
  incomeDistributionMock,
  incomeDistributionPayloadMock,
} from '../../utils/mocks';

describe('MONTHLY INCOME DISTRIBUTION ROUTES', () => {
  describe('POST /monthly-incomes/distribution', () => {
    it('should return a 201 with the created income distribution', async () => {
      // Mock
      (prismaMock.incomeDistribution.findMany as jest.Mock).mockResolvedValue([
        incomeDistributionMock,
      ]);
      (prismaMock.incomeDistribution.create as jest.Mock).mockResolvedValue(
        incomeDistributionMock,
      );

      // Act
      const response = await POST({
        json: async () => incomeDistributionPayloadMock,
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(result).toEqual(incomeDistributionMock);
    });

    it('should return a 400 error if a required field is missing', async () => {
      // Act
      const response = await POST({ json: () => ({}) } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required field(s)' });
    });

    it('should return a 400 error if the total percentage exceeds 100%', async () => {
      // Mock
      (prismaMock.incomeDistribution.findMany as jest.Mock).mockResolvedValue([
        { ...incomeDistributionMock, percentage: 50 },
      ]);

      // Act
      const response = await POST({
        json: async () => ({
          ...incomeDistributionPayloadMock,
          percentage: 51,
        }),
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Total percentage exceeds 100%' });
    });

    it('should return a 500 error if creating an income distribution fails', async () => {
      // Mock
      (prismaMock.incomeDistribution.findMany as jest.Mock).mockResolvedValue([
        incomeDistributionMock,
      ]);
      (prismaMock.incomeDistribution.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await POST({
        json: async () => incomeDistributionPayloadMock,
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to create income distribution' });

      expect(console.error).toHaveBeenCalledWith(
        'Error creating income distribution:',
        new Error('Failed to create'),
      );

      consoleSpy.mockRestore();
    });
  });
});
