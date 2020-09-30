import {Component, OnInit} from '@angular/core'
import {AuthenticationService,TelefoneDetails} from '../authentication.service'
import {Router} from '@angular/router'



@Component({
    templateUrl:'./telefone.Component.html'
})
export class TelefoneComponent implements OnInit{
    credentials: TelefoneDetails={
        id: 0,
        ddd: '',
        numero_telefone:''
    }

    editTelefone: TelefoneDetails

    telefones: TelefoneDetails[]


    constructor(private authen:AuthenticationService,private router: Router){}

    

    ngOnInit(){
        this.list();
    }

    list(): void{
        this.authen.ListTelefone().subscribe(data => {
            this.telefones = data;
            console.log(this.telefones)
        })
    }

    register(): void{
        this.authen.AddTelefone(this.credentials).subscribe(
            () => {
                this.list()
            },
            err => {
                console.error(this.credentials)
            }
        )
    }

    edit(telefone){
        this.editTelefone=telefone
    }

    update():void{
        if(this.editTelefone){
            this.authen.UpdateTelefone(this.editTelefone).subscribe(()=>{
                this.list();
            })
            this.editTelefone = undefined
        }
    }

    delete(telefone:TelefoneDetails):void{
        this.telefones=this.telefones.filter(h => h !== telefone)
        this.authen
        .DeleteTelefone(telefone.id)
        .subscribe(()=> console.log('Deletado'))
    }



    
}