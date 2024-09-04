import { inventoryItem } from './item';
import { Location, dungeonRoom } from './locations'
import { playerQuest } from './quest';


export interface NPC{
id: number,
name: string,
optionPerson: boolean,
dungeonRoom?: dungeonRoom,
initialMessage: string,
endChatMessage: string,
questGiven?: playerQuest,
itemGiven?: inventoryItem,
Dialog1?: string
afterMessage?: string;
}

// export interface NPCDialog1{
// message: string
// }
// export interface NPCDialog2{
//     NPCDetails: NPC,
//     message: string
// }

// export interface NPCDialog3{
//     NPCDetails: NPC,
//     message: string
// }

