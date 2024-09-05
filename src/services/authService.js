// services/authService.js
import bcrypt from 'bcryptjs';

export const authService = {
  async register(email, password, userDetails) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const newUser = {
      email,
      password: hashedPassword,
      ...userDetails,
      registrationTime: new Date().toLocaleString(),
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  },

  async login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  async logout() {
    console.log('User logged out');
  }
};
