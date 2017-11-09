import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import *as Collections from "typescript-collections";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
@Component({
  selector: 'app-emulation-title',
  templateUrl: './emulation-title.component.html',
  styleUrls: ['../../form.css', './emulation-title.component.css']
})
export class EmulationTitleComponent extends BaseFormComponent implements OnInit {
 @ViewChild('emulationTitle') emulationTitle: ModalComponent;

  formData: FormGroup;
  listEmulation = new Collections.LinkedList<EmulationTitleForm>();
  positionUpdate = -1;

  constructor(protected eleRef: ElementRef) {
    super(eleRef);
    let item: EmulationTitleForm = {
      title: "Chien sy thi dua",
      dateLicense: "20/10/2014",
      numberDecide: ""
    };
    this.listEmulation.add(item);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      title: [""],
      dateLicense: ["20/10/2014"],
      numberDecide: [""]
    })
  }

  removeItem(index: number) {
    this.listEmulation.removeElementAtIndex(index);
  }

  onSave() {
    this.listEmulation.add(this.formData.value);
  }
}

interface  EmulationTitleForm {
  title: string,
  dateLicense: string,
  numberDecide: string
}
