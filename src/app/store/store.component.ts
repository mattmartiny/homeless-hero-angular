import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { INIT_DATA, storeService } from './store.service';
import { storeRef } from './storeRef';
import {dataFor} from 'src/app/Data';
import { lootItem,  item, inventoryItem} from 'src/app/item'
import {NPC} from 'src/app/NPC';
import { player } from '../player';
import { shop } from '../shop';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  regItem: item={
    id:10,
    name:'',
    price: 0,
    equippable: false,
    healing: false,
    wearable: false,
  
    }
initialInventory: inventoryItem[]= [{details: this.regItem, quantity: 0 }]


@Input()
Inventory : inventoryItem[] = this.initialInventory;

@Output()
InventoryOP = new EventEmitter<inventoryItem[]>();


getData(){
  var getValue = this.storeService.data.subscribe(inv=> {
      console.log(inv); 
      this.Inventory=inv;
    });

  }
 
  ngOnInit(): void {
    this.getData();
    console.log(this.Inventory)
    this.Inventory;
  }




  constructor(private inj: Injector, private storeService :storeService) {
   this.getData();
    this.Inventory;
    console.log(this.Inventory);
  }
  closeModal() {
    this.inj.get(INIT_DATA)._service.close();

  }

shopNow(){
this.getData();
let inventory = this.Inventory
console.log(inventory)





}

    // addItemToInventory(vendor: shop, itemToAdd: inventoryItem, quantity = 1){
    // this.getData();



    //   let item = vendor.shopInventory.filter(x=> x.details.id == itemToAdd.details.id)

    //   if (item == undefined){

        
    //   }

    // }
   
    
    

}
