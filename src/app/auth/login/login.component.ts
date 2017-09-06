import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    let valueForm = formData.value;
    if (valueForm.userName === 'tvlinh' && valueForm.passWord === '123456') {
      this.router.navigate(['/manager-personnel']);
    }
  }

}
