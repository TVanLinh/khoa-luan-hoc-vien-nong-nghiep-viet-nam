import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SlidersComponent } from './sliders/sliders.component';
import { TabsComponent } from './tabs/tabs.component';
import { PersonsComponent } from './persons/persons.component';
import { BannerComponent } from './banner/banner.component';
import { SliderBannerComponent } from './sliders/slider-banner/slider-banner.component';
import { ComponentsComponent } from './components/components.component';
import { NewComponent } from './components/new/new.component';
import { TabFacultyComponent } from './tabs/tab-faculty/tab-faculty.component';
import { SliderFacultyComponent } from './sliders/slider-faculty/slider-faculty.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PublishComponent } from './components/publish/publish.component';
import { TabLeftComponent } from './tabs/tab-left/tab-left.component';
import { TopComponent } from './components/top/top.component';
import {ToggleClass} from "app/core/directives/toogle.class.directive";
import { MapComponent } from './components/map/map.component';
import {AgmCoreModule} from "@agm/core";

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

  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9s64voWTBx5s4qadlcWwbCNhWJU5Sje0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
