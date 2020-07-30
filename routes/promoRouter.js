const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotions = require('../models/promotions')
const promoRouter = express.Router();
const authentificate = require('../authentificate')
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {
   Promotions.find({})
       .then((promotions)=>{
           res.statusCodea = 200;
           res.setHeader('Content-Type','application/json');
           res.json(promotions);
       }, err => {next(err)})

    })
    .post(authentificate.verifyUser,(req, res, next) => {
        Promotions.create(req.body)
            .then((promotion) => {
                console.log('Dish Created ', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authentificate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promo');
    })
    .delete(authentificate.verifyUser,(req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

promoRouter.route('/:promotionId')
    .get((req,res,next) => {
        Promotions.findById(req.params.promotionId)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authentificate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    })
    .put(authentificate.verifyUser,(req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authentificate.verifyUser,(req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = promoRouter
