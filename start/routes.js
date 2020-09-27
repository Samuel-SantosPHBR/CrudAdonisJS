'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('login','UserController.login');
    Route.post('register','UserController.cadastrar');
    Route.get('exibirUsuarios','UserController.index');
    Route.delete('delete/:id','UserController.delete');
    Route.put('update/:id','UserController.update');

    Route.post('cadastrarEndereco','UserController.cadastrarEndereco');
    Route.get('exibirEnderecos','UserController.indexEndereco');
    Route.delete('deleteEndereco/:id','UserController.deleteEndereco');
    Route.put('updateEndereco/:id','UserController.upadateEndereco');

    Route.post('cadastrarTelefone','UserController.cadastrarTelefone');
    Route.get('exibirTelefones','UserController.indexTelefone');
    Route.delete('deleteTelefone/:id','UserController.deleteTelefone');
    Route.put('updateTelefone/:id','UserController.upadateTelefone');
}).prefix('api')
