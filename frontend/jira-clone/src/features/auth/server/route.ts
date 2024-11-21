import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono()
  .post(
    '/sign-in',
    zValidator(
      'json',
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    ),
    (c) => {
      // Trả về mã 200 (thành công) và thông báo success
      return c.json({ success: 'OK' }, 200);
    }
  );

export default app;
