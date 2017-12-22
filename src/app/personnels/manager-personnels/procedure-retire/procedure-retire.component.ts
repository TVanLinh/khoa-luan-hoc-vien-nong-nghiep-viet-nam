import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BaseFormComponent} from "../../base-form.component";

import {TaskService} from "../../../shares/task.service";

import {Config} from "../../../shares/config";
import * as Collecions from "typescript-collections";
import {ProcedureFormComponent} from "../procedure-form/procedure-form.component";

@Component({
  selector: 'app-procedure-retire',
  templateUrl: './procedure-retire.component.html',
  styleUrls: ['../../form.css', './procedure-retire.component.css']
})
export class ProcedureRetireComponent extends BaseFormComponent implements OnInit {

  @ViewChild('procedureForm') procedureForm: ProcedureFormComponent;
  user: any;
  data = new Collecions.LinkedList<any>();
  dataTemp = new Collecions.LinkedList<any>();
  update = null;

  constructor(protected eleRef: ElementRef, taskService: TaskService) {
    super(eleRef, taskService);
  }

  ngOnInit() {
    this.getData();
  }

  onChoiseHandler($event) {
    this.user = $event;
    this.procedureForm.open(this.user);
  }

  onProcess($event) {
    if ($event._id) {
      this.taskService.put(Config.RETIRE_URL, {data: $event}).subscribe((data) => {
        this.procedureForm.updateMessge("Cập nhật thành công", "success");
        super.updateList(this.data, this.update, $event);
        super.updateList(this.dataTemp, this.update, $event);
      }, (err) => {
        this.procedureForm.updateMessge("Không thành công ", "warning");
      }, () => {
      });
    } else {
      this.taskService.post(Config.RETIRE_URL, {data: $event}).subscribe((data) => {
        let item = JSON.parse(data['_body']);
        if (item["msg"]) {
          this.procedureForm.updateMessge("Cán bộ này đã được xử lý rồi vui lòng cập nhật", "warning");
        } else {
          this.procedureForm.updateMessge("Thành công", "success");
          $event['_id'] = item._id;
          this.data.add($event, 0);
          this.dataTemp.add($event, 0);
        }
        // this.data.add()
      }, (err) => {
        this.procedureForm.updateMessge("Không thành công ", "warning");

      }, () => {
      });
    }

  };

  editHandler($event) {
    this.update = $event;
    console.log("update " + JSON.stringify($event));
  }

  getData() {
    this.taskService.get(Config.RETIRE_URL).subscribe((data: any[]) => {
      this.data = super.asList(data);
      this.dataTemp = super.asList(data);
    }, err => {
      // this.data = [];
    });
  }

  removeHandler($event) {
    this.taskService.delete2(Config.RETIRE_URL, {data: $event}).subscribe(data => {
      this.data.remove($event);
      this.dataTemp.remove($event);
      this.procedureForm.updateMessge("Xóa thành công", "success");
    }, err => {
      this.procedureForm.updateMessge("Xóa không thành công", "warning");
    }, () => {
    });
  }

  textChangeListener(event) {
    console.log(event);
    event = event.trim().toLowerCase();
    if (event == '') {
      this.data = super.clone(this.dataTemp.toArray());
    }
    let temp = [];
    this.data.clear();
    for (let item of this.dataTemp.toArray()) {
      let date = new Date(item.dateDecide);
      let dateFormat = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      if (item.user.username.toLowerCase().indexOf(event) != -1 ||
        item.user.fullname.toLowerCase().indexOf(event) != -1 ||
        item.user.organ && item.user.organ.level1.name.toLowerCase().indexOf(event) != -1 ||
        item.numberDecide.toLowerCase().indexOf(event) != -1 ||
        dateFormat.indexOf(event) != -1) {
        temp.push(item);
      }
    }
    this.data = super.asList(temp);
  }

}
