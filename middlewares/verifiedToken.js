const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/users.models');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
  const token = req.cookies.token || req.headers['token'];
  console.log(">>>>" + token);
  if (token) {
    jwt.verify(token, jwt_secret, async (err, decoded) => {
      let data = await user.readUsersByEmail(decoded.email);
      console.log("````"+data[0].name);
      if (data[0].logged == true) {
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      } else {
        return res.json({ msg: 'No está logueado' });
      }
    });
  } else {
    req.logged = false;
    next();
    // res.send({
    //   msg: 'Token not provided'
    // });
  }
});

module.exports = protectedRoutes;