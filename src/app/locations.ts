import { quest } from 'src/app/quest';
import { inventoryItem } from 'src/app/item';
import { Enemy } from 'src/app/enemy';
import { NPC } from './NPC';
import { completeDialog } from './player';
import { shop } from './shop';

export interface Location {
  id: number;
  name: string;
  description: string;
  imgPath: string;
  hasEnemy: boolean;
  enemyNumber: number;
  EnemyHere?: Enemy[];
  toTheNorth?:   number;//      Location;
  toTheEast?:  number; //      Location;
  toTheSouth?: number;//     Location;
  toTheWest?:   number; //    Location;
  hasEntered: boolean;
  itemRequired: boolean;
  itemThatsRequired?: inventoryItem;
  questAvailableHere?: quest;
  dungeonHere: boolean;
  dungeonThatsHere?: dungeon;
  NPC: boolean;
  NPCHere?: NPC;
  Dialog?: completeDialog[];
  shop:Boolean;
  shopHere?: shop;
}
export interface dungeon {
  id: number;
  name: string;
  floors: number;
  insideDungeon: boolean;
  dungeonFloors?: dungeonFloor[];
}
export interface dungeonFloor {
  dungeon: dungeon;
  floor: number;
  rooms: number;
  dungeonRooms?: dungeonRoom[];
}
export interface dungeonRoom {
  dungeon: dungeon;
  floor: dungeonFloor['floor'];
  roomNumber: dungeonFloor['rooms'];
  roomID: string;
  questAvailableHere?: quest;
  hasEnemy: boolean;
  enemyNumber: number;
  EnemyHere?: Enemy[];
  exit: boolean;
  exitLocation?: Location;
  toTheNorth?: dungeonRoom;
  toTheEast?: dungeonRoom;
  toTheSouth?: dungeonRoom;
  toTheWest?: dungeonRoom;
  stairsUp: boolean;
  stairsDown: boolean;
  toStairsUp?: dungeonRoom;
  toStairsDown?: dungeonRoom;
  hasEntered: boolean;
  itemRequired: boolean;
  itemThatsRequired?: inventoryItem;
  NPCHere?: NPC;
  Dialog?: completeDialog[];
  shopHere?: shop;
}

///Loot

export type Locations = Location[];
