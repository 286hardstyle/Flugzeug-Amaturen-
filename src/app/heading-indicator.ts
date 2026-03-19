import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading-indicator',
  standalone: true,
  template: `
    <div class="w-full aspect-square bg-neutral-800 rounded-full border-4 border-neutral-600 shadow-inner relative overflow-hidden flex items-center justify-center">
      
      <!-- Compass Card (Rotates) -->
      <div class="absolute w-full h-full transition-transform duration-300 ease-out"
           [style.transform]="'rotate(' + (-heading()) + 'deg)'">
        
        <div class="absolute inset-0 rounded-full bg-neutral-900"></div>
        
        <!-- Ticks and Labels -->
        <div class="absolute inset-0">
          @for (tick of ticks; track tick) {
            <div class="absolute w-full h-full flex justify-center" [style.transform]="'rotate(' + tick + 'deg)'">
              <div class="w-1.5 h-3 bg-white mt-2"></div>
              <div class="absolute top-6 text-white text-sm font-mono font-bold">
                {{ getLabel(tick) }}
              </div>
            </div>
          }
          @for (tick of minorTicks; track tick) {
            <div class="absolute w-full h-full flex justify-center" [style.transform]="'rotate(' + tick + 'deg)'">
              <div class="w-1 h-2 bg-neutral-400 mt-2"></div>
            </div>
          }
        </div>
      </div>

      <!-- Fixed Airplane Symbol -->
      <div class="absolute w-16 h-16 z-20 flex items-center justify-center">
        <svg viewBox="0 0 100 100" class="w-full h-full fill-amber-500 stroke-amber-600 stroke-2">
          <path d="M 50 10 L 55 40 L 90 50 L 90 60 L 55 55 L 55 80 L 65 90 L 65 95 L 50 90 L 35 95 L 35 90 L 45 80 L 45 55 L 10 60 L 10 50 L 45 40 Z" />
        </svg>
      </div>
      
      <!-- Fixed Lubber Line (Top indicator) -->
      <div class="absolute top-0 w-1 h-6 bg-amber-500 z-30"></div>

      <!-- Label -->
      <div class="absolute bottom-6 text-neutral-400 text-xs font-bold tracking-widest uppercase z-10">Heading</div>
      
      <!-- Glass reflection -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent z-40 pointer-events-none"></div>
    </div>
  `
})
export class HeadingIndicator {
  heading = input(0);

  ticks = Array.from({length: 12}, (_, i) => i * 30);
  minorTicks = Array.from({length: 36}, (_, i) => i * 10).filter(t => t % 30 !== 0);

  getLabel(deg: number): string {
    if (deg === 0) return 'N';
    if (deg === 90) return 'E';
    if (deg === 180) return 'S';
    if (deg === 270) return 'W';
    return (deg / 10).toString();
  }
}
