import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PatientQueueService } from '../service/patient-queue.service'; 
import { Patient_queue } from '../model/Patient_queue'; 

export class QueueDataSource extends DataSource<Patient_queue> {

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
      const a_name=(a.patient.first_name+" "+a.patient.father_name+" "+a.patient.grand_father_name); 
      const b_name = (b.patient.first_name+" "+b.patient.father_name+" "+b.patient.grand_father_name);
      switch (this.sort.active) {
        case 'reg_id': return compare(a.patient.reg_id, b.patient.reg_id, isAsc);
        case 'name': return compare(a_name, b_name, isAsc );
        case 'humanWaitingTime': return compare(+a.humanWaitingTime, +b.humanWaitingTime, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
