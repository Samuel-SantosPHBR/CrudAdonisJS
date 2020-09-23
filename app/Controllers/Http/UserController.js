'use strict'

const User = use('App/Models/User')

class UserController {
    //função para realizar o login
    async login({request,response,auth}){
        //pega a senha e o login
        const {email,senha} = request.only(['email','senha']);
        //cria o tokken de validação de login
        const token = await auth.attemp(email,senha);
        //retorna o token no formato json
        return response.json(token);
    }

    //função apra fazer o cadastro do usuario
    async Cadastrar({request,response}){

    }
}

module.exports = UserController
