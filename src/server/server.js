var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var app = express();
var MongoClient = require('mongodb').MongoClient, assert = require("assert");
var url = 'mongodb://localhost:27017/contacts';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var ObjectId = require('mongodb').ObjectID;

app.use(cors());

MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");

  app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  });

  app.get('/contacts', function(req, res) {
    getContacts(function(contacts) {
      contacts = sortingContacts(contacts);
      res.end(contacts);
    });
  });

  app.get('/unsortedContacts', function(req, res) {

    getContacts(function(data) {
      res.end(data);
    });
  });

  app.post('/addContact', function(req,res) {
    // var contacts = getContacts();
    // var id;
    // contacts = JSON.parse(contacts);
    // if(contacts.contacts[0] != undefined) {
    //   id = Number(contacts.contacts[contacts.contacts.length - 1].id) + 1;
    // } else {
    //   id = 0;
    // }
    // req.body.id = id;
    // contacts.contacts.push(req.body);
    // contacts = JSON.stringify(contacts);
    // fs.writeFileSync('./contacts.json', contacts);

    var collection = db.collection('contacts');
    insertContact(function() {
      res.end();
    });

    function insertContact(callback) {
      collection.insertOne(req.body, function(err, result) {
        callback(result);
      });
    }


  });

  app.delete('/deleteContact/:id', function(req, res) {
    // var data = getContacts();
    // data = JSON.parse(data);
    // var index = findContactIndex(req.params.id, data);
    // data.contacts.splice(index, 1);
    // data = JSON.stringify(data);
    // fs.writeFileSync('./contacts.json', data);
    var collection = db.collection('contacts');

    deleteContact(function() {
      res.end();
    });

    function deleteContact(callback) {
      collection.deleteOne({ _id: new ObjectId(req.params.id) }, function(err, result) {
        callback();
      })
    }
  });

  app.put('/sortContacts/:searchParam', function(req, res) {
    var newContacts = {contacts:[]};
    // var contacts = getContacts();
    // contacts = JSON.parse(contacts);
    // for(var i = 0; i < contacts.contacts.length; i++) {
    //   for(var j in contacts.contacts[i]) {
    //     if(j == 'firstName' || j == 'lastName') {
    //       if(contacts.contacts[i][j].toLowerCase().indexOf(req.params.searchParam.toLowerCase()) != -1 ) {
    //         newContacts.contacts.push(contacts.contacts[i]);
    //         break;
    //       }
    //     }
    //   }
    // }
    // newContacts = JSON.stringify(newContacts);
    var searchParam = req.params.searchParam;
    var collection = db.collection('contacts');
    searchContacts(function(data) {
      data = JSON.stringify(data);
      newContacts = sortingContacts(data);
      res.end(newContacts);
    });

    function searchContacts(callback) {
      collection.find(
        {
          $or: [
            {
              firstName: { $regex: new RegExp("^" + searchParam, "i") }
            },
            {
              lastName: { $regex: new RegExp("^" + searchParam, "i") }
            }
          ]
        }
      ).toArray(function(err, contact) {
        var contacts = {contacts: contact};
        callback(contacts);
      })

    }




  });

  app.put('/editContact', function(req, res) {
    // var contact = JSON.stringify(req.body);
    // fs.writeFileSync('./contacts.json', contact);
    var collection = db.collection('contacts');

    updateContact(function() {
      res.end();
    });


    function updateContact(callback) {
      collection.updateOne({ _id: new ObjectId(req.body._id) },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
          }
        },
        function(err, result) {
            callback();
        }
      )
    }

  });



  function getContacts(callback) {
    //var contacts = fs.readFileSync('./contacts.json', 'utf-8');

    // Get the contacts collection
    var collection = db.collection('contacts');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      var contacts = {
        contacts: docs
      };
      callback(JSON.stringify(contacts));
    });

  }

  function sortingContacts(contacts) {
    contacts = JSON.parse(contacts);
    for(var i = 0; i < contacts.contacts.length; i++) {
      for(var j = 0; j < contacts.contacts.length - 1; j++) {
        var place;
        if(contacts.contacts[j].firstName.toLowerCase() == contacts.contacts[j + 1].firstName.toLowerCase()) {
          if(contacts.contacts[j].lastName.toLowerCase() > contacts.contacts[j + 1].lastName.toLowerCase()) {
            place = contacts.contacts[j];
            contacts.contacts[j] = contacts.contacts[j + 1];
            contacts.contacts[j + 1] = place;
          }
        }
        else if(contacts.contacts[j].firstName.toLowerCase() > contacts.contacts[j + 1].firstName.toLowerCase()) {
          place = contacts.contacts[j];
          contacts.contacts[j] = contacts.contacts[j + 1];
          contacts.contacts[j + 1] = place;
        }
      }
    }
    contacts = JSON.stringify(contacts);
    return contacts;
  }

  // function findContactIndex(id, data) {
  //   for(var i = 0; i < data.contacts.length; i++) {
  //     if(data.contacts[i].id == id) {
  //       return i;
  //     }
  //   }
  // }

});




app.listen(3000, function(){console.log("listening on port 3000")});
