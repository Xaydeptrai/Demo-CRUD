import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "./interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'https://localhost:7003';
  http=inject(HttpClient)
  constructor() { }

  getAllProduct(){
    return this.http.get<IProduct[]>(this.apiUrl+ '/api/Product')
  }

  createProduct(product: IProduct){
    return this.http.post(this.apiUrl+ '/api/Product',product)
  }

  getProductById(productId: number) {
    return this.http.get<IProduct>(this.apiUrl + '/api/Product/' + productId)
  }

  updateProduct(productId: number, product: IProduct){
    return this.http.put(this.apiUrl+ '/api/Product/'+productId,product)
  }

  deleteProduct(productId: number){
    return this.http.delete(this.apiUrl+ '/api/Product/'+productId)
  }

}
