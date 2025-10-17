import usersData from "../data/users";

export const getUserById = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  return usersData.find((user) => user.id === id) || null;
};

export const getAllUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  return usersData;
};
