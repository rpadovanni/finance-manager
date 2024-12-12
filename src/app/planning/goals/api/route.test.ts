/**
 * @jest-environment node
 */
import { GET, POST } from './route';
import { goalMockPayload, goalMock } from '../utils/mocks';
import { prismaMock } from '@/root/jest.setup';

describe('GOALS ROUTES', () => {
  describe('GET /goals', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 200 with a list of goals', async () => {
      // Mock
      (prismaMock.goal.findMany as jest.Mock).mockResolvedValue([goalMock]);

      // Act
      const response = await GET();
      const goals = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(goals).toEqual([goalMock]);
    });

    it('should return a 404 error if no goal is found', async () => {
      // Mock
      (prismaMock.goal.findMany as jest.Mock).mockResolvedValue([]);

      // Act
      const response = await GET();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(404);
      expect(result).toEqual({ error: 'No goals found' });
    });

    it('should return a 500 error if fetching goals fails', async () => {
      // Mock
      (prismaMock.goal.findMany as jest.Mock).mockRejectedValue(
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
      expect(result).toEqual({ error: 'Failed to fetch goals' });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching goals:',
        expect.objectContaining({ message: 'Failed to fetch' }),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('POST /goals', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a 201 with the created goal', async () => {
      // Mock
      (prismaMock.goal.create as jest.Mock).mockResolvedValue(goalMock);

      // Act
      const response = await POST({
        json: async () => goalMockPayload,
      } as Request);
      const goal = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(goal).toEqual(goalMock);
    });

    it('should return a 400 error if missing required fields', async () => {
      // Act
      const response = await POST({ json: async () => ({}) } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(result).toEqual({ error: 'Missing required fields' });
    });

    it('should return a 500 error if creating goal fails', async () => {
      // Mock
      (prismaMock.goal.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create'),
      );
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act
      const response = await POST({
        json: async () => goalMockPayload,
      } as Request);
      const result = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(result).toEqual({ error: 'Failed to create goal' });

      expect(console.error).toHaveBeenCalledWith(
        'Error creating goal:',
        expect.objectContaining({ message: 'Failed to create' }),
      );

      consoleSpy.mockRestore();
    });
  });
});
