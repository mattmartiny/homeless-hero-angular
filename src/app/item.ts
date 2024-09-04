export interface item {id : number, name: string, price: number,  equippable:boolean, equippableStats?:equippableItem, wearable: boolean, wearableStats?:wearableItem, healing:boolean, healingStats?:  healingItem };


export interface lootItem {details:item, chance: number, isDefaultItem: boolean};
export interface inventoryItem{details: item, quantity: number};

export interface equippableItem  {itemName:string, attackBonus: number, defenseBonus:number, speedBonus: number, equipped: boolean};
export interface wearableItem {itemName:string, attackBonus: number, defenseBonus:number, speedBonus: number, equipped: boolean};
export interface healingItem { amountHealed: number}

export interface keyItem {details: inventoryItem, quantity: number} 
