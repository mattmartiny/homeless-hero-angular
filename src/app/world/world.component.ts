import {
  Component,
  ElementRef,
  ViewChild,
  Injectable,
  Directive,
  LOCALE_ID,
  Input,
  OnInit,
  HostListener,
} from '@angular/core';

import { dungeon, dungeonFloor, dungeonRoom, Location } from '../locations';
import { Enemy } from '../enemy';
import { lootItem, item, inventoryItem } from '../item';
import { playerQuest } from '../quest';
import { player, dialogReplies, completeDialog } from '../player';
import { DomSanitizer } from '@angular/platform-browser';
import { NPC } from '../NPC';
import { dataFor } from 'src/app/Data';
import { BehaviorSubject, Observable, throwIfEmpty } from 'rxjs';
import { storeService } from '../store/store.service';
import { storeRef } from '../store/storeRef';
// import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css'],
})
@Injectable()
export class WorldComponent implements OnInit {
  storeService: any;
  isMobileDevice: boolean = false;
  canFight = false;
  constructor(
    public sanitizer: DomSanitizer,
    private previewDialog: storeService,
    private elementRef: ElementRef //private tooltip: MatTooltip
  ) {
    this.battleMessage;
    this.shopMessage;
  }

  popoverText: string = this.elementRef.nativeElement.getAttribute('title');
  currentLocation: any = '';
  ngOnInit(): void {
    this.load();

    this.popoverText = this.elementRef.nativeElement.getAttribute('title');

    this.sendNewData(this.myPlayer.inventory);

    //  this.currentLocation = this.getLocation();

    let locate = localStorage.getItem('cLocation');
    if (locate) {
      const loc = JSON.parse(locate);
      console.log(loc.EnemyHere);
      this.currentLocation = {
        id: loc.id,
        name: loc.name,
        description: loc.description,
        imgPath: loc.imgPath,
        hasEnemy: loc.hasEnemy,
        enemyNumber: loc.enemyNumber,
        EnemyHere: loc.EnemyHere,
        toTheNorth: loc.toTheNorth,
        toTheEast: loc.toTheEast,
        toTheSouth: loc.toTheSouth,
        toTheWest: loc.toTheWest,
        hasEntered: loc.hasEntered,
        NPC: loc.NPC,
        itemRequired: loc.itemRequired,
        itemThatsRequired: loc.itemThatsRequired,
        questAvailableHere: loc.questAvailableHere,
        dungeonHere: loc.dungeonHere,
        dungeonThatsHere: loc.dungeonThatsHere,
        NPCHere: loc.NPCHere || '',
        Dialog: loc.Dialog || '',
        shopHere: loc.shopHere || '',
      };

      this.myOpponent = loc.EnemyHere;
    } else {
      this.currentLocation = dataFor.home;
    }

    this.detectMobileDevice();

    this.enterFullScreenOnTap();
    if (this.currentLocation.EnemyHere !== undefined) {
      this.canFight = true;
    } else {
      this.canFight = false;
    }
  }

  @HostListener('click') onClick() {
    // this.tooltip.message = this.popoverText;
    // this.tooltip.show();
  }

  // getLocation(){
  //   const locate = localStorage.getItem('cLocation');
  //   if(locate != undefined) {
  //    const loc = JSON.parse(locate);
  //    console.log(loc.EnemyHere[0])
  //     if(loc !== null){
  //    const location:Location={
  //       id: loc.id,
  //       name: loc.name,
  //       description: loc.description,
  //       imgPath: loc.imgPath,
  //       hasEnemy: loc.hasEnemy,
  //       enemyNumber: loc.enemyNumber,
  //       EnemyHere: loc.EnemyHere[0],
  //       toTheNorth: loc.toTheNorth,
  //       toTheEast: loc.toTheEast,
  //       toTheSouth: loc.toTheSouth,
  //       toTheWest: loc.toTheWest,
  //       hasEntered: loc.hasEntered,
  //       itemRequired: loc.itemRequired || '',
  //       itemThatsRequired: loc.itemThatsRequired,
  //       questAvailableHere: loc.questAvailableHere,
  //       dungeonHere: loc.dungeonHere || '',
  //       NPC: loc.npc,
  //       dungeonThatsHere: loc.dungeonThatsHere|| '',
  //       NPCHere: loc.NPCHere || '',
  //       Dialog: loc.Dialog || '',
  //       shopHere: loc.shopHere || ''
  //       };
  //       return location;

  //     }
  //     return  dataFor.home;
  //   }

  //   else{
  //   return  dataFor.home;
  //   }
  //   }

  openStore() {
    let dialogRef: storeRef = this.previewDialog.open({}, this.previewDialog);
  }
  casinoOpen = false;

  shopOpen = false;
  Shop() {
    this.shopOpen = !this.shopOpen;
  }
  Gamble() {
    this.casinoOpen = !this.casinoOpen;
  }
  dataOpen = false;
  data() {
    this.dataOpen = !this.dataOpen;
  }

  tooltipShown: boolean = false;
  toggleTooltip() {
    this.tooltipShown = !this.tooltipShown;
  }
  tooltipShown2: boolean = false;

  selectedItem: inventoryItem | null = null;

  toggleTooltip2(inv: inventoryItem) {
    this.selectedItem = this.selectedItem === inv ? null : inv;
  }

  @ViewChild('container')
  container!: ElementRef;
  router: any;
  fakeItem: item = {
    id: 0,
    name: '',
    price: 0,
    equippable: false,
    wearable: false,
    healing: false,
  };
  _currentHP: number = 9; //starts player with 9 hp (hp for level 3)
  _experiencePoints: number = 66; //starts player at level 3
  _level: number = Math.floor(
    0.5 + Math.sqrt(1 + (8 * this._experiencePoints) / 50 / 2)
  );
  dieCount = 0;

  currentDungeon: dungeon = {
    id: 0,
    name: '',
    floors: 0,
    insideDungeon: false,
  };
  opponent = '';
  currentDungeonRoom: dungeonRoom = {
    roomID: '0AA',
    dungeon: this.currentDungeon,
    floor: 0,
    roomNumber: 0,
    enemyNumber: 0,
    hasEnemy: false,
    exit: false,
    stairsUp: false,
    stairsDown: true,
    hasEntered: false,
    itemRequired: false,
  };
  currentDungeonFloor: dungeonFloor = {
    dungeon: this.currentDungeon,
    floor: 0,
    rooms: 0,
  };

  myPlayer: player = {
    currentLocation: this.currentLocation,
    stats: {
      gold: 0,
      currentHp: Math.max(0, this._currentHP),
      MaxHp: Math.round(this._level * 3.15),
      defense: Math.round(this._level * 1.18),
      attack: Math.round(this._level * 1.16),
      speed: Math.round(this._level * 1.17),
      experiencePoints: this._experiencePoints,
      level: this._level,
      deathCount: this.dieCount,
    },
    inventory: [{ details: this.fakeItem, quantity: 0 }],
    questList: [],
  };

  myPlayerStatistics = [
    {
      currentLocation: this.currentLocation,
      gold: this.myPlayer.stats.gold,
      currentHp: this.myPlayer.stats.currentHp,
      maxHp: this.myPlayer.stats.MaxHp,
      defense: this.myPlayer.stats.defense,
      attack: this.myPlayer.stats.attack,
      speed: this.myPlayer.stats.speed,
      experiencePoints: this.myPlayer.stats.experiencePoints,
      level: this.myPlayer.stats.level,
    },
  ];
  _currentXP = this.myPlayer.stats.experiencePoints;

