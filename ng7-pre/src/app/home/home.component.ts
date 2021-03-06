import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { first } from 'rxjs/operators'
import { User } from '../_models/user'
import { UserService } from '../_services/user.service'
import { AuthenticationService } from '../_services/authentication.service'
import { AlertService } from '../_services/alert.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //define variables
  updateForm: FormGroup
  submitted = false
  currentUser: User
  currentUserSubscription: Subscription
  users: User[] = []
  wantToUpdate = false

  constructor(        
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user      //get the current user informations
    })
  }
  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['',[Validators.required, Validators.minLength(6)]],
      email: ['']
    },{
      validators:this.passwordMatching
    })
  }
  passwordMatching(group: FormGroup){   //customize validator for confirm password
    let pass = group.controls.password.value
    let confirmPwd = group.controls.confirmPwd.value
    return pass === confirmPwd ? null : { notSame: true }
  }
  onSubmit(){
    this.submitted = true
    if (this.updateForm.invalid) {      return        }    // stop here if form is invalid

    //update user details
    this.userService.update(this.updateForm.value,this.currentUser.login)
    .pipe(first())
    .subscribe(
        data => {
          this.authenticationService.logout()
          this.alertService.success('Personal details have been changed, please log in again.', true)
          this.router.navigate(['/login'])
        },
        error => {
            this.alertService.error(error)
        })  
  }
  clickChangeBtn(){     //display update form
    this.wantToUpdate = true
  }
  clickCancelBtn(){     //hide update form
    this.wantToUpdate = false
  }
}