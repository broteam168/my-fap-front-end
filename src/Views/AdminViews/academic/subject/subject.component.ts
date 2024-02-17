import { Component, OnInit } from "@angular/core";
import { getMenu } from "../../MenuDrawer";
import { DrawerComponent, HeaderComponent } from "../../../Common";
import { MatIcon } from "@angular/material/icon";
import { Subject } from "../../../../Models";
import { SubjectService } from "../../../../Services/subject.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-academic',
  standalone: true,
  imports: [DrawerComponent, HeaderComponent,MatIcon, CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class SubjectComponent implements OnInit{
  menu: any;
  subjects: Subject[]
  constructor(private subjectService: SubjectService, private router: Router) {
    this.menu = getMenu('Academic');
    
    this.router = router;
  }
  ngOnInit(): void {
      this.subjectService.getAllSubject().subscribe((x) => {
        this.subjects = x.data;
      });
  }
  getAllSubject() {
    return this.subjects;
  }
}