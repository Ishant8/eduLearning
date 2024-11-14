import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addExtraLineBreak',standalone:true})
export class AddExtraLineBreakPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/\n\n/g, '\n\n') : value;
  }
}
