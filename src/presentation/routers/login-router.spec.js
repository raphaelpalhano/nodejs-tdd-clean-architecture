/**
 * @funcionalidade
 * Validar email e senha do usuário
 *
 */

class LoginRouter {
  router (request) {
    const { email, password } = request.body
    if (!email || !password) {
      return HttpResponse.badRequest()
    }
  }
}

class HttpResponse {
  static badRequest () {
    return {
      statusCode: 400
    }
  }
}

describe('login router', () => {
  test('Should return 400 if no email is provided', () => {
    // sut - system under test == sistema que está sendo testado
    const sut = new LoginRouter()
    const request = {
      body: {
        password: '000000'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    // sut - system under test == sistema que está sendo testado
    const sut = new LoginRouter()
    const request = {
      body: {
        email: 'rafa1@gmail.com'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
  })
})
