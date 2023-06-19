import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  public nameContact: string = ''
  public lastNameContact: string = ''
  public idContact: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.nameContact = params['name']
      this.lastNameContact = params['lastName']
      this.idContact = params['id']
    })
  }

  deleteContact(){
    var url = 'http://localhost:8698/contact/delete/' + this.idContact
    var token = sessionStorage.getItem('session_token')!

    var headers = new HttpHeaders().set(
      'Authorization', token
    )

    this.http.delete(url, {headers}).subscribe({
      next: resp => {
        this.router.navigate(['/home'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
