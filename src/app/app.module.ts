import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldComponent } from './world/world.component';
import { StoreComponent } from './store/store.component';
import { storeService } from './store/store.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, WorldComponent],
  imports: [BrowserModule, AppRoutingModule, MatTooltipModule,  FormsModule],

  providers: [storeService],
  bootstrap: [AppComponent],
  // entryComponents: [StoreComponent],
})
export class AppModule {}
