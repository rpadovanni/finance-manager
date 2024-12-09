/**
 * @jest-environment node
 */
import { monthlyIncomeMock, monthlyIncomePayloadMock } from '../utils/mocks';
import { PATCH } from './route';
import { prismaMock } from '@/root/jest.setup';

describe('MONTHLY INCOME ROUTES', () => {
  describe('PATCH /monthly-income/:id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 200 with the updated monthly income', async () => {
      // Mock
      (prismaMock.monthlyIncome.findUnique as jest.Mock).mockResolvedValue(
        monthlyIncomeMock,
      );

      (prismaMock.monthlyIncome.update as jest.Mock).mockResolvedValue({
        ...monthlyIncomeMock,
        income: 2000,
      });

      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH(
        { json: async () => monthlyIncomePayloadMock } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(result).toEqual({ ...monthlyIncomeMock, income: 2000 });
    });

    it('should return a 400 error if the ID is invalid', async () => {
      // Mock
      const params = Promise.resolve({ id: 'invalid' });

      // Act
      const response = await PATCH(
        { json: async () => monthlyIncomePayloadMock } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Invalid ID' });
    });

    it('should return a 400 error if a required field is missing', async () => {
      // Mock
      const params = Promise.resolve({ id: '1' });

      // Act
      const response = await PATCH({ json: async () => ({}) } as Request, {
        params,
      });
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required field' });
    });

    it('should return a 404 error if the monthly income is not found', async () => {
      // Mock
      (prismaMock.monthlyIncome.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      const params = Promise.resolve({ id: '2' });

      // Act
      const response = await PATCH(
        { json: async () => monthlyIncomePayloadMock } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'Monthly income not found' });
    });

    it('should return a 500 error if updating the monthly income fails', async () => {
      // Mock
      (prismaMock.monthlyIncome.findUnique as jest.Mock).mockResolvedValue(
        monthlyIncomeMock,
      );

      (prismaMock.monthlyIncome.update as jest.Mock).mockRejectedValue(
        new Error('Failed to update'),
      );

      const params = Promise.resolve({ id: '1' });
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await PATCH(
        { json: async () => monthlyIncomePayloadMock } as Request,
        { params },
      );
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to update monthly income' });

      expect(console.error).toHaveBeenCalledWith(
        'Error updating monthly income:',
        new Error('Failed to update'),
      );

      consoleSpy.mockRestore();
    });
  });
});
