'use strict'

const User = use('App/Models/User')
const Telefone = use('App/Models/Telefone')
const Endereco = use('App/Models/Endereco')

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

    //funcções para os models

    async cadastrarTelefone({request,response,auth}){
        const {ddd,numeroTelefone} = request.only(['ddd','numero-telefone']);
        await Telefone.create(ddd,numeroTelefone,auth.user.id);
        return response.json(Telefone);
    }

    async indexTelefone({response}){
        const telefone = await Telefone.all();
        return response.json(telefone);
    }

    async upadateTelefone({params,request,response}){

    }

    async deleteTelefone({params,auth,request,response}){

    }

    //

    async cadastrarEndereco({request,response,auth}){
        const {cep,bairro,estado,cidade,logradouro} = request.only(['cep','bairro','estado','cidade','logradouro']);
        await Endereco.create(cep,bairro,estado,cidade,logradouro,auth.user.id);
        return response.json(Telefone);
    }

    async indexEndereco({response}){
        const endereco = await Endereco.all();
        return response.json(endereco);
    }

    async upadateEndereco({params,request,response}){

    }

    async deleteEndereco({params,auth,request,response}){

    }
}

module.exports = UserController
