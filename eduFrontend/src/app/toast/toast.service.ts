import { Injectable, ViewChild } from "@angular/core";
import { ToastComponent } from "./toast.component";

@Injectable({
    providedIn: 'root',
  })
  export class ToastService {
    
    // @ViewChild(ToastComponent) toastComponent!: ToastComponent;
    
    generateToast(toastComponent:ToastComponent,flag:boolean,toastMessage:string) {

        toastComponent.toastMessage = toastMessage;
        toastComponent.isSuccessful = flag;

        toastComponent.showToast();
      }
  }