import { IProduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);



  detailsProduct: IProduct | null = null;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let IProduct = p.get('id')


        // logic id -------- call Api Specific

        this._ProductsService.getSpecificProducts(IProduct).subscribe({
          next: (res) => {
            console.log(res.data)
            this.detailsProduct = res.data;
          },
          error: (err) => {
            console.log(err)
          }
        })

      }
    })
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.success(res.message, 'Added', {
          progressBar: true,
          timeOut: 2000
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



}
