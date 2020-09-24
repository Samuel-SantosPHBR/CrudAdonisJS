'use strict'

const User = use('App/Models/User')

class UserController {
    //função para realizar o login
    async login({request,response,auth}){
        const {email,password} = request.only(['email','password']);
        const token = await auth.attempt(email,password);
        return response.json(token);
    }

    //função apra fazer o cadastro do usuario
    async cadastrar({request,response}){
        const {nome,email,endereco,telefone,password} = request.only(['nome','email','endereco','telefone','password']);
        await User.create({
            nome,
            email,
            endereco,
            telefone,
            password
        });
        return response.send({message: "Usuario cadastrado com sucesso"})
    }

    async index({response}){
        const user = await User.all();
        return response.json(user);
    }

    async update({params,request,response}){
        const user = await User.find(params.id);

        if(user){
            user.merge(request.only(['nome','email','endereco','telefone','password']));
            user.save();
        }
        return response.status(200).json(user);
    }

    async delete({params,auth,request,response}){
        const user = await User.findOrFail(params.id);

        await user.delete();

        return response.status(200).json(user);
    }



}

module.exports = UserController
