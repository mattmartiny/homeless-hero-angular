import { OverlayRef } from '@angular/cdk/overlay';

export class storeRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}