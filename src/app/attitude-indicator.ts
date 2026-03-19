import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-attitude-indicator',
  standalone: true,
  template: `
    <div class="w-full aspect-square bg-neutral-800 rounded-full border-4 border-neutral-600 shadow-inner relative overflow-hidden flex items-center justify-center">
      <!-- Horizon -->
      <div 
        class="absolute w-[200%] h-[200%] transition-transform duration-100 ease-linear"
        [style.transform]="horizonTransform()"
      >
        <div class="w-full h-1/2 bg-sky-500 border-b-2 border-white"></div>
        <div class="w-full h-1/2 bg-amber-700"></div>
        
        <!-- Pitch marks -->
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          @for (mark of pitchMarks; track mark) {
            <div class="absolute w-12 h-0.5 bg-white" [style.top]="'calc(50% - ' + (mark * 3) + 'px)'"></div>
            <div class="absolute w-12 h-0.5 bg-white" [style.top]="'calc(50% + ' + (mark * 3) + 'px)'"></div>
          }
        </div>
      </div>

      <!-- Fixed Airplane Symbol -->
      <div class="absolute w-28 h-1 z-10 flex justify-between items-center">
        <div class="w-10 h-1.5 bg-amber-400 rounded-l-full border border-amber-600"></div>
        <div class="w-2 h-2 bg-amber-400 rounded-full border border-amber-600"></div>
        <div class="w-10 h-1.5 bg-amber-400 rounded-r-full border border-amber-600"></div>
      </div>
      
      <!-- Roll indicator ring (static) -->
      <div class="absolute inset-0 border-8 border-neutral-700/50 rounded-full z-20 pointer-events-none"></div>
      
      <!-- Glass reflection -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent z-30 pointer-events-none"></div>
    </div>
  `
})
export class AttitudeIndicator {
  pitch = input(0);
  roll = input(0);

  pitchMarks = [10, 20, 30, 40];

  horizonTransform = computed(() => {
    // 1 degree of pitch = 3px translation (approx)
    const translateY = this.pitch() * 3;
    return `rotate(${this.roll()}deg) translateY(${translateY}px)`;
  });
}
