import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {PersonnelManagerComponent} from "./manager-personnels/personnels.component";
import {CurriculumVitaeComponent} from "./info-person/curriculum-vitae/curriculum-vitae.component";
import {PartyUnionComponent} from "./info-person/party-union/party-union.component";
import {FamilyRelationshipComponent} from "./info-person/family-relationship/family-relationship.component";
import {ContractComponent} from "./info-person/contract/contract.component";
import {ProcessWorkComponent} from "./info-person/process-work/process-work.component";
import {BonusDisciplineComponent} from "./info-person/bonus-discipline/bonus-discipline.component";
import {AcademicRankComponent} from "./info-person/academic-rank/academic-rank.component";
import {EmulationTitleComponent} from "app/personnels/info-person/emulation-title/emulation-title.component";
import {SalaryBriefComponent} from "./info-person/salary-brief/salary-brief.component";
import {ThesisGuideComponent} from "./info-person/thesis-guide/thesis-guide.component";
import {SenimarNewpaperComponent} from "./info-person/senimar-newpaper/senimar-newpaper.component";
import {ProcessEventionComponent} from "./info-person/process-evention/process-evention.component";
import {PublishInfoComponent} from "app/personnels/info-person/publish-info/publish-info.component";
import {ScienceTopicComponent} from "./info-person/science-topic/science-topic.component";
import {AddPersonnelComponent} from "app/personnels/manager-personnels/add-personnel/add-personnel.component";
import {EditPersonnelComponent} from "app/personnels/manager-personnels/edit-personnel/edit-personnel.component";
import {ProcedureLeaveJobComponent} from "./manager-personnels/procedure-leave-job/procedure-leave-job.component";
import {ProcedureTransferDepartmentComponent} from "app/personnels/manager-personnels/procedure-transfer-department/procedure-transfer-department.component";
import {ProcedureTransferUnitWorkComponent} from "./manager-personnels/procedure-transfer-unit-work/procedure-transfer-unit-work.component";
import {ProcedureRetireComponent} from "./manager-personnels/procedure-retire/procedure-retire.component";
import {ProcedureBindJobComponent} from "app/personnels/manager-personnels/procedure-bind-job/procedure-bind-job.component";
import {ForeignComponent} from "app/personnels/info-person/foreign/foreign.component";
import {LanguageTeachnolyPoliticComponent} from "app/personnels/info-person/language-teachnoly-politic/language-teachnoly-politic.component";
import {TrainComponent} from "./info-person/process-train/train.component";
import {ProcessTeachingComponent} from "./info-person/process-teaching/process-teaching.component";
import {ManagerComponent} from "app/personnels/manger.component";
import {InfoComponent} from "./info-person/info.component";
import {Ng2PageScrollModule} from "ng2-page-scroll";


const routes: Routes = [
  {
    path: 'manager', component: ManagerComponent, children: [
    {path: '', component: InfoComponent},
    {path: 'info', component: InfoComponent},
    {
      path: "manager-personnel", component: PersonnelManagerComponent, children: [
      {
        path: '', component: CurriculumVitaeComponent,
      }, {
        path: 'curriculum-vitae', component: CurriculumVitaeComponent
      },
      {
        path: 'party-union', component: PartyUnionComponent
      }, {
        path: 'family-relationship', component: FamilyRelationshipComponent
      }, {
        path: 'contract', component: ContractComponent
      }, {
        path: 'process-work', component: ProcessWorkComponent
      },
      {
        path: 'politic-language-technology', component: LanguageTeachnolyPoliticComponent
      },
      {
        path: 'bonus-discipline', component: BonusDisciplineComponent
      }, {
        path: 'academic-rank', component: AcademicRankComponent
      }, {
        path: 'emulation-title', component: EmulationTitleComponent
      }, {
        path: 'salary-brief', component: SalaryBriefComponent
      }, {
        path: 'foreign', component: ForeignComponent
      }, {
        path: 'thesis-guide', component: ThesisGuideComponent
      }, {
        path: 'senimar-newpaper', component: SenimarNewpaperComponent
      }, {
        path: 'process-evention', component: ProcessEventionComponent
      }, {
        path: 'publish-info', component: PublishInfoComponent
      }, {
        path: 'science-topic', component: ScienceTopicComponent
      },
      {
        path: 'process-train', component: TrainComponent
      },
      {
        path: 'process-teaching', component: ProcessTeachingComponent
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
        path: 'procedure-retire', component: ProcedureRetireComponent
      }
    ]
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class PersonnelRouting {

}
