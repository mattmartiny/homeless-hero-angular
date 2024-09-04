import {
  dungeon,
  dungeonFloor,
  dungeonRoom,
  Location,
  Locations,
} from 'src/app/locations';
import { Enemy } from 'src/app/enemy';
import { item } from 'src/app/item';
import { quest } from 'src/app/quest';
import { dialogReplies, completeDialog } from 'src/app/player';
import { NPC } from 'src/app/NPC';
import { WorldComponent } from './world/world.component';
import { shop } from './shop';
import { endWith } from 'rxjs';

export namespace dataFor {
  //--------------------------Items----------------------------------

  export let stick: item = {
    id: 3001,
    name: 'Stick',
    price: 3,
    equippable: true,
    equippableStats: {
      itemName: 'Stick',
      attackBonus: 1,
      defenseBonus: 0,
      speedBonus: 0,
      equipped: false,
    },
    wearable: false,
    healing: false,
  };

  export let sodaPop: item = {
    id: 3002,
    name: 'Soda Pop',
    price: 6,
    equippable: false,
    wearable: false,
    healing: true,
    healingStats: { amountHealed: 3 },
  };
  export let shoes: item = {
    id: 3003,
    name: 'Shoes',
    price: 6,
    equippable: false,
    healing: false,
    wearable: true,
    wearableStats: {
      itemName: 'Shoes',
      attackBonus: 0,
      defenseBonus: 1,
      speedBonus: 1,
      equipped: false,
    },
  };
  export let pimpCane: item = {
    id: 3004,
    name: 'Pimp Cane',
    price: 18,
    equippable: true,
    healing: false,
    wearable: false,
    equippableStats: {
      itemName: 'Pimp Cane',
      attackBonus: 3,
      defenseBonus: 0,
      speedBonus: 0,
      equipped: false,
    },
  };

  export let ratTail: item = {
    id: 3005,
    name: 'Rat Tail',
    price: 3,
    equippable: false,
    healing: false,
    wearable: false,
  };
  export let partyHat: item = {
    id: 3006,
    name: 'Party Hat',
    price: 165,
    equippable: false,
    healing: false,
    wearable: true,
    wearableStats: {
      itemName: 'Party Hat',
      attackBonus: 0,
      defenseBonus: 3,
      speedBonus: 1,
      equipped: false,
    },
  };

