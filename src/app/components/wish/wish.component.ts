import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IWish } from '../../core/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.scss'
})
export class WishComponent implements OnInit {
  private readonly _WishListService = inject(WishListService)

  wishListItems: IWish[] = [];
  delete: string = "";





  ngOnInit(): void {
    this._WishListService.getProductWishlist().subscribe({
      next: (res) => {
        console.log(res)
        this.wishListItems = res.data

      }

    })
  }


  deleteProduct(id: string): void {
    this._WishListService.removeWishlist(id).subscribe({
      next: (res) => {
        console.log(this.delete = res);

        this._WishListService.getProductWishlist().subscribe({
          next: (res) => {
            this.wishListItems = res.data

          }
        })
      }
    })
  }



}
