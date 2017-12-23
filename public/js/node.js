var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require('./tracking-a9eaadfb70b9.json');
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tracking-bc45d.firebaseio.com"
});


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'new_blako'
});

//connection.connect();

var db = admin.database();
var ref = db.ref("posiciones/trip1");
// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function(snapshot) {
  var position=snapshot.val();
  var sql="INSERT INTO positions (lat,lng,created_at,trip_id) VALUES('"+position.lat+"','"+position.lng+"','"+position.created_at+"','trip1');";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

//connection.end();