import {BrowserModule} from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {PolymerRendererModule} from "ng2-polymer-renderer";
import {PolymerElement} from "@vaadin/angular2-polymer";

@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('paper-input')
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PolymerRendererModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
