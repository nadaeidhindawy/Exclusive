import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interfaces/i-category';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-details-cat',
  standalone: true,
  imports: [],
  templateUrl: './details-cat.component.html',
  styleUrl: './details-cat.component.scss'
})
export class DetailsCatComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)


  iCat: string | null = '';
  detailsCat: ICategory = {} as ICategory;





  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        this.iCat = p.get('id')
      }
    })

    this._CategoriesService.getSpecificCategory(this.iCat).subscribe({
      next: (res) => {
        console.log(res.data);
        this.detailsCat = res.data
      }
    })
  }

}
