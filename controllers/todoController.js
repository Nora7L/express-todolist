//todoController 存放路由的js
//取数据需要用到的库
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect("mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos");

//定义数据模板
var todoSchema = new mongoose.Schema({
    item: String
});

//model与数据库中的表建立联系
var Todo = mongoose.model('Todo', todoSchema);

// var items = Todo({item: 'buy flowers'}).save(function (err) {
//     if (err) throw err;
//     console.log('item saved')
// })
// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding ass' }];

module.exports = function(app) {
    app.get('/todo',function(req, res) {
        Todo.find({},function (err,data) {
            if(err) throw err;
            res.render('todo',{todos: data});
        })
    });

    app.post('/todo',urlencodedParser,function(req,res) {
        var items = Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
        
    });

    app.delete('/todo/:item',function(req, res) {
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        Todo.find({ item: req.params.item.replace(/-/g, " ") }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}