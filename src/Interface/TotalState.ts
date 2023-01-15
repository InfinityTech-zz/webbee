import { CategoryData } from './Category';
import { ProductData } from './Product';

export interface TotalState {
    categories: Array<CategoryData>;
    products: Array<ProductData>;
}