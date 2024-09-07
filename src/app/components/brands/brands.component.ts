import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { IBrand } from '../../core/interfaces/i-brand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);

  brandList: IBrand[] = [];





  ngOnInit(): void {
    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        console.log(res.data)
        this.brandList = res.data
      },
    })

  }
}
