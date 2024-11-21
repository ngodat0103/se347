/////Backend VietDucc learn

import { Hono} from 'hono';
import { handle} from 'hono/vercel';

const app = new Hono().basePath('/api');

app.post("/sign-in", (c) => {
    return c.json({success: "OK"}, 200);
});



export const GET = handle(app);