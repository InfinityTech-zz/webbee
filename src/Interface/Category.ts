export interface CategoryData {
    categoryID: number;
    categoryName: string;
    categoryFields: Array<CategorySingle>;
  }
  
  export interface CategorySingle {
      fieldName: string;
      fieldType: string;
      isDeleteted: boolean;
  }
  