
import { keyItem, equippableItem, inventoryItem } from "src/app/item";
import { playerQuest } from "./quest";
import { Location } from "./locations";
import { NPC } from "./NPC";

export interface player { 
      currentLocation: Location,
      stats:{
   
    gold: number, 
    currentHp: number
    MaxHp:number,
    defense:number, 
    attack: number,
    speed:number,
    experiencePoints: number, 
    level: number, 
    deathCount: number,
}
    inventory: inventoryItem[],
    weapon?: equippableItem, 
    wearable?: equippableItem, 
    questList: playerQuest[]
  }

  export interface dialogReplies{
        NPCDetails: NPC,
        playerResponse1: string,
        playerResponse2?: string,
        playerResponse3?: string,
        playerEndChatResponse: string,
  }
  export interface completeDialog{ NPCDetails:NPC, dialog: dialogReplies};