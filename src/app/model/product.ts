import { Company } from './company';

export class Product {
  id: number;
  name: string;
  image: string;
  companies: Company[];

  constructor(id: number, name: string, image: string, companies: Company[]) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.companies = companies;
  }
}
