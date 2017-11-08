import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {TaskService} from "../../shares/task.service";
import {Config} from "../../shares/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private  taskService: TaskService) {
  }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    let valueForm = formData.value;
    let data = {username: valueForm.userName, password: valueForm.passWord};

    // let headers = new Headers({
    //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //   'Authorization': 'Basic ' + btoa("CLIENT_ID:CLIENT_SECRET")
    // });
    //
    // let options: RequestOptionsArgs;
    // options = {headers: headers};

    // this.taskService.post(Config.HOST_SERVER + "/login", data).map((data) => {
    //   console.log(data);
    //   return data.json();
    // }).subscribe((data) => {
    //   console.log("data:  " + data);
    // });

    // if (valueForm.userName === 'tvlinh' && valueForm.passWord === '123456') {
      this.router.navigate(['/manager-personnel']);
    // }
  }

}
