'use strict';

var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var User = mongoose.model('Users');

exports.register = function (req, res) {
    var requestUser = new User(req.body);
    User.findOne({username: requestUser.username}, function(err, user) {
        if(err) {
            return res.status(400).send({ message: err.message });
        }
        if(user !== null) {
            return res.status(400).send({ message: "Username taken." });
        }
        requestUser.password = passwordHash.generate(requestUser.password);
        requestUser.save(function (err, user) {
            if(err) {
                return res.status(400).send({ message: err.message });
            }
            var session = req.session;
            session.userId = user._id;
            return res.status(201).json({userId: user._id, username: user.username});
        });
    });
};

exports.login = function (req, res) {
    var requestUser = new User(req.body);
    User.findOne({username: requestUser.username}, function(err, user) {
        if(err) {
            return res.status(400).send({ message: err.message });
        }
        if(user === null) {
            return res.status(404).send({ message: "User not found." });
        }
        if(!passwordHash.verify(requestUser.password, user.password)) {
            return res.status(400).send({ message: "Wrong user/password." });
        }
        var session = req.session;
        session.userId = user._id;
        return res.status(200).json({userId: user._id, username: user.username});
    });
};

exports.logout = function (req, res) {
    req.session.destroy();
    return res.status(200).json({success: true});
};