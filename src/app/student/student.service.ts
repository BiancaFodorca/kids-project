import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {
  students: Student[] = [
    {
      id: 1,
      name: 'Krunal',
      age: 7,
      school: 'VVP Engineering College',
      class: 1
    },
    {
      id: 2,
      name: 'Rushabh',
      age: 9,
      school: 'VVP Engineering College',
      class: 2
    },
    {
      id: 3,
      name: 'Ankit',
      age: 10,
      school: 'VVP Engineering College',
      class: 3
    }
  ];

  constructor() {}

  public getStudents(): any {
    const studentsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.students);
      }, 1000);
    });
  }
}
