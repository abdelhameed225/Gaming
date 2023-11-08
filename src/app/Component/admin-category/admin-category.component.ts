import { Component } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  category:any;
  constructor(public categoryService: CategoryService,private toastr: ToastrService){}
  categories:any;
  isLoading:boolean = true;
  ngOnInit(): void {
    this.categories=this.categoryService.getAllCategory().subscribe({
      next:(response)=>{
        
        this.categories=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
  }
  handleDelete(id: any) {
    //////////////////////////////////////////////////////
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.loadTable();
        this.toastr.success('Item Deleted Successfully');
      },
      error: (error) => {
        console.log(error);
        this.toastr.success('Failed to delete item');
      },
      complete: () => {
        this.loadTable();
      },
    });
  }
  loadTable() {
    this.categories=this.categoryService.getAllCategory().subscribe({
      next:(response)=>{
        
        this.categories=response;
        this.isLoading = false;
        console.log(response);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
     });
  }
}
