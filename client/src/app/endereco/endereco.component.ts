import {Component, OnInit} from '@angular/core'
import {AuthenticationService,EnderecoDetails} from '../authentication.service'
import {Router} from '@angular/router'



@Component({
    templateUrl:'./endereco.Component.html'
})
export class EnderecoComponent implements OnInit{
    credentials: EnderecoDetails={
        id: 0,
        cep: '',
        bairro:'',
        estado: '',
        cidade: '',
        logradouro: ''
    }

    editEndereco: EnderecoDetails

    enderecos: EnderecoDetails[]

    constructor(private authen:AuthenticationService,private router: Router){}

    ngOnInit(){
        this.list()
    }

    list(): void{
        this.authen.ListEndereco().subscribe(data => {
            this.enderecos = data;
            console.log(this.enderecos)
        })
    }

    register(): void{
        this.authen.AddEndereco(this.credentials).subscribe(
            () => {
                this.list()
            },
            err => {
                console.error(this.credentials)
            }
        )
    }

    edit(endereco){
        this.editEndereco=endereco
    }

    update():void{
        if(this.editEndereco){
            this.authen.UpdateEndereco(this.editEndereco).subscribe(()=>{
                this.list();
            })
            this.editEndereco = undefined
        }
    }

    delete(endereco:EnderecoDetails):void{
        this.enderecos=this.enderecos.filter(h => h !== endereco)
        this.authen
        .DeleteEndereco(endereco.id)
        .subscribe(()=> console.log('Deletado'))
    }

    
}