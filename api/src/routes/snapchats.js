import { Router } from 'express';
import snapchatsController from '../controllers/snapchatsController';
import { catchAsync } from '../middlewares/errors';

export default () => {
    const api = Router();

    api.get('/:slug', catchAsync(snapchatsController.findOne));

    api.get('/', catchAsync(snapchatsController.findAll));

    api.post('/', catchAsync(snapchatsController.create));

    api.put('/:slug', catchAsync(snapchatsController.update));

    api.delete('/:slug', catchAsync(snapchatsController.remove));

    return api;
}
