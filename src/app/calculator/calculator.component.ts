import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  // Calculator state variables
  displayText: string = '0';
  displayExpression: string = '';
  
  private currentNumber: string = '0';
  private previousNumber: number | null = null;
  private operation: string | null = null;
  private shouldResetDisplay: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Handle number button clicks
  handleNumber(num: string): void {
    if (this.shouldResetDisplay) {
      this.currentNumber = num;
      this.shouldResetDisplay = false;
    } else {
      if (this.currentNumber === '0' && num !== '.') {
        this.currentNumber = num;
      } else {
        if (num === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber += num;
      }
    }
    this.updateDisplay();
  }

  // Handle operator button clicks
  handleOperator(op: string): void {
    if (op === '±') {
      this.currentNumber = (parseFloat(this.currentNumber) * -1).toString();
      this.updateDisplay();
      return;
    }
    
    if (op === '%') {
      this.currentNumber = (parseFloat(this.currentNumber) / 100).toString();
      this.updateDisplay();
      return;
    }
    
    if (this.previousNumber !== null && this.operation !== null) {
      this.calculateResult();
    }
    
    this.previousNumber = parseFloat(this.currentNumber);
    this.operation = op;
    this.shouldResetDisplay = true;
    
    // Update expression display
    this.displayExpression = `${this.previousNumber} ${this.getOperatorSymbol(this.operation)}`;
  }

  // Calculate the result
  calculateResult(): void {
    if (this.previousNumber === null || this.operation === null) return;
    
    const current = parseFloat(this.currentNumber);
    let result: number | string;
    
    switch (this.operation) {
      case '+':
        result = this.previousNumber + current;
        break;
      case '-':
        result = this.previousNumber - current;
        break;
      case '×':
        result = this.previousNumber * current;
        break;
      case '÷':
        if (current === 0) {
          result = 'Error';
        } else {
          result = this.previousNumber / current;
        }
        break;
      default:
        return;
    }
    
    if (result === 'Error') {
      this.displayText = 'Error';
      this.displayExpression = '';
    } else {
      this.currentNumber = result.toString();
      this.displayExpression = `${this.previousNumber} ${this.getOperatorSymbol(this.operation)} ${parseFloat(this.currentNumber)} =`;
    }
    
    this.previousNumber = null;
    this.operation = null;
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  // Clear the calculator
  clearCalculator(): void {
    this.currentNumber = '0';
    this.previousNumber = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.displayExpression = '';
    this.updateDisplay();
  }

  // Update the display
  private updateDisplay(): void {
    if (this.currentNumber === 'Error') {
      this.displayText = 'Error';
    } else {
      const num = parseFloat(this.currentNumber);
      if (Number.isInteger(num)) {
        this.displayText = num.toString();
      } else {
        this.displayText = parseFloat(num.toFixed(8)).toString();
      }
    }
  }

  // Get operator symbol for display
  private getOperatorSymbol(op: string): string {
    const symbols: { [key: string]: string } = {
      '+': '+',
      '-': '-',
      '×': '×',
      '÷': '÷'
    };
    return symbols[op] || op;
  }
}
