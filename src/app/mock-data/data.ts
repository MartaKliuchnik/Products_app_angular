import { Company } from '../model/company';
import { Product } from '../model/product';
import { Town } from '../model/town';

const orangeHarvest: Company = new Company(
  1,
  'Orange Harvest',
  ['fruit'],
  2,
  20000,
  true,
  Town.WARSAW,
  20
);
const fruitful: Company = new Company(
  2,
  'Fruitful',
  ['fruit', 'yellow'],
  2,
  20000,
  true,
  Town.KRAKOW,
  10
);
const freshProduce: Company = new Company(
  3,
  'Fresh Produce',
  ['fruit', 'citrus'],
  2,
  20000,
  false,
  Town.KRAKOW,
  50
);
const africaProduce: Company = new Company(
  4,
  'Fresh Produce',
  ['fruit', 'citrus'],
  2,
  20000,
  false,
  Town.WROCLAW,
  50
);

const BANANAS = '../../assets/image/bananas.png';
const ORANGE = '../../assets/image/orange.png';
const APPLE = '../../assets/image/apple.png';

export const products: Product[] = [
  new Product(1, 'Orange', ORANGE, [freshProduce, fruitful]),
  new Product(2, 'Apple', APPLE, [orangeHarvest]),
  new Product(3, 'Banana', BANANAS, [fruitful]),
  new Product(4, 'Orange', ORANGE, [
    freshProduce,
    fruitful,
    africaProduce,
    orangeHarvest,
  ]),
  new Product(5, 'Apple', APPLE, [orangeHarvest]),
  new Product(6, 'Banana', BANANAS, [fruitful]),
  new Product(7, 'Orange', ORANGE, [freshProduce, fruitful]),
  new Product(8, 'Apple', APPLE, [orangeHarvest, africaProduce]),
  new Product(9, 'Banana', BANANAS, [orangeHarvest]),
];
