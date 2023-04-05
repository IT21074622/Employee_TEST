import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeModel } from '../../../Models/Employee-Model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  dataInsert: EmployeeModel = new EmployeeModel();
  mStatusList = ["Maried", "Single"];
  employeeForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) 
    public editData: any, 
    private employeeService: EmployeeService, 
    private dialogRef : MatDialogRef<EmployeeFormComponent> 
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      nic : ['',Validators.required],
      dob : ['',Validators.required],
      maritalStatus : ['',Validators.required],
      gender : ['',Validators.required]
    })

    console.log(this.editData)
    if(this.editData){
      this.actionBtn = "Update"
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['nic'].setValue(this.editData.nic);
      this.employeeForm.controls['dob'].setValue(this.editData.dob);
      this.employeeForm.controls['maritalStatus'].setValue(this.editData.maritalStatus);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
    }
  }

  setDataInsert(){
    this.dataInsert.FirstName = this.employeeForm.value.firstName;
    this.dataInsert.LastName = this.employeeForm.value.lastName;
    this.dataInsert.NIC = this.employeeForm.value.nic;
    this.dataInsert.DOB = this.employeeForm.value.dob;
    this.dataInsert.MaritalStatus = this.employeeForm.value.maritalStatus;
    this.dataInsert.Gender = this.employeeForm.value.gender;

    if(!this.editData){
      this.dataInsert.EmpID = 0;
    }else{
       this.dataInsert.EmpID = this.editData.empID;
    }
  }


  addEmployee(){
    this.setDataInsert();
    console.log("insert",this.dataInsert);
    if(!this.editData){
      if(this.employeeForm.valid){
        this.employeeService.postEmployee(this.dataInsert)
        .subscribe({
          next:(res)=>{
            alert("Employee added Successfully")
            this.employeeForm.reset();
            this.dialogRef.close('save')
            window.location.reload();
          
          },
          error:()=>{
            alert("Error while Employee adding")
          }
        })        
        console.log('this.dataInsert', this.dataInsert)
      }
    }else{
      this.updateEmployee()
    }
  }
  
  updateEmployee(){
    this.setDataInsert();
    console.log(this.dataInsert);    
    this.employeeService.updateEmployee(this.dataInsert)
    .subscribe({
      next:(res)=>{
        alert("Employee updated Successfully")
        this.employeeForm.reset();
        this.dialogRef.close('update')
        window.location.reload();
      },
      error:()=>{
        alert("Error while Employee update")
      }
    })
  }

}
