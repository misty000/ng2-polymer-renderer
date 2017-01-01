import {APP_ID, Inject, Injectable, RenderComponentType, Renderer} from "@angular/core";
import {AnimationDriver, EventManager, DOCUMENT} from "@angular/platform-browser";
import {DomSharedStylesHost} from "@angular/platform-browser/src/dom/shared_styles_host";
import {DomRootRenderer, DomRenderer} from "@angular/platform-browser/src/dom/dom_renderer";
import {RenderDebugInfo} from "@angular/core/src/render/api";

declare var Polymer: any

const REGISTRATIONS = (Polymer && Polymer.telemetry.registrations.map(v => v.is)) || []

@Injectable()
export class PolymerDomRootRenderer extends DomRootRenderer {
  constructor(@Inject(DOCUMENT) _document: any,
              _eventManager: EventManager,
              sharedStylesHost: DomSharedStylesHost,
              animationDriver: AnimationDriver,
              @Inject(APP_ID) appId: string) {
    super(_document, _eventManager, sharedStylesHost, animationDriver, appId)
  }

  renderComponent(componentType: RenderComponentType): Renderer {
    if (Polymer) {
      let renderer = this.registeredComponents.get(componentType.id);
      if (!renderer) {
        renderer = new PolymerDomRenderer(this, componentType, this.animationDriver, `${this.appId}-${componentType.id}`);
        this.registeredComponents.set(componentType.id, renderer);
      }
      return renderer;
    } else {
      return super.renderComponent(componentType)
    }
  }
}

export class PolymerDomRenderer extends DomRenderer {
  constructor(_rootRenderer: DomRootRenderer, componentProto: RenderComponentType,
              _animationDriver: AnimationDriver, styleShimId: string) {
    super(_rootRenderer, componentProto, _animationDriver, styleShimId)
  }

  private isPolymerElement(el) {
    return Boolean(el.is && REGISTRATIONS.indexOf(el.is) >= 0)
  }

  private appendChild(parent, el) {
    if (parent) {
      // console.log(parent, this.isPolymerElement(parent), el)
      if (this.isPolymerElement(parent)) {
        Polymer.dom(parent).appendChild(el)
      } else {
        parent.appendChild(el)
      }
    }
  }

  createElement(parent: Element|DocumentFragment, name: string, debugInfo: RenderDebugInfo): Element {
    let el = super.createElement(null, name, debugInfo)
    this.appendChild(parent, el)
    return el;
  }

  createText(parent: Element|DocumentFragment, value: string, debugInfo: RenderDebugInfo): Element {
    let el = super.createText(null, value, debugInfo)
    this.appendChild(parent, el)
    return el
  }
}
