import { keyItem, inventoryItem } from "src/app/item";
import { NPC } from "./NPC";

export interface quest {
    id: number,
    name: string,
    description: string,
    rewardXP?: number,
    rewardGold?: number,
    questCompletionItem: keyItem[],
    rewardItem?: inventoryItem,
    message: string,  
}
    
    export interface playerQuest {
    details: quest,
    hasQuest: boolean,
    isComplete: boolean,
    }