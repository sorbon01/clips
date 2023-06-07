import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
})
export class EventBlockerDirective {

  @HostListener('drop',['$event'])
  @HostListener('dragover',['$event'])
  public hadleEnvent(event:Event){
      event.preventDefault()
  }

}
