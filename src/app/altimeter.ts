import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-altimeter',
  standalone: true,
  template: `
    <div class="w-full aspect-square bg-neutral-800 rounded-full border-4 border-neutral-600 shadow-inner relative overflow-hidden flex items-center justify-center">
      
      <!-- Dial Background -->
      <div class="absolute inset-0 rounded-full bg-neutral-900"></div>
      
      <!-- Ticks and Numbers -->
      <div class="absolute inset-0">
        @for (tick of ticks; track tick) {
          <div class="absolute w-full h-full flex justify-center" [style.transform]="'rotate(' + (tick * 36) + 'deg)'">
            <div class="w-1.5 h-4 bg-white mt-2"></div>
            <div class="absolute top-8 text-white text-sm font-mono font-bold" [style.transform]="'rotate(' + (-tick * 36) + 'deg)'">
              {{ tick }}
            </div>
          </div>
        }
        <!-- Minor ticks -->
        @for (tick of minorTicks; track tick) {
          <div class="absolute w-full h-full flex justify-center" [style.transform]="'rotate(' + (tick * 7.2) + 'deg)'">
            <div class="w-1 h-2 bg-neutral-400 mt-2"></div>
          </div>
        }
      </div>

      <!-- 10,000 ft Needle (Thin, long) -->
      <div class="absolute w-full h-full flex justify-center items-center transition-transform duration-500 ease-out z-10"
           [style.transform]="'rotate(' + needle10kRotation() + 'deg)'">
        <div class="w-1 h-[35%] bg-neutral-300 relative bottom-[17.5%] origin-bottom shadow-md">
           <div class="absolute -top-2 -left-1 w-3 h-3 bg-neutral-300 transform rotate-45"></div>
        </div>
      </div>

      <!-- 1,000 ft Needle (Short, thick) -->
      <div class="absolute w-full h-full flex justify-center items-center transition-transform duration-500 ease-out z-10"
           [style.transform]="'rotate(' + needle1kRotation() + 'deg)'">
        <div class="w-2.5 h-[25%] bg-white relative bottom-[12.5%] rounded-t-full origin-bottom shadow-md"></div>
      </div>

      <!-- 100 ft Needle (Long, medium) -->
      <div class="absolute w-full h-full flex justify-center items-center transition-transform duration-200 ease-out z-20"
           [style.transform]="'rotate(' + needle100Rotation() + 'deg)'">
        <div class="w-1.5 h-[42%] bg-white relative bottom-[21%] rounded-t-full origin-bottom shadow-md"></div>
      </div>
      
      <!-- Center Pin -->
      <div class="absolute w-5 h-5 bg-neutral-400 rounded-full z-30 shadow-sm border border-neutral-500"></div>

      <!-- Label -->
      <div class="absolute top-24 text-neutral-400 text-xs font-bold tracking-widest uppercase">Altitude</div>
      <div class="absolute top-28 text-neutral-500 text-[10px] font-bold tracking-widest uppercase">Feet</div>
      
      <!-- Kollsman window (pressure setting) - decorative -->
      <div class="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800 border border-neutral-600 px-1 py-0.5 rounded text-white font-mono text-[10px]">
        29.92
      </div>

      <!-- Glass reflection -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent z-40 pointer-events-none"></div>
    </div>
  `
})
export class Altimeter {
  altitude = input(0);

  ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  minorTicks = Array.from({length: 50}, (_, i) => i);

  needle100Rotation = computed(() => {
    return (this.altitude() % 1000) / 1000 * 360;
  });

  needle1kRotation = computed(() => {
    return (this.altitude() % 10000) / 10000 * 360;
  });

  needle10kRotation = computed(() => {
    return (this.altitude() % 100000) / 100000 * 360;
  });
}
