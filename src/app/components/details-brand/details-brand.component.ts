import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { IBrand } from '../../core/interfaces/i-brand';

@Component({
  selector: 'app-details-brand',
  standalone: true,
  imports: [],
  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.scss'
})
export class DetailsBrandComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _BrandService = inject(BrandService)

  detailsBrand: IBrand = {} as IBrand;
  ActivatedRoute: any;

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {

        let idBrand = p.get('id')

        // logic api ----- call Api Specific ---- getSpecificBrand

        this._BrandService.getSpecificBrand(idBrand).subscribe({

          next: (res) => {
            console.log(res.data)
            this.detailsBrand = res.data
          },

        })

      }
    })
  }




}

