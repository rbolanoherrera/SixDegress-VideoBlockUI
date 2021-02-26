import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralResponse } from 'src/app/models/GeneralResponse';
import { AccountService, AlertService, ClienteService } from '../../services';


@Component({
    templateUrl: './pelicula-list.component.html'
})
export class PeliculaListComponent implements OnInit {

    public form: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    clientes: any[];
    isDeleting:boolean;
    user: GeneralResponse;

    constructor(
        private formBuilder: FormBuilder,
        private toast: AlertService,
        private accountService: AccountService,
        //private generalTablesService: GeneralTablesService,
        private clienteService:ClienteService
    ) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            //tipoDocumentoId: ['', [Validators.required]],
            buscar: ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9ñáéíóú ]+$')]]
            //documento: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[0-9]+$')]],
            //nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Zñáéíóú]+$')]],
            //celular: ['', [Validators.maxLength(15), Validators.pattern('^[0-9]+$')]]
        });

        this.getClientesFiltered();
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



    }

    confirmDeletePelicula(id:number){

    }

    deletePelicula(id:number){


    }

}
