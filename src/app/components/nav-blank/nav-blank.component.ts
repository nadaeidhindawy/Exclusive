import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/Mytranslate.Service';
@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule,],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);



  countNumber: Signal<number> = computed(() => this._CartService.cartNumber())


  ngOnInit(): void {
    this._CartService.getProductToCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })

  }

  change(lang: string): void {
    this._MytranslateService.changeLang(lang);
  }

}
