import {ModuleWithProviders, RootRenderer, NgModule} from "@angular/core";
import {PolymerDomRootRenderer} from "./polymer-renderer";

@NgModule()
export class PolymerRendererModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PolymerRendererModule,
      providers: [
        {provide: RootRenderer, useClass: PolymerDomRootRenderer}
      ]
    }
  }
}