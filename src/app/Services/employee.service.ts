import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient ) { }

  _baseURL : String = "https://localhost:5001/api/Employee/Employee/";

  getEmployee(){
    return this.httpClient.get<any>(this._baseURL + "select/-999");
  }

  postEmployee(data : any){
    return this.httpClient.post(this._baseURL + "Insert" , data);
  }

  updateEmployee(data : any){
    return this.httpClient.post(this._baseURL + "Update" , data);
  }

  deleteEmployee(id: any) {
    return this.httpClient.delete(this._baseURL + "Delete?EmpID=" + id);
  }
}
