import { NPC } from "src/app/NPC";
import { item } from "src/app/item";
import {dungeonRoom, Location} from 'src/app/locations'


export interface shop{
id: number, 
shopName: string,
shopInventory: item[],
locationOfShop?: Location,
shopDungeonRoom?: dungeonRoom
//shopOwner: NPC,
//.....

}