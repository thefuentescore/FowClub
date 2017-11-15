import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../../models/card';

/**
 * Generated class for the NamedCardPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'namedCard',
})
export class NamedCardPipe implements PipeTransform {
  transform(cards: Card[], name: string) {
    if(!name) return cards;
    return cards.filter(card => card.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }
}
