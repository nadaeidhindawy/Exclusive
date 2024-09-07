import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { FormsModule } from '@angular/forms';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { unsubscribe } from 'diagnostics_channel';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule, RouterLink, TermtextPipe, FormsModule, UpperCasePipe, AsyncPipe, LowerCasePipe, SalePipe, TitleCasePipe, SearchPipe, SlicePipe, CurrencyPipe, DatePipe, JsonPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);


  getAllProductSub: any;
  date = new Date();




  ngOnInit(): void {
    this.getAllProduct();
    this._WishListService.getProductWishlist().subscribe({
      next: (res) => {
        this.wishListData = res.data.map((product: any) => product._id)
      }
    })
  }
  productsList: IProduct[] = [];
  wishListData: string[] = []

  AddWishList(id: string): void {
    this._WishListService.AddProductToWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Added')
        localStorage.setItem("red", "text-red-500")
        this.wishListData = res.data
        console.log(this.wishListData);
      }
    })
  }
  removeFromWishList(id: string): void {
    this._WishListService.removeWishlist(id).subscribe({
      next: (res) => {
        this.wishListData = res.data
        console.log(this.wishListData);
        this._ToastrService.warning(res.message, 'Deleted')
      }
    })
  }

  getAllProduct() {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productsList = res.data
      },

    },)

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

    })
  }

  text: string = "";
}
