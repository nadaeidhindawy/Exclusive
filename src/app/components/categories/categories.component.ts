import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/i-category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService);

  CategoriesList: ICategory[] = [];

  ngOnInit(): void {
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



}
