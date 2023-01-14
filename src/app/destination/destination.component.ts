import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import {
  CelestialKey,
  CelestialList,
  CelestialListKey,
  IntervalKey,
  LoopableKey,
} from './dest.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit, OnDestroy {
  @ViewChild('main') main!: ElementRef<HTMLElement>;
  celestialList: CelestialList = this.sharedSV.celestialList;

  name: string[] = this.genInitialCelstialDetails('name').split('');
  about: string = this.genInitialCelstialDetails('about');
  distance: string[] = this.genInitialCelstialDetails('distance').split('');
  time: string[] = this.genInitialCelstialDetails('time').split('');
  deg: string = this.genInitialCelstialDetails('deg');

  charList: string[] = this.sharedSV.w;

  nameInterval: Subscription[] = [];
  distanceInterval: Subscription[] = [];
  timeInterval: Subscription[] = [];

  constructor(
    public route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private sharedSV: SharedService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (this.validateParams(param['id'])) {
        if (this.main) {
          this.validateParams(param['id']);
          this.rotate(param['id']);
          this.changeContent(param['id'], 'name');
          this.changeContent(param['id'], 'distance');
          this.changeContent(param['id'], 'time');
        }
      } else this.zone.run(() => this.router.navigate(['/']));
    });
  }

  validateParams(id: string): boolean {
    return ['moon', 'mars', 'europa', 'titan'].includes(id);
  }

  genInitialCelstialDetails(arg: CelestialKey): string {
    const key = this.route.snapshot.params['id'] as CelestialListKey;

    if (this.validateParams(key)) return this.celestialList[key][arg];
    else return '';
  }

  rotate(id: CelestialListKey) {
    const main: HTMLElement = this.main.nativeElement;

    this.renderer.addClass(main, 'noscroll');

    this.deg = this.celestialList[id].deg;

    timer(500).subscribe(() => {
      this.renderer.removeClass(main, 'noscroll');
    });
  }

  changeContent(id: CelestialListKey, str: LoopableKey) {
    const length: number = this.celestialList[id][str].length;
    this[`${str}Interval`].forEach((sub) => sub.unsubscribe());
    this.about = this.celestialList[id].about;

    // character will start from letter A for loop letters in name
    const pushItem: string = str == 'name' ? 'A' : '';

    while (this[str].length < length) this[str].push(pushItem);
    while (this[str].length > length) this[str].pop();

    this[str].forEach((letter, idx) => {
      this.changeLetter(str, id, idx);
    });
  }

  changeLetter(str: LoopableKey, id: CelestialListKey, idx: number) {
    let count: number = this.charList.findIndex(
      (letter) => letter == this[str][idx]
    );
    let isLooping: boolean = true;
    const intervalKey: IntervalKey = `${str}Interval`;

    const intervalNum: number =
      str == 'name' ? 50 : str == 'distance' ? 20 : 10;

    this[intervalKey][idx] = interval(intervalNum).subscribe(() => {
      if (this[str][idx] > this.celestialList[id][str][idx]) {
        this[str][idx] = this.charList[count];
        count--;
      } else if (this[str][idx] < this.celestialList[id][str][idx]) {
        this[str][idx] = this.charList[count];
        count++;
      } else isLooping = false;

      if (!isLooping) this[intervalKey][idx].unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this['nameInterval'].forEach((sub) => sub.unsubscribe());
    this['distanceInterval'].forEach((sub) => sub.unsubscribe());
    this['timeInterval'].forEach((sub) => sub.unsubscribe());
  }
}
