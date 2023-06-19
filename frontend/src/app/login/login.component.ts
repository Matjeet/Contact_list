import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: String = ''
  public password: String = ''
  public apiResponse: any = ''
  public ownerId: String = ''

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(){
    var token = sessionStorage.getItem('session_token')

    if(token != null){
      this.router.navigate(['/home'])
    }
  }

  logInUser(){
    var url = "http://localhost:8698/user/login"

    var headers = new HttpHeaders().set(
      'Content-type', 'application/json'
    )

    var body = {
      email: this.email,
      password: this.password
    }
    
    this.http.post(url, body, {headers}).subscribe({
      next: resp =>{
        this.apiResponse = resp
        var token = this.apiResponse.token
        var idOwner = this.apiResponse.userId
        sessionStorage.setItem('session_token', token)
        sessionStorage.setItem('userId', idOwner)
        this.router.navigate(['/home'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
