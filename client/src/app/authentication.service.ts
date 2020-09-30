import {Injectable} from "@angular/core"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Observable, of} from "rxjs"
import {map} from "rxjs/operators"
import {Router} from "@angular/router"


export interface UserDetails{
    id: number
    nome: string
    password: string
    exp: number
    iat: number
    uid: number
}

export interface TelefoneDetails{
    id: number
    ddd: string
    numero_telefone: string
}

export interface EnderecoDetails{
    id: number
    cep: string
    bairro: string
    estado: string
    cidade: string
    logradouro: string
}

interface TokenResponse{
    token: string
}

export interface TokenPayload{
    id: number
    nome: string
    email: string
    password: string
}

@Injectable()
export class AuthenticationService{
    private token: string

    constructor(private http: HttpClient , private router: Router) {}

    private saveToken(token: string): void{
        localStorage.setItem('userToken',token)
        this.token = token
    }

    private getToken(): string{
        if(!this.token){
            this.token = localStorage.getItem('userToken')
        }
        return this.token
    }

    public getUserDetails(): UserDetails{
        const token = this.getToken()
        let payload
        if(token){
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }else{
            return null
        }
    }

    public isLoggedIn(): boolean{
        const user = this.getUserDetails()
        if(user){
            return true
        }else{
            return false
        }
    }

    public register(user: TokenPayload): Observable<any>{
         return this.http.post('/api/register',user)
    }
    

    public login(user: TokenPayload): Observable<any>{
         const base = this.http.post('/api/login',user)
         const request = base.pipe(
             map((data: TokenResponse)=>{
                if(data.token){
                    this.saveToken(data.token)
                }
                return data
             })  
         )
        return request
    }

    public profile(id): Observable<any>{
        return this.http.get('api/exibirUsuarios')
    }

    public logout(): void{
        this.token = ''
        window.localStorage.removeItem('userToken')
        this.router.navigateByUrl('/')
    }

    //telefone 
    public AddTelefone(telefone: TelefoneDetails): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.post('api/cadastrarTelefone',telefone,{ headers:headers});
    }

    public ListTelefone(): Observable<TelefoneDetails[]>{
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.get<TelefoneDetails[]>('api/exibirTelefones',{ headers:headers});
    }

    public DeleteTelefone(id: number): Observable<{}>{
        const url = 'api/deleteTelefone/'+id;
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.delete(url,{headers:headers});
    }

    public UpdateTelefone(telefone:TelefoneDetails): Observable<TelefoneDetails>{
        const url = 'api/updateTelefone/'+telefone.id;
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.put<TelefoneDetails>(url,telefone,{ headers:headers});
    }

    //endereco
    public AddEndereco(endereco: EnderecoDetails): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.post('api/cadastrarEndereco',endereco,{ headers:headers});
    }

    public ListEndereco(): Observable<EnderecoDetails[]>{
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.get<EnderecoDetails[]>('api/exibirEnderecos',{ headers:headers});
    }

    public DeleteEndereco(id: number): Observable<{}>{
        const url = 'api/deleteEndereco/'+id;
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.delete(url,{headers:headers});
    }

    public UpdateEndereco(endereco:EnderecoDetails): Observable<TelefoneDetails>{
        const url = 'api/updateEndereco/'+endereco.id;
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        return this.http.put<TelefoneDetails>(url,endereco,{ headers:headers});
    }
}