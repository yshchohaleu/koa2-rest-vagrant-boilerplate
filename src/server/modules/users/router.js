import { ensureUser } from '../../middleware/validators'
import * as user from './controller';

export const baseUrl = '/users';

export default [
    {
        method: 'POST',
        route: '/',
        handlers: [
            user.create
        ]
    },
    {
        method: 'GET',
        route: '/',
        handlers: [
            ensureUser,
            user.get
        ]
    },
    {
        method: 'GET',
        route: '/:id',
        handlers: [
            ensureUser,
            user.getById
        ]
    },
    {
        method: 'PUT',
        route: '/:id',
        handlers: [
            ensureUser,
            user.update
        ]
    },
    {
        method: 'DELETE',
        route: '/:id',
        handlers: [
            ensureUser,
            user.remove
        ]
    }
]
