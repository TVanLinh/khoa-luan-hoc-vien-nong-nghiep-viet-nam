import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
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
import {RoleManagerComponent} from "./manager-system/role-manager/role-manager.component";
import {UserManagerComponent} from "./manager-system/user-manager/user-manager.component";
import {ProcedureBonusComponent} from "app/personnels/manager-personnels/procedure-bonus/procedure-bonus.component";
import {ProcedureDisciplineComponent} from "./manager-personnels/procedure-discipline/procedure-discipline.component";
import {ManagerCanactive} from "../shares/canactive/manager.canactive";
import {ManagerCanactiveChild} from "../shares/canactive/manager.canactive.child";
import {CheckProfileComponent} from "./manager-personnels/check-profile/check-profile.component";


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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class PersonnelRouting {

}
