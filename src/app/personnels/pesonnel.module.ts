import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {PersonnelManagerComponent} from "./manager-personnels/personnels.component";
import {AddPersonnelComponent} from "app/personnels/manager-personnels/add-personnel/add-personnel.component";
import {EditPersonnelComponent} from "app/personnels/manager-personnels/edit-personnel/edit-personnel.component";
import {ProcedureLeaveJobComponent} from "./manager-personnels/procedure-leave-job/procedure-leave-job.component";
import {ProcedureTransferDepartmentComponent} from "app/personnels/manager-personnels/procedure-transfer-department/procedure-transfer-department.component";
import {ProcedureTransferUnitWorkComponent} from "./manager-personnels/procedure-transfer-unit-work/procedure-transfer-unit-work.component";
import {ProcedureRetireComponent} from "./manager-personnels/procedure-retire/procedure-retire.component";
import {ProcedureBindJobComponent} from "app/personnels/manager-personnels/procedure-bind-job/procedure-bind-job.component";
import {ManagerComponent} from "app/personnels/manger.component";
import {InfoComponent} from "./info-person/info.component";
import {ManagerCatalogComponent} from "./manager-catalog/manager-catalog.component";
import {ManagerSystemComponent} from "./manager-system/manager-system.component";
import {CatalogAcademicRankComponent} from "./manager-catalog/catalog-academic-rank/catalog-academic-rank.component";
import {CatalogFacultyComponent} from "./manager-catalog/catalog-faculty/catalog-faculty.component";
import {CatalogPositionComponent} from "./manager-catalog/catalog-position/catalog-position.component";
import {CatalogRankComponent} from "app/personnels/manager-catalog/catalog-rank/catalog-rank.component";
import {SearchComponent} from "app/personnels/search-statistic/search/search.component";
import {StatisticComponent} from "./search-statistic/statistic/statistic.component";
import {StatisticLeaveJobComponent} from "./search-statistic/statistic/statistic-leave-job/statistic-leave-job.component";
import {StatisticBindJobComponent} from "./search-statistic/statistic/statistic-bind-job/statistic-bind-job.component";
import {StatisticRetiredComponent} from "./search-statistic/statistic/statistic-retired/statistic-retired.component";
import {StatisticNewRetireComponent} from "./search-statistic/statistic/statistic-new-retire/statistic-new-retire.component";
import {StatisticPersonByFacultyComponent} from "./search-statistic/statistic/statistic-person-by-faculty/statistic-person-by-faculty.component";
import {ArgSystemComponent} from "./manager-system/arg-system/arg-system.component";
import {ArgBackendComponent} from "./manager-system/arg-system/arg-backend/arg-backend.component";
import {ArgFontendComponent} from "./manager-system/arg-system/arg-fontend/arg-fontend.component";
import {ProcedureAcesendingSalaryComponent} from "./manager-personnels/procedure-acesending-salary/procedure-acesending-salary.component";
import {RoleManagerComponent} from "./manager-personnels/role-manager/role-manager.component";
import {UserManagerComponent} from "./manager-personnels/user-manager/user-manager.component";
import {ProcedureBonusComponent} from "app/personnels/manager-personnels/procedure-bonus/procedure-bonus.component";
import {ProcedureDisciplineComponent} from "./manager-personnels/procedure-discipline/procedure-discipline.component";
import {ManagerCanactive} from "../shares/canactive/manager.canactive";
import {ManagerCanactiveChild} from "../shares/canactive/manager.canactive.child";
import {CheckProfileComponent} from "./manager-personnels/check-profile/check-profile.component";
import {AuthenticationComponent} from "./manager-system/authentication/authentication.component";
import {StatisticTableComponent} from "./search-statistic/statistic/statistic-table/statistic-table.component";
import {SearchFormComponent} from "./search-form/search-form.component";
import {CatalogFacultyPipe} from "./manager-catalog/catalog-faculty/catalog-faculty.pipe";
import {MessageComponent} from "../components/message/message.component";
import {SearchStatisticComponent} from "./search-statistic/search-statistic.component";
import {LanguageTeachnolyPoliticComponent} from "./info-person/language-teachnoly-politic/language-teachnoly-politic.component";
import {Header2Component} from "../components/headers/header-2/header-2.component";
import {MenuAppComponent} from "../menu-app/menu-app.component";
import {ProcessEventionComponent} from "./info-person/process-evention/process-evention.component";
import {ProcessTeachingComponent} from "./info-person/process-teaching/process-teaching.component";
import {ForeignComponent} from "./info-person/foreign/foreign.component";
import {SalaryBriefComponent} from "./info-person/salary-brief/salary-brief.component";
import {CurriculumVitaeComponent} from "./info-person/curriculum-vitae/curriculum-vitae.component";
import {PartyUnionComponent} from "./info-person/party-union/party-union.component";
import {NoteFormComponent} from "./notes/note-form/note-form.component";
import {FamilyRelationshipComponent} from "./info-person/family-relationship/family-relationship.component";
import {ProcessWorkComponent} from "./info-person/process-work/process-work.component";
import {TrainComponent} from "./info-person/process-train/train.component";
import {ContractComponent} from "./info-person/contract/contract.component";
import {NoteForm2Component} from "./notes/note-form2/note-form2.component";
import {InfoTechnologyComponent} from "./info-person/language-teachnoly-politic/info-technology/info-technology.component";
import {PoliticComponent} from "./info-person/language-teachnoly-politic/politic/politic.component";
import {ForeignLanguageComponent} from "./info-person/language-teachnoly-politic/foreign-language/foreign-language.component";
import {BonusDisciplineComponent} from "./info-person/bonus-discipline/bonus-discipline.component";
import {AcademicRankComponent} from "./info-person/academic-rank/academic-rank.component";
import {EmulationTitleComponent} from "./info-person/emulation-title/emulation-title.component";
import {ThesisGuideComponent} from "./info-person/thesis-guide/thesis-guide.component";
import {ScienceTopicComponent} from "./info-person/science-topic/science-topic.component";
import {SenimarNewpaperComponent} from "./info-person/senimar-newpaper/senimar-newpaper.component";
import {PublishInfoComponent} from "./info-person/publish-info/publish-info.component";
import {AppComonModule}from "../comon-module";
import {AddressService} from "../shares/address.service";
import {AcountShareService} from "../shares/acount-share.service";
import {ExcelService} from "../shares/excel.service";
import {CatalogFacultyService} from "../shares/catalog-faculty.service";
import {CatalogSalaryService} from "../shares/catalog-salary.service";
import {NationalService} from "../shares/national.service";
import {TaskService} from "../shares/task.service";
import { CatalogSearchComponent } from './manager-catalog/catalog-search/catalog-search.component';

