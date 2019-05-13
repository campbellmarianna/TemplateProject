"use strict";

const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name            : { type: String, required: true }
  , category         : { type: String }
  , supply        : { type: Date }
  , picUrl          : { type: String }
  , picUrlSq        : { type: String }
  , description     : { type: String }
},
{
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
