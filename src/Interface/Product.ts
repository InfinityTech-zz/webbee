export interface ProductData {
    productName: string;
    categoryID: number;
    productDetails: Array<ProductDetail>;
    productID: number;
}

export interface ProductDetail {
    fieldName: string;
    fieldValue: string | Date | number | boolean;
    fieldType: string | Date | number | boolean;
}