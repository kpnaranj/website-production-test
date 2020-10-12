//to export more than one control or method we use
//exports.
exports.time = (req, res)=>{
    res.json({time:Date().toString()});
};
