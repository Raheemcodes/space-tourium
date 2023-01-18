import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appFade]',
})
export class FadeDirective implements OnInit {
  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}
}
