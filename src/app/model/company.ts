import { Town } from './town';

export class Company {
  id: number;
  name: string;
  keywords: string[];
  bidAmount: number;
  campaignFund: number;
  status: boolean;
  town: Town[];
  radius: number;

  constructor(
    id: number,
    name: string,
    keywords: string[],
    bidAmount: number,
    campaignFund: number,
    status: boolean,
    town: Town[],
    radius: number
  ) {
    this.id = id;
    this.name = name;
    this.keywords = keywords;
    this.bidAmount = bidAmount;
    this.campaignFund = campaignFund;
    this.status = status;
    this.radius = radius;
    this.town = town;
  }
}
