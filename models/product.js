"use strict";

const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name            : { type: String, required: true }
  , category        : { type: String, required: true }
  , supply          : { type: Number }
  , picUrl          : { type: String }
  , picUrlSq        : { type: String }
  , avatarUrl       : { type: String }
  , emailAddress     : { type: String, required: true}
  , description     : { type: String, minlength: 10, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
