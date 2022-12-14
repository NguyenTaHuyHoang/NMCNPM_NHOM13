const mongoose = require("mongoose");
// include lug generator
const slug = require("mongoose-slug-generator");
//include Mongoose delete
const mongoose_delete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Admin = new Schema({
    name: { type: String },
    email: { type: String },
    image: { type: String },
    address: { type: String },
    password: { type: String },
    // this code support generator slug
    slug: { type: String, slug: 'name', maxLength: 300, unique: true },
}, {
    collection: 'Admin',
    timestamps: true,
});


// add plugin course
Admin.plugin(mongoose_delete, {
    deleteAt: true,
    overrideMethods: 'all'
});
mongoose.plugin(slug);

module.exports = mongoose.model("Admin", Admin);
