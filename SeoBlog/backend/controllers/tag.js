const Tag = require('../models/tag');
const slugify = require('slugify');
const {errorHandler} = require('../helpers/dbErrorHandle');

exports.create = (req,res)=>{
    const {name} = req.body;
    
    let slug = slugify(name).toLowerCase();
    
    let tag = new Tag({name, slug});
    
    tag.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json(data);
    })

}

exports.list = (req,res)=>{
    Tag.find({}).exec((err, tags)=>{
        if(err){
            return res.status(400).json(
                    { error: errorHandler(err) }
                )
        }
        res.json(tags);
    })
}

exports.read = (req,res)=>{
    const slug = req.params.slug.toLowerCase();
    
    Tag.findOne({slug}).exec((err, tag)=>{
    
        if(err){
            return res.status(400).json(
                    { error: 'Tag not found' }
                )
        }
        res.json(tag);
    })  
}

exports.remove = (req,res)=>{
    const slug = req.params.slug.toLowerCase();
    
    Category.findOneAndRemove({slug}).exec((err, tag_rem)=>{
    
        if(err){
            return res.status(400).json(
                    { error: errorHandler(err) }
                )
        }
        res.json({
            message: 'Category deleted succesfully'
        });
    })  
}