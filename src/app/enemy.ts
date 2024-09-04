import { ElementSchemaRegistry } from "@angular/compiler";
import { lootItem } from "src/app/item";

export interface Enemy
 {id: number, name:string, description: string, imgPath:string, fluctuating?: boolean, currentHp:number, maxHp:number,defense: number,  
attack : number, speed:number,level: number, rewardXP: number, rewardGold: number,  lootTable?: lootItem[]};








