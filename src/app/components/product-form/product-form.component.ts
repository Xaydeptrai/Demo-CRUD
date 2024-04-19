import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpService} from "../../http.service";
import {IProduct} from "../../interfaces/product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatInputModule, MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  httpService = inject(HttpService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [0, Validators.required],
  });

  productId!: number;
  isEdit = false;

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.httpService.getProductById(this.productId).subscribe(result => {
        console.log(result);
        this.productForm.patchValue(result);
      })
    }
  }
  save() {
    console.log(this.productForm.value);
    const product: IProduct = {
      name: this.productForm.value.name!,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
      quantity: this.productForm.value.quantity!
    };

    if (this.isEdit) {
      this.httpService.updateProduct(this.productId, product).subscribe(result => {
        console.log("success");
        this.router.navigateByUrl("product-list");
      })
      return;
    } else {
      this.httpService.createProduct(product).subscribe(result => {
        console.log("success");
        this.router.navigateByUrl("product-list");
      })
    }
  }
}
