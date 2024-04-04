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
  2200
);
const fruitful: Company = new Company(
  2,
  'Fruitful',
  ['fruit', 'yellow'],
  25,
  20000,
  true,
  Town.KRAKOW,
  700
);
const freshProduce: Company = new Company(
  3,
  'Fresh Produce',
  ['fruit', 'citrus'],
  28,
  20000,
  false,
  Town.KRAKOW,
  500
);
const africaProduce: Company = new Company(
  4,
  'Fresh Produce',
  ['fruit', 'citrus'],
  30,
  20000,
  false,
  Town.WROCLAW,
  5050
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
  new Product(4, 'Avocado', AVOCADO, [
    freshProduce,
    fruitful,
    africaProduce,
    orangeHarvest,
  ]),
  new Product(1, 'Orange', ORANGE, [freshProduce, fruitful]),
  new Product(6, 'Broccoli', BROCCOLI, [fruitful]),
  new Product(5, 'Tomato', TOMATOES, [orangeHarvest]),
  new Product(8, 'Apple', APPLES, [orangeHarvest, africaProduce]),
];
