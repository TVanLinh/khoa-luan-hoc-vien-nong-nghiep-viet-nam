import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: '[app-persons]',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {



  constructor(private formBuilder: FormBuilder) {
  }



  ngOnInit() {
  }

}
