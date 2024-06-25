import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStarRating]'
})
export class AppStarRatingDirective implements OnChanges {
  @Input() appStarRating: number;

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    this.updateStarRating();
  }

  private updateStarRating(): void {
    const stars = '★'.repeat(this.appStarRating) + '☆'.repeat(5 - this.appStarRating);
    this.el.nativeElement.innerHTML = stars;
    this.el.nativeElement.style.fontSize = '1rem';
    this.el.nativeElement.querySelectorAll('.star').forEach((star: { style: { color: string; }; }) => {
      star.style.color = 'yellow';
    
    });
   
  }
}
