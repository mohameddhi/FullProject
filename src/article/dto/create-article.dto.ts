export class CreateArticleDto {
    reference: string;
    name: string;
    itemCategoryId: number;
    itemCategory: {
      id: number;
      reference: string;
      name: string;
      href: string;
    };
    isActive: boolean;
    organization: string;
  }
  
