import usersData from '../data/users.json'

export const getUserById = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
  return usersData.find(user => user.id === id) || null;
};