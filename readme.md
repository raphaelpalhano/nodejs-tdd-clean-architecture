# NODEJS CLEAN ARCHITECTURE


## Configurações de Dependencias

~~~yml
    Primeiro: npm i standard -D
        descrição: Usa o padrão do javascript standard style. 
        Sem ponto e vírgula no final da sentença
        Sem virgula sobrando. Aspas simples.
    
    Segundo: npm i lint-staged -D
        descrição: permite que rode script na área de staged.
        Rodar arquivos somente que estão na área de staged.
        É possível fazer validação de arquivos que vão entrar no commit.
        Toda vez que fizer um git add . eles vão para o staged, e nisso 
        é possível aplicar validações. 
        fix == o standard vai tentar corrigir e logo em seguida fazer um commit.
        configuração:
            criar-arquivo:
                .lintstagedrc.json:
                    {
                        "lint-staged":{
                            "*.js": ["standard --fix", "git add"]
                        },
                    }
                
        Execução: npx lint-staged

    Terceiro: npm i husky@4.3 -D
        descrição: permite adicionar hooks no git. Rodar um script antes que acontece um script.
        Vai fazer com que o commit fique travado conforme a configuração do lint-staged.
        criar-arquivo:
            .huskyrc.json:
                "husky": {
                    "hooks": {
                        "pre-commit": "lint-staged"
                    }
                }
    
    Quarto: npm i jest -D
        descrição: framework para testes unitários, integração, etc.
        config: 
         windows: |
            npm install -g jest;
            Set-ExecutionPolicy RemoteSigned
            jest --init

    Quinto: standard reconhcendo o jest
    "standard": {
    "env": ["jest"]
    },         
~~~


## Boas práticas: Princípios do Clean  Architecture

### Isolamento de Camadas

 **1. Isolamento de Camadas desacopladas para refatorar o código**

  Exemplo de caso que não se aplica

~~~javascript
    class SignUpRouter {
        async route (req, res) {
           //1
            const { user, password, repeat } = req.body
           //2
           if(password == repeat){
                //3
                const user = await AccountModel.create({user, password})
                return res.json(user)
            }
        
            res.status(400).json({ message: 'invalid credentials' })
        }
    }
~~~

**Pontos**

- Uma única classe com 3 responsabilidade distintas. 
    1.Validação do request e do response  o repeat password
    2. Validar o password deve ser igual
    3. Acesso a banco de dados

**Como deve ser**

~~~javascript
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

~~~

**Pontos** 

1. Desacoplar o router de framework: posso trocar o framework express
caso eu precise utlizar outra sem dor de cabeça.
2. Respeito do SOLID
3. Maior facilidade em refatorar