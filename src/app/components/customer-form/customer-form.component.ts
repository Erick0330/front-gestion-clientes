import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { FileSelectEvent } from 'primeng/fileupload';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  
  formCostumer!: FormGroup;
  isSaveInProgress: boolean = false;
  edit:boolean = false;
  selectedFile:File|null = null

  constructor(private fb: FormBuilder,
    private customerService:CustomerService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router){
    this.formCostumer = this.fb.group({
      id:[null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      image:[null]
    });
  }

  ngOnInit():void {
    let id= this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== 'new') {
      this.edit = true;
      this.getCustomerById(+id!)
    }
  }

  onFileSelected(event:FileSelectEvent){
    this.selectedFile = event.files[0];
  }

  getCustomerById(id:number){
    this.customerService.getCustomerById(id).subscribe({
      next:foundCustomer=>{
        this.formCostumer.patchValue(foundCustomer);
      },
      error:()=>{
        this.messageService.add({severity: 'error',
          summary: 'Error',
          detail: 'No encontrado'
        });
        this.router.navigateByUrl('/')
      }
    });
  }

  createCustomer(){
    if(this.formCostumer.invalid){
      this.messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente'
      });
      return
    }
    if(!this.selectedFile){
      this.messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: 'Seleccione una imagen e intente nuevamente'
      });
      return
    }
    this.isSaveInProgress=true
    this.customerService.createCustomer(this.formCostumer.value, this.selectedFile).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'success',
            summary: 'Guardado',
            detail: 'Cliente guardado correctamente'
        });
        this.isSaveInProgress=false
        this.router.navigateByUrl('/')
      },
      error:()=>{
        this.isSaveInProgress=false
        this.messageService.add({
          severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente'
        });
      }
    })
  }

  changeImage(event:FileSelectEvent){
    this.selectedFile = event.files[0];
    if(!this.selectedFile){
      this.messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: 'Seleccione una imagen e intente nuevamente'
      });
      return;
    }

    this.isSaveInProgress=true
    this.customerService.updateCustomerImage(this.formCostumer.value.id, this.selectedFile).subscribe({
      next:()=>{
        this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Imagen actualizada correctamente'
        });
        this.isSaveInProgress=false
        
      },
      error:()=>{
        this.isSaveInProgress=false
        this.messageService.add({
          severity: 'error',
            summary: 'Error',
            detail: 'Revise el archivo seleccionado'
        });
      },
    })
  }

  updateCustomer(){
    if(this.formCostumer.invalid){
      this.messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente'
      });
      return
    }
    this.isSaveInProgress=true
    this.customerService.updateCustomer(this.formCostumer.value).subscribe({
      next:()=>{
        
        this.messageService.add({
          severity: 'success',
            summary: 'Guardado',
            detail: 'Cliente actualizado correctamente'
        });
        this.isSaveInProgress=false
        this.router.navigateByUrl('/')
      },
      error:()=>{
        this.isSaveInProgress=false
        this.messageService.add({
          severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente'
        });
      },
    })
  }
}
