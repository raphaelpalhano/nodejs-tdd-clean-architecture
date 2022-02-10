/**
 * @funcionalidade
 * Validar email e senha do usuário
 *
 */
class LoginRouter {
  router (request) {
    if (!request.body.email || !request.body.password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('login router', () => {
  const sut = new LoginRouter()

  test('Should return 400 if no email is provided', () => {
    // sut - system under test == sistema que está sendo testado
    const request = {
      body: {
        password: '000000'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 400 if no email is provided', () => {
    // sut - system under test == sistema que está sendo testado
    const request = {
      body: {
        email: 'example12@gmail.com'
      }
    }
    const response = sut.router(request)

    expect(response.statusCode).toBe(400)
  })
})
