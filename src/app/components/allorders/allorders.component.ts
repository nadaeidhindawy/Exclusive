import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IallOrder } from '../../core/interfaces/iall-order';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe,],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly _AuthService = inject(AuthService)
  private readonly _OrdersService = inject(OrdersService)

  UserAllProduct: IallOrder[] = [];

  ngOnInit(): void {
    let userId = this._AuthService.saveUserData().id;
    this._OrdersService.getUserProduct(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.UserAllProduct = res
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
