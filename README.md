# Angular2 DomRenderer for Polymer.

[![NPM](https://nodei.co/npm/ng2-polymer-renderer.png)](https://nodei.co/npm/ng2-polymer-renderer/)

## How to use

Add `PolymerRendererModule.forRoot()` to @NgModule imports

```typescript
@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('vaadin-grid')
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PolymerRendererModule.forRoot()
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

```