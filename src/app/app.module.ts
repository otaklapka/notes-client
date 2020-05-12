import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {cs_CZ, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import cs from '@angular/common/locales/cs';
import {CoreModule} from "./core/core.module";
import {
  NzButtonModule,
  NzCheckboxModule,
  NzGridModule,
  NzIconModule, NzInputModule,
  NzListModule,
  NzMessageModule, NzModalModule, NzPageHeaderModule, NzPopconfirmModule
} from "ng-zorro-antd";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {EditModalComponent} from "./edit-modal.component";

registerLocaleData(cs);

@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    NzMessageModule,
    NzListModule,
    NzGridModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpaceModule,
    NzModalModule,
    NzPageHeaderModule,
    NzPopconfirmModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: cs_CZ},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
