import { z } from 'zod';

export const EchoSchema = {
    message: z.string().min(1),
};