  detectMobileDevice() {
    const userAgent = navigator.userAgent;
    this.isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
  }

  toggleFullScreen() {
    if (this.isMobileDevice && screen.orientation.angle === 90) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
          console.error('Error while entering fullscreen:', error);
        });
      }
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((error) => {
            console.error('Error while exiting fullscreen:', error);
          });
        }
      }
    }
  }

  enterFullScreenOnTap() {
    if (this.isMobileDevice) {
      // Add tap event listener
      document.addEventListener('click', () => {
        this.toggleFullScreen();
      });
    }
  }

  sendNewData(data: inventoryItem[]) {
    this.previewDialog.sendData(data);
  }

  MovePlayer(location: Location) {
    if (location.itemRequired == false || location.hasEntered == true) {
      this.currentLocation = location;

      this.resetEnemy();
      this.ClearChat();

      this.canFight = false;
    } else if (
      location.itemRequired == true &&
      location.itemThatsRequired != undefined
    ) {
      if (location.itemThatsRequired != undefined) {
        var foundItem = this.myPlayer.inventory.find(function (el) {
          return el.details.id == location.itemThatsRequired?.details.id;
        });
      }

      if (foundItem?.details.id == location.itemThatsRequired.details.id) {
        this.currentLocation = location;
        this.resetEnemy();
      } else {
        if (location.itemThatsRequired != undefined) {
          this.battleMessage +=
            `<b style="color:orange;">You must have ` +
            location.itemThatsRequired.details.name +
            ` to enter.</b><br />`;
        } else {
          this.battleMessage += `<b style="color:orange;">You can not enter this location yet</b> <br />`;
        }
      }
    }

    if (this.currentLocation == dataFor.gasStation) {
      this.completelyHeal();
      this.battleMessage += `All Healed Up! <br />`;
    }

    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
    //    localStorage.setItem('cLocation', CircularJSON.stringify(this.currentLocation));
  }

  MovePlayerDungeon(dungR: dungeonRoom) {
    if (dungR.itemRequired == false || dungR.hasEntered == true) {
      this.currentDungeonRoom = dungR;

      this.resetEnemy();
      this.ClearChat();
      this.canFight = false;
    } else if (
      dungR.itemRequired == true &&
      dungR.itemThatsRequired != undefined
    ) {
      if (dungR.itemThatsRequired != undefined) {
        var foundItem = this.myPlayer.inventory.find(function (el) {
          return el.details.id == dungR.itemThatsRequired?.details.id;
        });
      }

      if (foundItem?.details.id == dungR.itemThatsRequired.details.id) {
        this.currentDungeonRoom = dungR;
        this.resetEnemy();
      } else {
        if (dungR.itemThatsRequired != undefined) {
          this.battleMessage +=
            `<b style="color:orange;">You must have ` +
            dungR.itemThatsRequired.details.name +
            ` to enter.</b><br />`;
        } else {
          this.battleMessage += `<b style="color:orange;">You can not enter this location yet</b> <br />`;
        }
      }
    }
    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
  }

  changeLevel(dungR: dungeonRoom) {
    let dungF = dungR.dungeon.dungeonFloors?.find(
      (x) => x.floor == dungR.floor
    );
    console.log(dungF);

    if (dungR.itemRequired == false || dungR.hasEntered == true) {
      this.currentDungeonRoom = dungR;
      this.resetEnemy();
      this.ClearChat();
      this.canFight = false;
    } else if (
      dungR.itemRequired == true &&
      dungR.itemThatsRequired != undefined
    ) {
      if (dungR.itemThatsRequired != undefined) {
        var foundItem = this.myPlayer.inventory.find(function (el) {
          return el.details.id == dungR.itemThatsRequired?.details.id;
        });
      }

      if (foundItem?.details.id == dungR.itemThatsRequired.details.id) {
        this.currentDungeonRoom = dungR;
        this.resetEnemy();
      } else {
        if (dungR.itemThatsRequired != undefined) {
          this.battleMessage +=
            `<b style="color:orange;">You must have ` +
            dungR.itemThatsRequired.details.name +
            ` to enter.</b><br />`;
        } else {
          this.battleMessage += `<b style="color:orange;">You can not enter this location yet</b> <br />`;
        }
      }
    }
  }

  retrieveLocation(location: Location) {
    this.myPlayer.currentLocation = location;
  }

  MoveHome(location: Location) {
    this.myPlayer.currentLocation = dataFor.home;
    this.currentLocation = dataFor.home;
    localStorage.setItem('cLocation', JSON.stringify(this.currentLocation));
  }
  MoveNorth() {
    if (this.currentLocation.toTheNorth != null) {
      var getLocation = dataFor.Locs.filter(
        (loc) => loc.id == this.currentLocation.toTheNorth
      );
      this.MovePlayer(getLocation[0]);
      this.battle();
      this.currentLocation = getLocation[0];
      this.currentLocation.hasEntered = true;
      console.log(this.currentLocation);
      localStorage.setItem('cLocation', JSON.stringify(getLocation[0]));
    }
  }
  MoveWest() {
    if (this.currentLocation.toTheWest != null) {
      var getLocation = dataFor.Locs.filter(
        (loc) => loc.id == this.currentLocation.toTheWest
      );
      this.MovePlayer(getLocation[0]);
      this.battle();
      this.currentLocation = getLocation[0];
      this.currentLocation.hasEntered = true;
      console.log(this.currentLocation);
      localStorage.setItem('cLocation', JSON.stringify(getLocation[0]));
    }
  }
  MoveEast() {
    if (this.currentLocation.toTheEast != null) {
      var getLocation = dataFor.Locs.filter(
        (loc) => loc.id == this.currentLocation.toTheEast
      );
      this.MovePlayer(getLocation[0]);
      this.battle();
      this.currentLocation = getLocation[0];
      this.currentLocation.hasEntered = true;
      console.log(this.currentLocation);
      localStorage.setItem('cLocation', JSON.stringify(getLocation[0]));
    }
  }
  MoveSouth() {
    if (this.currentLocation.toTheSouth != null) {
      var getLocation = dataFor.Locs.filter(
        (loc) => loc.id == this.currentLocation.toTheSouth
      );
      this.MovePlayer(getLocation[0]);
      this.battle();
      this.currentLocation = getLocation[0];
      this.currentLocation.hasEntered = true;
      console.log(this.currentLocation);
      localStorage.setItem('cLocation', JSON.stringify(getLocation[0]));
    }
  }

  MoveNorthDung(dr: dungeonRoom) {
    if (dr != undefined) {
      if (dr.toTheNorth != null) {
        this.MovePlayerDungeon(dr.toTheNorth);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
  }

  MoveWestDung(dr: dungeonRoom) {
    if (dr != undefined) {
      if (dr.toTheWest != null) {
        this.MovePlayerDungeon(dr.toTheWest);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
  }

  MoveEastDung(dr: dungeonRoom) {
    if (dr != undefined) {
      if (dr.toTheEast != null) {
        this.MovePlayerDungeon(dr.toTheEast);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
  }

  MoveSouthDung(dr: dungeonRoom) {
    if (dr != undefined) {
      if (dr.toTheSouth != null) {
        this.MovePlayerDungeon(dr.toTheSouth);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
  }

  enterDungeon(dung: dungeon, cl: Location) {
    this.resetEnemy();
    this.currentDungeon = dung;
    dung.insideDungeon = true;
    this.currentDungeon.insideDungeon = true;
    if (dung.dungeonFloors != undefined) {
      let dr = dung.dungeonFloors.flatMap((d) => d.dungeonRooms).find((o) => o);
      if (dr != undefined) {
        if (dr.exitLocation == cl) {
          this.currentDungeonRoom = dr;
          this.battle;
        } else {
          let ent = dung.dungeonFloors
            .flatMap((x) => x.dungeonRooms)
            .find((x) => x?.exitLocation?.id == cl.id);

          if (ent != undefined) {
            this.currentDungeonRoom = ent;
            this.battle;
          }
        }
      }
    }
  }

  exitDungeon(dr: dungeonRoom) {
    // if(dung.dungeonFloors != undefined) {
    //   let dr =  dung.dungeonFloors.flatMap(d=>d.dungeonRooms).find(o=>o)
    if (dr != undefined) {
      if (dr.exitLocation != undefined) {
        this.currentLocation = dr.exitLocation;
      }
    }
    // }

    this.currentDungeon = { id: 0, name: '', floors: 0, insideDungeon: false };
    this.currentDungeonRoom = {
      roomID: '0AA',
      dungeon: this.currentDungeon,
      floor: 0,
      roomNumber: 0,
      enemyNumber: 0,
      hasEnemy: false,
      exit: false,
      stairsUp: false,
      stairsDown: false,
      hasEntered: false,
      itemRequired: false,
    };

    this.battle();

    //exit f
  }

  stairsUp(dr: dungeonRoom) {
    // if(dung.dungeonFloors != undefined) {
    // let  =  dung.dungeonFloors.flatMap(d=>d.dungeonRooms).find(o=>o)
    if (dr != undefined) {
      if (dr.toStairsUp != null) {
        this.changeLevel(dr.toStairsUp);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
    // }
  }
  stairsDown(dr: dungeonRoom) {
    if (dr != undefined) {
      if (dr.toStairsDown != null) {
        this.changeLevel(dr.toStairsDown);
        this.battle();
        this.currentDungeonRoom.hasEntered = true;
      }
    }
  }

  Talk(npc: NPC | undefined) {
    if (npc != undefined) {
      this.npcName = npc.name;
      this.NPCDialog = npc.initialMessage;

      let pq = this.myPlayer.questList.find(
        (o) => o.details.id == npc.questGiven?.details.id
      );
      if (this.currentLocation.Dialog != undefined) {
        if (
          npc.questGiven?.isComplete == true &&
          npc.afterMessage != undefined
        ) {
          this.NPCDialog = npc.afterMessage;
        } else if (
          npc.questGiven != undefined &&
          npc.optionPerson == true &&
          (pq?.hasQuest == false || pq?.hasQuest == undefined)
        ) {
          let playerResp = this.currentLocation.Dialog.find(
            (o: any) => o.dialog.NPCDetails.id == npc.id
          );
          if (playerResp != undefined) {
            this.playerOption1 = playerResp.dialog.playerResponse1;
            this.EndChatMessage = playerResp.dialog.playerEndChatResponse;
          }
        } else if (
          npc.questGiven?.isComplete == false &&
          pq?.isComplete == false &&
          pq?.hasQuest == true &&
          !this.PlayerHasAllQuestItems(pq)
        ) {
          this.NPCDialog = 'Go complete the quest I gave you please!';
        }
      }

      if (this.currentDungeonRoom.Dialog != undefined) {
        if (
          npc.questGiven?.isComplete == true &&
          npc.afterMessage != undefined
        ) {
          this.NPCDialog = npc.afterMessage;
        } else if (
          npc.questGiven != undefined &&
          npc.optionPerson == true &&
          (pq?.hasQuest == false || pq?.hasQuest == undefined)
        ) {
          let playerResp = this.currentDungeonRoom.Dialog.find(
            (o) => o.dialog.NPCDetails == npc
          );
          if (playerResp != undefined) {
            this.playerOption1 = playerResp.dialog.playerResponse1;
            this.EndChatMessage = playerResp.dialog.playerEndChatResponse;
          }
        } else if (
          npc.questGiven?.isComplete != undefined &&
          pq?.isComplete == false &&
          pq?.hasQuest == true &&
          !this.PlayerHasAllQuestItems(pq)
        ) {
          this.NPCDialog = 'Go complete the quest I gave you please!';
        }
      }

      if (npc != undefined && npc.questGiven != undefined && pq != undefined) {
        if (this.myPlayer.questList.some((i) => i.hasQuest == true)) {
          this.PlayerHasAllQuestItems(pq);
        }
        if (this.playerHasCompletedNPCQuest(pq)) {
          if (npc.afterMessage != undefined) {
            this.NPCDialog = npc.afterMessage;
          } else {
            this.NPCDialog = '....';
          }
        }
      }
    }
    localStorage.setItem(
      'myPlayerQuest',
      JSON.stringify(this.myPlayer.questList)
    );
  }

  accept(npc: NPC) {
    if (npc.questGiven != undefined) {
      this.addQuest(npc);
    }
    if (npc.Dialog1 != undefined) {
      this.NPCDialog = npc.Dialog1;
      this.playerOption1 = '';
      this.EndChatMessage = '';
    }
  }
  decline(npc: NPC) {
    this.NPCDialog = npc.endChatMessage;
    this.playerOption1 = '';
    this.EndChatMessage = '';
  }

  ClearChat() {
    this.playerOption1 = '';
    this.EndChatMessage = '';
    this.npcName = '';
    this.NPCDialog = '';
  }

  playerHasCompletedNPCQuest(pq: playerQuest): Boolean {
    if (pq.isComplete) {
      localStorage.setItem(
        'myPlayerQuest',
        JSON.stringify(this.myPlayer.questList)
      );

      return true;
    } else {
      localStorage.setItem(
        'myPlayerQuest',
        JSON.stringify(this.myPlayer.questList)
      );

      return false;
    }
  }

  playerOption1: any;
  EndChatMessage: any;
  npcName = '';
  NPCDialog = '';
  battleMessage = `You wake up in a strange alley-way, unsure of anything.  You don't remember your name, your occupation, or anyone around you. You have no idea where you live, and for all you know, you are homeless. Everything seems new.... and scary. <br /><br /> `;
  shopMessage = ``;
  completelyHeal() {
    this.myPlayer.stats.currentHp = this.myPlayer.stats.MaxHp;
  }
  LevelUp() {
    this.completelyHeal();
    this.battleMessage +=
      `<b>You have leveled up to level ` +
      this.myPlayer.stats.level +
      `!</b><br />`;
  }

  IsDead() {
    this.battleMessage += `<b style="color:#8b0000;">Oh dear, you have died! </b><br /><br />`;
    this.myPlayer.stats.deathCount++;
    this.currentDungeon = { id: 0, name: '', floors: 0, insideDungeon: false };
    this.currentDungeonRoom = {
      roomID: '0AA',
      dungeon: this.currentDungeon,
      floor: 0,
      roomNumber: 0,
      enemyNumber: 0,
      hasEnemy: false,
      exit: false,
      stairsUp: false,
      stairsDown: true,
      hasEntered: false,
      itemRequired: false,
    };

    this.MoveHome(this.currentLocation);
    this.completelyHeal();
    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }

  updateStats(expPoints: number, oldExp: number) {
    let oldLevel = Math.floor(0.5 + Math.sqrt(1 + (8 * oldExp) / 50 / 2));
    this.myPlayer.stats.experiencePoints = expPoints;
    this.myPlayer.stats.level = Math.floor(
      0.5 + Math.sqrt(1 + (8 * expPoints) / 50 / 2)
    );
    this.myPlayer.stats.MaxHp = Math.round(this.myPlayer.stats.level * 3.15);

    if (this.myPlayer.wearable == undefined) {
      this.myPlayer.wearable = {
        itemName: 'N/A',
        attackBonus: 0,
        defenseBonus: 0,
        speedBonus: 0,
        equipped: false,
      };
    }
    if (this.myPlayer.weapon == undefined) {
      this.myPlayer.weapon = {
        itemName: 'N/A',
        attackBonus: 0,
        defenseBonus: 0,
        speedBonus: 0,
        equipped: false,
      };
    }

    this.myPlayer.stats.attack =
      Math.round(this.myPlayer.stats.level * 1.16) +
      this.myPlayer.wearable?.attackBonus +
      this.myPlayer.weapon?.attackBonus;
    this.myPlayer.stats.defense =
      Math.round(this.myPlayer.stats.level * 1.18) +
      this.myPlayer.wearable?.defenseBonus +
      this.myPlayer.weapon?.defenseBonus;
    this.myPlayer.stats.speed =
      Math.round(this.myPlayer.stats.level * 1.17) +
      this.myPlayer.wearable?.speedBonus +
      this.myPlayer.wearable?.speedBonus;

    if (this.myPlayer.stats.level != oldLevel) this.LevelUp();

    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
  }

  resetEnemy() {
    this.myOpponent = {
      id: 0,
      name: '',
      description: '',
      imgPath: '',
      currentHp: 0,
      maxHp: 0,
      defense: 0,
      attack: 0,
      speed: 0,
      level: 0,
      rewardGold: 0,
      rewardXP: 0,
    };

    this.myfluctuatingOpponent = {
      id: 0,
      name: '',
      description: '',
      imgPath: '',
      currentHp: 0,
      maxHp: 0,
      defense: 0,
      attack: 0,
      speed: 0,
      level: 0,
      rewardGold: 0,
      rewardXP: 0,
      lootTable: [{ details: this.fakeItem, chance: 100, isDefaultItem: true }],
    };
  }

  myOpponent: Enemy = {
    id: 0,
    name: '',
    description: '',
    imgPath: '',
    currentHp: 0,
    maxHp: 0,
    defense: 0,
    attack: 0,
    speed: 0,
    level: 0,
    rewardGold: 0,
    rewardXP: 0,
    lootTable: [{ details: this.fakeItem, chance: 100, isDefaultItem: true }],
  };

  myfluctuatingOpponent: Enemy = {
    id: 0,
    name: '',
    description: '',
    imgPath: '',
    fluctuating: true,
    currentHp: 0,
    maxHp: 0,
    defense: 0,
    attack: 0,
    speed: 0,
    level: 0,
    rewardGold: 0,
    rewardXP: 0,
    lootTable: [{ details: this.fakeItem, chance: 100, isDefaultItem: true }],
  };

  randomDamage(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  battle() {
    //sets up the battle

    if (
      this.currentLocation.EnemyHere != undefined &&
      this.currentDungeon.insideDungeon == false
    ) {
      this.canFight = true;

      for (let i = 0; i < this.currentLocation.EnemyHere.length; i++) {
        let e = this.currentLocation.EnemyHere[0];

        if (e.fluctuating === true) {
          this.myfluctuatingOpponent.name = e.name;
          this.myfluctuatingOpponent.description = e.description;
          this.myfluctuatingOpponent.currentHp =
            this.myPlayer.stats.MaxHp + e.currentHp;
          this.myfluctuatingOpponent.maxHp =
            this.myPlayer.stats.MaxHp + e.maxHp;
          this.myfluctuatingOpponent.attack =
            Math.round(this.myPlayer.stats.level * 1.16) + e.attack;
          this.myfluctuatingOpponent.defense =
            Math.round(this.myPlayer.stats.level * 1.18) + e.defense;
          this.myfluctuatingOpponent.speed =
            Math.round(this.myPlayer.stats.level * 1.17) + e.speed;
          this.myfluctuatingOpponent.level =
            this.myPlayer.stats.level + e.level;
          this.myfluctuatingOpponent.imgPath = e.imgPath;
          this.myfluctuatingOpponent.rewardXP = e.rewardXP;
          this.myfluctuatingOpponent.rewardGold = e.rewardGold;
          this.myfluctuatingOpponent.id = e.id;
          this.myfluctuatingOpponent.lootTable = e.lootTable;

          this.battleMessage +=
            this.myfluctuatingOpponent.name + ` appeared. <br />`;

          console.log(this.myfluctuatingOpponent);

          if (this.myfluctuatingOpponent.speed > this.myPlayer.stats.speed) {
            this.EnemyMove();
          }
        } else {
          this.myOpponent = this.currentLocation.EnemyHere[0];

          this.myOpponent.currentHp = this.myOpponent.maxHp;
          this.battleMessage +=
            this.currentLocation.EnemyHere[0].name + ` appeared. <br />`;

          if (e.speed > this.myPlayer.stats.speed) {
            this.EnemyMove();
          }
        }
      }
    } else if (
      this.currentDungeonRoom.EnemyHere != undefined &&
      this.currentDungeon.insideDungeon == true
    ) {
      for (let i = 0; i < this.currentDungeonRoom.EnemyHere.length; i++) {
        this.canFight = true;
        let e = this.currentDungeonRoom.EnemyHere[0];

        if (e.fluctuating === true) {
          this.myfluctuatingOpponent.name = e.name;
          this.myfluctuatingOpponent.description = e.description;
          this.myfluctuatingOpponent.currentHp =
            this.myPlayer.stats.MaxHp + e.currentHp;
          this.myfluctuatingOpponent.maxHp =
            this.myPlayer.stats.MaxHp + e.maxHp;
          this.myfluctuatingOpponent.attack =
            Math.round(this.myPlayer.stats.level * 1.16) + e.attack;
          this.myfluctuatingOpponent.defense =
            Math.round(this.myPlayer.stats.level * 1.18) + e.defense;
          this.myfluctuatingOpponent.speed =
            Math.round(this.myPlayer.stats.level * 1.17) + e.speed;
          this.myfluctuatingOpponent.level =
            this.myPlayer.stats.level + e.level;
          this.myfluctuatingOpponent.rewardXP = e.rewardXP;
          this.myfluctuatingOpponent.imgPath = e.imgPath;
          this.myfluctuatingOpponent.rewardGold = e.rewardGold;
          this.myfluctuatingOpponent.id = e.id;
          this.myfluctuatingOpponent.lootTable = e.lootTable;

          this.battleMessage +=
            this.myfluctuatingOpponent.name + ` appeared. <br />`;

          console.log(this.myfluctuatingOpponent);

          if (this.myfluctuatingOpponent.speed > this.myPlayer.stats.speed) {
            this.EnemyMove();
          }
        } else {
          this.myOpponent = this.currentLocation.EnemyHere[0];
          this.myOpponent.currentHp = this.myOpponent.maxHp;
          this.battleMessage +=
            this.currentLocation.EnemyHere[0].name + ` appeared. <br />`;

          if (e.speed > this.myPlayer.stats.speed) {
            this.EnemyMove();
          }
        }
      }
    } else {
    }
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }

  fight() {
    if (
      this.currentLocation.EnemyHere != undefined &&
      this.currentDungeon.insideDungeon == false
    ) {
      if (this.myfluctuatingOpponent.name !== '') {
        let myDamage = this.randomDamage(
          this.myPlayer.stats.attack - 3,
          this.myPlayer.stats.attack + 1
        );
        let opponentFlucDefenseCalc = this.randomDamage(
          Math.max(0, this.myfluctuatingOpponent.defense - 5),
          this.myfluctuatingOpponent.defense
        );
        let flucdamageHit = Math.max(
          0,
          Math.floor(myDamage - opponentFlucDefenseCalc)
        );
        this.myfluctuatingOpponent.currentHp -= flucdamageHit;
        this.myfluctuatingOpponent.currentHp = Math.max(
          0,
          this.myfluctuatingOpponent.currentHp
        );
        let damageHit = Math.max(
          0,
          Math.floor(myDamage - opponentFlucDefenseCalc)
        );
        this.battleMessage +=
          `<span style="color:green;">You have done ` +
          damageHit +
          ` points of damage to ` +
          this.myfluctuatingOpponent.name +
          `. </span><br />`;
        if (this.myfluctuatingOpponent.currentHp != 0) {
          this.EnemyMove();
        }
        if (
          this.myfluctuatingOpponent.currentHp <= 0 &&
          this.myPlayer.stats.currentHp > 0 &&
          this.myfluctuatingOpponent.name != ''
        ) {
          this.battleMessage +=
            `<span style="color:aqua">You have defeated ` +
            this.myfluctuatingOpponent.name +
            `.  You have recieved ` +
            this.myfluctuatingOpponent.rewardXP +
            ` experience points and ` +
            this.myfluctuatingOpponent.rewardGold +
            ` gold.</span><br />`;
          let oldExp = this.myPlayer.stats.experiencePoints;
          this.myPlayer.stats.experiencePoints +=
            this.myfluctuatingOpponent.rewardXP;
          this.myPlayer.stats.gold += this.myfluctuatingOpponent.rewardGold;
          this.updateStats(this.myPlayer.stats.experiencePoints, oldExp);
          this.myPlayer.stats.level = Math.floor(
            0.5 +
              Math.sqrt(1 + (8 * this.myPlayer.stats.experiencePoints) / 50 / 2)
          );
          this.currentLocation.enemyNumber =
            this.currentLocation.enemyNumber - 1;
          this.monsterDrop();

          this.battle();

          // this.battle();
        }
      } else {
        let myDamage = this.randomDamage(
          this.myPlayer.stats.attack - 3,
          this.myPlayer.stats.attack + 1
        );
        let opponentDefenseCalc = this.randomDamage(
          Math.max(0, this.currentLocation.EnemyHere[0].defense - 5),
          this.currentLocation.EnemyHere[0].defense
        );
        let damageHit = Math.max(0, Math.floor(myDamage - opponentDefenseCalc));
        this.currentLocation.EnemyHere[0].currentHp -= damageHit;
        this.currentLocation.EnemyHere[0].currentHp = Math.max(
          0,
          this.currentLocation.EnemyHere[0].currentHp
        );
        this.battleMessage +=
          `<span style="color:green;">You have done ` +
          damageHit +
          ` points of damage to ` +
          this.currentLocation.EnemyHere[0].name +
          `. </span><br />`;
        if (this.currentLocation.EnemyHere[0].currentHp != 0) {
          this.EnemyMove();
        }
        if (
          this.currentLocation.EnemyHere[0].currentHp <= 0 &&
          this.myPlayer.stats.currentHp > 0 &&
          this.currentLocation.EnemyHere[0].name != ''
        ) {
          this.battleMessage +=
            `<span style="color:aqua">You have defeated ` +
            this.currentLocation.EnemyHere[0].name +
            `.  You have recieved ` +
            this.currentLocation.EnemyHere[0].rewardXP +
            ` experience points and ` +
            this.currentLocation.EnemyHere[0].rewardGold +
            ` gold.</span><br />`;
          let oldExp = this.myPlayer.stats.experiencePoints;
          this.myPlayer.stats.experiencePoints +=
            this.currentLocation.EnemyHere[0].rewardXP;
          this.myPlayer.stats.gold +=
            this.currentLocation.EnemyHere[0].rewardGold;
          this.updateStats(this.myPlayer.stats.experiencePoints, oldExp);
          this.myPlayer.stats.level = Math.floor(
            0.5 +
              Math.sqrt(1 + (8 * this.myPlayer.stats.experiencePoints) / 50 / 2)
          );
          this.monsterDrop();
          this.battle();
        } else {
          this.resetEnemy;
        }
      }
    } else if (this.currentDungeonRoom.EnemyHere != undefined) {
      if (this.myfluctuatingOpponent.name !== '') {
        let myDamage = this.randomDamage(
          this.myPlayer.stats.attack - 3,
          this.myPlayer.stats.attack + 1
        );
        let opponentFlucDefenseCalc = this.randomDamage(
          Math.max(0, this.myfluctuatingOpponent.defense - 5),
          this.myfluctuatingOpponent.defense
        );
        let flucdamageHit = Math.max(
          0,
          Math.floor(myDamage - opponentFlucDefenseCalc)
        );
        this.myfluctuatingOpponent.currentHp -= flucdamageHit;
        this.myfluctuatingOpponent.currentHp = Math.max(
          0,
          this.myfluctuatingOpponent.currentHp
        );
        let damageHit = Math.max(
          0,
          Math.floor(myDamage - opponentFlucDefenseCalc)
        );
        this.battleMessage +=
          `<span style="color:green;">You have done ` +
          damageHit +
          ` points of damage to ` +
          this.myfluctuatingOpponent.name +
          `. </span><br />`;
        if (this.myfluctuatingOpponent.currentHp != 0) {
          this.EnemyMove();
        }
        if (
          this.myfluctuatingOpponent.currentHp <= 0 &&
          this.myPlayer.stats.currentHp > 0 &&
          this.myfluctuatingOpponent.name != ''
        ) {
          this.battleMessage +=
            `<span style="color:aqua">You have defeated ` +
            this.myfluctuatingOpponent.name +
            `.  You have recieved ` +
            this.myfluctuatingOpponent.rewardXP +
            ` experience points and ` +
            this.myfluctuatingOpponent.rewardGold +
            ` gold.</span><br />`;
          let oldExp = this.myPlayer.stats.experiencePoints;
          this.myPlayer.stats.experiencePoints +=
            this.myfluctuatingOpponent.rewardXP;
          this.myPlayer.stats.gold += this.myfluctuatingOpponent.rewardGold;
          this.updateStats(this.myPlayer.stats.experiencePoints, oldExp);
          this.myPlayer.stats.level = Math.floor(
            0.5 +
              Math.sqrt(1 + (8 * this.myPlayer.stats.experiencePoints) / 50 / 2)
          );
          this.monsterDrop();
          this.battle();
        }
      } else {
        let myDamage = this.randomDamage(
          this.myPlayer.stats.attack - 3,
          this.myPlayer.stats.attack + 1
        );
        let opponentDefenseCalc = this.randomDamage(
          Math.max(0, this.currentLocation.EnemyHere[0].defense - 5),
          this.currentLocation.EnemyHere[0].defense
        );
        let damageHit = Math.max(0, Math.floor(myDamage - opponentDefenseCalc));
        this.currentLocation.EnemyHere[0].currentHp -= damageHit;
        this.currentLocation.EnemyHere[0].currentHp = Math.max(
          0,
          this.currentLocation.EnemyHere[0].currentHp
        );
        this.battleMessage +=
          `<span style="color:green;">You have done ` +
          damageHit +
          ` points of damage to ` +
          this.currentLocation.EnemyHere[0].name +
          `. </span><br />`;
      }
      if (this.currentLocation.EnemyHere[0].currentHp != 0) {
        this.EnemyMove();
      }
      if (
        this.currentLocation.EnemyHere[0].currentHp <= 0 &&
        this.myPlayer.stats.currentHp > 0 &&
        this.currentLocation.EnemyHere[0].name != ''
      ) {
        this.battleMessage +=
          `<span style="color:aqua">You have defeated ` +
          this.currentLocation.EnemyHere[0].name +
          `.  You have recieved ` +
          this.currentLocation.EnemyHere[0].rewardXP +
          ` experience points and ` +
          this.currentLocation.EnemyHere[0].rewardGold +
          ` gold.</span><br />`;

        let oldExp = this.myPlayer.stats.experiencePoints;
        this.myPlayer.stats.experiencePoints +=
          this.currentLocation.EnemyHere[0].rewardXP;
        this.myPlayer.stats.gold +=
          this.currentLocation.EnemyHere[0].rewardGold;
        this.updateStats(this.myPlayer.stats.experiencePoints, oldExp);
        this.myPlayer.stats.level = Math.floor(
          0.5 +
            Math.sqrt(1 + (8 * this.myPlayer.stats.experiencePoints) / 50 / 2)
        );
        this.monsterDrop();
        this.battle();
      }
    } else {
      this.resetEnemy();
    }

    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }

  EnemyMove() {
    if (this.myfluctuatingOpponent.name !== '') {
      let oppDamage = this.randomDamage(
        this.myfluctuatingOpponent.attack - 3,
        this.myfluctuatingOpponent.attack + 1
      );
      let myDefenseCalc = this.randomDamage(
        Math.max(0, this.myPlayer.stats.defense - 5),
        this.myPlayer.stats.defense
      );
      let damageHit = Math.max(0, Math.floor(oppDamage - myDefenseCalc));
      this.myPlayer.stats.currentHp -= damageHit;
      this.battleMessage +=
        `<span style="color:red"> ` +
        this.myfluctuatingOpponent.name +
        ` did ` +
        damageHit +
        ` damage to you...</span></br>`;
    } else {
      let oppDamage = this.randomDamage(
        this.currentLocation.EnemyHere[0].attack - 3,
        this.currentLocation.EnemyHere[0].attack + 1
      );
      let myDefenseCalc = this.randomDamage(
        Math.max(0, this.myPlayer.stats.defense - 5),
        this.myPlayer.stats.defense
      );
      let damageHit = Math.max(0, Math.floor(oppDamage - myDefenseCalc));
      this.myPlayer.stats.currentHp -= damageHit;
      this.battleMessage +=
        `<span style="color:red"> ` +
        this.currentLocation.EnemyHere[0].name +
        ` did ` +
        damageHit +
        ` damage to you...</span></br>`;
    }
    if (this.myPlayer.stats.currentHp <= 0) {
      this.IsDead();
    }
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }
  heal(healItem: inventoryItem) {
    console.log(healItem);
    if (healItem.details.healingStats?.amountHealed != undefined) {
      this.myPlayer.stats.currentHp = Math.min(
        this.myPlayer.stats.MaxHp,
        this.myPlayer.stats.currentHp +
          healItem.details.healingStats?.amountHealed
      );
      this.myPlayer.inventory.forEach((e) => {
        if (e.details.id == healItem.details.id) {
          e.quantity = e.quantity - 1;
          if (e.quantity < 1) {
            this.myPlayer.inventory.slice(
              this.myPlayer.inventory.findIndex((f) => f === e),
              1
            );
          }
        }
      });
    }
    this.battleMessage +=
      `You used ` +
      healItem.details.name +
      ` and healed ` +
      healItem.details.healingStats?.amountHealed +
      ' points of damage. <br />';

    if (
      this.currentLocation.EnemyHere[0].name != '' ||
      this.myfluctuatingOpponent.name != ''
    ) {
      this.EnemyMove();
    }
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
    localStorage.setItem(
      'myPlayerInventory',
      JSON.stringify(this.myPlayer.inventory)
    );
  }

  Equip(equipItem: inventoryItem) {
    if (equipItem.details.equippableStats != undefined) {
      if (this.myPlayer.weapon?.equipped == false) {
        this.myPlayer.weapon.itemName = equipItem.details.name;
        this.myPlayer.weapon = equipItem.details.equippableStats;
        this.myPlayer.stats.attack =
          this.myPlayer.stats.attack + this.myPlayer.weapon.attackBonus;
        this.myPlayer.stats.defense =
          this.myPlayer.stats.defense + this.myPlayer.weapon.defenseBonus;
        this.myPlayer.stats.speed =
          this.myPlayer.stats.defense + this.myPlayer.weapon.speedBonus;
        this.myPlayer.weapon.equipped = true;
        if ((this.myPlayer.weapon.equipped = true)) {
          this.myPlayer.weapon.itemName = equipItem.details.name;
          equipItem.details.equippableStats.equipped = true;
        }
        console.log(this.myPlayer);
        this.battleMessage +=
          `you have equipped ` + equipItem.details.name + `. <br />`;
      } else {
        this.unequip(equipItem);
      }
    }
    localStorage.setItem('equipped', JSON.stringify(this.myPlayer.weapon));
    localStorage.setItem(
      'myPlayerInventory',
      JSON.stringify(this.myPlayer.inventory)
    );
  }

  unequip(equipItem: inventoryItem) {
    if (equipItem.details.equippableStats != undefined) {
      this.myPlayer.weapon = equipItem.details.equippableStats;
      this.myPlayer.stats.attack =
        this.myPlayer.stats.attack - this.myPlayer.weapon.attackBonus;
      this.myPlayer.stats.defense =
        this.myPlayer.stats.defense - this.myPlayer.weapon.defenseBonus;
      this.myPlayer.stats.speed =
        this.myPlayer.stats.defense - this.myPlayer.weapon.speedBonus;
      this.myPlayer.weapon.equipped = false;
      this.myPlayer.weapon.itemName = 'N/A';
      if ((this.myPlayer.weapon.equipped = false)) {
        equipItem.details.equippableStats.equipped = false;
        this.myPlayer.weapon.itemName = 'N/A';
      }
    }
    this.battleMessage +=
      `you have unequipped ` + equipItem.details.name + `. <br />`;

    localStorage.setItem('equipped', JSON.stringify(this.myPlayer.weapon));
    localStorage.setItem(
      'myPlayerInventory',
      JSON.stringify(this.myPlayer.inventory)
    );
  }
  Wear(wearItem: inventoryItem) {
    if (wearItem.details.wearableStats != undefined) {
      if (this.myPlayer.wearable?.equipped == false) {
        this.myPlayer.wearable = wearItem.details.wearableStats;

        if (this.myPlayer.wearable != undefined) {
          this.myPlayer.wearable.itemName = wearItem.details.name;
          this.myPlayer.stats.attack =
            this.myPlayer.stats.attack + this.myPlayer.wearable.attackBonus;
          this.myPlayer.stats.defense =
            this.myPlayer.stats.defense + this.myPlayer.wearable.defenseBonus;
          this.myPlayer.stats.speed =
            this.myPlayer.stats.speed + this.myPlayer.wearable.speedBonus;
          this.myPlayer.wearable.equipped = true;
          if ((this.myPlayer.wearable.equipped = true)) {
            wearItem.details.wearableStats.equipped = true;
            this.myPlayer.wearable.itemName = wearItem.details.name;
          }

          this.battleMessage +=
            `you have equipped ` + wearItem.details.name + `. <br />`;
        } else {
          this.removeItem(wearItem);
        }
      }
    }
    localStorage.setItem('worn', JSON.stringify(this.myPlayer.wearable));
    localStorage.setItem(
      'myPlayerInventory',
      JSON.stringify(this.myPlayer.inventory)
    );
  }
  removeItem(wearItem: inventoryItem) {
    if (wearItem.details.wearableStats != undefined) {
      this.myPlayer.wearable = wearItem.details.wearableStats;
      this.myPlayer.stats.attack =
        this.myPlayer.stats.attack - this.myPlayer.wearable.attackBonus;
      this.myPlayer.stats.defense =
        this.myPlayer.stats.defense - this.myPlayer.wearable.defenseBonus;
      this.myPlayer.stats.speed =
        this.myPlayer.stats.speed - this.myPlayer.wearable.speedBonus;
      this.myPlayer.wearable.itemName = 'N/A';
      this.myPlayer.wearable.equipped = false;
      if ((this.myPlayer.wearable.equipped = false)) {
        wearItem.details.wearableStats.equipped = false;
        this.myPlayer.wearable.itemName = 'N/A';
      }
      this.battleMessage +=
        `you have removed ` + wearItem.details.name + `. <br />`;
      localStorage.setItem('worn', JSON.stringify(this.myPlayer.wearable));
      localStorage.setItem(
        'myPlayerInventory',
        JSON.stringify(this.myPlayer.inventory)
      );
    }
  }
  scrollToBottom() {
    this.container.nativeElement.scrollTop =
      this.container.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  monsterDrop() {
    if (this.myOpponent.lootTable !== undefined) {
      let randomNumber = Math.floor(Math.random() * 1000);
      let picked: lootItem = {
        details: this.fakeItem,
        chance: 1000,
        isDefaultItem: true,
      };
      for (
        let i = 0;
        i < this.currentLocation.EnemyHere[0].lootTable.length;
        i++
      ) {
        const loot = this.currentLocation.EnemyHere[0].lootTable[i];
        const { chance } = loot;
        if (randomNumber <= chance) {
          picked = loot;
          break;
        }

        randomNumber -= chance;
      }
      if (picked != null) {
        let pickedItem: inventoryItem = {
          details: picked.details,
          quantity: 1,
        };
        const invItem = this.myPlayer.inventory.find((p) => {
          return picked.details.id == p.details.id;
        });
        if (pickedItem.details.name != '') {
          if (invItem) {
            invItem.quantity++;
          } else {
            this.myPlayer.inventory.push(pickedItem);
          }
          localStorage.setItem(
            'myPlayerInventory',
            JSON.stringify(this.myPlayer.inventory)
          );

          this.battleMessage +=
            this.currentLocation.EnemyHere[0].name +
            ` dropped ` +
            pickedItem.quantity +
            ` ` +
            pickedItem.details.name +
            `. <br /><br /> `;
        } else {
          this.battleMessage += `<br />`;
        }
      }
    } else if (this.myfluctuatingOpponent.lootTable != undefined) {
      let randomNumber = Math.floor(Math.random() * 1000);
      let picked: lootItem = {
        details: this.fakeItem,
        chance: 1000,
        isDefaultItem: true,
      };
      for (let i = 0; i < this.myfluctuatingOpponent.lootTable.length; i++) {
        const loot = this.myfluctuatingOpponent.lootTable[i];
        const { chance } = loot;
        if (randomNumber <= chance) {
          picked = loot;
          break;
        }

        randomNumber -= chance;
      }
      if (picked != null) {
        let pickedItem: inventoryItem = {
          details: picked.details,
          quantity: 1,
        };
        const invItem = this.myPlayer.inventory.find((p) => {
          return picked.details.id == p.details.id;
        });
        if (pickedItem.details.name != '') {
          if (invItem) {
            invItem.quantity++;
          } else {
            this.myPlayer.inventory.push(pickedItem);
          }
          localStorage.setItem(
            'myPlayerInventory',
            JSON.stringify(this.myPlayer.inventory)
          );

          this.battleMessage +=
            this.myfluctuatingOpponent.name +
            ` dropped ` +
            pickedItem.quantity +
            ` ` +
            pickedItem.details.name +
            `. <br /><br /> `;
        } else {
          this.battleMessage += `<br />`;
        }
      }
    }

    console.log(this.myPlayer.inventory);
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }

  addQuest(npc: NPC) {
    if (npc.questGiven != undefined) {
      let quest: playerQuest;
      let pq = this.myPlayer.questList.find(
        (o) => o.details.id == npc.questGiven?.details.id
      );

      if (pq != undefined) {
        quest = {
          details: npc.questGiven.details,
          isComplete: npc.questGiven.isComplete,
          hasQuest: npc.questGiven.hasQuest,
        };
      } else {
        quest = {
          details: npc.questGiven.details,
          isComplete: false,
          hasQuest: false,
        };
      }
      if (
        this.myPlayer.questList.some((i) => i.hasQuest == false) ||
        this.myPlayer.questList.length == 0 ||
        quest.hasQuest == false
      ) {
        this.playerHasQuest(npc, quest);

        this.myPlayer.questList.push(quest);
        this.battleMessage +=
          `<span style='color: blue'>You have aquired the quest <i><b>` +
          npc.questGiven.details.name +
          `</b></i>.<br /> ` +
          npc.questGiven.details.description +
          `</span><br /><br />`;
      }
    }
    localStorage.setItem(
      'myPlayerQuest',
      JSON.stringify(this.myPlayer.questList)
    );
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }
  questComplete(pq: playerQuest) {
    //Try not to make the quest items equippable 0_0

    this.battleMessage +=
      `<span style="color:grey;"><b>You have completed ` +
      pq.details.name +
      `!!!</b></span><br />You have been awarded the following:<br />`;
    if (pq.details.rewardItem != undefined) {
      this.battleMessage += pq.details.rewardItem.details.name + `<br />`;
    }
    if (pq.details.rewardGold != undefined) {
      this.battleMessage += pq.details.rewardGold + ` gold <br />`;
    }
    if (pq.details.rewardXP != undefined) {
      this.battleMessage += pq.details.rewardXP + ` Exp. Points<br />`;
    }

    let oldExp = this.myPlayer.stats.experiencePoints;
    if (pq.details.rewardGold != undefined) {
      this.myPlayer.stats.gold += pq.details.rewardGold;
    }
    if (pq.details.rewardXP != undefined) {
      this.myPlayer.stats.experiencePoints += pq.details.rewardXP;
      this.updateStats(this.myPlayer.stats.experiencePoints, oldExp);
    }
    if (pq.details.rewardItem != undefined) {
      this.myPlayer.inventory.push(pq.details.rewardItem);
    }
    this.myPlayer.questList.forEach((l) => {
      if (l.details.id == pq.details.id) {
        l.isComplete = true;
        pq.isComplete = true;
        l.hasQuest = true;
        pq.hasQuest = true;
      }
    });
    localStorage.setItem(
      'myPlayerQuest',
      JSON.stringify(this.myPlayer.questList)
    );
    localStorage.setItem(
      'myPlayerInventory',
      JSON.stringify(this.myPlayer.inventory)
    );
    localStorage.setItem('bmessage', JSON.stringify(this.battleMessage));
  }
  playerHasQuest(npc: NPC, pq: playerQuest) {
    if (npc.questGiven != undefined) {
      npc.questGiven.hasQuest = true;
      pq.hasQuest = true;
      localStorage.setItem(
        'myPlayerQuest',
        JSON.stringify(this.myPlayer.questList)
      );
    }
  }

  PlayerHasAllQuestItems(qu: playerQuest) {
    qu.details.questCompletionItem.forEach((e) => {
      if (
        this.myPlayer.inventory.some(
          (i) =>
            i.details.id == e.details.details.id &&
            i.quantity >= e.quantity &&
            qu.isComplete != true
        )
      ) {
        for (let i = 0; i < this.myPlayer.inventory.length; i++) {
          if (this.myPlayer.inventory[i].details.id == e.details.details.id) {
            if (this.myPlayer.inventory[i].quantity > e.quantity) {
              this.myPlayer.inventory[i].quantity =
                this.myPlayer.inventory[i].quantity - e.quantity;
            } else {
              // if there are the same number take them away... also equipped?

              let iv: inventoryItem = {
                details: this.myPlayer.inventory[i].details,
                quantity: this.myPlayer.inventory[i].quantity,
              };

              this.myPlayer.inventory = this.myPlayer.inventory.filter(
                (g) => g != iv
              );
            }
          }
        }

        localStorage.setItem(
          'myPlayerInventory',
          JSON.stringify(this.myPlayer.inventory)
        );
        return this.questComplete(qu);
      } else {
        localStorage.setItem(
          'myPlayerQuest',
          JSON.stringify(this.myPlayer.questList)
        );
        return false;
      }
    });
    return '';
  }

  sellItem(inv: inventoryItem) {
    if (inv.details.price != 0) {
      if (inv.quantity > 1) {
        inv.quantity--;
        this.myPlayer.stats.gold += Math.round(inv.details.price / 1.5);
        localStorage.setItem(
          'myPlayerInventory',
          JSON.stringify(this.myPlayer.inventory)
        );
        localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
      } else if (inv.quantity == 1) {
        this.myPlayer.inventory.splice(
          this.myPlayer.inventory.findIndex(
            (d) => d.details.id == inv.details.id
          ),
          1
        );
        this.myPlayer.stats.gold += Math.round(inv.details.price / 1.5);
        localStorage.setItem(
          'myPlayerInventory',
          JSON.stringify(this.myPlayer.inventory)
        );
        localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
      } else {
        console.log('not sure how we hit this.');
      }
    }
  }

  buyItem(it: item) {
    let bIt: inventoryItem = { details: it, quantity: 1 };
    const invItem = this.myPlayer.inventory.find((p) => {
      return bIt.details.id == p.details.id;
    });
    //if any iteration of the item is not in the inventory (quantity not withstanding)
    if (invItem) {
      if (this.myPlayer.stats.gold >= bIt.details.price) {
        invItem.quantity = invItem.quantity + bIt.quantity;
        this.myPlayer.stats.gold -= bIt.details.price;
        localStorage.setItem(
          'myPlayerInventory',
          JSON.stringify(this.myPlayer.inventory)
        );
        localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
      } else {
        this.shopMessage = `You do not have enough gold!`;
      }
      //if item is already in inventory
    } else {
      if (this.myPlayer.stats.gold >= bIt.details.price) {
        this.myPlayer.inventory.push(bIt);
        this.myPlayer.stats.gold -= bIt.details.price;
        localStorage.setItem(
          'myPlayerInventory',
          JSON.stringify(this.myPlayer.inventory)
        );
        localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
      } else {
        this.shopMessage = `You do not have enough gold!`;
      }
    }
  }
  gameResult = '';
  playerChoice!: string;
  betAmount!: number;
  result!: string;
  resultMessage = '';
  generateRandomNumber(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  // Function to determine the result of the game
  playGame(playerChoice: string, betAmount: number): string {
    const computerChoice = this.generateRandomNumber();
    let resultMessage: string;

    if (this.myPlayer.stats.gold < betAmount) {
      resultMessage = 'Thats more money than you have';
    }
    this.myPlayer.stats.gold = this.myPlayer.stats.gold - betAmount;

    if (parseFloat(playerChoice) === computerChoice) {
      let winAmount = betAmount * 2.25;
      this.myPlayer.stats.gold =
        this.myPlayer.stats.gold + Math.round(winAmount);
      resultMessage = 'You win ' + Math.round(winAmount) + ' game currency!';
    } else {
      resultMessage =
        'You lose ' +
        betAmount +
        ' game currency! The computer chose ' +
        computerChoice +
        '.';
    }
    localStorage.setItem('myPlayer', JSON.stringify(this.myPlayer.stats));
    return resultMessage;
  }

  handleSubmit() {
    const resultMessage = this.playGame(this.playerChoice, this.betAmount);
    this.result = resultMessage;
  }

  load() {
    var retrievedObject1 = localStorage.getItem('myPlayer');
    var retrievedObject2 = localStorage.getItem('myPlayerQuest');
    var retrievedObject3 = localStorage.getItem('myPlayerInventory');
    var retrievedObject4 = localStorage.getItem('bmessage');
    var retrievedObject5 = localStorage.getItem('equipped');
    var retrievedObject6 = localStorage.getItem('worn');
    var retrievedObject7 = localStorage.getItem('cLocation');
    var retrievedObject8 = localStorage.getItem('NPCDialog');
    if (retrievedObject1 != null) {
      console.log('retrievedObject: ', JSON.parse(retrievedObject1));
      this.myPlayer.stats = JSON.parse(retrievedObject1);
    }
    if (retrievedObject2 != null) {
      console.log('retrievedObject: ', JSON.parse(retrievedObject2));
      this.myPlayer.questList = JSON.parse(retrievedObject2);
    }
    if (retrievedObject3 != null) {
      this.myPlayer.inventory = JSON.parse(retrievedObject3);
    }
    if (retrievedObject4 != null) {
      this.battleMessage = JSON.parse(retrievedObject4);
    }
    if (retrievedObject5 != null) {
      this.myPlayer.weapon = JSON.parse(retrievedObject5);
    }
    if (retrievedObject6 != null) {
      this.myPlayer.wearable = JSON.parse(retrievedObject6);
    }
    if (retrievedObject7 != null) {
      this.myPlayer.currentLocation = JSON.parse(retrievedObject7);
      this.currentLocation = JSON.parse(retrievedObject7);

      console.log('retrievedObject: ', JSON.parse(retrievedObject7));
    }

    if (retrievedObject8 != null) {
      this.myPlayer.wearable = JSON.parse(retrievedObject8);
    }
  }
} //end world component
