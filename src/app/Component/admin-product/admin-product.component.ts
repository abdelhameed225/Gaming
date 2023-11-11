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
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.isLoading = false;
  }, 800); 
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
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
        // console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
