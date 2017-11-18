import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {BaseFormComponent} from "../../base-form.component";
import * as Collections from "typescript-collections";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {TaskService} from "../../../shares/task.service";
import {SeminaModel} from "./semina.model";
import {NewpaperModel} from "./newpaper.model";
import {Config} from "../../../shares/config";

declare const jQuery: any;
const SENIMAR: string = "SENIMAR";
const NEWSPAPER: string = "NEWSPAPER";

@Component({
  selector: 'app-senimar-newpaper',
  templateUrl: './senimar-newpaper.component.html',
  styleUrls: ['../../form.css', './senimar-newpaper.component.css']
})

export class SenimarNewpaperComponent extends BaseFormComponent implements OnInit {
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

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.initForm();
    this.getDataFromServer();
  }

  initForm() {

    this.formSemina = this.formBuilder.group({
      name: [''],
      nameConvention: [''],
      pagePost: [1],
      year: [2000],
      numberAuthor: [1],
      authors: [this.location[0]],
      location: ['']
    });
    this.formNewspaper = this.formBuilder.group({
      name: [""],
      nameMagazine: [""],
      numberMagazine: [1],
      pagePost: 1,
      year: 2000,
      numberAuthor: 1,
      authors: [''],
      location: [this.location[0]]
    });
  }

  addItem(target: string) {
    let valueFormSemina = this.formSemina.value;
    let valueFormNewspaper = this.formNewspaper.value;

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
    } else {
      this.positionNewspaperUpdate = null;
      this.formNewspaper.reset();
      super.openModal(this.newspaperModal);
    }

  }

  onSave(mode) {
    this.mode = mode;
    if (mode == 0) {
      super.pushDataServer(Config.SEMINAR_TOP_URL, 'seminar', this.listSenimar);
    } else {
      super.pushDataServer(Config.NEWSPAPER_TOP_URL, 'newspaper', this.listNewsPaper);
    }
  }

  getDataFromServer() {
    super.getDataServer(Config.SEMINAR_TOP_URL).subscribe(data => {
      this.listSenimar = super.asList(data['seminar']);
    }, (err) => {

    });

    super.getDataServer(Config.NEWSPAPER_TOP_URL).subscribe(data => {
      this.listNewsPaper = super.asList(data['newspaper']);
    }, (err) => {

    });
  }
}

