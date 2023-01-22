import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { Person } from './crew.model';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent implements OnInit, OnDestroy {
  crew: Person[] = [
    {
      name: 'Douglas Hurley',
      pos: 'Commander',
      about:
        'Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.',
      img: './../../assets/background/crew/image-douglas-hurley.webp',
      width: '514',
      height: '700',
    },
    {
      name: 'MARK SHUTTLEWORTH',
      pos: 'Mission Specialist',
      about:
        'Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.',
      img: './../../assets/background/crew/image-mark-shuttleworth.webp',
      width: '433',
      height: '640',
    },
    {
      name: 'Victor Glover',
      pos: 'PILOT',
      about:
        'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.',
      img: './../../assets/background/crew/image-victor-glover.webp',
      width: '549',
      height: '645',
    },
    {
      name: 'Anousheh Ansari',
      pos: 'Flight Engineer',
      about:
        'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.',
      img: './../../assets/background/crew/image-anousheh-ansari.webp',
      width: '575',
      height: '602',
    },
  ];
  isAnimating: boolean = false;
  prevIdx: number = this.crew.length;
  curIdx: number = 0;
  interval!: Subscription;
  timer: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loop();
  }

  changeSlide(idx: number) {
    if (!this.isAnimating) {
      this.timer.forEach((sub) => sub.unsubscribe());
      this.interval.unsubscribe();
      this.loop();

      this.isAnimating = true;
      this.prevIdx = this.curIdx;

      this.timer[0] = timer(250).subscribe(() => {
        this.curIdx = idx;
      });

      this.timer[1] = timer(750).subscribe(() => {
        this.isAnimating = false;
      });
    }
  }

  loop() {
    this.interval = interval(7000).subscribe(() => {
      if (!this.isAnimating) {
        this.timer.forEach((sub) => sub.unsubscribe());
        this.isAnimating = true;
        this.prevIdx = this.curIdx;

        this.timer[2] = timer(250).subscribe(() => {
          if (this.curIdx < this.crew.length - 1) this.curIdx++;
          else this.curIdx = 0;
        });

        this.timer[3] = timer(750).subscribe(() => {
          this.isAnimating = false;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
    this.timer.forEach((sub) => sub.unsubscribe());
  }
}
