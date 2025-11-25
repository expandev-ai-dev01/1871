import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string('Nome é obrigatório')
    .min(1, 'Nome não pode estar vazio')
    .max(200, 'Nome muito longo (máximo 200 caracteres)'),
  email: z.string('Email é obrigatório').email('Email inválido'),
  password: z
    .string('Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(100, 'Senha muito longa (máximo 100 caracteres)'),
});
