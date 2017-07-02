const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    //Rotas Protegidas
    
    const protecedApi = express.Router()
    server.use('/api', protecedApi)

    protecedApi.use(auth)

    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protecedApi, '/billingCycles')

    // Rotas Abertas

    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/AuthService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}