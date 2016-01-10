import {Component} from 'angular2/core';
import {ElementRef} from 'angular2/core';
import {Inject} from 'angular2/core';

@Component({
   selector: 'view2-component',
   template: `<span><span>`
})

/* Route testing, lodash and d3 integration */
export class View2Component {

   private list: number[] = [];

   constructor(@Inject(ElementRef) elementRef) {
      for (var i=0; i < 10; i ++) {
         this.list.push(i);
      }
      console.log('Element Ref', elementRef);
      console.log('Dom ', elementRef.nativeElement);

      d3.select(elementRef.nativeElement).selectAll('*').remove();
      d3.select(elementRef.nativeElement)
      .append('svg').attr('width', '250px').attr('height', '   200px')
      .selectAll('test').data(this.list).enter().append('rect')
        .classed('test', true)
        .attr('x', 1)
        .attr('y', (d, i)=>{return i*10})
        .attr('width', (d, i)=>{return d*5;})
        .attr('height', 9)
        .style('fill', '#369');
   }

}
