import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';
import {
  CelestialKey,
  CelestialList,
  CelestialListKey,
  LoopableKey,
} from './dest.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  @ViewChild('main') main!: ElementRef<HTMLElement>;
  celestialList: CelestialList = {
    moon: {
      name: 'MOON',
      about:
        'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.',
      distance: '384,400 km',
      time: '3 days',
      deg: '0',
    },
    mars: {
      name: 'MARS',
      about:
        'Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!',
      distance: '225 MIL. km',
      time: '9 months',
      deg: '90',
    },
    europa: {
      name: 'EUROPA',
      about:
        'The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.',
      distance: '628 MIL. km',
      time: '3 years',
      deg: '180',
    },
    titan: {
      name: 'TITAN',
      about:
        'The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.',
      distance: '1.6 BIL. km',
      time: '7 years',
      deg: '270',
    },
  };

  name: string[] = this.celestialFn('name').split('');
  about: string = this.celestialFn('about');
  distance: string[] = this.celestialFn('distance').split('');
  time: string[] = this.celestialFn('time').split('');
  deg: string = this.celestialFn('deg');

  w: string[] = [
    '',
    ' ',
    '!',
    ')',
    '(',
    ',',
    '.',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '’',
  ];

  nameInterval: Subscription[] = [];
  distanceInterval: Subscription[] = [];
  timeInterval: Subscription[] = [];

  constructor(
    public route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (this.validateParams(param['id'])) {
        if (this.main) {
          this.validateParams(param['id']);
          this.rotate(param['id']);
          this.setName(param['id'], 'name');
          this.setName(param['id'], 'distance');
          this.setName(param['id'], 'time');
        }
      } else this.router.navigate(['/']);
    });
  }

  validateParams(id: string): boolean {
    return ['moon', 'mars', 'europa', 'titan'].includes(id);
  }

  celestialFn(arg: CelestialKey): string {
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

  setName(id: CelestialListKey, str: LoopableKey) {
    const length: number = this.celestialList[id][str].length;
    this[str + 'Interval'].forEach((sub) => sub.unsubscribe());
    this.about = this.celestialList[id].about;

    // character will start from letter A for loop letters in name
    const pushItem: string = str == 'name' ? 'A' : '';

    while (this[str].length < length) this[str].push(pushItem);
    while (this[str].length > length) this[str].pop();

    this[str].forEach((letter, idx) => {
      this.changeLetter(str, id, idx);
    });
  }

  changeLetter(
    str: LoopableKey,
    id: 'moon' | 'mars' | 'europa' | 'titan',
    idx: number
  ) {
    let count: number = this.w.findIndex((letter) => letter == this[str][idx]);
    let isLooping: boolean = true;

    const intervalNum: number =
      str == 'name' ? 50 : str == 'distance' ? 20 : 10;

    this[str + 'Interval'][idx] = interval(intervalNum).subscribe(() => {
      if (this[str][idx] > this.celestialList[id][str][idx]) {
        this[str][idx] = this.w[count];
        count--;
      } else if (this[str][idx] < this.celestialList[id][str][idx]) {
        this[str][idx] = this.w[count];
        count++;
      } else isLooping = false;

      if (!isLooping) this[str + 'Interval'][idx].unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this['nameInterval'].forEach((sub) => sub.unsubscribe());
    this['distanceInterval'].forEach((sub) => sub.unsubscribe());
    this['timeInterval'].forEach((sub) => sub.unsubscribe());
  }
}
