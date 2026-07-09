import { z } from 'zod';

export const CalculatorSchema = {
    a: z.number(),
    b: z.number(),
};