import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {SeminaModel} from "./semina.model";
import {NewpaperModel} from "./newpaper.model";
import {Config} from "../../../shares/config";
import {ValidService} from "../../../shares/valid.service";

declare const jQuery: any;
const SENIMAR: string = "SENIMAR";
const NEWSPAPER: string = "NEWSPAPER";

@Component({
  selector: 'app-senimar-newpaper',
  templateUrl: './senimar-newpaper.component.html',
  styleUrls: ['../../form.css', './senimar-newpaper.component.css']
})

export class SenimarNewpaperComponent extends BaseFormComponent implements OnInit {
  @Input() user: any;
  @ViewChild('seminaModal') seminaModal: ModalComponent;
  @ViewChild('newspaperModal') newspaperModal: ModalComponent;


  formSemina: FormGroup;
  formNewspaper: FormGroup;
  positionSeminaUpdate: SeminaModel = null;
  positionNewspaperUpdate: NewpaperModel = null;
  listSenimar = new Collections.LinkedList<SeminaModel>();
  listNewsPaper = new Collections.LinkedList<NewpaperModel>();
  location = ["Trong nước", "Ngoài nước"];
  mode = 0;

  formSeminarNotValid = false;
  formNewspaperNotValid = false;
  formValid = false;
  formSeminaTouch = false;
  formNewsTouch = false;

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {

    this.formSemina = this.formBuilder.group({
      name: ['', Validators.required],
      nameConvention: ['', Validators.required],
      pagePost: [1, Validators.required],
      year: [2000, [Validators.required, Validators.min(1900)]],
      numberAuthor: [1, [Validators.required, Validators.min(1)]],
      authors: [this.location[0]],
      location: ['', Validators.required]
    });
    this.formNewspaper = this.formBuilder.group({
      name: ["", Validators.required],
      nameMagazine: ["", Validators.required],
      numberMagazine: [1, Validators.required],
      pagePost: [1, [Validators.required, Validators.min(1)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      numberAuthor: 1,
      authors: [''],
      location: [this.location[0], Validators.required]
    });
  }

  addItem(target: string) {
    let valueFormSemina = this.formSemina.value;
    let valueFormNewspaper = this.formNewspaper.value;
    this.formValid = false;
    if (target == SENIMAR) {
      this.formSeminaTouch = true;
      let data = [valueFormSemina.name, valueFormSemina.nameConvention, valueFormSemina.pagePost, valueFormSemina.year,
        valueFormSemina.numberAuthor, valueFormSemina.location];
      this.updateView("semina-form", this.formSemina.valid);
      if (!ValidService.isNotBlanks(data) || !this.formSemina.valid) {
        this.formSeminarNotValid = true;
        this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
        return;
      }
      this.formSeminarNotValid = false;
    }

    if (target == NEWSPAPER) {
      this.formNewsTouch = true;
      let data = [valueFormNewspaper.name, valueFormNewspaper.nameMagazine, valueFormNewspaper.numberMagazine, valueFormNewspaper.pagePost,
        valueFormNewspaper.year, valueFormNewspaper.numberAuthor, valueFormNewspaper.location];
      this.updateView("newspaper-form", this.formNewspaper.valid);
      if (!ValidService.isNotBlanks(data) || !this.formNewspaper.valid) {
        this.formNewspaperNotValid = true;
        this.updateMessge("Vui lòng kiểm tra lại thông tin", "warning");
        return;
      }
      this.formNewspaperNotValid = false;

    }


    switch (target) {
      case SENIMAR:
        if (this.positionSeminaUpdate == null) {
          this.listSenimar.add(valueFormSemina);
        } else {
          super.updateList(this.listSenimar, this.positionSeminaUpdate, valueFormSemina);
        }

        this.closeModal(this.seminaModal);
        break;
      case NEWSPAPER:
        if (this.positionNewspaperUpdate == null) {
          this.listNewsPaper.add(valueFormNewspaper);
        } else {
          super.updateList(this.listNewsPaper, this.positionNewspaperUpdate, valueFormNewspaper);
        }

        this.closeModal(this.newspaperModal);
        break;
    }
  }

  editItem(target, item: any) {
    if (target === SENIMAR) {
      this.updateValid("semina-form");
      this.positionSeminaUpdate = item;
      this.formSemina.setValue({
        name: item.name,
        nameConvention: item.nameConvention,
        pagePost: item.pagePost,
        year: item.year,
        numberAuthor: item.numberAuthor,
        authors: item.authors,
        location: item.location
      });
      super.openModal(this.seminaModal);
    } else {

      this.updateValid("newspaper-form");
      this.positionNewspaperUpdate = item;
      this.formNewspaper.setValue({
        name: item.name,
        nameMagazine: item.nameMagazine,
        numberMagazine: item.numberMagazine,
        pagePost: item.pagePost,
        year: item.year,
        numberAuthor: item.numberAuthor,
        authors: item.authors,
        location: item.location
      });
      super.openModal(this.newspaperModal);
    }
  }

  removeItem(target: string, index: number) {
    if (target === SENIMAR) {
      this.listSenimar.removeElementAtIndex(index);
    } else {
      this.listNewsPaper.removeElementAtIndex(index);
    }
  }

  openModals(type) {
    if (type === SENIMAR) {
      this.positionSeminaUpdate = null;
      this.formSemina.reset();
      super.openModal(this.seminaModal);
      this.formSeminaTouch = false;
    } else {
      this.positionNewspaperUpdate = null;
      this.formNewspaper.reset();
      super.openModal(this.newspaperModal);
      this.formNewsTouch = false;
    }

  }

  onSave(mode) {
    this.mode = mode;
    this.formValid = true;
    if (mode == 0) {
      super.pushDataServer(Config.SEMINAR_TOP_URL, 'seminar', this.listSenimar,this.user);
    } else {
      super.pushDataServer(Config.NEWSPAPER_TOP_URL, 'newspaper', this.listNewsPaper,this.user);
    }
  }

  getDataFromServer() {
    super.getDataServer(Config.SEMINAR_TOP_URL,this.user).subscribe(data => {
      if (data && data['seminar']) {
        this.listSenimar = super.asList(data['seminar']);
      }
    }, (err) => {

    });

    super.getDataServer(Config.NEWSPAPER_TOP_URL,this.user).subscribe(data => {
      if (data && data['newspaper']) {
        this.listNewsPaper = super.asList(data['newspaper']);
      }
    }, (err) => {

    });
  }
}

