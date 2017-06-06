/*
 * mongoose的Schema
 * 17.5.1 by lwk
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
let categorySchema = new Schema({
    name:String,
    id:String
})
let blogSchema = new Schema({
    title:String,
    content:String,
    rawContent:String,
    category:categorySchema,
    data:String
},{
    id:false,
    strict:false
})
module.exports = {
    blogSchema,
    categorySchema
}