const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRepository = require("../infrastructure/userRepository");

function validateRegisterData(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Datos de registro incompletos");
  }

  if (password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
}

async function register(data) {
  const {
    name,
    email,
    password
  } = data;

  validateRegisterData(name, email, password);

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userId = await userRepository.create({
    name,
    email,
    passwordHash,
    role: "CUSTOMER"
  });

  return {
    id: userId,
    name,
    email,
    role: "CUSTOMER"
  };
}

async function login(data) {
  const {
    email,
    password
  } = data;

  if (!email || !password) {
    throw new Error("Email y contraseña requeridos");
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
}

module.exports = {
  register,
  login
};