'use strict';

/*
 * mongoose的Schema
 * 17.5.1 by lwk
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//binary JSON
/*
    {
        name:node,
        id:0
    }
    {
        title:test,
        
    }
*/
var categorySchema = new Schema({
    name: String,
    id: String
});
var blogSchema = new Schema({
    title: String,
    content: String,
    rawContent: String,
    category: categorySchema,
    data: String
}, {
    id: false,
    strict: false
});
module.exports = {
    blogSchema: blogSchema,
    categorySchema: categorySchema
};