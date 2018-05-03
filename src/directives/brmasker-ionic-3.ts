import { Directive, Input, HostListener, OnInit, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export class BrModel {
  mask: string;
  len: number;
  person: boolean;
  phone: boolean;
  money: boolean;
  percent:boolean;
  type: 'alfa' | 'num' | 'all' = 'alfa';
  decimal: number = 2;
}

@Directive({
  selector: '[brmasker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: BrMaskerIonic3,
    multi: true
  }]
})

export class BrMaskerIonic3 implements OnInit, ControlValueAccessor {
  @Input() brmasker: BrModel = new BrModel();

  @HostListener('keyup', ['$event'])
  inputKeyup(event: any): void {
    const value = this.returnValue(event.target.value);
    this.writeValue(value);
    event.target.value = value;
  }

  @HostListener('ionBlur', ['$event'])
  inputOnblur(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;
  }

  @HostListener('ionFocus', ['$event'])
  inputFocus(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;
    
  }

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.brmasker.type) {
      this.brmasker.type = 'all';
    }

    if (!this.brmasker.decimal) {
      this.brmasker.decimal = 2;
    }
  }

  writeValue(fn: any): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', fn);  
  }

  registerOnChange(fn: any): void {
    return;
  }

  registerOnTouched(fn: any): void { 
    return;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'true');
    } else {
      this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', 'false');
    }
  }

  returnValue(value: string): any {
    if (!this.brmasker.mask) { this.brmasker.mask = ''; }
    if (value) {
      let v = value;
      if (this.brmasker.type == 'alfa') {
        v = v.replace(/\d/gi,'');
      }
      if (this.brmasker.type == 'num') {
        v = v.replace(/\D/gi,'');
      }

      if (this.brmasker.money) {
        return this.moneyMask(this.onInput(v));
      }
      if (this.brmasker.phone) {
        return this.phoneMask(v);
      }
      if (this.brmasker.person) {
        return this.peapollMask(v);
      }
      if (this.brmasker.percent) {
        return this.percentMask(v)
      }
      return this.onInput(v);
    } else {
      return '';
    }
  }

  private percentMask(v:any):void {
    let tmp = v;
    tmp = tmp.replace(/\D/gi,'');
    tmp = tmp.replace(/%/gi,'');
    tmp = tmp.replace(/([0-9]{0})$/gi, '%$1');
    return tmp;
  }

  private phoneMask(v: any): void {
    let n = v;
    if (n.length > 14) {
      this.brmasker.len = 15;
      this.brmasker.mask = '(99) 99999-9999';
      n = n.replace(/\D/gi,'');                    
      n = n.replace(/(\d{2})(\d)/gi,'$1 $2');       
      n = n.replace(/(\d{5})(\d)/gi,'$1-$2');       
      n = n.replace(/(\d{4})(\d)/gi,'$1$2'); 
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '(99) 9999-9999';
      n = n.replace(/\D/gi,'');                    
      n = n.replace(/(\d{2})(\d)/gi,'$1 $2');       
      n = n.replace(/(\d{4})(\d)/gi,'$1-$2');       
      n = n.replace(/(\d{4})(\d)/gi,'$1$2'); 
    }
    return this.onInput(n);
  }

  private peapollMask(v: any): void {
    let n = v;
    if (n.length > 14) {
      this.brmasker.len = 18;
      this.brmasker.mask = '99.999.999/9999-99';
      n = n.replace(/\D/gi,'');                    
      n = n.replace(/(\d{2})(\d)/gi,'$1.$2');       
      n = n.replace(/(\d{3})(\d)/gi,'$1.$2');       
      n = n.replace(/(\d{3})(\d)/gi,'$1/$2'); 
      n = n.replace(/(\d{4})(\d{1,4})$/gi,'$1-$2'); 
      n = n.replace(/(\d{2})(\d{1,2})$/gi,'$1$2');
    } else {
      this.brmasker.len = 14;
      this.brmasker.mask = '999.999.999-99';
      n = n.replace(/\D/gi,'');                    
      n = n.replace(/(\d{3})(\d)/gi,'$1.$2');       
      n = n.replace(/(\d{3})(\d)/gi,'$1.$2');       
      n = n.replace(/(\d{3})(\d{1,2})$/gi,'$1-$2'); 
    }
    return this.onInput(n);
  }

  private moneyMask(v: any): string {
    let tmp = v;
    tmp = tmp.replace(/\D/gi,'');
    let replace = "([0-9]{"+this.brmasker.decimal+"})$";
    let re = new RegExp(replace,"g");
    tmp = tmp.replace(re, ',$1');
    return tmp;
  }

  private onInput(value: any): void {
    const ret = this.formatField(value, this.brmasker.mask, this.brmasker.len);
    return ret;
    // if (ret) {
    //   this.element.nativeElement.value = ret;
    // }
  }

  private formatField(campo: string, Mascara: string, tamanho: number): any {
    if (!tamanho) { tamanho = 99999999999; }
    let boleanoMascara;
    const exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
    const campoSoNumeros = campo.toString().replace(exp, '');
    let posicaoCampo = 0;
    let NovoValorCampo = '';
    let TamanhoMascara = campoSoNumeros.length;
    for (let i = 0; i < TamanhoMascara; i++) {
      if (i < tamanho) {
        boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#') || (Mascara.charAt(i) === ':'));
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
        if (boleanoMascara) {
          NovoValorCampo += Mascara.charAt(i);
          TamanhoMascara++;
        } else {
          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
          posicaoCampo++;
        }
      }
    }
    return NovoValorCampo;
  }

}