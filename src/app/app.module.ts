import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/headers/header/header.component";
import {FooterComponent} from "./components/footers/footer/footer.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SlidersComponent} from "./components/sliders/sliders.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {PersonsComponent} from "./components/persons/persons.component";
import {BannerComponent} from "./components/banners/banner/banner.component";
import {SliderBannerComponent} from "./components/sliders/slider-banner/slider-banner.component";
import {ComponentsComponent} from "./components/components.component";
import {NewComponent} from "./components/new/new.component";
import {TabFacultyComponent} from "./components/tabs/tab-faculty/tab-faculty.component";
import {SliderFacultyComponent} from "./components/sliders/slider-faculty/slider-faculty.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {PublishComponent} from "./components/publish/publish.component";
import {TabLeftComponent} from "./components/tabs/tab-left/tab-left.component";
import {TopComponent} from "./components/top/top.component";
import {ToggleClass} from "app/core/directives/toogle.class.directive";
import {MapComponent} from "./components/map/map.component";
import {AgmCoreModule} from "@agm/core";
import {CurriculumVitaeComponent} from "./personnels/info-person/curriculum-vitae/curriculum-vitae.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PartyUnionComponent} from "./personnels/info-person/party-union/party-union.component";
import {ModalComponent, Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {NoteFormComponent} from "./personnels/notes/note-form/note-form.component";
import {FamilyRelationshipComponent} from "./personnels/info-person/family-relationship/family-relationship.component";
import {ProcessWorkComponent} from "./personnels/info-person/process-work/process-work.component";
import {TrainComponent} from "./personnels/info-person/process-train/train.component";
import {ContractComponent} from "./personnels/info-person/contract/contract.component";
import {NoteForm2Component} from "./personnels/notes/note-form2/note-form2.component";
import {InfoTechnologyComponent} from "./personnels/info-person/language-teachnoly-politic/info-technology/info-technology.component";
import {PoliticComponent} from "./personnels/info-person/language-teachnoly-politic/politic/politic.component";
import {ForeignLanguageComponent} from "./personnels/info-person/language-teachnoly-politic/foreign-language/foreign-language.component";
import {BonusDisciplineComponent} from "./personnels/info-person/bonus-discipline/bonus-discipline.component";
import {AcademicRankComponent} from "./personnels/info-person/academic-rank/academic-rank.component";
import {EmulationTitleComponent} from "./personnels/info-person/emulation-title/emulation-title.component";
import {SalaryBriefComponent} from "./personnels/info-person/salary-brief/salary-brief.component";
import {ForeignComponent} from "./personnels/info-person/foreign/foreign.component";
import {ThesisGuideComponent} from "./personnels/info-person/thesis-guide/thesis-guide.component";
import {ScienceTopicComponent} from "./personnels/info-person/science-topic/science-topic.component";
import {SenimarNewpaperComponent} from "./personnels/info-person/senimar-newpaper/senimar-newpaper.component";
import {PublishInfoComponent} from "./personnels/info-person/publish-info/publish-info.component";
import {ProcessTeachingComponent} from "./personnels/info-person/process-teaching/process-teaching.component";
import {ProcessEventionComponent} from "./personnels/info-person/process-evention/process-evention.component";
import {AddPersonnelComponent} from "./personnels/manager-personnels/add-personnel/add-personnel.component";
import {EditPersonnelComponent} from "./personnels/manager-personnels/edit-personnel/edit-personnel.component";
import {ProcedureLeaveJobComponent} from "./personnels/manager-personnels/procedure-leave-job/procedure-leave-job.component";
import {ProcedureRetireComponent} from "./personnels/manager-personnels/procedure-retire/procedure-retire.component";
import {ProcedureBindJobComponent} from "./personnels/manager-personnels/procedure-bind-job/procedure-bind-job.component";
import {ProcedureTransferUnitWorkComponent} from "./personnels/manager-personnels/procedure-transfer-unit-work/procedure-transfer-unit-work.component";
import {ProcedureTransferDepartmentComponent} from "./personnels/manager-personnels/procedure-transfer-department/procedure-transfer-department.component";
import {MenuAppComponent} from "./menu-app/menu-app.component";
import {Header2Component} from "./components/headers/header-2/header-2.component";
import {PersonnelManagerComponent} from "./personnels/manager-personnels/personnels.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppRouting} from "./app.routing";
import {HomeComponent} from "./home/home.component";
import {PersonnelRouting} from "./personnels/pesonnel.routing";
import {LanguageTeachnolyPoliticComponent} from "./personnels/info-person/language-teachnoly-politic/language-teachnoly-politic.component";
import {HttpModule} from "@angular/http";
import {NationalService} from "./shares/national.service";
import {TaskService} from "./shares/task.service";
import {ManagerComponent} from "./personnels/manger.component";
import {InfoComponent} from "./personnels/info-person/info.component";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {ImageUploadModule} from "angular2-image-upload";
import { ManagerCatalogComponent } from './personnels/manager-catalog/manager-catalog.component';
import { SearchStatisticComponent } from './personnels/search-statistic/search-statistic.component';
import { ManagerSystemComponent } from './personnels/manager-system/manager-system.component';
import { CatalogFacultyComponent } from './personnels/manager-catalog/catalog-faculty/catalog-faculty.component';
import { CatalogRankComponent } from './personnels/manager-catalog/catalog-rank/catalog-rank.component';
import { CatalogPositionComponent } from './personnels/manager-catalog/catalog-position/catalog-position.component';
import { CatalogAcademicRankComponent } from './personnels/manager-catalog/catalog-academic-rank/catalog-academic-rank.component';
import { SearchComponent } from './personnels/search-statistic/search/search.component';
import { StatisticComponent } from './personnels/search-statistic/statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
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
    CurriculumVitaeComponent,
    PartyUnionComponent,
    NoteFormComponent,
    FamilyRelationshipComponent,
    ProcessWorkComponent,
    TrainComponent,
    ContractComponent,
    NoteForm2Component,
    InfoTechnologyComponent,
    PoliticComponent,
    ForeignLanguageComponent,
    BonusDisciplineComponent,
    AcademicRankComponent,
    EmulationTitleComponent,
    SalaryBriefComponent,
    ForeignComponent,
    ThesisGuideComponent,
    ScienceTopicComponent,
    SenimarNewpaperComponent,
    PublishInfoComponent,
    ProcessTeachingComponent,
    ProcessEventionComponent,
    AddPersonnelComponent,
    EditPersonnelComponent,
    ProcedureLeaveJobComponent,
    ProcedureRetireComponent,
    ProcedureBindJobComponent,
    ProcedureTransferUnitWorkComponent,
    ProcedureTransferDepartmentComponent,
    MenuAppComponent,
    Header2Component,
    PersonnelManagerComponent,
    LoginComponent,
    HomeComponent,
    LanguageTeachnolyPoliticComponent,
    ManagerComponent,
    InfoComponent,
    ManagerCatalogComponent,
    SearchStatisticComponent,
    ManagerSystemComponent,
    CatalogFacultyComponent,
    CatalogRankComponent,
    CatalogPositionComponent,
    CatalogAcademicRankComponent,
    SearchComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9s64voWTBx5s4qadlcWwbCNhWJU5Sje0'
    }),
    ReactiveFormsModule,
    FormsModule,
    Ng2Bs3ModalModule,
    AppRouting,
    PersonnelRouting,
    HttpModule,
    Ng2PageScrollModule,
    ImageUploadModule.forRoot(),
  ],
  entryComponents: [],
  providers: [NationalService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
