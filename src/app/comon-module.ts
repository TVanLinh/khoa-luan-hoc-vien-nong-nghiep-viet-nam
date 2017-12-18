import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {SelectModule} from "ng2-select";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {OrderModule} from "ngx-order-pipe";
import {DataTableModule} from "angular2-datatable";
import {DxDataGridModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {TabLeftComponent} from "./components/tabs/tab-left/tab-left.component";
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";
import {HomeComponent} from "./home/home.component";
import {MapComponent} from "./components/map/map.component";
import {ToggleClass} from "./core/directives/toogle.class.directive";
import {TopComponent} from "./components/top/top.component";
import {PublishComponent} from "./components/publish/publish.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {SliderFacultyComponent} from "./components/sliders/slider-faculty/slider-faculty.component";
import {TabFacultyComponent} from "./components/tabs/tab-faculty/tab-faculty.component";
import {NewComponent} from "./components/new/new.component";
import {ComponentsComponent} from "./components/components.component";
import {SliderBannerComponent} from "./components/sliders/slider-banner/slider-banner.component";
import {BannerComponent} from "./components/banners/banner/banner.component";
import {PersonsComponent} from "./components/persons/persons.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {SlidersComponent} from "./components/sliders/sliders.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footers/footer/footer.component";
import {HeaderComponent} from "./components/headers/header/header.component";
import {ArraySortPipe} from "./shares/sort/sort.pipe";
import {LoginComponent} from "./auth/login/login.component";
import {AddressService} from "./shares/address.service";
import {TaskService} from "./shares/task.service";
import {ManagerCanactive} from "./shares/canactive/manager.canactive";
import {AcountShareService} from "./shares/acount-share.service";
import {CatalogFacultyService} from "./shares/catalog-faculty.service";
import {NationalService} from "./shares/national.service";
import {CatalogSalaryService} from "./shares/catalog-salary.service";
import {ExcelService} from "./shares/excel.service";
import {ManagerCanactiveChild} from "./shares/canactive/manager.canactive.child";
import {AlertConfirmComponent} from "./components/alert-confirm/alert-confirm.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SlidersComponent,
    TabsComponent,
    PersonsComponent,
    BannerComponent,
    SliderBannerComponent,
    ComponentsComponent,
    NewComponent,
    TabFacultyComponent,
    SliderFacultyComponent,
    CalendarComponent,
    PublishComponent,
    TabLeftComponent,
    TopComponent,
    ToggleClass,
    MapComponent,
    HomeComponent,
    LoginComponent,
    ArraySortPipe,
    AlertConfirmComponent
  ],
  imports: [ReactiveFormsModule,
    FormsModule,
    Ng2Bs3ModalModule,
    HttpModule,
    Ng2PageScrollModule,
    OrderModule,
    DataTableModule,
    DxDataGridModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9s64voWTBx5s4qadlcWwbCNhWJU5Sje0'
    }),
    SelectModule],
  exports: [ReactiveFormsModule,
    FormsModule,
    Ng2Bs3ModalModule,
    HttpModule,
    Ng2PageScrollModule,
    OrderModule,
    DataTableModule,
    BrowserModule,
    DxDataGridModule,
    SelectModule,
    CommonModule,
    AgmCoreModule,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NewComponent,
    // TabFacultyComponent,
    SliderFacultyComponent,
    CalendarComponent,
    PublishComponent,
    TabLeftComponent,
    TopComponent,
    ToggleClass,
    MapComponent,
    HomeComponent,
    LoginComponent,
    ArraySortPipe,
    AlertConfirmComponent
  ],
  providers: [
    NationalService, CatalogSalaryService,
    CatalogFacultyService,
    ExcelService,
    ManagerCanactive,
    ManagerCanactiveChild,
    AcountShareService,
    TaskService, AddressService
  ]
})

export class AppComonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppComonModule
    };
  }
}

// export = AppComonModule;
