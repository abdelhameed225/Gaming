import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { ProductsService } from 'src/app/Services/product/products.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  constructor(
    public productService: ProductsService,
    public categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  products: any;
  isLoading: boolean = true;
  categories: any;
  productsByCat: any;
  Cattid: number = 0;
  /////////////////////////////////////////////////////

  ///////////////////////////////////////////

  ////////////////////////////////////////

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    //////////////////////////////////////////////////////////////////

    this.productService.getProductByCatId(this.Cattid).subscribe({
      next: (response) => {
        this.productsByCat = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    /////////////////////////////////////////////////////////////////
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ///////////////////////////////
  handleDelete(id: any) {
    //////////////////////////////////////////////////////
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);

        this.toastr.success('Item Deleted Successfully');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Failed to delete item');
      },
      complete: () => {
        this.loadTable();
      },
    });
  }

  loadTable() {
    this.products = this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
