var db = require("../models");

module.exports = function(app) {
	// Route for getting all burgers
	app.get('/api/daburgers', function(req,res){
		db.Daburger.findAll({}).then(function(daburgers){
			res.json(daburgers);
		});
	});

	app.post('/api/daburgers', function(req, res){
		db.Daburger.create({
			name: req.body.name,
			devour: req.body.devour
		}).then(function(daburgers){
			res.json(daburgers);
		});
	});

	app.delete('/api/daburgers/:id',function(req,res){
		db.Daburger.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(daburgers){
			res.json(daburgers);
		});
	});

	app.put('/api/daburgers', function(req,res){
		db.Daburger.update({
			name: req.body.name,
			devour: req.body.devour
		}, {
			where: {
				id: req.body.id
			}
		}).then(function(daburgers){
			res.json(daburgers);
		});
	});


};
