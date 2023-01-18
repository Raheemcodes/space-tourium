import { ElementRef } from '@angular/core';
import { FadeDirective } from './fade.directive';

describe('FadeDirective', () => {
  let elWithFadeDr: ElementRef<HTMLElement>;

  class MockElement implements ElementRef<HTMLElement> {
    nativeElement: HTMLElement = {
      ...document.createElement('div'),
    };
  }

  beforeEach(() => {
    elWithFadeDr = new MockElement();
  });

  it('should create an instance', () => {
    const directive = new FadeDirective(elWithFadeDr);
    expect(directive).toBeTruthy();
  });
});
