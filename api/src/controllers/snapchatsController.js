import Snap from '../models/snapchat';

export default {
    async findOne(req, res, next){
        const snap = await Snap.findOne({ slug: req.params.slug });
        if (!snap) return next();
        return res.status(200).send({ data: snap });
    },

    async findAll(req, res){
        const snaps = await Snap.find().sort({createdAt: 'desc'});
        return res.status(200).send({data: snaps});
    },

    async create(req, res){
        const snap = await new Snap({
            title: req.body.title,
            snapchats: req.body.snapchats
        }).save();

        return res.status(201).send({data: snap, message: 'created.'})
    },

    async update(req, res, next){
        const snap = await Snap.findOne({ slug: req.params.slug });

        if(!snap) return next();
        snap.snapchats = req.body.snapchats;
        
        await snap.save();
        return res.status(200).send({data: snap, message: 'updated'});
    },

    async remove(req, res, next) {
        const snaps = await Snap.find().sort({ createdAt: 'desc' });
        if (!snaps) return next();
        await snaps.remove();

        return res.status(200).send({ message: `Song was removed` });
    }
}