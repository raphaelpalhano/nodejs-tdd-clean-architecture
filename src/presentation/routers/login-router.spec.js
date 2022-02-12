/**
 * @funcionalidade
 * Validar email e senha do usuário
 * Quando não digitar e-mail deve retornar 400
 */

class LoginRouter {
  router (request) {
    if (!request || !request.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = typeof request === 'object' ? request.body : null

    if (!email || !password) {
      const control = request.body.email === undefined ? 'email' : 'password' | request.body.password === undefined ? 'password' : 'email'
      return HttpResponse.badRequest(control)
    }
  }
}

class HttpResponse {
  static badRequest (param) {
    return {
      statusCode: 400,
      body: new MissingArgumentError(param)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

class MissingArgumentError extends Error {
  constructor (param) {
    super(`Missing Argument: ${param}`)
    this.name = 'missingArgument'
  }
}

describe('login router', () => {
  // sut - system under test == sistema que está sendo testado
  const sut = new LoginRouter()

  test('Should return 400 if no email is provided', () => {
    const request = {
      body: {
        password: '000000'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingArgumentError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    // sut - system under test == sistema que está sendo testado

    const request = {
      body: {
        email: 'rafa1@gmail.com'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingArgumentError('password'))
  })

  test('Should return 500 if no has request', () => {
    // sut - system under test == sistema que está sendo testado

    const response = sut.router()

    expect(response.statusCode).toBe(500)
  })

  test('Should return 500 if no has body in request', () => {
    // sut - system under test == sistema que está sendo testado
    const request = {}
    const response = sut.router(request)

    expect(response.statusCode).toBe(500)
  })
})
