import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Services/WishList/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishListItems: any = [];
  isLoading: boolean = false;

  constructor(private _wishListService: WishlistService) {}
  loadWishList() {
    this.wishListItems = this._wishListService.getWishList().subscribe({
      next: (response) => {
        this.wishListItems = response;
        this.isLoading = false;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleDelete(id: any) {
    //////////////////////////////////////////////////////
    this._wishListService.deleteWishListItems(id).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        this.loadWishList();
        // this.toastr.success('Item Deleted Successfully');
      },
      error: (error) => {
        console.log(error);
        // this.toastr.success('Failed to delete item');
      },
      complete: () => {
        this.loadWishList();
      },
    });
  }
  ngOnInit(): void {
    this.loadWishList();
  }
}