const routes: Routes = [
  {
    path: 'manager', component: ManagerComponent, children: [
    {path: '', component: InfoComponent},
    {path: 'info', component: InfoComponent},
    {
      path: "manager-personnel", component: PersonnelManagerComponent, children: [
      {
        path: '', component: AddPersonnelComponent,
      },
      {
        path: 'add-personnel', component: AddPersonnelComponent
      }, {
        path: 'edit-personnel', component: EditPersonnelComponent
      }, {
        path: 'procedure-leave-job', component: ProcedureLeaveJobComponent
      }, {
        path: 'procedure-bind-job', component: ProcedureBindJobComponent
      }, {
        path: 'procedure-transfer-unit-work', component: ProcedureTransferUnitWorkComponent
      }, {
        path: 'procedure-transfer-department', component: ProcedureTransferDepartmentComponent
      }, {
        path: 'procedure-increase-salary', component: ProcedureAcesendingSalaryComponent
      }, {
        path: 'procedure-retire', component: ProcedureRetireComponent
      },
      {
        path: 'procedure-bonus',
        component: ProcedureBonusComponent
      },
      {
        path: 'check-profile',
        component: CheckProfileComponent
      },
      {
        path: 'procedure-discipline',
        component: ProcedureDisciplineComponent
      },
      {
        path: 'role',
        component: RoleManagerComponent
      },
      {
        path: 'user',
        component: UserManagerComponent
      }
    ]
    }, {
      path: 'manager-catalog', component: ManagerCatalogComponent, children: [
        {
          path: '', component: CatalogFacultyComponent
        },
        {
          path: 'faculty', component: CatalogFacultyComponent
        },
        {
          path: 'academic', component: CatalogAcademicRankComponent
        },
        {
          path: 'rank-officer', component: CatalogRankComponent
        },
        {
          path: 'position', component: CatalogPositionComponent
        }
      ]
    },
    {
      path: 'search', component: SearchComponent
    },
    {
      path: 'statistic', component: StatisticComponent, children: [
      {
        path: '', component: StatisticLeaveJobComponent
      },
      {
        path: 'leave-job', component: StatisticLeaveJobComponent
      },
      {
        path: 'bind-job', component: StatisticBindJobComponent
      },
      {
        path: 'retire', component: StatisticRetiredComponent
      },
      {
        path: 'retire-new', component: StatisticNewRetireComponent
      },
      {
        path: 'faculty-personnel',
        component: StatisticPersonByFacultyComponent
      }
    ]
    },
    {
      path: 'manager-system', component: ManagerSystemComponent, children: [
      {
        path: '',
        component: ArgSystemComponent, children: [
        {
          path: '',
          component: ArgFontendComponent
        },
        {
          path: 'fontend',
          component: ArgFontendComponent
        },
        {
          path: 'backend',
          component: ArgBackendComponent
        }]
      },
      {
        path: 'arg',
        component: ArgSystemComponent, children: [
        {
          path: '',
          component: ArgFontendComponent
        },
        {
          path: 'fontend',
          component: ArgFontendComponent
        },
        {
          path: 'backend',
          component: ArgBackendComponent
        }
      ]
      }
    ]
    }
  ],
    canActivate: [ManagerCanactive],
    canActivateChild: [ManagerCanactiveChild]
  }
];

@NgModule({
  declarations: [
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
    StatisticComponent,
    MessageComponent,
    CatalogFacultyPipe,
    SearchFormComponent,
    StatisticLeaveJobComponent,
    StatisticBindJobComponent,
    StatisticRetiredComponent,
    StatisticNewRetireComponent,
    StatisticTableComponent,
    StatisticPersonByFacultyComponent,
    ArgSystemComponent,
    ArgFontendComponent,
    ArgBackendComponent,
    ProcedureAcesendingSalaryComponent,
    AuthenticationComponent,
    UserManagerComponent,
    RoleManagerComponent,
    ProcedureBonusComponent,
    ProcedureDisciplineComponent,
    CheckProfileComponent,
    CatalogSearchComponent
  ],
  imports: [
    AppComonModule.forRoot(), RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [NationalService, CatalogSalaryService,
    CatalogFacultyService,
    ExcelService,
    ManagerCanactive,
    ManagerCanactiveChild,
    AcountShareService,
    TaskService, AddressService],
})

export class PesonnelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PesonnelModule
    };
  }
}

// export = PesonnelModule;
