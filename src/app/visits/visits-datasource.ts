import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Patient_queue } from '../model/Patient_queue'; 

export class VisitsDataSource extends DataSource<Patient_queue> {

  constructor(private paginator: MatPaginator, private sort: MatSort, private data: Patient_queue[]) {
    super();
  }

  connect(): Observable<Patient_queue[]> {
  
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Patient_queue[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Patient_queue[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'physician': return compare(
          a.physician.first_name +" "+ a.physician.father_name+" "+a.physician.grand_father_name
          ,b.physician.first_name +" "+ b.physician.father_name+" "+b.physician.grand_father_name, isAsc);
        case 'date': return compare(a.date, +b.date, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
