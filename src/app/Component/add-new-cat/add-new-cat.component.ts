import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/Brand/brand.service';
import { CategoryService } from 'src/app/Services/Category/category.service';

@Component({
  selector: 'app-add-new-cat',
  templateUrl: './add-new-cat.component.html',
  styleUrls: ['./add-new-cat.component.css']
})
export class AddNewCatComponent implements OnInit {
  link:any;
  CatId:number = 0;
  Name:any;
  category:any={};
  imgUrl:any;

  constructor(public categoryService: CategoryService, public brandService: BrandService, public activated:ActivatedRoute,public route:Router) { 
    this.CatId=this.activated.snapshot.params['id']
  }
  ngOnInit(): void {
    if(this.CatId!=0){

      this.category = this.categoryService.getCategoryById(this.CatId).subscribe({
        next: (response) => {
  
          this.category = response;
          this.Name=this.category.name
          this.link=this.category.imgUrl
          console.log(response);
      
            },
            error: (error) => {
              console.log(error);
      
            }
          });

        }
  }

  img(event: any){
    if(event.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any) => {
        this.link= event.target.result;
        
      }
    }
  }
  newCat:any ={
      Name:'',
      ImgUrl:''
  };
add(){
  if(this.CatId==0){
    this.newCat.Name=this.Name;
    this.newCat.ImgUrl=this.link;
    console.log(this.newCat)
    this.categoryService.addCategory(this.newCat).subscribe({
      next: (response) => {
        this.route.navigate(['/admin/category']);

        this.newCat = response;
        console.log(response);
    
          },
          error: (error) => {
            console.log(error);
    
          }
        });

      }
      if(this.CatId!=0){

      }
  
}
EditCat:any ={
  Name:'',
  ImgUrl:''
};
Edit() {
  this.EditCat.Name=this.Name
  this.EditCat.ImgUrl=this.link
 
  console.log(this.EditCat);
  

  this.categoryService.editCategory(this.CatId,this.EditCat).subscribe({
    next: (response) => {

      this.route.navigate(['/admin/category']);
      console.log(response);

    },
    error: (error) => {
      console.log(error);

    }
  });
}

}
