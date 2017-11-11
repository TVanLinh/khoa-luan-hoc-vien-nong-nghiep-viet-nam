import {FormBuilder, FormGroup} from "@angular/forms";
import {MystorageService} from "../shares/mystorage.service";
import {MessageError} from "../shares/message.error";
import {MessageAlert} from "../shares/message.alert";
import {ElementRef} from "@angular/core";
import * as Collections from "typescript-collections";

declare const jQuery: any;

export class BaseFormComponent {
  protected formBuilder: FormBuilder = null;
  acount = {};
  token = "";
  messageError: MessageError = null;

  constructor(protected eleRef: ElementRef) {
    if (this.formBuilder == null) {
      this.formBuilder = new FormBuilder();
    }

    if (this.messageError == null) {
      this.messageError = new MessageError();
    }

    if(MystorageService.getAcount()!=null) {
      this.acount = MystorageService.getAcount()['user'];
      this.token = MystorageService.getAcount()['token'];
    }
  }

  protected resetForm(target: FormGroup) {
    target.reset();
  }


  //----------------
  openModal(target: any) {
    target.open();
    // this.modalComponent.open();
  }

  closeModal(target: any) {
    target.close();
  }


  message = new MessageAlert();

  updateMessge(messge, type) {
    this.message.content = messge;
    this.message.condition = true;
    this.message.type = type;
    setTimeout(() => {
      this.message.condition = false;
    }, this.message.timout);
  }

  updateView(id: string, condition: boolean) {
    let ref = jQuery(this.eleRef.nativeElement).find("#" + id + " input.ng-invalid ");
    let ref2 = jQuery(this.eleRef.nativeElement).find("#" + id + " select.ng-valid");
    let bd1 = {border: "1px solid #ff3620"};
    let bd2 = {border: "1px solid #ff3620"};
    if (!condition) {
      ref.css(bd1);
      ref2.css({bd1});
    } else {
      ref.css(bd2);
      ref2.css({bd2});
    }
  }

  toggleBoolean(array: Collections.LinkedList<any>) {
    for (let item of array.toArray()) {
      item['now'] = false;
    }
    return array;
  }

  asList(arry: any[]) {
    let list = new Collections.LinkedList<any>();
    for (let item of arry) {
      list.add(item);
    }
    return list;
  }
}
