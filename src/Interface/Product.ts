export interface ProductData {
    productName: string;
    categoryID: number;
    productDetails: Array<ProductDetail>
}

export interface ProductDetail {
    fieldName: string;
    fieldValue: string | Date | number | boolean;
}