  export let mobSuitcases: item = {
    id: 3007,
    name: `Mob Suitcase`,
    price: 15,
    equippable: false,
    healing: false,
    wearable: false,
  };
  export let boatKey: item = {
    id: 3008,
    name: `Boat Key`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let mallet: item = {
    id: 3009,
    name: 'Rubber Mallet',
    price: 27,
    equippable: true,
    healing: false,
    wearable: false,
    equippableStats: {
      itemName: 'Rubber Mallet',
      attackBonus: 5,
      defenseBonus: 0,
      speedBonus: 1,
      equipped: false,
    },
  };

  export let wdSteak: item = {
    id: 3010,
    name: 'Well-Done Steak',
    price: 12,
    equippable: false,
    wearable: false,
    healing: true,
    healingStats: { amountHealed: 5 },
  };

  export let mrSteak: item = {
    id: 3011,
    name: 'Medium-Rare Steak',
    price: 21,
    equippable: false,
    wearable: false,
    healing: true,
    healingStats: { amountHealed: 8 },
  };

  export let merFlesh: item = {
    id: 3012,
    name: `Mer-Flesh`,
    price: 3,
    equippable: false,
    wearable: false,
    healing: true,
    healingStats: { amountHealed: 12 },
  };
  export let merFlippers: item = {
    id: 3013,
    name: 'Mer-Flippers',
    price: 25,
    equippable: false,
    healing: false,
    wearable: true,
    wearableStats: {
      itemName: 'Mer-Flippers',
      attackBonus: 0,
      defenseBonus: 2,
      speedBonus: 5,
      equipped: false,
    },
  };

  export let lighthouseKey: item = {
    id: 3014,
    name: `Lighthouse Key`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let WyvernTail: item = {
    id: 3015,
    name: `Wyvern Tail`,
    price: 90,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let Spear: item = {
    id: 3016,
    name: `Blunt Spear`,
    price: 32,
    equippable: true,
    healing: false,
    wearable: false,
    equippableStats: {
      itemName: 'Blunt Spear',
      attackBonus: 6,
      defenseBonus: 0,
      speedBonus: 2,
      equipped: false,
    },
  };

  export let heavyBat: item = {
    id: 3017,
    name: 'Heavy Bat',
    price: 100,
    equippable: true,
    healing: false,
    wearable: false,
    equippableStats: {
      itemName: 'Heavy Bat',
      attackBonus: 12,
      defenseBonus: -2,
      speedBonus: -2,
      equipped: false,
    },
  };

  export let SteelToeBoots: item = {
    id: 3018,
    name: `Steel Toe Boots`,
    price: 75,
    equippable: false,
    healing: false,
    wearable: true,
    wearableStats: {
      itemName: 'Steel Toe Boots',
      attackBonus: 0,
      defenseBonus: 9,
      speedBonus: -2,
      equipped: false,
    },
  };

  export let buffaloWing: item = {
    id: 3019,
    name: `Buffalo Wings`,
    price: 15,
    equippable: false,
    wearable: false,
    healing: true,
    healingStats: { amountHealed: 10 },
  };

  export let pokerChip: item = {
    id: 3020,
    name: `Poker Chip`,
    price: 30,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let purpleDong: item = {
    id: 3021,
    name: `PurpleDong`,
    price: 75,
    equippable: false,
    healing: false,
    wearable: true,
    wearableStats: {
      itemName: 'PurpleDong',
      attackBonus: -2,
      defenseBonus: 5,
      speedBonus: 5,
      equipped: false,
    },
  };

  export let casinoKey: item = {
    id: 3022,
    name: `Casino Key`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let mbKeyCard: item = {
    id: 3023,
    name: `Key Card`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let resignationL: item = {
    id: 3024,
    name: `Letter of Resignation`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let playersCard: item = {
    id: 3025,
    name: `Players Card`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let passCode: item = {
    id: 3026,
    name: `Pass Code`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  export let mobIdBadge: item = {
    id: 3027,
    name: `Mob ID badge`,
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  };

  ///-----------------------------Shop-------------------------------
  export const SanjayShop: shop = {
    id: 6000,
    shopName: 'Sanjay Station',
    shopInventory: [stick, sodaPop, wdSteak],
  };
  export const stuffleShop: shop = {
    id: 6001,
    shopName: `StuffleStop`,
    shopInventory: [heavyBat, SteelToeBoots, buffaloWing],
  };

  //---------------------Locations---------------------

  export const home: Location = {
    id: 1001,
    name: 'Alley way',
    description: 'Where you woke up.',
    imgPath: 'allyWay',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: true,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const park: Location = {
    id: 1002,
    name: 'Taco Park',
    description: 'A park with a rundown playground.',
    imgPath: 'tacoPark',
    hasEnemy: true,
    enemyNumber: 15,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const neighbors: Location = {
    id: 1003,
    name: 'Condos',
    description: 'Condos next to the ally way.',
    imgPath: 'condos',
    hasEnemy: true,
    enemyNumber: 5,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };

  export const gasStation: Location = {
    id: 1004,
    name: 'Gas Station',
    description: 'Fill up.',
    imgPath: 'sanjayStation',
    hasEnemy: false,
    enemyNumber: 0,
    hasEntered: false,
    NPC: true,
    itemRequired: false,
    dungeonHere: false,
    shop: true,
    shopHere: SanjayShop,
  };

  export const hussieHouse: Location = {
    id: 1005,
    name: 'Hussie House',
    description: 'For a good time...',
    imgPath: 'hussieHouse',
    hasEnemy: true,
    enemyNumber: 3,
    NPC: false,
    itemRequired: true,
    hasEntered: false,
    itemThatsRequired: { details: ratTail, quantity: 1 },
    shop: false,
    dungeonHere: false,
  };

  export const womensShelter: Location = {
    id: 1006,
    name: `Women's Shelter`,
    description: 'Home for battered women.',
    imgPath: 'womensShelter',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: true,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const upperDocks: Location = {
    id: 1007,
    name: 'Upper Docks',
    description: 'fog and fog horns',
    imgPath: 'upperDocks',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: true,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const lowerDocks: Location = {
    id: 1008,
    name: 'Lower Docks',
    description: 'Eeriness by the water',
    imgPath: 'lowerDocks',
    hasEnemy: true,
    enemyNumber: 8,
    NPC: false,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const boat: Location = {
    id: 1009,
    name: 'Boat',
    description: `I'm on a boat MF, don't you ever forget`,
    imgPath: 'boat',
    hasEnemy: false,
    enemyNumber: 0,
    itemRequired: true,
    NPC: true,
    itemThatsRequired: { details: boatKey, quantity: 1 },
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const river: Location = {
    id: 1010,
    name: 'River',
    description: `There is a van down by it.`,
    imgPath: 'river',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const riverBank: Location = {
    id: 1011,
    name: 'River Bank',
    description: `Park your boat here`,
    imgPath: 'riverbank',
    hasEnemy: true,
    NPC: false,
    enemyNumber: 4,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const beach: Location = {
    id: 1012,
    name: 'Beach',
    description: `Sandy.`,
    imgPath: 'beach',
    hasEnemy: false,
    NPC: true,
    enemyNumber: 4,
    itemRequired: false,
    hasEntered: false,
    dungeonHere: false,
    shop: false,
  };

  export const lighthouse: Location = {
    id: 1013,
    name: 'Lighthouse',
    description: 'Helps ships avoid crashing.',
    imgPath: 'lighthouse',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };

  export const coralOutcrop: Location = {
    id: 1014,
    name: 'Coral Outcrop',
    description: 'A random outcrop of coral.',
    imgPath: 'coralOutcrop',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };

  export const rockyOutcrop: Location = {
    id: 1015,
    name: 'Rocky Outcrop',
    description: 'A rocky area with a cave.',
    imgPath: 'rockyOutcrop',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };

  export const JorieForest1: Location = {
    id: 1016,
    name: 'Jori Ntl Forest',
    description: `Lots o' trees.`,
    imgPath: 'joriForest1',
    hasEnemy: true,
    enemyNumber: 2,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };
  export const JorieForest2: Location = {
    id: 1017,
    name: 'Jori Ntl Forest',
    description: `Lots o' trees.`,
    imgPath: 'joriForest2',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const JorieCampSite: Location = {
    id: 1018,
    name: 'Jori Campsite',
    description: 'Mosquitos and grossness',
    imgPath: 'joriCampsite',
    hasEnemy: true,
    NPC: false,
    enemyNumber: 3,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };
  export const JorieForest3: Location = {
    id: 1019,
    name: 'Jori Ntl Forest',
    description: `Lots o' trees.`,
    imgPath: 'joriForest3',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const forestLot: Location = {
    id: 1020,
    name: 'Forest Parking Lot',
    description: `Semi's for days.`,
    imgPath: 'forestLot',
    hasEnemy: true,
    NPC: true,
    enemyNumber: 6,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const stuffleStop: Location = {
    id: 1021,
    name: 'StuffleStop Shop',
    description: 'The owner is tubby and bald',
    imgPath: 'stuffleShop',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: true,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: true,
    shopHere: stuffleShop,
  };
  export const casinoGate: Location = {
    id: 1022,
    name: 'Casino Entrance',
    description: 'Entance to Pettey Palace Casino',
    imgPath: 'casinoGate',
    enemyNumber: 0,
    NPC: true,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const petteyPalace: Location = {
    id: 1023,
    name: 'Pettey Palace Casino',
    description: 'Degen your cash away',
    imgPath: 'petteyPalace',
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    NPC: false,
    itemRequired: true,
    itemThatsRequired: { details: casinoKey, quantity: 1 },
    dungeonHere: false,
    shop: false,
    ///add casino games.  (random number generator stuff)
  };

  export const showStage: Location = {
    id: 1024,
    name: 'Show Stage',
    description: 'A bunch of half-naked dudes are dancing...',
    imgPath: 'showStage',
    enemyNumber: 3,
    hasEnemy: true,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
  };

  export const petteyPalace2: Location = {
    id: 1025,
    name: 'Pettey Palace Casino',
    description: 'Degen your cash away',
    imgPath: 'petteyPalace',
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    NPC: true,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
    ///add casino games.  (random number generator stuff)
  };

  export const lighthouse2: Location = {
    id: 1026,
    name: 'Lighthouse',
    description: 'Helps ships avoid crashing.',
    imgPath: 'lighthouse',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    hasEntered: false,
    itemRequired: false,
    dungeonHere: true,
    shop: false,
  };

  export const mBGate: Location = {
    id: 1027,
    name: 'Mission Bluffs Gate',
    description: 'Entrance to the gated community',
    imgPath: 'mbGate',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: true,
    itemThatsRequired: { details: mbKeyCard, quantity: 1 },
    dungeonHere: false,
    shop: false,
    hasEntered: false,
  };

  export const mBFountain: Location = {
    id: 1028,
    name: 'Mission Bluffs Fountain',
    description: 'A prestine Fountain',
    imgPath: 'mbFountain',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
    hasEntered: false,
  };

  export const countryClub: Location = {
    id: 1029,
    name: 'Mission Bluffs Country Club',
    description: 'Only for the exclusive',
    imgPath: 'countryClub',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
    hasEntered: false,
  };

  export const proShop: Location = {
    id: 1030,
    name: 'Pro Shop',
    description: 'Golf Stuff',
    imgPath: 'proShop',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    dungeonHere: false,
    shop: true,
    hasEntered: false,
  };

  export const golfCourse: Location = {
    id: 1031,
    name: 'Golf Course',
    description: 'FORE!',
    imgPath: 'golfCourse',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
    hasEntered: false,
  };
  export const pool: Location = {
    id: 1032,
    name: 'Club Swimming Pool',
    description: 'Better not skinny dip.',
    imgPath: 'pool',
    hasEnemy: false,
    enemyNumber: 0,
    NPC: false,
    itemRequired: false,
    dungeonHere: false,
    shop: false,
    hasEntered: false,
  };

  export const Locs: Location[] = [
    home,
    neighbors,
    park,
    gasStation,
    hussieHouse,
    womensShelter,
    upperDocks,
    lowerDocks,
    boat,
    river,
    riverBank,
    beach,
    coralOutcrop,
    rockyOutcrop,
    lighthouse,
    JorieForest1,
    JorieForest2,
    JorieCampSite,
    forestLot,
    stuffleStop,
    JorieForest3,
    casinoGate,
    petteyPalace,
    showStage,
    lighthouse2,
    petteyPalace2,
    mBGate,
    mBFountain,
    countryClub,
    proShop,
    golfCourse,
    pool,
  ];

  ///-------------dungeons--------
  export const neighborsCellar: dungeon = {
    id: 10030,
    name: 'Condo Cellar',
    floors: 1,
    insideDungeon: false,
  };
  export const cellarrm1: dungeonRoom = {
    roomID: '1A1',
    dungeon: neighborsCellar,
    floor: 1,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: true,
    exitLocation: neighbors,
  };
  export const cellarrm2: dungeonRoom = {
    roomID: '2A1',
    dungeon: neighborsCellar,
    floor: 1,
    roomNumber: 2,
    enemyNumber: 2,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: false,
    stairsDown: false,
    stairsUp: false,
    exit: false,
  };
  export const cellarrm3: dungeonRoom = {
    roomID: '2B1',
    dungeon: neighborsCellar,
    floor: 1,
    roomNumber: 3,
    enemyNumber: 1,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: true,
    stairsDown: false,
    stairsUp: false,
    exit: false,
  };
  export const cellarfl1: dungeonFloor = {
    dungeon: neighborsCellar,
    floor: 1,
    rooms: 3,
    dungeonRooms: [cellarrm1, cellarrm2, cellarrm3],
  };
  neighborsCellar.dungeonFloors = [cellarfl1];
  cellarrm1.toTheSouth = cellarrm2;
  cellarrm2.toTheNorth = cellarrm1;
  cellarrm2.toTheEast = cellarrm3;
  cellarrm3.toTheWest = cellarrm2;
  cellarrm3.itemThatsRequired = { details: shoes, quantity: 1 };

  //lighthouse dung

  export const lighthouseDung: dungeon = {
    id: 10130,
    name: `Lighthouse Inside`,
    floors: 4,
    insideDungeon: false,
  };
  export const lhrm1: dungeonRoom = {
    roomID: '1A1',
    dungeon: lighthouseDung,
    floor: 1,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: false,
    exit: true,
    exitLocation: lighthouse,
  };
  export const lhrm2: dungeonRoom = {
    roomID: '1A2',
    dungeon: lighthouseDung,
    floor: 2,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: true,
    exit: false,
  };
  export const lhrm3: dungeonRoom = {
    roomID: '1A3',
    dungeon: lighthouseDung,
    floor: 3,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: true,
    exit: false,
  };
  export const lhrm3A: dungeonRoom = {
    roomID: '2A3',
    dungeon: lighthouseDung,
    floor: 3,
    roomNumber: 2,
    enemyNumber: 1,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const lhrm4: dungeonRoom = {
    roomID: '1A4',
    dungeon: lighthouseDung,
    floor: 4,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: true,
    stairsUp: false,
    stairsDown: true,
    exit: false,
  };
  export const lhrm4A: dungeonRoom = {
    roomID: '2A4',
    dungeon: lighthouseDung,
    floor: 4,
    roomNumber: 2,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: true,
    exit: true,
    exitLocation: lighthouse2,
  };

  export const lhfl1: dungeonFloor = {
    dungeon: lighthouseDung,
    floor: 1,
    rooms: 1,
    dungeonRooms: [lhrm1],
  };
  export const lhfl2: dungeonFloor = {
    dungeon: lighthouseDung,
    floor: 2,
    rooms: 1,
    dungeonRooms: [lhrm2],
  };
  export const lhfl3: dungeonFloor = {
    dungeon: lighthouseDung,
    floor: 3,
    rooms: 2,
    dungeonRooms: [lhrm3, lhrm3A],
  };
  export const lhfl4: dungeonFloor = {
    dungeon: lighthouseDung,
    floor: 4,
    rooms: 2,
    dungeonRooms: [lhrm4, lhrm4A],
  };

  lighthouseDung.dungeonFloors = [lhfl1, lhfl2, lhfl3, lhfl4];

  lhrm1.toStairsUp = lhrm2;
  lhrm2.toStairsDown = lhrm1;
  lhrm2.toStairsUp = lhrm3;
  lhrm3.toStairsUp = lhrm4;
  lhrm3.toTheEast = lhrm3A;
  lhrm3A.toTheWest = lhrm3;
  lhrm3.toStairsDown = lhrm2;
  lhrm4.toStairsDown = lhrm3;
  lhrm4.itemThatsRequired = { details: lighthouseKey, quantity: 1 };
  lhrm4.toTheEast = lhrm4A;
  lhrm4A.toTheWest = lhrm4;

  export const seasideCave: dungeon = {
    id: 10150,
    name: 'Seaside Cave',
    floors: 1,
    insideDungeon: false,
  };

  export const ssc1A: dungeonRoom = {
    roomID: '1A1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: true,
    exitLocation: rockyOutcrop,
  };
  export const ssc2A: dungeonRoom = {
    roomID: '2A1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 2,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc3A: dungeonRoom = {
    roomID: '3A1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 3,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc1B: dungeonRoom = {
    roomID: '1B1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 4,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc3B: dungeonRoom = {
    roomID: '3B1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 5,
    enemyNumber: 3,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc4B: dungeonRoom = {
    roomID: '4B1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 6,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc1C: dungeonRoom = {
    roomID: '1C1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 7,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc3C: dungeonRoom = {
    roomID: '3C1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 8,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc4C: dungeonRoom = {
    roomID: '4C1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 9,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc5C: dungeonRoom = {
    roomID: '5C1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 10,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc2D: dungeonRoom = {
    roomID: '2D1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 11,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc3D: dungeonRoom = {
    roomID: '3D1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 12,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc5D: dungeonRoom = {
    roomID: '5D1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 13,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc1E: dungeonRoom = {
    roomID: '1E1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 14,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc2E: dungeonRoom = {
    roomID: '2E1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 15,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc3E: dungeonRoom = {
    roomID: '3E1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 16,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc4E: dungeonRoom = {
    roomID: '4E1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 17,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc5E: dungeonRoom = {
    roomID: '5E1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 18,
    enemyNumber: 2,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  export const ssc1F: dungeonRoom = {
    roomID: '1F1',
    dungeon: seasideCave,
    floor: 1,
    roomNumber: 19,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: true,
    exitLocation: JorieForest1,
  };
  export const sscfl1: dungeonFloor = {
    dungeon: seasideCave,
    floor: 1,
    rooms: 19,
    dungeonRooms: [
      ssc1A,
      ssc1B,
      ssc1C,
      ssc1E,
      ssc1F,
      ssc2A,
      ssc2D,
      ssc2E,
      ssc3A,
      ssc3B,
      ssc3C,
      ssc3D,
      ssc3E,
      ssc4B,
      ssc4C,
      ssc4C,
      ssc4E,
      ssc5C,
      ssc5D,
      ssc5E,
    ],
  };

  seasideCave.dungeonFloors = [sscfl1];
  ssc1A.toTheEast = ssc2A;
  ssc1A.toTheSouth = ssc1B;
  ssc2A.toTheWest = ssc1A;
  ssc2A.toTheEast = ssc3A;
  ssc3A.toTheWest = ssc2A;
  ssc3A.toTheSouth = ssc3B;
  ssc1B.toTheNorth = ssc1A;
  ssc1B.toTheSouth = ssc1C;
  ssc3B.toTheNorth = ssc3A;
  ssc3B.toTheEast = ssc4B;
  ssc3B.toTheSouth = ssc3C;
  ssc4B.toTheWest = ssc3B;
  ssc4B.toTheSouth = ssc4C;
  ssc1C.toTheNorth = ssc1B;
  ssc3C.toTheNorth = ssc3B;
  ssc3C.toTheWest = ssc4C;
  ssc3C.toTheSouth = ssc3D;
  ssc4C.toTheWest = ssc3C;
  ssc4C.toTheNorth = ssc4B;
  ssc4C.toTheEast = ssc5C;
  ssc5C.toTheWest = ssc4C;
  ssc5C.toTheSouth = ssc5D;
  ssc2D.toTheEast = ssc3D;
  ssc2D.toTheSouth = ssc2E;
  ssc3D.toTheWest = ssc2D;
  ssc3D.toTheNorth = ssc3C;
  ssc3D.toTheSouth = ssc3E;
  ssc5D.toTheNorth = ssc5C;
  ssc5D.toTheSouth = ssc5E;
  ssc1E.toTheEast = ssc2E;
  ssc1E.toTheSouth = ssc1F;
  ssc2E.toTheWest = ssc1E;
  ssc2E.toTheNorth = ssc2D;
  ssc2E.toTheEast = ssc3E;
  ssc3E.toTheWest = ssc2E;
  ssc3E.toTheNorth = ssc3D;
  ssc3E.toTheEast = ssc4E;
  ssc4E.toTheWest = ssc3E;
  ssc4E.toTheEast = ssc5E;
  ssc5E.toTheEast = ssc4E;
  ssc5E.toTheNorth = ssc5D;
  ssc1F.toTheNorth = ssc1E;

  //casino Backrooms

  export const casinodung: dungeon = {
    id: 10250,
    name: 'Casino Back Rooms',
    floors: 4,
    insideDungeon: false,
  };

  export const cbr1A2: dungeonRoom = {
    roomID: '1A2',
    dungeon: casinodung,
    floor: 2,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: true,
    exitLocation: petteyPalace2,
  };

  export const cbr1B2: dungeonRoom = {
    roomID: '1B2',
    dungeon: casinodung,
    floor: 2,
    roomNumber: 2,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: true,
    exit: false,
  };

  export const cbr2A2: dungeonRoom = {
    roomID: '2A2',
    dungeon: casinodung,
    floor: 2,
    roomNumber: 3,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: false,
    exit: false,
  };
  //bottom floor
  export const cbr1A1: dungeonRoom = {
    roomID: '1A2',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: false,
    exit: false,
  };

  export const cbr2A1: dungeonRoom = {
    roomID: '2A1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 2,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3A1: dungeonRoom = {
    roomID: '3A1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 3,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3B1: dungeonRoom = {
    roomID: '3B1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 4,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3C1: dungeonRoom = {
    roomID: '3C1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 5,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr2C1: dungeonRoom = {
    roomID: '2C1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 6,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr4C1: dungeonRoom = {
    roomID: '4C1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 7,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr4D1: dungeonRoom = {
    roomID: '4D1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 8,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr5D1: dungeonRoom = {
    roomID: '5D1',
    dungeon: casinodung,
    floor: 1,
    roomNumber: 9,
    enemyNumber: 0,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };
  //floor 3
  export const cbr1A3: dungeonRoom = {
    roomID: '1A3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: true,
    exit: false,
  };

  export const cbr1B3: dungeonRoom = {
    roomID: '1B3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 2,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: true,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr1C3: dungeonRoom = {
    roomID: '1C3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 3,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr2C3: dungeonRoom = {
    roomID: '2C3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 4,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3C3: dungeonRoom = {
    roomID: '3C3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 5,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3B3: dungeonRoom = {
    roomID: '3B3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 6,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: true,
    stairsDown: false,
    exit: false,
  };

  export const cbr2D3: dungeonRoom = {
    roomID: '2D3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 7,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr2E3: dungeonRoom = {
    roomID: '2E3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 8,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  export const cbr3E3: dungeonRoom = {
    roomID: '3E3',
    dungeon: casinodung,
    floor: 3,
    roomNumber: 9,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: false,
    exit: false,
  };

  //Floor 4
  export const cbr1A4: dungeonRoom = {
    roomID: '1A4',
    dungeon: casinodung,
    floor: 4,
    roomNumber: 1,
    enemyNumber: 0,
    hasEnemy: false,
    hasEntered: false,
    itemRequired: false,
    stairsUp: false,
    stairsDown: true,
    exit: false,
  };

  export const cbr2A4: dungeonRoom = {
    roomID: '2A4',
    dungeon: casinodung,
    floor: 4,
    roomNumber: 2,
    enemyNumber: 1,
    hasEnemy: true,
    hasEntered: false,
    itemRequired: true,
    stairsUp: false,
    stairsDown: true,
    exit: false,
  };

  export const cbrfl1: dungeonFloor = {
    dungeon: casinodung,
    floor: 1,
    rooms: 9,
    dungeonRooms: [
      cbr1A1,
      cbr2A1,
      cbr3A1,
      cbr3B1,
      cbr2C1,
      cbr3C1,
      cbr4C1,
      cbr4D1,
      cbr5D1,
    ],
  };

  export const cbrfl2: dungeonFloor = {
    dungeon: casinodung,
    floor: 2,
    rooms: 3,
    dungeonRooms: [cbr1A2, cbr2A2, cbr1B2],
  };

  export const cbrfl3: dungeonFloor = {
    dungeon: casinodung,
    floor: 3,
    rooms: 9,
    dungeonRooms: [
      cbr1A3,
      cbr1B3,
      cbr1C3,
      cbr2C3,
      cbr3C3,
      cbr3B3,
      cbr2D3,
      cbr2E3,
      cbr3E3,
    ],
  };

  export const cbrfl4: dungeonFloor = {
    dungeon: casinodung,
    floor: 4,
    rooms: 2,
    dungeonRooms: [cbr1A4, cbr2A4],
  };
  casinodung.dungeonFloors = [cbrfl2, cbrfl1, cbrfl3, cbrfl4];
  cbr1A2.toTheSouth = cbr1B2;
  cbr1B2.toTheNorth = cbr1A2;
  cbr1A2.toTheEast = cbr2A2;
  cbr2A2.toTheWest = cbr1A2;
  cbr1B2.toStairsDown = cbr1A1;
  cbr1A1.toStairsUp = cbr1B2;
  cbr1A1.toTheEast = cbr2A1;
  cbr2A1.toTheWest = cbr1A1;
  cbr2A1.toTheEast = cbr3A1;
  cbr3A1.toTheWest = cbr2A1;
  cbr3A1.toTheSouth = cbr3B1;
  cbr3B1.toTheNorth = cbr3A1;
  cbr3B1.toTheSouth = cbr3C1;
  cbr3C1.toTheWest = cbr2C1;
  cbr3C1.toTheNorth = cbr3A1;
  cbr2C1.toTheEast = cbr3C1;
  cbr3C1.toTheEast = cbr4C1;
  cbr4C1.toTheWest = cbr3C1;
  cbr4C1.toTheSouth = cbr4D1;
  cbr4D1.toTheNorth = cbr4C1;
  cbr4D1.toTheEast = cbr5D1;
  cbr5D1.toTheWest = cbr4D1;
  cbr2A2.toStairsUp = cbr1A3;
  cbr1A3.toStairsDown = cbr2A2;
  cbr1A3.toTheSouth = cbr1B3;
  cbr1B3.toTheNorth = cbr1A3;
  cbr1B3.itemThatsRequired = { details: passCode, quantity: 1 };
  cbr1B3.toTheSouth = cbr1C3;
  cbr1C3.toTheNorth = cbr1B3;
  cbr1C3.toTheEast = cbr2C3;
  cbr2C3.toTheWest = cbr1C3;
  cbr2C3.toTheEast = cbr3C3;
  cbr3C3.toTheWest = cbr2C3;
  cbr2C3.toTheSouth = cbr2D3;
  cbr2D3.toTheNorth = cbr2C3;
  cbr2D3.toTheSouth = cbr2E3;
  cbr2E3.toTheNorth = cbr2D3;
  cbr2E3.toTheEast = cbr3E3;
  cbr3E3.toTheWest = cbr2E3;
  cbr3C3.toTheNorth = cbr3B3;
  cbr3B3.toTheSouth = cbr3C3;
  cbr3B3.toStairsUp = cbr1A4;
  cbr1A4.toStairsDown = cbr3B3;
  cbr2A4.itemThatsRequired = { details: playersCard, quantity: 1 };
  ////////////----------------------------Quests------------------------------------
  export let beatSomePimps: quest = {
    id: 4000,
    name: 'Big Pimpin',
    description: 'Defeat enough pimps to get 5 pimp canes',
    rewardXP: 60,
    rewardGold: 25,
    questCompletionItem: [
      { details: { details: pimpCane, quantity: 5 }, quantity: 5 },
    ],
    message: "Congrats! You've helped Cristie and gotten the pimp canes!",
  };
  export let PAAARTY: quest = {
    id: 4001,
    name: `Let's PAAARTY`,
    description: 'Get the rare Party hat.',
    rewardXP: 105,
    rewardGold: 30,
    questCompletionItem: [
      { details: { details: partyHat, quantity: 1 }, quantity: 1 },
    ],
    message: "Congrats! You've gotten the party hat and showed it off!",
  };
  export let Mobbin: quest = {
    id: 4002,
    name: `Steady Mobbin'`,
    description: 'Retrieve 3 mob suitcases',
    rewardXP: 100,
    rewardGold: 50,
    rewardItem: { details: boatKey, quantity: 1 },
    questCompletionItem: [
      { details: { details: mobSuitcases, quantity: 3 }, quantity: 3 },
    ],
    message: "You be steady mobbin'",
  };

  export let wyverntReady: quest = {
    id: 4003,
    name: `Wyvern't You Ready?`,
    description: 'Get a Wyvern Tail',
    rewardXP: 40,
    rewardGold: 60,
    rewardItem: { details: lighthouseKey, quantity: 1 },
    questCompletionItem: [
      { details: { details: WyvernTail, quantity: 1 }, quantity: 1 },
    ],
    message: 'You were ready',
  };

  export let mobbin2: quest = {
    id: 4004,
    name: `Steady Mobbin' pt. 2`,
    description: 'Get three poker Chips',
    rewardXP: 85,
    rewardItem: { details: casinoKey, quantity: 1 },
    rewardGold: 10,
    questCompletionItem: [
      { details: { details: pokerChip, quantity: 3 }, quantity: 3 },
    ],
    message: "Congrats! You've gotten the party hat and showed it off!",
  };

  export let mobbin3: quest = {
    id: 4005,
    name: 'Mob EndGame',
    description: 'Get 1 letter of resignation from Mob Head',
    rewardXP: 145,
    rewardItem: { details: mbKeyCard, quantity: 1 },
    rewardGold: 100,
    questCompletionItem: [
      { details: { details: resignationL, quantity: 1 }, quantity: 1 },
    ],
    message: `Congrats, the Mob is no more!`,
  };

  export let mob4: quest = {
    id: 4006,
    name: `Mob Hideout Pt. 1`,
    description: `Get 6 id badges`,
    rewardXP: 50,
    rewardItem: { details: passCode, quantity: 1 },
    rewardGold: 10,
    questCompletionItem: [
      { details: { details: mobIdBadge, quantity: 6 }, quantity: 6 },
    ],
    message: `Continue through the hideout!`,
  };
  //------------------------------NPC------------------------------------
  export const Cristie: NPC = {
    id: 5000,
    name: 'Christie',
    optionPerson: true,
    initialMessage:
      'Hello traveler, can you get revenge on some of the pimps that beat me up?',
    questGiven: { details: beatSomePimps, hasQuest: false, isComplete: false },
    endChatMessage: 'Well Shoot, I was hoping you could assist me.',
    Dialog1:
      'Oh thank you so much! Bring me back 5 Pimp Canes as proof of your exploits.',
    afterMessage: 'Thank you so much for your assistance!',
  };
  export const CristieConvo: dialogReplies = {
    NPCDetails: Cristie,
    playerResponse1: 'Sure I will help you out.',
    playerEndChatResponse: "I'm going to pass.",
  };

  export const Sanjay: NPC = {
    id: 5001,
    name: 'Sanjay',
    optionPerson: false,
    initialMessage: 'Get some supplies here!',
    endChatMessage: 'End',
  };

  export const PartyPettey: NPC = {
    id: 5002,
    name: 'Party Pettey',
    optionPerson: true,
    initialMessage:
      'I heard of a very rare item called a party hat, can you beat the couch troll show it to me?',
    questGiven: { details: PAAARTY, hasQuest: false, isComplete: false },
    dungeonRoom: cellarrm1,
    endChatMessage: 'Well Shoot, I was hoping you could assist me.',
    Dialog1: 'Oh thank you so much! Bring me back a party hat',
    afterMessage: "Thank you so much for your assistance! Let's PAAARTY!",
  };

  export const steve: NPC = {
    id: 5003,
    name: 'Steve the Pirate',
    optionPerson: false,
    initialMessage: "ARRRGH I be takin' ye across the river now.",

    endChatMessage: 'End',
  };

  export const PetteyConvo: dialogReplies = {
    NPCDetails: PartyPettey,
    playerResponse1: 'Sure I like to party.',
    playerEndChatResponse: "I'm going to pass.",
  };

  export const Kenneth: NPC = {
    id: 5004,
    name: 'Kenneth',
    optionPerson: true,
    initialMessage: `I'm attempting to take down the mob. Can you help me get started?`,
    questGiven: { details: Mobbin, hasQuest: false, isComplete: false },

    endChatMessage: `The Mob lives on...`,
    Dialog1: `Thank heavens. Bring me back 3 mob suitcases and we'll chat.`,
    afterMessage: `This is a good start. Here is the key to the boat. Thank you.`,
  };

  export const KennethConvo: dialogReplies = {
    NPCDetails: Kenneth,
    playerResponse1: `Lets do it.`,
    playerEndChatResponse: `The mob is of no concern to me.`,
  };

  export const Warren: NPC = {
    id: 5005,
    name: 'Warren',
    optionPerson: true,
    initialMessage: `My Wyvern has gotten out of control! Please defeat it.`,
    questGiven: { details: wyverntReady, hasQuest: false, isComplete: false },

    endChatMessage: `That's not good`,
    Dialog1: `Thank you so much. Bring me back it's tail and I'll help you continue.`,
    afterMessage: `Here is the key to the lighthouse tower. Talk to the person there.`,
  };

  export const Warrenconvo: dialogReplies = {
    NPCDetails: Warren,
    playerResponse1: `I got this, how hard could it be?`,
    playerEndChatResponse: `Sounds scary. I'm out. `,
  };

  export const wiseGuy: NPC = {
    id: 5006,
    name: 'Wise Old Guy',
    optionPerson: false,
    initialMessage:
      'You may not know it, but you have quite the worldly history.  As you continue your adventure you will learn more about yourself. Perhaps you will remember...',
    dungeonRoom: lhrm4A,
    endChatMessage: 'End',
  };

  export const trucker: NPC = {
    id: 5007,
    name: `Bubba the Trucker`,
    optionPerson: false,
    initialMessage:
      'Hey! Ya look familiar, I have seen ye before, but yer was dressed much nicer.  Ya was with some bloke named Josh or Justin, or something with a J.',

    endChatMessage: 'End',
  };

  export const Ryan: NPC = {
    id: 5008,
    name: `Ryan`,
    optionPerson: false,
    initialMessage: `Yo dawg, see what I got. It's on point.`,

    endChatMessage: `End`,
  };

  export const PartyPettey2: NPC = {
    id: 5009,
    name: 'Party Pettey',
    optionPerson: true,
    initialMessage:
      'The mob has me blackmailed and taken my casino! I need 3 poker chips to be allowed back in.',
    questGiven: { details: mobbin2, hasQuest: false, isComplete: false },

    endChatMessage: 'Doggoneit.',
    Dialog1: 'You might start by defeating Juggalos at the show next door.',
    afterMessage: 'Thank you. Access the casino and talk to my friend there.',
  };

  export const PetteyConvo2: dialogReplies = {
    NPCDetails: PartyPettey2,
    playerResponse1: "The Mob again? Let's take them down!",
    playerEndChatResponse: 'uhhh no thanks',
  };

  export const Corvalis: NPC = {
    id: 5010,
    name: 'Corvalis',
    optionPerson: true,
    initialMessage: `Let's take down the mob. Bring me the Mob Head's letter of resignation`,
    questGiven: { details: mobbin3, hasQuest: false, isComplete: false },
    endChatMessage: 'Bad move my guy',
    Dialog1: 'The Mob boss is in the casino back rooms.',
    afterMessage:
      'The mob is no more! Continue your adventure in Mission Bluffs!',
  };
  export const corvConvo: dialogReplies = {
    NPCDetails: Corvalis,
    playerResponse1: "Finally! Let's go!",
    playerEndChatResponse: 'Nope. Going to sit this one out.',
  };

  export const mobInformant: NPC = {
    id: 5011,
    name: `Mob informant`,
    optionPerson: true,
    initialMessage: `In order to continue I need 6 mob id badges`,
    questGiven: { details: mob4, hasQuest: false, isComplete: false },
    endChatMessage: `guess you'll just wait...`,
    Dialog1: `defeat mob henchmen to get id badges`,
    afterMessage: `Continue up stairs!`,
  };
  export const informConvo: dialogReplies = {
    NPCDetails: mobInformant,
    playerResponse1: 'Yessir!',
    playerEndChatResponse: 'No thank you.',
  };

  ////////////--------------------------------------Enemy----------------------------------------

  export const burgler: Enemy = {
    id: 2001,
    name: 'Burgler',
    description: 'Steals stuff',
    imgPath: 'burgler',
    maxHp: 5,
    currentHp: 5,
    attack: 2,
    defense: 0,
    speed: 1,
    level: 1,
    rewardXP: 2,
    rewardGold: 5,
  };

  export const rat: Enemy = {
    id: 2002,
    name: 'Rat',
    description: 'Bigger than a Mouse',
    imgPath: 'rat',
    fluctuating: false,
    maxHp: 3,
    currentHp: 3,
    attack: 3,
    defense: 0,
    speed: 4,
    level: 2,
    rewardXP: 3,
    rewardGold: 2,
  };
  export const Pimp: Enemy = {
    id: 2003,
    name: 'Pimp',
    description: 'Pimpin',
    imgPath: 'pimp',
    fluctuating: false,
    maxHp: 10,
    currentHp: 10,
    attack: 3,
    defense: 1,
    speed: 5,
    level: 3,
    rewardXP: 10,
    rewardGold: 10,
  };
  export const couchTroll: Enemy = {
    id: 2004,
    name: 'Couch Troll',
    description: 'troll on a couch',
    imgPath: 'couchTroll',
    fluctuating: false,
    maxHp: 16,
    currentHp: 16,
    attack: 4,
    defense: 5,
    speed: 3,
    level: 5,
    rewardXP: 13,
    rewardGold: 8,
  };
  export const Mobster: Enemy = {
    id: 2005,
    name: 'Mobster',
    description: 'He be Mobbin',
    imgPath: 'mobster',
    fluctuating: false,
    maxHp: 17,
    currentHp: 17,
    attack: 7,
    defense: 5,
    speed: 6,
    level: 7,
    rewardXP: 12,
    rewardGold: 13,
  };

  export const merman: Enemy = {
    id: 2006,
    name: 'Merman',
    description: 'Merman plus Merpeople equals mer-society',
    imgPath: 'merman',
    fluctuating: false,
    maxHp: 19,
    currentHp: 19,
    attack: 11,
    defense: 6,
    speed: 7,
    level: 9,
    rewardXP: 15,
    rewardGold: 17,
  };

  export const joeyJugg: Enemy = {
    id: 2007,
    name: 'Joey Juggalo',
    description: 'Dumb and annoying. Whoop whoop!',
    imgPath: 'joeyJugg',
    fluctuating: false,
    maxHp: 115,
    currentHp: 115,
    attack: 6,
    defense: 9,
    speed: 7,
    level: 13,
    rewardXP: 23,
    rewardGold: 12,
  };

  export const mobHenchman: Enemy = {
    id: 2008,
    name: 'Mob Henchman',
    description: 'A medium level mobster',
    imgPath: '',
    fluctuating: false,
    maxHp: 30,
    currentHp: 30,
    attack: 18,
    defense: 16,
    speed: 13,
    level: 16,
    rewardXP: 25,
    rewardGold: 14,
  };
  //--------------------------------fluctuating enemies-----------------

  export const Wyvern: Enemy = {
    id: 2501,
    name: 'Guardian Wyvern',
    description: 'Big Boss boi Wyvern',
    imgPath: 'Wyvern',
    fluctuating: true,
    maxHp: -4,
    currentHp: -4,
    attack: 6,
    defense: 2,
    speed: 5,
    level: 1,
    rewardXP: 60,
    rewardGold: 25,
  };

  export const caveGoblin: Enemy = {
    id: 2502,
    name: 'Cave Goblin',
    description: 'Enjoys Goblin food',
    imgPath: 'caveGoblin',
    fluctuating: true,
    maxHp: -8,
    currentHp: -8,
    attack: 0,
    defense: 1,
    speed: 3,
    level: 0,
    rewardXP: 20,
    rewardGold: 8,
  };

  const lotLizard: Enemy = {
    id: 2503,
    name: 'Lot Lizard',
    description: 'She does not look like a lizard...',
    imgPath: 'lotLizard',
    fluctuating: true,
    maxHp: -5,
    currentHp: -5,
    attack: 4,
    defense: 3,
    speed: 3,
    level: 0,
    rewardXP: 15,
    rewardGold: 10,
  };
  export const mobHead: Enemy = {
    id: 2503,
    name: 'Mob Head',
    imgPath: '',
    description: 'Head of the Mob',
    fluctuating: true,
    maxHp: 15,
    currentHp: 15,
    attack: 8,
    defense: 7,
    speed: 3,
    level: 0,
    rewardXP: 25,
    rewardGold: 25,
  };

  ////---------------Logic-------------------------------
  //----convos-----
  export const cristieConvos: completeDialog[] = [
    { NPCDetails: Cristie, dialog: CristieConvo },
  ];
  export const petteyConvo: completeDialog[] = [
    { NPCDetails: PartyPettey, dialog: PetteyConvo },
  ];
  export const kennethConvo: completeDialog[] = [
    { NPCDetails: Kenneth, dialog: KennethConvo },
  ];
  export const WarrenConvo: completeDialog[] = [
    { NPCDetails: Warren, dialog: Warrenconvo },
  ];
  export const petteyConvo2: completeDialog[] = [
    { NPCDetails: PartyPettey2, dialog: PetteyConvo2 },
  ];
  export const corConvo: completeDialog[] = [
    { NPCDetails: Corvalis, dialog: corvConvo },
  ];

  export const infConvo: completeDialog[] = [
    { NPCDetails: mobInformant, dialog: informConvo },
  ];
  //----Loot------
  burgler.lootTable = [
    { details: stick, chance: 700, isDefaultItem: true },
    { details: sodaPop, chance: 200, isDefaultItem: false },
  ];
  Pimp.lootTable = [
    { details: pimpCane, chance: 500, isDefaultItem: true },
    { details: wdSteak, chance: 200, isDefaultItem: false },
  ];

  rat.lootTable = [
    { details: shoes, chance: 500, isDefaultItem: true },
    { details: ratTail, chance: 300, isDefaultItem: false },
  ];

  couchTroll.lootTable = [
    { details: sodaPop, chance: 620, isDefaultItem: true },
    { details: partyHat, chance: 80, isDefaultItem: false },
  ];

  Mobster.lootTable = [
    { details: wdSteak, chance: 350, isDefaultItem: true },
    { details: mrSteak, chance: 250, isDefaultItem: false },
    { details: mallet, chance: 150, isDefaultItem: false },
    { details: mobSuitcases, chance: 250, isDefaultItem: false },
  ];

  merman.lootTable = [
    { details: merFlippers, chance: 150, isDefaultItem: false },
    { details: merFlesh, chance: 350, isDefaultItem: false },
  ];

  Wyvern.lootTable = [
    { details: WyvernTail, chance: 1000, isDefaultItem: true },
  ];
  caveGoblin.lootTable = [
    { details: mrSteak, chance: 320, isDefaultItem: false },
    { details: wdSteak, chance: 320, isDefaultItem: false },
    { details: Spear, chance: 100, isDefaultItem: false },
  ];

  lotLizard.lootTable = [
    { details: purpleDong, chance: 95, isDefaultItem: false },
  ];

  joeyJugg.lootTable = [
    { details: pokerChip, chance: 700, isDefaultItem: false },
    { details: purpleDong, chance: 200, isDefaultItem: false },
  ];

  mobHenchman.lootTable = [
    { details: mobIdBadge, chance: 720, isDefaultItem: false },
  ];

  mobHead.lootTable = [
    { details: resignationL, chance: 999, isDefaultItem: true },
  ];

  //-------------------------Locations---------------------
  home.toTheNorth = 1002;
  home.toTheEast = 1003;
  home.toTheWest = 1004;
  home.toTheSouth = 1005;
  hussieHouse.toTheNorth = 1001;
  gasStation.toTheEast = 1001;
  park.toTheWest = 1006;
  gasStation.toTheNorth = 1006;
  womensShelter.toTheEast = 1002;
  womensShelter.toTheSouth = 1003;
  park.toTheSouth = 1001;
  neighbors.toTheWest = 1001;
  neighbors.dungeonThatsHere = neighborsCellar;
  neighbors.toTheEast = 1007;
  upperDocks.toTheWest = 1003;
  upperDocks.toTheSouth = 1008;
  lowerDocks.toTheNorth = 1007;
  lowerDocks.toTheEast = 1009;
  boat.toTheWest = 1008;
  boat.toTheSouth = 1010;
  river.toTheNorth = 1009;
  river.toTheSouth = 1011;
  riverBank.toTheNorth = 1009;
  riverBank.toTheEast = 1012;
  beach.toTheWest = 1011;
  beach.toTheEast = 1013;
  lighthouse.toTheWest = 1012;
  lighthouse.dungeonThatsHere = lighthouseDung;
  lighthouse2.dungeonThatsHere = lighthouseDung;
  lighthouse2.toTheEast = 1014;
  coralOutcrop.toTheEast = 1026;
  coralOutcrop.toTheWest = 1015;
  rockyOutcrop.toTheEast = 1014;
  rockyOutcrop.dungeonThatsHere = seasideCave;
  JorieForest1.dungeonThatsHere = seasideCave; ///figure out how to enter from exit then backtrack
  JorieForest1.toTheWest = 1017;
  JorieForest2.toTheEast = 1016;
  JorieForest2.toTheWest = 1018;
  JorieCampSite.toTheEast = 1017;
  JorieCampSite.toTheSouth = 1019;
  JorieForest3.toTheNorth = 1018;
  JorieForest3.toTheSouth = 1020;
  forestLot.toTheNorth = 1019;
  forestLot.toTheSouth = 1021;
  stuffleStop.toTheNorth = 1020;
  stuffleStop.toTheEast = 1022;
  casinoGate.toTheWest = 1021;
  casinoGate.toTheEast = 1023;
  casinoGate.toTheSouth = 1024;
  petteyPalace.toTheWest = 1022;
  petteyPalace.toTheEast = 1025;
  petteyPalace2.toTheWest = 1023;
  petteyPalace2.dungeonThatsHere = casinodung;
  showStage.toTheNorth = 1022;
  petteyPalace2.toTheEast = 1027;
  mBGate.toTheWest = 1025;
  mBGate.toTheSouth = 1028;
  mBFountain.toTheNorth = 1027;
  //-------------------------Enemies-----------------
  neighbors.EnemyHere = [burgler];
  park.EnemyHere = [rat];
  hussieHouse.EnemyHere = [Pimp];
  cellarrm2.EnemyHere = [rat];
  cellarrm3.EnemyHere = [couchTroll];
  lhrm3A.EnemyHere = [Wyvern];
  lowerDocks.EnemyHere = [Mobster];
  riverBank.EnemyHere = [merman];
  ssc5E.EnemyHere = [caveGoblin];
  ssc3B.EnemyHere = [caveGoblin];
  forestLot.EnemyHere = [lotLizard];
  showStage.EnemyHere = [joeyJugg];
  cbr5D1.EnemyHere = [mobHenchman];

  //------------------ NPC quest Dialog-------------------------

  womensShelter.NPCHere = Cristie;
  womensShelter.Dialog = cristieConvos;

  cellarrm1.NPCHere = PartyPettey;
  cellarrm1.Dialog = petteyConvo;

  upperDocks.NPCHere = Kenneth;
  upperDocks.Dialog = kennethConvo;

  beach.NPCHere = Warren;
  beach.Dialog = WarrenConvo;

  casinoGate.NPCHere = PartyPettey2;
  casinoGate.Dialog = petteyConvo2;

  petteyPalace2.NPCHere = Corvalis;
  petteyPalace2.Dialog = corConvo;

  cbr2C1.NPCHere = mobInformant;
  cbr2C1.Dialog = infConvo;

  //-----------------regular npc--------------- ----
  gasStation.NPCHere = Sanjay;
  stuffleStop.NPCHere = Ryan;
  boat.NPCHere = steve;
  lhrm4A.NPCHere = wiseGuy;
  forestLot.NPCHere = trucker;
}
