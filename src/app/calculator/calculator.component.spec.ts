import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 0 initially', () => {
    expect(component.displayText).toBe('0');
  });

  it('should handle number input correctly', () => {
    component.handleNumber('5');
    expect(component.displayText).toBe('5');

    component.handleNumber('3');
    expect(component.displayText).toBe('53');
  });

  it('should handle decimal point correctly', () => {
    component.handleNumber('5');
    component.handleNumber('.');
    component.handleNumber('3');
    expect(component.displayText).toBe('5.3');
  });

  it('should not allow multiple decimal points', () => {
    component.handleNumber('5');
    component.handleNumber('.');
    component.handleNumber('3');
    component.handleNumber('.');
    component.handleNumber('2');
    expect(component.displayText).toBe('5.3');
  });

  it('should calculate addition correctly', () => {
    component.handleNumber('8');
    component.handleOperator('+');
    component.handleNumber('2');
    component.calculateResult();

    expect(component.displayText).toBe('10');
    expect(component.displayExpression).toBe('8 + 10 =');
  });

  it('should calculate subtraction correctly', () => {
    component.handleNumber('1');
    component.handleNumber('1');
    component.handleOperator('-');
    component.handleNumber('2');
    component.calculateResult();

    expect(component.displayText).toBe('9');
    expect(component.displayExpression).toBe('11 - 9 =');
  });

  it('should calculate multiplication correctly', () => {
    component.handleNumber('1');
    component.handleNumber('1');
    component.handleOperator('×');
    component.handleNumber('2');
    component.calculateResult();

    expect(component.displayText).toBe('22');
    expect(component.displayExpression).toBe('11 × 22 =');
  });

  it('should calculate division correctly', () => {
    component.handleNumber('6');
    component.handleOperator('÷');
    component.handleNumber('2');
    component.calculateResult();

    expect(component.displayText).toBe('3');
    expect(component.displayExpression).toBe('6 ÷ 3 =');
  });

  it('should handle division by zero', () => {
    component.handleNumber('5');
    component.handleOperator('÷');
    component.handleNumber('0');
    component.calculateResult();

    expect(component.displayText).toBe('Error');
    expect(component.displayExpression).toBe('');
  });

  it('should handle percentage correctly', () => {
    component.handleNumber('5');
    component.handleNumber('0');
    component.handleOperator('%');

    expect(component.displayText).toBe('0.5');
  });

  it('should handle plus/minus correctly', () => {
    component.handleNumber('5');
    component.handleOperator('±');

    expect(component.displayText).toBe('-5');

    component.handleOperator('±');
    expect(component.displayText).toBe('5');
  });

  it('should clear calculator correctly', () => {
    component.handleNumber('5');
    component.handleNumber('0');
    component.handleOperator('+');
    component.handleNumber('2');
    component.clearCalculator();

    expect(component.displayText).toBe('0');
    expect(component.displayExpression).toBe('');
  });

  it('should chain operations correctly', () => {
    component.handleNumber('5');
    component.handleOperator('+');
    component.handleNumber('3');
    component.handleOperator('×');
    component.handleNumber('2');
    component.calculateResult();

    expect(component.displayText).toBe('16');
    expect(component.displayExpression).toBe('8 × 16 =');
  });

  it('should handle zero input correctly', () => {
    component.handleNumber('0');
    expect(component.displayText).toBe('0');

    component.handleNumber('5');
    expect(component.displayText).toBe('5');
  });

  it('should update display expression when operator is selected', () => {
    component.handleNumber('5');
    component.handleOperator('+');

    expect(component.displayExpression).toBe('5 +');
  });
});
