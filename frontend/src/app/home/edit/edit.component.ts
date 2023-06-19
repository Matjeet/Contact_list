import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  public idContact: string = ''
  public apiResponse: any = ''
  public editableName: string = ''
  public editableLastName: string = ''
  public editableEmail: string = ''
  public editableGender: string = ''
  public editablePhoneNumber: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient){}

  ngOnInit(){

    var token = sessionStorage.getItem('session_token')!

    if(token == null){
      this.router.navigate(['/'])
    }

    this.route.queryParams.subscribe(param => {
      this.idContact = param['id']
    })

    var url = 'http://localhost:8698/contact/findSpecifict/' + this.idContact

    var headers = new HttpHeaders().set(
      'Authorization', token
    )

    this.http.get(url, {headers}).subscribe({
      next: resp => {
        this.apiResponse = resp
      },
      error: err => {
        console.log(err)
      }
    })
  }

  editContact(){
 
    var token = sessionStorage.getItem('session_token')!
    var url = 'http://localhost:8698/contact/edit/' + sessionStorage.getItem('userId') + '/' + this.idContact

    var headers = new HttpHeaders().set(
      'Authorization', token
    )

    //Si el valor llega como un String vacio se le asigna el valor de apiResponse.name. Para valores null o undifined se usa ??
    this.editableName = this.editableName ||this.apiResponse.name;
    this.editableLastName = this.editableLastName || this.apiResponse.lastName;
    this.editableEmail = this.editableEmail || this.apiResponse.email;
    this.editableGender = this.editableGender || this.apiResponse.gender;
    this.editablePhoneNumber = this.editablePhoneNumber || this.apiResponse.phoneNumber;

    var body = {
      name: this.editableName,
      lastName: this.editableLastName,
      email: this.editableEmail,
      gender: this.editableGender,
      phoneNumber: this.editablePhoneNumber
    }

    this.http.put(url, body, {headers}).subscribe({
      next: resp => {
        this.router.navigate(['/home'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
