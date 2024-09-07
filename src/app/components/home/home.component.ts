import { WishListService } from './../../core/services/wish-list.service';
import { Component, ElementRef, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Observable, Observer, Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/i-category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/Mytranslate.Service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TermtextPipe, FormsModule, SearchPipe, UpperCasePipe, AsyncPipe, LowerCasePipe, SalePipe, TitleCasePipe, SlicePipe, CurrencyPipe, DatePipe, JsonPipe, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishListService = inject(WishListService);
  private readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);





  productsList: IProduct[] = [];
  CategoriesList: ICategory[] = [];



  getAllProductSub!: Subscription

  date = new Date();
  color: boolean = false

  wishListData: string[] = []

  customOptionsCa: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    rtl: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

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

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this._WishListService.getProductWishlist().subscribe({
      next: (res) => {
        this.wishListData = res.data.map((product: any) => product._id)
      }
    })





  }


  getAllCategories() {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log("CategoriesList", res.data)
        this.CategoriesList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllProducts() {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productsList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    // unSubscribe observable
    this.getAllProductSub?.unsubscribe()
  }

  text: string = "";




  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this._ToastrService.success(res.message, 'Added', {
          progressBar: true,
          timeOut: 2000
        })
        this._CartService.cartNumber.set(res.numOfCartItems)
        console.log(this._CartService.cartNumber())
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  addWishList(id: string): void {
    this._WishListService.AddProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.wishListData = res.data
      }
    })
  }


  change(lang: string): void {
    this._MytranslateService.changeLang(lang);
  }
}
