import { Router } from 'express';
import {
  createUserHandler,
  readAllUsersHandler,
  readUserByIdHandler,
} from '../handlers/users';

const usersRouter = Router();

// CREATE ----------------------------------------------------------------------

// `POST /api/users`
usersRouter.post('/', createUserHandler);

// READ ------------------------------------------------------------------------

// `GET /api/users`
usersRouter.get('/', readAllUsersHandler);

// `GET /api/users/:id`
usersRouter.get('/:id', readUserByIdHandler);

// UPDATE ---------------------------------------------------------------------

// `PUT /api/users/:id`

// `PATCH /api/users/:id`

// DELETE ---------------------------------------------------------------------

// `DELETE /api/users/:id`

export default usersRouter;