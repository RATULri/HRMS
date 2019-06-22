import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface GeneratePayrollItem {
  name: string;
  id: number;
  grossSalary: string;
  deduction: string;
  netSalary: string;
  employeeType: string;
  department: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: GeneratePayrollItem[] = [
  {id: 1, name: 'Salman', grossSalary: 'a', deduction: '0', netSalary: 'a', employeeType: 'Parmanent', department: 'IT'},
  {id: 2, name: 'Farhan', grossSalary: 'b', deduction: '0', netSalary: 'b', employeeType: 'Parmanent', department: 'IT'},
  {id: 3, name: 'Arif', grossSalary: 'c', deduction: '0', netSalary: 'c', employeeType: 'Parmanent', department: 'IT'},
  {id: 4, name: 'Siam', grossSalary: 'x', deduction: '0', netSalary: 'x', employeeType: 'Parmanent', department: 'IT'},
  {id: 5, name: 'Ibrahim', grossSalary: 'y', deduction: '0', netSalary: 'y', employeeType: 'Intern', department: 'IT'},
  {id: 6, name: 'Ratul', grossSalary: 'z', deduction: '0', netSalary: 'z', employeeType: 'Intern', department: 'IT'}
];

/**
 * Data source for the GeneratePayroll view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GeneratePayrollDataSource extends DataSource<GeneratePayrollItem> {
  data: GeneratePayrollItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<GeneratePayrollItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: GeneratePayrollItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: GeneratePayrollItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
