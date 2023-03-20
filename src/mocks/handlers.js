import { rest } from 'msw'
import itemsObj from '../utilities/data';

export const handlers = [
  rest.get('/items', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(itemsObj)
    )
  }),
]