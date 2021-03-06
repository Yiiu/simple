"use strict";
var mongoose = require("../db");
var Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

var commentSchema = Schema ({
    /* 谁评论 */
    from : {
        admin:{
            type:ObjectId,
            ref:"user",
        },
        user:{
            type:Object,
        }
    },
    /* 评论谁*/
    reply:{
        type:ObjectId,
        ref:'comment'
    },
    /* 评论的文章 */
    article : {
        required : true,
        type: ObjectId,
        ref:"article"
    },
    /* 内容 */
    content : {
        type : String,
        default : ''
    },
    /* 评论时间 */
    create_time : {
        type : Date,
        default : Date.now
    },
    time:[{
        type:String,
        default: ""
    }],
    os:{
        type : String
    }
})

let comment = mongoose.model("comment", commentSchema)

comment.add = (data, callback) => {
    return comment.create(data)
}

comment.finds = (article) => {
    return comment.find({article:article})
    .lean()
    .where("reply").exists(false)
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}

comment.findChild = (id) => {
    return comment.find()
    .where("reply").equals(id)
    .lean()
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}

comment.findsChildNum = (id) => {
    return comment.count()
    .where("reply").equals(id)
    .lean()
    .exec()
}

comment.findsChild = (article) => {
    return comment.find({article:article})
    .lean()
    .where("reply").exists(true)
    .populate({
        path: "from.admin",
        select: "name _id profile emailmd5"
    })
    .sort({'create_time':-1})
    .exec()
}

module.exports = comment