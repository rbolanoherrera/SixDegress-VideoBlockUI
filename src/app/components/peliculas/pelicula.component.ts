import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralResponse } from '../../models/GeneralResponse';
import { AccountService, AlertService, GeneralTablesService, PeliculaService } from '../../services';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { default as Swal } from 'sweetalert2';
import { GeneralTableEntity } from '../../models/GeneralTableEntity';
import { UserData } from '../../models/UserData';
import { Pelicula } from '../../models/Pelicula';
import { PeliculaActores } from 'src/app/models/PeliculaActores';
import { Actores } from 'src/app/models/Actores';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  templateUrl: './pelicula.component.html'
})
export class PeliculaComponent implements OnInit {

  form: FormGroup;
  formAddActores: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  submittedAddActores = false;
  user: GeneralResponse;
  estados: GeneralTableEntity[]=[];
  PeliculaActores: PeliculaActores[]=[];
  pelicula:Pelicula = new Pelicula();
  actores:Actores[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private peliculaService: PeliculaService,
    private toast: AlertService,
    private generalTablesService: GeneralTablesService,
    private modal:NgbModal
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(150), Validators.pattern('^[a-zA-Z0-9ñáéíóú|/()-_+*., ]+$')]],
      descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9ñáéíóú|/()-_+*., ]+$')]],
      director: ['', [Validators.required, Validators.maxLength(70), Validators.pattern('^[a-zA-Zñáéíóú ]+$')]],
      costo: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9.,]+$')]],
      cantidad: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
    });

    this.formAddActores = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(70), Validators.pattern('^[a-zA-Zñáéíóú ]+$')]],
      nacionalidad: ['', [Validators.required, Validators.maxLength(70), Validators.pattern('^[a-zA-Zñáéíóú ]+$')]],
    });

    if (!this.isAddMode){
      //this.getAllPeliculasActores(parseInt(this.id));
    }

    //this.getAllPeliculasActores();

  }

  get f() { return this.form.controls; }
  get f2() { return this.formAddActores.controls; }

  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //this.loading = true;
    if (this.isAddMode)
      this.createPelicula();
    else
      this.updatePelicula();

  }

  getPeliculaById() {
    // this.peliculaService.getById(this.id)
    //   .pipe(first())
    //   .subscribe(x => {
    //     this.f.codigo.setValue(x.data.codigo);
    //     this.f.nombre.setValue(x.data.nombre);
    //     this.f.idTipoProducto.setValue(x.data.idTipoProducto);
    //     this.f.valorCompra.setValue(x.data.valorCompra);
    //     this.f.valorVenta.setValue(x.data.valorVenta);
    //     this.f.iva.setValue(x.data.iva);
    //     this.f.idUnidadMedidaBase.setValue(x.data.idUnidadMedidaBase);
    //     this.f.idUnidadMedidaCompra.setValue(x.data.idUnidadMedidaCompra);
    //     this.f.idUnidadMedidaVenta.setValue(x.data.idUnidadMedidaVenta);
    //     this.f.cantEquivalente.setValue(x.data.cantEquivalente);
    //     this.f.proveedorId.setValue(x.data.proveedorId);
    //     this.f.estado.setValue(x.data.estado);
    //   });
  }

  createPelicula() {
    this.loading=true;
    this.peliculaService.addNew(this.createPeliculaObject())
      .pipe(first())
      .subscribe(
        res => {

          this.loading = false;

          if(res != null && (<GeneralResponse>res).StatusCode == 200){
            this.toast.success((<GeneralResponse>res).Message);
            this.router.navigate(['.', { relativeTo: this.route }]);
          }
          else
            this.toast.error((<GeneralResponse>res).Message);
        },
        error => {
          this.loading = false;
          this.toast.error('Error desconocido al crear la Pelicula');
        },
        () => {
          this.loading=false;
        });
  }

  updatePelicula() {

    this.toast.info('Funcionalidad Pendiente!');

    // this.peliculaService.update(this.createPeliculaObject())
    //   //.pipe(first())
    //   .subscribe(
    //     data => {
    //       this.loading=false;
    //       this.toast.success('Producto actualizado exitosamente');
    //       this.router.navigate(['..', { relativeTo: this.route }]);
    //     },
    //     error => {
    //       this.loading = false;
    //       this.toast.error('Error desconocido al actualizar el Producto');
    //     },
    //     () => {
    //       this.loading = false;
    //     });

  }

  createPeliculaObject(): Pelicula {

    if(!this.isAddMode)
      this.pelicula.Id = parseInt(this.id);
    else
      this.pelicula.Id = 0;

    this.pelicula.Titulo = this.form.get("titulo").value;
    this.pelicula.Descripcion = this.form.get("descripcion").value;
    this.pelicula.Director = this.form.get("director").value;
    this.pelicula.Costo = parseFloat(this.form.get("costo").value);
    this.pelicula.Cantidad = parseInt(this.form.get("cantidad").value);

    return this.pelicula;
  }

  //Obtener los actores de la Pelicula
  getActoresPorPelicula(peliculaId:number) {
    let i=0;
    // this.peliculaService.getUnidadesMedidaxProducto(peliculaId)
    //   .subscribe(res => {

    //     if(res != null && res.statusCode == 200)
    //     this.unidadesMedidaProducto = res.data;
        

    //   },
    //   err => {
    //     this.toast.error('Error al obtener las Unidades de medida del Producto');
    //   });
  }

  //confirmar la eliminación de una unidad de medida para un producto
  confirmDeleteActor(peliculaId:number){
    
    Swal.fire({
      title: 'Mensaje de confirmación',
      text: "Esta seguro de eliminar el Actor de la Pelicula?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.deleteActorPelicula(peliculaId);
      }
    });
  }

  //eliminar/quitar Actor de la Pelicula
  deleteActorPelicula(peliculaId:number){
      // this.loading=true;
      // this.productService.deleteUnidadMedidaProducto(this.user.data.name, prodId, unidadMedidaId)
      // .pipe(first())
      // .subscribe(res => {
          
      //     this.loading=false;
      //     let resp:GeneralResponse  = (<GeneralResponse>res);
      //     if(resp.statusCode == 200){
      //         this.toast.info(resp.message);
      //         this.getUnidadesMedidaProducto(parseInt(this.id));
      //     }
      //     else
      //         this.toast.error(resp.message);
      // },
      // err => {
      //     this.loading=false;
      //     this.toast.error('Error al eliminar la Unidad de Medida del Producto');
      // });
  }

  onSubmitAddActores(){
    this.submittedAddActores = true;

    // stop here if form is invalid
    if (this.formAddActores.invalid) {
      return;
    }

    if(this.id == undefined || this.id == '' || this.id == '0'){
      this.toast.info('No hay una Pelicula seleccionada!');
      return;
    }
    else
      this.addActorAPelicula();

  }

  addActorAPelicula(){

    // this.modal.dismissAll();
    // this.productoUnidadMedida.productoId = parseInt(this.id);
    // this.productoUnidadMedida.unidadMedidaId = parseInt(this.formAddActores.get("idUnidadMedidaVenta").value);
    // this.productoUnidadMedida.cantEquivalente = parseFloat(this.formAddActores.get("cantEquivalente").value);
    // this.productoUnidadMedida.valor = parseFloat(this.formAddActores.get("valorEquivalente").value);

    // this.loading=true;
    // this.productService.agregarUnidadMedidaProducto(this.productoUnidadMedida)
    // //.pipe(first())
    // .subscribe(res => {
    //     this.loading = false;
    //     if(res != null && (<GeneralResponse>res).StatusCode == 200)
    //         this.toast.success((<GeneralResponse>res).Message);
    //       else if((<GeneralResponse>res).StatusCode == 202)
    //         this.toast.warning((<GeneralResponse>res).Message);
    //       else
    //         this.toast.error((<GeneralResponse>res).Message);

    //     this.getUnidadesMedidaProducto(parseInt(this.id));
    //   },
    //   error => {
    //     this.loading = false;
    //     this.toast.error('Error desconocido al agregar la Unidad de Medida al Producto');
    //   });

  }

  AddNewActorAPelicula(modalActores){
   
    this.formAddActores.get("nombre").setValue("");
    this.formAddActores.get("nacionalidad").setValue("");

    // if(this.id == undefined || this.id == '' || this.id == '0'){
    //   this.toast.info('No hay una Pelicula seleccionado!');
    // }
    // else
    this.toast.info('Funcionalidad Pendiente!');
      this.modal.open(modalActores, {size: 'lg', centered: true});

  }


}
