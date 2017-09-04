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
import {CurriculumVitaeComponent} from "./personnels/curriculum-vitae/curriculum-vitae.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PartyUnionComponent} from "./personnels/party-union/party-union.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {NoteFormComponent} from "./personnels/notes/note-form/note-form.component";
import {FamilyRelationshipComponent} from "./personnels/family-relationship/family-relationship.component";
import {BaseFormComponent} from "app/personnels/base-form.component";
import { ProcessWorkComponent } from './personnels/process-work/process-work.component';
import {TrainComponent} from './personnels/process-train/train.component';
import { ContractComponent } from './personnels/contract/contract.component';
import { NoteForm2Component } from './personnels/notes/note-form2/note-form2.component';
import { InfoTechnologyComponent } from './personnels/info-technology/info-technology.component';
import { PoliticComponent } from './personnels/politic/politic.component';
import { ForeignLanguageComponent } from './personnels/foreign-language/foreign-language.component';
import { BonusDisciplineComponent } from './personnels/bonus-discipline/bonus-discipline.component';
import { AcademicRankComponent } from './personnels/academic-rank/academic-rank.component';
import { EmulationTitleComponent } from './personnels/emulation-title/emulation-title.component';
import { SalaryBriefComponent } from './personnels/salary-brief/salary-brief.component';
import { ForeignComponent } from './personnels/foreign/foreign.component';
import { ThesisGuideComponent } from './personnels/thesis-guide/thesis-guide.component';

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
    ThesisGuideComponent

  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9s64voWTBx5s4qadlcWwbCNhWJU5Sje0'
    }),
    ReactiveFormsModule,
    FormsModule,
    Ng2Bs3ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
