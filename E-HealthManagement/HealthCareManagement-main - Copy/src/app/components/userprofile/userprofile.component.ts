import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  profileDetails : Observable<User[]> | undefined;
  user: User = new User;
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;

  constructor(private _service: UserService, private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#profile-card").show();
    $("#profile-form").hide();
    this.getProfileDetails(this.loggedUser);
  }

  editProfile()
  {
    $("#profile-card").hide();
    $("#profile-form").show();
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
  }

  updateUserProfile()
  {
    this._service.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log("UserProfile Updated succesfully");
        this.msg = "Profile Updated Successfully !!!";
        $(".custom-edit-btn").hide();
        $("#custom-message").show();
        this.temp = true;
        $("#profile-card").show();
        $("#profile-form").hide();
        setTimeout(() => {
            this._router.navigate(['/userdashboard']);
          }, 6000);
      },
      error => {
        console.log("Profile Updation Failed");
        console.log(error.error);
        this.msg = "Profile Updation Failed !!!";
      }
    )
  }


}
