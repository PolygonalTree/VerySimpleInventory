
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

exports.index = function (req, res) {
    console.log(req.body.search);
    if(req.body.search !=='' && typeof(req.body.search)!=='undefined'){
        var query = Item.find({$or:[{ 'description': req.body.search },{ 'name': req.body.search }]});
        query.exec(function(err, items){
            if( err ) return next( err );
            console.log(items);
            console.log(items.length);
            res.render('index', { 
                title : 'Simple Inventory',
                items : items,
                count : items.length
            });
        });
    }else{
        console.log("por el forro");
        Item.find(function(err,items, count){
            if( err ) return next( err );
            res.render('index', { 
                title : 'Simple Inventory',
                items : items,
                count : count
            });
        });
    }; 
};

exports.create = function (req, res){
    new Item({
        name        : req.body.name,
        part_number : req.body.part_number,
        description : req.body.description,
        vendor      : req.body.vendor,
        updated_at  : Date.now()
    }).save(function(err, item, count){
        if( err ) return next( err );
        res.redirect('/')
    });
};

exports.destroy = function(req, res){
    Item.findById(req.params.id, function(err, item){
        if( err ) return next( err );
        item.remove(function(err,item){
            if( err ) return next( err );
            res.redirect('/');
        });
    });
};

exports.edit = function (req, res){
    Item.findOne({_id:req.params.id},function(err,item){
        if( err ) return next( err );
        res.render('edit',{
            title : 'Simple Inventory',
            item : item,
            current: req.params.id
        });
    });
};

exports.update = function(req,res){
    Item.findById(req.params.id, function(err,item){
        if( err ) return next( err );
        item.name = req.body.name;
        item.description = req.body.description;
        item.stock = req.body.stock;
        item.part_number = req.body.part_number;
        item.vendor = req.body.vendor;
        item.updated_at = Date.now();
        item.save(function(err,item){
            if( err ) return next( err );
            res.redirect('/');
        });
    });
};