import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public name: string = ''
  public lastName: string = ''
  public email: string = ''
  public gender: string = 'Masculino'
  public password: string = ''
  public confirmPassword: string = ''
  public errorPassword: boolean = false

  constructor(private router: Router, private http: HttpClient) {
    
  }

  registerUser(){

    if(this.password != this.confirmPassword){
      this.errorPassword = true
    }
    else{
      var url = 'http://localhost:8698/user/create'

      var headers = new HttpHeaders().set(
      'Content-type', 'application/json'
      )

      var body = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        gender: this.gender,
        password: this.password
      }

      this.http.post(url, body, {headers}).subscribe({
        next: resp => {
          this.router.navigate(['/'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}
