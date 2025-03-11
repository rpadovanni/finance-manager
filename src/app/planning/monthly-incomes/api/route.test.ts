/**
 * @jest-environment node
 */
import { GET, POST } from './route';
import { prismaMock } from '@/root/jest.setup';
import { monthlyIncomeMock, monthlyIncomePayloadMock } from '../utils/mocks';

describe('MONTHLY INCOME ROUTES', () => {
  describe('GET /monthly-incomes', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 200 with a list of monthly incomes', async () => {
      // Mock
      (prismaMock.monthlyIncome.findMany as jest.Mock).mockResolvedValue([
        monthlyIncomeMock,
      ]);

      // Act
      const response = await GET();
      const monthlyIncomes = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(monthlyIncomes).toEqual([monthlyIncomeMock]);
    });

    it('should return a 404 error if no monthly income is found', async () => {
      // Mock
      (prismaMock.monthlyIncome.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const response = await GET();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'No monthly income found' });
    });

    it('should return a 500 error if fetching monthly incomes fails', async () => {
      // Mock
      (prismaMock.monthlyIncome.findMany as jest.Mock).mockRejectedValue(
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
      expect(result).toEqual({ error: 'Failed to fetch monthly income' });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching monthly incomes:',
        new Error('Failed to fetch'),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('POST /monthly-incomes', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 201 with the created monthly income', async () => {
      // Mock
      (prismaMock.monthlyIncome.create as jest.Mock).mockResolvedValue(
        monthlyIncomeMock,
      );

      // Act
      const response = await POST({
        json: async () => monthlyIncomePayloadMock,
      } as Request);
      const monthlyIncome = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(monthlyIncome).toEqual(monthlyIncomeMock);
    });

    it('should return a 400 error if required fields are missing', async () => {
      // Act
      const response = await POST({ json: async () => ({}) } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required field(s)' });
    });

    it('should return a 500 error if creating monthly income fails', async () => {
      // Mock
      (prismaMock.monthlyIncome.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await POST({
        json: async () => monthlyIncomePayloadMock,
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to create monthly income' });

      expect(console.error).toHaveBeenCalledWith(
        'Error creating monthly income:',
        new Error('Failed to create'),
      );

      consoleSpy.mockRestore();
    });
  });
});
