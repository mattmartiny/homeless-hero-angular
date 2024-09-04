import { Injectable, Inject, Injector, InjectionToken } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import {StoreComponent} from './store.component'
import { storeRef } from './storeRef';
import { BehaviorSubject, Observable } from 'rxjs';
import { inventoryItem, item } from '../item';
export const INIT_DATA = new InjectionToken<ContainerData>('INIT_DATA');

export interface ContainerData {
  _service: storeService;
}




interface storeDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: storeDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}





@Injectable()
export class storeService {
  dialogRef : any;
  ratTail: item={
    id: 3005,
    name:'Rat Tail',
    price: 3,
    equippable: false,
    healing: false,
    wearable: false,
  
    }
initialInventory: inventoryItem[]= [{details: this.ratTail, quantity: 1 }]
 

private dataSource: BehaviorSubject<inventoryItem[]> = new BehaviorSubject<inventoryItem[]>(this.initialInventory);
  data: Observable<inventoryItem[]> = this.dataSource.asObservable();
 
  // Inject overlay service
  constructor(private injector: Injector, private overlay: Overlay) { }

  sendData(data: inventoryItem[]) {
    this.dataSource.next(data);
  }

  createInjector(data: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(INIT_DATA, data);
    return new PortalInjector(this.injector, injectorTokens);
  }

  open(config: storeDialogConfig = {}, initialData: any) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Create ComponentPortal that can be attached to a PortalHost
    const storePortal = new ComponentPortal(StoreComponent, null, this.createInjector(Object.assign(initialData, { _service: this })));

    // Attach ComponentPortal to PortalHost
    const componentRef = overlayRef.attach(storePortal);

    this.dialogRef = new storeRef(overlayRef);

    overlayRef.backdropClick().subscribe(_ => this.dialogRef.close());
  
   // pass data via Input:
componentRef.instance.Inventory = this.initialInventory;

componentRef.instance.InventoryOP.subscribe();

    return this.dialogRef;
  }

  close() {
    this.dialogRef.close();
  }

load(){

}
  private createOverlay(config: storeDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }


  private getOverlayConfig(config: storeDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

}