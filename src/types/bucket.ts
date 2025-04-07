
import { Flavor } from "../data/flavors";

export interface Bucket {
  id: string;
  flavorId: number;
  quantity: number;
  addedAt: Date;
  updatedAt: Date;
}

export interface BucketWithFlavor extends Bucket {
  flavor: Flavor;
}
