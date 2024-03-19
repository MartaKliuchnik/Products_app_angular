import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appTypeahead]',
})
export class TypeaheadDirective {
  predefinedKeywords: string[] = ['apple', 'banana', 'orange', 'pear'];

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    console.log('Input value:', value);
    const inputValue: string = this.el.nativeElement.value.toLowerCase();
    const filteredKeywords = this.predefinedKeywords.filter((keyword: string) =>
      keyword.toLowerCase().startsWith(inputValue)
    );
    // Display or handle the filteredKeywords as needed
    console.log('Filtered keywords:', filteredKeywords);
  }
}
