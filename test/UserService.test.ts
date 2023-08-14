import { userService } from '../src/services/UserService';
import { userRepository } from '../src/repositories/UserRepository';

// Mocking dependencies
const mockFindByEmail = jest.fn();
const mockCreateUser = jest.fn();



describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    userRepository.findByEmail = mockFindByEmail;
    userRepository.createUser = mockCreateUser;


  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const createdUser = {
        _id: 'user123',
        ...newUser,
      };

      mockCreateUser.mockResolvedValue(createdUser);

      const result = await mockCreateUser(newUser);

      expect(mockCreateUser).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const userEmail = 'test@example.com';

      const foundUser = {
        _id: 'user123',
        name: 'Test User',
        email: userEmail,
        password: 'hashed_password',
      };

      mockFindByEmail.mockResolvedValue(foundUser);

      const result = await userService.findUserByEmail(userEmail);

      expect(mockFindByEmail).toHaveBeenCalledWith(userEmail);
      expect(result).toEqual(foundUser);
    });

    it('should return null if user is not found by email', async () => {
      const userEmail = 'nonexistent@example.com';

      mockFindByEmail.mockResolvedValue(null);

      const result = await userService.findUserByEmail(userEmail);

      expect(mockFindByEmail).toHaveBeenCalledWith(userEmail);
      expect(result).toBeNull();
    });
  });
});
