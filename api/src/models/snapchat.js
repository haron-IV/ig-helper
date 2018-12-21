import mongoose from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const Snap = mongoose.Schema({
    title: String,
    snapchats: Object
},{
    timestamps: true
});

Snap.plugin(URLSlugs('title', {field: 'slug', update: true}));

export default mongoose.model('Snap', Snap);