import { Component } from '@angular/core';
import { DrawerComponent, HeaderComponent } from '../../../Common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { getMenu } from '../../MenuDrawer';
import { Curiculum } from '../../../../Models/curiculum';
import { CuriculumService } from '../../../../Services/Academic/curiculum.service';
import { MajorService, SubmajorService } from '../../../../Services';
import { Major, Subject } from '../../../../Models';
import { SubjectService } from '../../../../Services/Academic/subject.service';
import { CommonModule } from '@angular/common';
import { LoadingmodalComponent } from "../../../Common/loadingmodal/loadingmodal.component";
import { MessageboxComponent } from "../../../Common/messagebox/messagebox.component";
import { SubMajor } from '../../../../Models/Major/submajor';

@Component({
    selector: 'app-curiculum',
    standalone: true,
    templateUrl: './curiculum.component.html',
    styleUrl: './curiculum.component.scss',
    imports: [DrawerComponent, HeaderComponent, MatIcon, CommonModule, LoadingmodalComponent, MessageboxComponent]
})
export class CuriculumComponent {
  menu: any;
  curiculums: Curiculum[];
  messageTitle: string;
  messageDescription: string;
  openMessage: boolean;
  fail: boolean;
  loading: boolean;
  navigate: boolean;
  openMessage2: boolean;

  subMajors: SubMajor[];
  subMajorService: SubmajorService;

  majors: Major[];
  majorService: MajorService;
  
  constructor(
    private router: Router,
    private curiculumService: CuriculumService,
    subMajorService: SubmajorService,
    majorService: MajorService
  ) {
    this.menu = getMenu('Academic');
    this.subMajorService = subMajorService;

    this.majorService = majorService;
    this.majorService.getAllMajors().subscribe(x => {
      this.majors = x.data;
    });

    // this.subMajorService.getAllSubMajor().subscribe((x) => {
    //   this.subMajors = x.data;
    // });
  }
  goBack() {
    this.router.navigateByUrl('/admin/academic/subject');
  }

  changeMajor(event: any) {
    this.changeSubMajor(10000);

    this.subMajorService.getSubMajorInMajor(event).subscribe(x => {
      this.subMajors = x.data;
    });
  };

  changeSubMajor(event: any) {
    this.curiculumService.getCuriculumBySubMajorId(event).subscribe((x) => {
      this.curiculums = x.data;
      this.sortCurriculumsBySemester();
    });
  }

  sortCurriculumsBySemester() {
    this.curiculums.sort((a, b) => a.semester - b.semester);
  }

  goToAddCuriculum() {
    this.router.navigateByUrl(this.router.url + '/add');
  }

  currentId: any;
  deleteCuriculumRaw(id: any) {
    this.currentId = id;
    this.openMessage = true;
  }

  close() {
    this.openMessage = false;
  }

  deleteCuriculum() {
    this.loading = true;
    this.curiculumService.deleteCuriculum(this.currentId).subscribe(data => {
      if (data['responseCode'] == 200) {
        this.messageTitle = 'Notification';
        this.fail = false;
        this.messageDescription = data['message'];
        this.openMessage2 = true;
        this.navigate = true;
      } else {
        this.messageTitle = 'Error';
        this.fail = true;
        this.messageDescription = data['message'];
        this.openMessage2 = true;
      }
      return data;
    });
    this.close();
  }

  close2() {
    this.openMessage2 = false;
    if (this.navigate == true) {
      location.reload();
    }
  }

  editCuriculum(id: any) {
    this.router.navigateByUrl(this.router.url + '/edit/' + id);
  }
}
