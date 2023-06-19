import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public name: String = ''
  public lastName: String = ''
  public email: String = ''
  public phoneNumber: String = ''
  public gender: String = 'Masculino'

  constructor(private http: HttpClient, private router: Router) {}

  createContact(){
    var url = 'http://localhost:8698/contact/create/' + sessionStorage.getItem('userId')
    var token = sessionStorage.getItem('session_token')

    if(token != null){
      var headers = new HttpHeaders().set(
        'Authorization', token
      )

      var body = {
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        gender: this.gender
      }
  
      this.http.post(url, body, {headers}).subscribe({
        next: resp =>{
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['home']); //Recargar la página
          });
        },
        error: err =>{
          console.log(err)
        }
      })
    }

  }
}
