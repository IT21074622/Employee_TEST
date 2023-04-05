import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'nic', 'dob', 'gender','maritalStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog, 
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(EmployeeFormComponent, {
      width: '30%'
    });
  }

  getAllEmployees(){
    this.employeeService.getEmployee().subscribe((res) => {
      this.dataSource = res.data;
      console.log("data" , res.data)
    },
    error => {
      console.log(error)
    })
  }

  editEmployee(row: any){
    this.dialog.open(EmployeeFormComponent,{
      width:'30%',
      data:row
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: any){
    console.log(id);
  
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        alert("Employee deleted Successfully")
        window.location.reload();
      },
      error:()=>{
        alert("Error while Employee delete")
      }
    })
  }

}
