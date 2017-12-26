import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRouting} from "./app.routing";
import {HttpModule} from "@angular/http";
import {NationalService} from "./shares/national.service";
import {TaskService} from "./shares/task.service";
import {AddressService} from "./shares/address.service";

import {Ng2PageScrollModule} from "ng2-page-scroll";
import {OrderModule} from "ngx-order-pipe";

import {CatalogSalaryService} from "./shares/catalog-salary.service";
import {CatalogFacultyService} from "./shares/catalog-faculty.service";
import {DataTableModule} from "angular2-datatable";
import {ExcelService} from "./shares/excel.service";
import {DxDataGridModule} from "devextreme-angular";
import {SelectModule} from "ng2-select";
import {ManagerCanactive} from "./shares/canactive/manager.canactive";
import {ManagerCanactiveChild} from "./shares/canactive/manager.canactive.child";
import {AcountShareService} from "./shares/acount-share.service";

import {PesonnelModule} from "./personnels/pesonnel.module";
import {AppComonModule} from "./comon-module";
import {RoleServie} from "./shares/role.servie";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    PesonnelModule,
    HttpModule,
    Ng2PageScrollModule,
    OrderModule,
    DataTableModule,
    DxDataGridModule,
    SelectModule,
    AppComonModule.forRoot(),
    PesonnelModule.forRoot()
  ],
  entryComponents: [],
  providers: [NationalService, CatalogSalaryService,
    CatalogFacultyService,
    ExcelService,
    ManagerCanactive,
    ManagerCanactiveChild,
    RoleServie,

    AcountShareService,
    TaskService, AddressService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
