import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AlertService {
    
  constructor(private toastr: ToastrService) { }

  error(message:string){
    this.toastr.error(message);
  }

  warning(message:string){
    this.toastr.warning(message);
  }

  info(message:string){
    this.toastr.info(message);
  }

  success(message:string){
    this.toastr.success(message);
  }

}