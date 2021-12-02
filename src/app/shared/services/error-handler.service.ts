import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';
 
  constructor() { }
 
  public handleError = (error: HttpErrorResponse) => {
    if(error.status === 400){
      this.handle400Error(error);
    }
    else if(error.status === 404){
      this.handle404Error(error)
    }
    else if(error.status === 500){
      this.handle500Error(error)
    }
    else{
      this.handleOtherError(error);
    }
  }
 
  private handle400Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/500']);
       alert("invalid syntax")
       
  }
  private handle500Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/500']);
       alert("internal server error")
       
  }
 
  private handle404Error = (error: HttpErrorResponse) => {
    // this.createErrorMessage(error);
    // this.router.navigate(['/404']);
    alert("page not found");

  }

  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    // alert("somthing wrong in Registration page")
    //TODO: this will be fixed later;
  }
 
  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}
