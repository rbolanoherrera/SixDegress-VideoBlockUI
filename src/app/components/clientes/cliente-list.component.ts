import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, ClienteService, GeneralTablesService } from '../../services';
import { default as Swal } from 'sweetalert2';
import { GeneralResponse } from '../../models/GeneralResponse';
import { GeneralFilter } from 'src/app/models/GeneralFilter';

@Component({
    //selector: 'app-list',
    templateUrl: './cliente-list.component.html'
    //,styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

    public form: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    //user: GeneralResponse;
    clientes: any[];
    isDeleting:boolean;

    constructor(
        private formBuilder: FormBuilder,
        private toast: AlertService,
        private generalTablesService: GeneralTablesService,
        //private accountService:AccountService
        private clienteService:ClienteService
    ) {
        //this.user = this.accountService.userValue;
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            //tipoDocumentoId: ['', [Validators.required]],
            buscar: ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9ñáéíóú ]+$')]]
            //documento: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
            //nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            //celular: ['', [Validators.maxLength(15), Validators.pattern('^[0-9]+$')]]
        });

        //this.getClientesFiltered();
    }

    get f() { return this.form.controls; }

    onSubmit(){

        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.getClientesFiltered();
    }

    getClientesFiltered(){

        this.loading=true;
        let filter: GeneralFilter = new GeneralFilter();
        filter.String1 = this.form.get("buscar").value;//nombre producto ó proveedor
        filter.String2 = null;//nom proveedor
        filter.pageInit = 1;//número de pagina
        filter.pageEnd = -1;//número de Registros por pagina

        this.clienteService.getFiltered(filter)
        .subscribe(res => {

            this.loading=false;
            if (res.Data != null)
                this.clientes = res.Data;
            else {
                this.toast.info('No hay data de Clientes');
                this.clientes = [];
            }
            
        },
        err => {
            this.loading = false;
            this.toast.error('Error al obtener el listado de Clientes');
        });

    }

    confirmDeleteCliente(id:number){
        Swal.fire({
            title: 'Mensaje de confirmación',
            text: "Esta seguro de eliminar el Cliente?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.value) {
              this.deleteCliente(id);
            }
          });
    }

    deleteCliente(id:number){

        this.loading=true;
        //const user = this.products.find(x => x.productoId === parseInt(id));
        this.isDeleting = true;
        this.clienteService.delete(id)
        .subscribe(res => {
            
            this.isDeleting = false;
            this.loading=false;
            let resp:GeneralResponse  = (<GeneralResponse>res);
            if(resp.StatusCode == 200){
                this.toast.info(resp.Message);
                this.getClientesFiltered();
            }
            else
                this.toast.error(resp.Message);
        },
        err => {
            this.loading=false;
            this.isDeleting = false;
            console.log('Error al eliminar el Cliente');
        });

    }

}
