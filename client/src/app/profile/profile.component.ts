import {Component} from '@angular/core'
import{AuthenticationService, UserDetails} from '../authentication.service'

@Component({
    templateUrl: './profile.component.html'
})

export class ProfileComponent{
    details: UserDetails

    constructor(private auth: AuthenticationService){}

    ngOnInt(){
        const current = this.auth.getUserDetails()
        this.auth.profile(current.uid).subscribe(
            user =>{
                this.details = user
            },
            err=>{
                console.error(err)
            }
        )
    }
}