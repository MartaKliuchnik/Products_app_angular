import { Company } from '../model/company';
import { Product } from '../model/product';
import { Town } from '../model/town';

const apple: Company = new Company(
  1,
  'Apple',
  ['phones', 'laptops'],
  2,
  20000,
  true,
  [Town.KRAKOW, Town.WARSAW],
  20
);
const samsung: Company = new Company(
  2,
  'Samsung',
  ['phones'],
  2,
  20000,
  true,
  [Town.WARSAW, Town.KRAKOW],
  10
);
const xiaomi: Company = new Company(
  3,
  'XIAOMI',
  ['phones'],
  2,
  20000,
  false,
  [Town.KRAKOW],
  50
);

const IPHONE_15 = '../../assets/image/player_img.png';

export const products: Product[] = [
  new Product(1, 'Iphone 15', IPHONE_15, [apple, samsung]),
  new Product(2, 'Iphone 14', IPHONE_15, [xiaomi]),
  new Product(3, 'Iphone 15 pro', IPHONE_15, [samsung]),
];
