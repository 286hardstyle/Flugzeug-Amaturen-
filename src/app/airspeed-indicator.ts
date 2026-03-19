import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-airspeed-indicator',
  standalone: true,
  template: `
    <div class="w-full aspect-square bg-neutral-800 rounded-full border-4 border-neutral-600 shadow-inner relative overflow-hidden flex items-center justify-center">
      
      <!-- Dial Background -->
      <div class="absolute inset-0 rounded-full bg-neutral-900"></div>
      
      <!-- Colored Arcs using conic-gradient -->
      <div class="absolute inset-2 rounded-full"
           style="background: conic-gradient(
             from 0deg,
             transparent 0deg 64deg,
             white 64deg 136deg,
             #22c55e 136deg 208deg,
             #eab308 208deg 256deg,
             #ef4444 256deg 260deg,
             transparent 260deg 360deg
           );
           mask-image: radial-gradient(transparent 64%, black 65%);
           -webkit-mask-image: radial-gradient(transparent 64%, black 65%);">
      </div>

      <!-- Ticks and Numbers -->
      <div class="absolute inset-0">
        @for (tick of ticks; track tick) {
          <div class="absolute w-full h-full flex justify-center" [style.transform]="'rotate(' + getRotation(tick) + 'deg)'">
            <div class="w-1.5 h-4 bg-white mt-2"></div>
            <div class="absolute top-8 text-white text-sm font-mono font-bold" [style.transform]="'rotate(' + (-getRotation(tick)) + 'deg)'">
              {{ tick }}
            </div>
          </div>
        }
      </div>

      <!-- Needle -->
      <div class="absolute w-full h-full flex justify-center items-center transition-transform duration-200 ease-out z-10"
           [style.transform]="'rotate(' + needleRotation() + 'deg)'">
        <div class="w-1.5 h-[45%] bg-white relative bottom-[22.5%] rounded-t-full origin-bottom shadow-md"></div>
      </div>
      
      <!-- Center Pin -->
      <div class="absolute w-5 h-5 bg-neutral-400 rounded-full z-20 shadow-sm border border-neutral-500"></div>

      <!-- Label -->
      <div class="absolute bottom-10 text-neutral-400 text-xs font-bold tracking-widest uppercase">Airspeed</div>
      <div class="absolute bottom-6 text-neutral-500 text-[10px] font-bold tracking-widest uppercase">Knots</div>
      
      <!-- Glass reflection -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent z-30 pointer-events-none"></div>
    </div>
  `
})
export class AirspeedIndicator {
  airspeed = input(0);

  ticks = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

  getRotation(speed: number): number {
    return (speed / 200) * 320;
  }

  needleRotation = computed(() => {
    return this.getRotation(this.airspeed());
  });
}
