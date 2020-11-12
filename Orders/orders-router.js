const express = require('express')
const logger = require('../src/logger')
const OrderService = require('./orders-service')
const xss = require('xss')
const path = require('path')
const { serialize } = require('v8')

const orderRouter = express.Router()
const bodyParser = express.json()

orderRouter
    .route('/orders')
    .post(bodyParser, (req, res, next) => {
        const { customer_id_fk } = req.body
        newOrder = { customer_id_fk }

        OrderService.insertOrder(req.app.get('db'), newOrder)
            .then(order => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${newOrder.id}`))
                    .json(order)
            })
            .catch(next)
    })
orderRouter
    .route('/newitem')
    .post(bodyParser, (req, res, next) => {
        const { item_id_fk, order_quantity, customer_id_fk } = req.body
        addItem = { item_id_fk, order_quantity, customer_id_fk }

        OrderService.addItem(req.app.get('db'), addItem)
            .then(add => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${addItem.id}`))
                    .json(add)
            })
            .catch(next)
    })
module.exports = orderRouter    