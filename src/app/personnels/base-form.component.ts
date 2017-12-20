import {FormBuilder, FormGroup} from "@angular/forms";
import {MystorageService} from "../shares/mystorage.service";
import {MessageError} from "../shares/message.error";
import {MessageAlert} from "../shares/message.alert";
import {ElementRef} from "@angular/core";
import * as Collections from "typescript-collections";
import {TaskService} from "../shares/task.service";
import {Util} from "../shares/util";

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


  updateView(taget: string, condition: boolean) {
    let id = "#" + taget;

    let ref = (jQuery)(id + " input.ng-invalid");
    let ref2 = (jQuery)(id + " select.ng-invalid");

    let bd1 = {border: "1px solid red "};
    let bd2 = {border: "1px solid #CCCCCC "};

    console.log(condition);

    if (!condition) {
      ref.css(bd1);
      ref2.css(bd1);
      ref = (jQuery)(id + " input.ng-valid");
      ref2 = (jQuery)(id + " select.ng-valid");
      ref.css(bd2);
      ref2.css(bd2);
    } else {
      ref = (jQuery)(id + " input.ng-valid");
      ref2 = (jQuery)(id + " select.ng-valid");
      ref.css(bd2);
      ref2.css(bd2);
    }
  }

  updateValid(taget: string) {
    let id = "#" + taget;
    let bd2 = {border: "1px solid #CCCCCC "};
    let ref = (jQuery)(id + " input.ng-invalid");
    let ref2 = (jQuery)(id + " select.ng-invalid");
    ref.css(bd2);
    ref2.css(bd2);
  }

  toggleBoolean(array: Collections.LinkedList<any>) {
    for (let item of array.toArray()) {
      item['now'] = false;
    }
    return array;
  }

  asList(arry: any[]) {
    let list = new Collections.LinkedList<any>();
    if (arry == null) {
      return list;
    }
    for (let item of arry) {
      list.add(item);
    }
    return list;
  }

  asSet(arry: any[]) {
    let list = new Collections.Set<any>();
    if (arry == null) {
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

  getDataServer(url, user?: any) {
    return this.taskService.get(url + "?username=" + this.acount['username']);
  }

  getDataServer2(url, username) {
    return this.taskService.get(url + "?username=" + username);
  }

  pushDataServer(url, dataName, data: Collections.LinkedList<any>, user?: any) {
    if (!user) {
      return;
    }
    let body = {
      "staffCode": user['username']
    };
    body[dataName] = data.toArray();
    this.taskService.post(url, {data: body}).subscribe((resp) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }

  pushObjectServer(url, dataName, data: any, user?: any) {
    if (!user) {
      return;
    }
    let body = {
      "staffCode": user['username']
    };
    body[dataName] = data;
    this.taskService.post(url, {data: body}).subscribe((resp) => {
      this.updateMessge(this.messageError.success, "success");
    }, (err) => {
      this.updateMessge(this.messageError.errorSave, "warning");
    });
  }


  convertDataSelect(arss: any[], showHttp?: boolean): { id: string, text: string }[] {
    let array: { id: string, text: string }[] = [];
    for (let item of arss) {
      let temp = {id: item._id, text: item.title};
      if (showHttp) {
        temp.text = " - Phương thức http " + item.method;
      }
      array.push(temp);
    }
    return array;
  }


  contains(arr: any[], nameAgr: string, value: string) {
    // if (!Array.isArray(arr)) {
    //   return false;
    // }
    // for (let i of arr) {
    //   if (i[nameAgr] && ((i[nameAgr] + "").trim().toLowerCase()) == ((value + "").trim().toLowerCase())) {
    //     return true;
    //   }
    // }
    // return false;
    return Util.contains(arr, nameAgr, value);
  }


  clone(arry: any[]) {
    // let temp = arry.map(item => item);
    // let list = new Collections.LinkedList();
    // for (let item of temp) {
    //   list.add(item);
    // }
    // return list;
    return Util.clone(arry);
  }


}
