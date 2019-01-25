import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../../config';
import User from '../user/User';


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
  },
  (err, user) => {
    if (err) {
      return res.status(500).send('There was a problem registering the user.');
    }

    // create a token
    var token = jwt.sign(
      { id: user._id },
      config.SECRET,
      { expiresIn: 86400 }, // expires in 24 hours
    );
    res.status(200).send({ auth: true, token: token });
  });
});

router.post('/login', (req, res) =>  {
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
      if (!user) {
        return res.status(404).send('No user found.');
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      var token = jwt.sign(
        { id: user._id },
        config.SECRET,
        { expiresIn: 86400 }, // expires in 24 hours
      );
      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get('/me', (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'No token provided.'
    });
  }

  jwt.verify(
    token,
    config.SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: 'Failed to authenticate token.'
        });
      }

      User.findById(
        decoded.id,
        { password: 0 }, // project to remove password
        (err, user) => {
          if (err) {
            return res.status(500).send('There was a problem finding the user.');
          }
          if (!user) {
            return res.status(404).send('No user found.');
          }

          res.status(200).send(user);
        }
      );
    }
  );
});

export default router;
