import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CelestialList } from './dest.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  name!: string;
  about!: string;
  distance!: string;
  time!: string;
  deg: number = 0;

  celestialList: CelestialList = {
    moon: {
      name: 'MOON',
      about:
        'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.',
      distance: 384400,
      time: 3,
      deg: 0,
    },
    mars: {
      name: 'MARS',
      about:
        'Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!',
      distance: 225000000,
      time: 30 * 9,
      deg: 90,
    },
    europa: {
      name: 'EUROPA',
      about:
        'The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.',
      distance: 628000000,
      time: 30 * 12 * 3,
      deg: 180,
    },
    titan: {
      name: 'TITAN',
      about:
        'The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.',
      distance: 1600000000,
      time: 30 * 12 * 7,
      deg: 270,
    },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (param['id']) this.rotate(param['id']);
    });
  }

  rotate(id: 'moon' | 'mars' | 'europa' | 'titan') {
    this.renderer.addClass(this.document.querySelector('main'), 'noscroll');
    this.deg = this.celestialList[id].deg;
  }
}
