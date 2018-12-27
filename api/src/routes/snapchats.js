import { Router } from 'express';
import { catchAsync } from '../middlewares/errors';
import snapchatsController from '../controllers/snapchatsController';

export default () => {
    const api = Router();

    api.get('/:slug', catchAsync(snapchatsController.findOne));

    api.get('/', catchAsync(snapchatsController.findAll));

    api.post('/', catchAsync(snapchatsController.create));

    api.put('/:slug', catchAsync(snapchatsController.update));

    api.delete('/', catchAsync(snapchatsController.remove));

    return api;
}
