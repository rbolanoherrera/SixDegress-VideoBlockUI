import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralFilter } from 'src/app/models/GeneralFilter';
import { GeneralResponse } from 'src/app/models/GeneralResponse';
import Swal from 'sweetalert2';
import { AccountService, AlertService, ClienteService, PeliculaService } from '../../services';


@Component({
    templateUrl: './pelicula-list.component.html',
    styleUrls: ['./pelicula-list.component.css']
})
export class PeliculaListComponent implements OnInit {

    public form: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    peliculas: any[];
    isDeleting:boolean;
    user: GeneralResponse;

    constructor(
        private formBuilder: FormBuilder,
        private toast: AlertService,
        private accountService: AccountService,
        private peliculaService:PeliculaService
    ) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            buscar: ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9ñáéíóú.,_ ]+$')]]
        });

        this.getPeliculasFiltered();
    }

    get f() { return this.form.controls; }

    onSubmit(){

        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.getPeliculasFiltered();
    }

    getPeliculasFiltered(){

        this.loading=true;
        let filter: GeneralFilter = new GeneralFilter();
        filter.String1 = this.form.get("buscar").value;
        filter.pageInit = 1;//número de pagina
        filter.pageEnd = 10;//número de Registros por pagina

        this.peliculaService.getFiltered(filter)
            .subscribe(res => {

                if (res.Data != null)
                    this.peliculas = res.Data;
                else {
                    this.loading=false;
                    this.toast.info('No hay data de Peliculas');
                    this.peliculas = [];
                }
                
            },
            err => {
                this.loading = false;
                this.toast.error('Error al obtener el Catalogo de Peeliculas');
            },
            () => {
                this.loading = false;
            });

    }

    confirmDeletePelicula(id:number){
        Swal.fire({
            title: 'Mensaje de confirmación',
            text: "Esta seguro de eliminar el Producto?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.value) {
              this.deletePelicula(id);
            }
          });
    }

    deletePelicula(id:number){
        this.toast.error('Funcionalidad Pendiente!');
    }

}
