var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
app.use(bodyParser.json());

var mysql = require('mysql');
function getConnection() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list'
  });
  return connection;
}

app.listen(3300, function () {
  console.log('Lijst app on port 3300');
});

/*LOGIN*/
app.post('/api/login', function(req, res) {
	console.log('in /login');
	var connection = getConnection();
	connection.connect();

	var user = req.body.user;
	var password = req.body.password;

	var query = connection.query('select password from users where user = ?', user, function (err, result) {
		if (result.length) {
		  if (result[0].password == password) {
	        console.log('valid');
	        res.send({ 'result': 'valid', 'user': user });
	      }
	      else {
	        console.log('password is fout');
	        res.status(401).send({ 'result': 'invalid password' });
	      }
		} 
		else{
			console.log('password is fout');
			res.status(401).send({ 'result': 'invalid username' });
		}     


    });

	connection.end();
});


/*REGISTER*/
app.post('/api/checkUserExists', function(req, res) {
	console.log('in /checkUserExists');
	var connection = getConnection();
	connection.connect();

	var user = req.body.user;

	var query = connection.query('select * from users where user = ?', user, function (err, result) {
		if (result.length) {
		  res.send({ 'result': 'username exists' });
		} 
		else{
			res.send({ 'result': 'valid' });
		}     
    });

	connection.end();
});

app.post('/api/register', function(req, res) {
	console.log('in /register');
	
	var connection = getConnection();
	connection.connect();

	console.log(req.body);

	var query = connection.query('INSERT INTO users SET ?', req.body, function (err, result) {
		if(!err) {
			res.status(200).end();			
		}
		else {
			res.send(err);
		}
	});

	connection.end();
});


/*LIST PAGE*/
app.get('/api/listitems', function(req, res) {
  console.log('in /listitems')

  var connection = getConnection();
  connection.connect();

  connection.query('SELECT * from list', function (err, rows, fields) {
    if (!err) {
      // console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
});


app.post('/api/savedone', function(req, res) {
	console.log('in /savedone');
	// console.log(req.body.startTijd);
	var connection = getConnection();
	connection.connect();

	var done = req.body.done;

	done = done === false ? 0 : 1;

	var query = connection.query('UPDATE list SET done =' + done + ' WHERE id = ' + req.body.id, function (err, result) {
		res.status(200).end();
	});

	connection.end();
});

app.post('/api/addtask', function(req, res) {
	console.log('in /addtask');
	
	var connection = getConnection();
	connection.connect();

	var query = connection.query('INSERT INTO list SET ?', req.body, function (err, result) {
		res.status(200).end();
	});

	connection.end();
});

app.delete('/api/deletelistitem', function(req, res) {
	console.log('in /deletelistitem');
	
	var connection = getConnection();
	connection.connect();

	var id = req.body.id;

	connection.query('DELETE from list where id = ?', id, function (err, rows, fields) {
		res.status(200).end();
	});

	connection.end();
});

app.post('/api/updatelistitem', function(req, res) {
	console.log('in /updatelistitem');
	
	var connection = getConnection();
	connection.connect();

	var taak = req.body.taak;

	var query = connection.query('UPDATE list SET taak ="' + taak + '" WHERE id = ' + req.body.id + ';', function (err, result) {
		res.status(200).end();
	});


	connection.end();
});

app.delete('/api/deletealllistitem', function(req, res) {
	console.log('in /deletealllistitem');
	
	var connection = getConnection();
	connection.connect();

	var query = connection.query('DELETE from list where done = 1', function (err, result) {
		res.status(200).end();
	});

	connection.end();
});


/*
*
*     Routing regelen
*
*/

// app.use(express.static("build"));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'kalender/dist/index.html'));
// });



