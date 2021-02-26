import { Component, OnInit } from '@angular/core';
import { GeneralResponse } from '../../models/GeneralResponse';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AccountService, GeneralTablesService, ClienteService } from '../../services';
import { GeneralTableEntity } from '../../models/GeneralTableEntity';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cliente } from '../../models/Cliente';


@Component({
    //selector: 'app-list',
    templateUrl: './cliente.component.html'
    //,styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

    public form: FormGroup;
    id: string;
    user: GeneralResponse;
    tiposDocumentos: GeneralTableEntity[]=[];
    loading: boolean = false;
    submitted: boolean = false;
    isAddMode: boolean;
    cliente:Cliente=new Cliente();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toast: AlertService,
        private accountService: AccountService,
        private generalTablesService: GeneralTablesService,
        private clienteService:ClienteService
    ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            tipoDocumentoId: ['', [Validators.required]],
            documento: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
            nombre1: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            nombre2: ['', [Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            apellido1: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            apellido2: ['', [Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            celular: ['', [Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
            direccion: ['', [Validators.maxLength(70), Validators.pattern('^[a-zA-Z0-9 #-.]+$')]],
            email: ['', [Validators.maxLength(90), Validators.pattern('^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$')]]
        });

        if (!this.isAddMode){
            this.form.controls["tipoDocumentoId"].disable();
            this.form.controls["documento"].disable();
            
        }
        else{
            this.form.controls["tipoDocumentoId"].enable();
            this.form.controls["documento"].enable();
        }

        this.getAllTipoDocumento();
        
    }

    get f() { return this.form.controls; }

    getAllTipoDocumento() {
        this.generalTablesService.getAllTiposDocumento()
          .subscribe(res => {

            res.Data.forEach(item => {
              this.tiposDocumentos.push({
                id: item.Id,
                nombre: item.Nombre
              });
            });
    
          },
          err => {
            this.toast.error('Error al obtener los Tipos de documentos');
          });
    }

    onSubmit(){

        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.createNewCustomer();

    }
    
    createNewCustomer(){

        this.loading=true;
        this.clienteService.addNew(this.createCustomerObject())
        .pipe(first())
        .subscribe(
        res => {
            
            this.loading = false;
            if(res != null && (<GeneralResponse>res).StatusCode == 200){
                this.toast.success((<GeneralResponse>res).Message);

                if(this.user != null && this.user.Data != null)
                    this.router.navigate(['.', { relativeTo: this.route }]);
                else
                this.router.navigate(['/']);
            }
            else
                this.toast.error((<GeneralResponse>res).Message);
        },
        error => {
            this.loading = false;
            this.toast.error('Error desconocido al intentar registrar Cliente');
        });   

    }

    createCustomerObject():Cliente{
        if(!this.isAddMode)
            this.cliente.Id = parseInt(this.id);
        else
            this.cliente.Id = 0;

        //console.log('cantEquivalente', this.form.get("cantEquivalente").value);

        this.cliente.TipoDocumentoId = parseInt(this.form.get("tipoDocumentoId").value);
        this.cliente.Documento = this.form.get("documento").value;
        this.cliente.Nombre1 = this.form.get("nombre1").value;
        this.cliente.Nombre2 = this.form.get("nombre2").value;
        this.cliente.Apellido1 = this.form.get("apellido1").value;
        this.cliente.Apellido2 = this.form.get("apellido2").value;
        this.cliente.Celular = this.form.get("celular").value;
        this.cliente.Direccion = this.form.get("direccion").value;
        this.cliente.Email = this.form.get("email").value;

        return this.cliente;
    }

}
