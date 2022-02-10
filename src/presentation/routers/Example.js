
const express = require('express')
const router = express.Router()

// first archive export routes:
module.exports = () => {
  const routes = new SignUpRouter()
  router.post('signup', ExpressAdapterRoutes.adapt(routes))
}

class ExpressAdapterRoutes {
  adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// Camada de apresentação Presentation:
// Aquilo que a API expõe. Second archive signUpRouter:
class SignUpRouter {
  async route (httpRequest) {
    const { username, password, repeat } = httpRequest.body
    const user = new SignUpCase().signup(username, password, repeat)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain: regras de negócio da aplicação third SignUpCase

class SignUpCase {
  async signup (username, password, repeat) {
    if (password === repeat) {
      new AccountRepository().create(username, password)
    }
  }
}

// Infra: escolher qualquer framework vai usar para o banco
// Repository
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AccountRepository {
  async create (username, password) {
    const user = await AccountModel.create({ username, password })
    return user
  }
}
