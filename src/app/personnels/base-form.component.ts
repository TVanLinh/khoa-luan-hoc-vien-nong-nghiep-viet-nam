import {FormBuilder, FormGroup} from "@angular/forms";
import {MystorageService} from "../shares/mystorage.service";
import {MessageError} from "../shares/message.error";
import {MessageAlert} from "../shares/message.alert";
import {ElementRef} from "@angular/core";
import * as Collections from "typescript-collections";
import {TaskService} from "../shares/task.service";

declare const jQuery: any;

export class BaseFormComponent {
  protected formBuilder: FormBuilder = null;
  acount = {};
  token = "";
  messageError: MessageError = null;
  rankTrains = ["Trung cấp", "Cao đẳng ", "Đại học ", "Cao học "];
  speciesObtain = ["Xuất sắc ", "Giỏi", "Khá", "Trung bình"];

  constructor(protected eleRef: ElementRef, public taskService: TaskService) {
    if (this.formBuilder == null) {
      this.formBuilder = new FormBuilder();
    }

    if (this.messageError == null) {
      this.messageError = new MessageError();
    }

    if (MystorageService.getAcount() != null) {
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
    let ref = jQuery(this.eleRef.nativeElement).find("#" + id + ".ng-invalid ");
    //let ref2 = jQuery(this.eleRef.nativeElement).find("#" + id + ".ng-valid ");
    let bd1 = {border: "1px solid red !important"};
    let bd2 = {border: "1px solid #ff3620 !important"};
	console.log("condition "+condition+ "   "+ref.toString() );
    if (!condition) {
      ref.css(bd1);
     // ref2.css({bd1});
	   ref.addClass("error");
	//  ref2.addClass("error");
    } else {
      ref.css(bd2);
    //  ref2.css({bd2});
    }
  }
  
  updateViewNotId (condition : boolean) {
  let ref = jQuery(this.eleRef.nativeElement).find( " input.ng-invalid ");
    let ref2 = jQuery(this.eleRef.nativeElement).find( " select.ng-valid");
    let bd1 = {border: "1px solid #ff0000 !important"};
    let bd2 = {border: "1px solid #ff3620 !important"};
	console.log("condition "+ condition+ "   "+ref.toString() );
    if (!condition) {
     // ref.css(bd1);
	  ref.addClass("error");
	  ref2.addClass("error");
     // ref2.css({bd1});
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
    if(arry == null) {
      return list;
    }
    for (let item of arry) {
      list.add(item);
    }
    return list;
  }

  updateList(array: Collections.LinkedList<any>, item: any, itemNew: any) {
    let index = array.indexOf(item);
    array.remove(item);
    array.add(itemNew, index);
    return array;
  }

  getDataServer(url) {
    return this.taskService.get(url + "?username=" + this.acount['username']);
  }

  pushDataServer(url, dataName, data: Collections.LinkedList<any>) {
    let body = {
      "staffCode": this.acount['username']
    };
    body[dataName] = data.toArray();
    this.taskService.post(url, {data: body}).subscribe((resp) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  pushObjectServer(url, dataName, data: any) {
    let body = {
      "staffCode": this.acount['username']
    };
    body[dataName] = data;
    this.taskService.post(url, {data: body}).subscribe((resp) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }
}
