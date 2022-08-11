import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [
    { titular: 'Juan Perez', numeroTarjeta: '123456789', fechaExpiration: '9/12', cvv: '123' },
    { titular: 'Miguel Gonzalez', numeroTarjeta: '112122112', fechaExpiration: '10/12', cvv: '323' },
    { titular: 'Miguel Borja', numeroTarjeta: '112122112', fechaExpiration: '10/12', cvv: '323' },
    { titular: 'Miguel Gonzalez', numeroTarjeta: '112122112', fechaExpiration: '10/12', cvv: '323' }
  ];
  
  form:FormGroup;

  constructor(private fb:FormBuilder,private toastr: ToastrService, private http: HttpClient) {

    this.form = this.fb.group({
      titular: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiration: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
   }

  ngOnInit(): void {

    this.http.post('http://localhost:3000/api/tarjetas',this.form.value).subscribe(res=>{
      console.log(res);
    })

  }

  agregarTarjeta(){
    console.log(this.form);
    const tarjeta:any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiration: this.form.get('fechaExpiration')?.value,
      cvv: this.form.get('cvv')?.value
  }
  this.listTarjetas.push(tarjeta);
  this.toastr.success('La tarjeta fue registada con exito!', 'Tarjeta registada');
  this.form.reset();
}
eliminarTarjeta(index: number){
  this.listTarjetas.splice(index,1);
  this.toastr.error('La Tarjeta fue eliminada con exito!','Tarjeta Eliminada');
}
}

