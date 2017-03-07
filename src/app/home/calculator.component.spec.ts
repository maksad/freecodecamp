import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  const html = '<calculator></calculator>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [CalculatorComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Calculator Works!');
  });
});

@Component({selector: 'my-calculator', template: ''})
class TestComponent { }
