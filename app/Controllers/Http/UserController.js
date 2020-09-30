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
        const {nome,email,password} = request.only(['nome','email','password']);
        await User.create({
            nome,
            email,
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
            user.merge(request.only(['nome','email','password']));
            user.save();
        }
        return response.status(200).json(user);
    }

    async delete({params,auth,request,response}){
        const user = await User.findOrFail(params.id);
        await user.delete();
        return response.status(200).json(user);
    }

    async cadastrarEndereco({request,auth}){
        const {cep,bairro,estado,cidade,logradouro} = request.only(['cep','bairro','estado','cidade','logradouro']);
        const endereco = await Endereco.create({user_id:auth.user.id,cep:cep,bairro:bairro,estado:estado,cidade:cidade,logradouro:logradouro});
        return endereco;
    }

    async indexEndereco({response,auth}){
        const endereco = await Endereco.query().where('user_id','=',auth.user.id).fetch();
        return response.json(endereco);
    }

    async upadateEndereco({auth,params,request,response}){
        const endereco = await Endereco.find(params.id);
        if(endereco.user_id==auth.user.id){
            endereco.merge(request.only(['cep','bairro','estado','cidade','logradouro']));
            endereco.save();
            return endereco;
        }
        return response.status(200).json(endereco);
    }

    async deleteEndereco({params,auth,response}){
        const endereco = await Endereco.findOrFail(params.id);
        if(endereco.user_id==auth.user.id){
            await endereco.delete();
            return response.status(200).json(endereco);
        }
        return response.status(200).json(endereco);
    }

    async cadastrarTelefone({request,auth}){
        const {ddd,numero_telefone} = request.only(['ddd','numero_telefone']);
        const telefone = await Telefone.create({user_id:auth.user.id,ddd:ddd,numero_telefone:numero_telefone});
        return telefone;
    }

    async indexTelefone({response,auth}){
        const telefone = await Telefone.query().where('user_id','=',auth.user.id).fetch();
        return response.json(telefone);
    }

    async upadateTelefone({auth,params,request,response}){
        const telefone = await Telefone.find(params.id);
        if(telefone.user_id==auth.user.id){
            telefone.merge(request.only(['ddd','numero_telefone']));
            telefone.save();
            return telefone;
        }
        return response.status(200).json(telefone);
    }

    async deleteTelefone({params,auth,response}){
        const telefone = await Telefone.findOrFail(params.id);
        if(telefone.user_id==auth.user.id){
            await telefone.delete();
            return telefone;
        }
        return response.status(200).json(telefone);
    }
}

module.exports = UserController
