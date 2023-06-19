import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  public contactsList: any = ''
  public _id: String = ''
  public fullName: string = ''
  public showConfirmation: boolean = false

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(){

    var token = sessionStorage.getItem('session_token')
    var url = 'http://localhost:8698/contact/find/' + sessionStorage.getItem('userId')

    if(token != null){

      var headers = new HttpHeaders().set(
        'Authorization', token
      )

      this.http.get(url, {headers}).subscribe({
        next: resp => {
          this.contactsList = resp
        },
        error: err => {
          console.log(err)
        }
      })

    }
  }

  confirmDelete(){
    this.showConfirmation = true
    console.log(this.showConfirmation)
  }
  
}
