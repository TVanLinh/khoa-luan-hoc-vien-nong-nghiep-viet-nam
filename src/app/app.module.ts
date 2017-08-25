import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/headers/header/header.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlidersComponent } from './components/sliders/sliders.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PersonsComponent } from './components/persons/persons.component';
import { BannerComponent } from './components/banners/banner/banner.component';
import { SliderBannerComponent } from './components/sliders/slider-banner/slider-banner.component';
import { ComponentsComponent } from './components/components.component';
import { NewComponent } from './components/new/new.component';
import { TabFacultyComponent } from './components/tabs/tab-faculty/tab-faculty.component';
import { SliderFacultyComponent } from './components/sliders/slider-faculty/slider-faculty.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PublishComponent } from './components/publish/publish.component';
import { TabLeftComponent } from './components/tabs/tab-left/tab-left.component';
import { TopComponent } from './components/top/top.component';
import {ToggleClass} from "app/core/directives/toogle.class.directive";
import { MapComponent } from './components/map/map.component';
import {AgmCoreModule} from "@agm/core";
import { CurriculumVitaeComponent } from './personnels/curriculum-vitae/curriculum-vitae.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9s64voWTBx5s4qadlcWwbCNhWJU5Sje0'
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
