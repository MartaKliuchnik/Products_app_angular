import { Company } from '../model/company';
import { Product } from '../model/product';
import { Town } from '../model/town';

const orangeHarvest: Company = new Company(
  1,
  'Orange Harvest',
  ['fruit'],
  23,
  20000,
  true,
  Town.WARSAW,
  2
);
const fruitful: Company = new Company(
  2,
  'Fruitful',
  ['fruit', 'fresh'],
  25,
  20000,
  true,
  Town.KRAKOW,
  7
);
const freshProduce: Company = new Company(
  3,
  'Fresh Produce',
  ['fruit', 'citrus'],
  28,
  20000,
  false,
  Town.KRAKOW,
  5
);
const africaProduce: Company = new Company(
  4,
  'Fresh Produce',
  ['vegetables', 'fresh'],
  30,
  20000,
  false,
  Town.WROCLAW,
  1
);

const BANANA = '../../assets/image/bananas.png';
const ORANGE = '../../assets/image/orange.png';
const APPLE = '../../assets/image/apple.png';
const APPLES = '../../assets/image/apples.jpeg';
const AVOCADO = '../../assets/image/avocado.jpeg';
const BROCCOLI = '../../assets/image/broccoli.png';
const TOMATOES = '../../assets/image/tomatoes.jpeg';

export const products: Product[] = [
  new Product(2, 'Apple', APPLE, [orangeHarvest]),
  new Product(3, 'Banana', BANANA, [fruitful]),
  new Product(4, 'Avocado', AVOCADO, [africaProduce]),
  new Product(1, 'Orange', ORANGE, [freshProduce, fruitful]),
  new Product(6, 'Broccoli', BROCCOLI, [africaProduce]),
  new Product(5, 'Tomato', TOMATOES, [africaProduce]),
  new Product(8, 'Apple', APPLES, [orangeHarvest]),
];
