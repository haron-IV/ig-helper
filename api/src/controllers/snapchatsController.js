import Snap from '../models/snapchat';

export default {
    async findOne(req, res, next){
        const snap = await Snap.findOne({slug: req.params.lug});

        if(!snap) return next();
        return res.status(200).send({data: snap});
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

    async update(req, res, next){},

    async remove(req, res, next){}
}