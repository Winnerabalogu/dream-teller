import { z } from 'zod';

// Interpretation schema
export const InterpretationSchema = z.object({
  mainThemes: z.array(z.string()).min(1),
  emotionalTone: z.string().min(1),
  symbols: z.array(
    z.object({
      symbol: z.string(),
      meaning: z.string(),
    })
  ),
  personalInsight: z.string().min(1),
  guidance: z.string().min(1),
});

// Dream schema
export const DreamSchema = z.object({
  id: z.string().cuid(),
  date: z.date(),
  text: z.string().min(10, 'Dream must be at least 10 characters'),
  interpretation: InterpretationSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Symbol schema
export const SymbolSchema = z.object({
  id: z.number().int().positive(),
  key: z.string().min(1).max(100),
  meaning: z.string().min(1),
  insight: z.string().nullable().optional(),
  keywords: z.array(z.string()).optional(),
  categoryId: z.number().int().positive().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Reflection schema
export const ReflectionSchema = z.object({
  id: z.string().cuid(),
  dreamId: z.string().cuid(),
  text: z.string().min(1, 'Reflection cannot be empty'),
  createdAt: z.date(),
});

// Category schema
export const CategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
});

// Export/Import data schema
export const ExportDataSchema = z.object({
  dreams: z.array(DreamSchema),
  symbols: z.array(SymbolSchema),
  exportDate: z.string(),
  version: z.string(),
});

// Input validation schemas
export const CreateDreamInputSchema = z.object({
  text: z.string().min(10, 'Dream must be at least 10 characters').max(10000),
});

export const CreateSymbolInputSchema = z.object({
  key: z.string().min(1).max(100).regex(/^[a-z0-9\s-]+$/i, 'Symbol key must be alphanumeric'),
  meaning: z.string().min(1).max(1000),
  insight: z.string().max(1000).optional(),
  keywords: z.array(z.string()).optional(),
  categoryId: z.number().int().positive().default(1),
});

export const UpdateSymbolInputSchema = CreateSymbolInputSchema.partial().extend({
  id: z.number().int().positive(),
});

export const CreateReflectionInputSchema = z.object({
  dreamId: z.string().cuid(),
  text: z.string().min(1).max(5000),
});

export const SearchQuerySchema = z.object({
  query: z.string().min(2).max(200),
});

// Environment variables schema
export const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Helper function to validate environment
export function validateEnv() {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment configuration');
  }
}

// Helper to safely parse JSON
export function parseInterpretation(data: unknown) {
  return InterpretationSchema.safeParse(data);
}
