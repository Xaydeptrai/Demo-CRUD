import {Component, inject} from '@angular/core';
import {IProduct} from "../../interfaces/product";
import {HttpService} from "../../http.service";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList: IProduct[] = []
  httpService = inject(HttpService);
  router = inject(Router);

  ngOnInit() {
    this.httpService.getAllProduct().subscribe(result => {
      this.productList = result;
      console.log(this.productList);
    })
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'action'];

  add() {
    this.router.navigateByUrl('create-product');
  }

  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/product/' + id);
  }

  delete(id: number) {
    this.httpService.deleteProduct(id).subscribe(result => {
      console.log("delete");
      this.productList = this.productList.filter(x => x.id !== id);
    })
  }

}
