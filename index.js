class Calculator {

  numbers = {
    N_1: 1, N_2: 2, N_3: 3, N_4: 4, N_5: 5,
    N_6: 6, N_7: 7, N_8: 8, N_9: 9, N_0: 0,
  }

  constructor() {
    var calcButtons = document.querySelectorAll('.calc-button');
    calcButtons.forEach(b => { b.addEventListener("click", event => this.keyPressed(event)); });
    var moreButton = document.getElementById('MORE');
    moreButton.addEventListener("click", event => this.more());
    this.a = 0;
    this.b = 0;
    this.str = 0;
    this.decimal = 0;
    this.operation = undefined;
    this.negative = false;
    this.prevKey = undefined;
    this.moreButtons = false;
  }

  keyPressed(event) {
    var id = event.target.id

    if (id[0] == 'N') {
      if (this.prevKey && this.prevKey == 'EQ') this.clear();
      this.appendNumber(id);

    } else if (id[0] == 'O') {
      if (!this.prevKey) {
        return;
      } else if (this.prevKey == 'EQ') {
        this.b = this.a;
      } else if (this.prevKey[0] != 'O') {
        this.b = this.computeResult(this.a, this.b);
      }
      this.clearEntry();
      this.setOperation(id);

    } else {
      switch (id) {
        case 'EQ':
          this.decimal = 0;
          if (!this.prevKey) {
            return;
          } else if (this.prevKey == 'EQ') {
            this.a = this.computeResult(this.b, this.a);
          } else {
            var r = this.computeResult(this.a, this.b);
            this.b = this.a;
            this.a = r;
          }
          break;

        case 'DEC':
          if (this.prevKey && this.prevKey == 'EQ') this.clear();
          this.setDecimal();
          break;

        case 'TN':
          if (this.prevKey && this.prevKey == 'EQ') this.clear();
          this.setNegative();
          break;

        case 'CLR':
          this.clear();
          break;

        case 'CE':
          this.clearEntry();
          break;

        case 'STR':
          if (!this.prevKey) {
            return;
          } else if (this.prevKey == 'EQ') {
            this.str = this.a;
          } else if (this.prevKey[0] == 'N' && !this.operation) {
            this.str = this.a;
          } else {
            this.a = this.str;
          }
      }
    }
    this.updateScreen();
    this.prevKey = id;
  }

  updateScreen() {
    var outA = undefined;

    if (this.decimal == 0) {
      outA = String(this.a);
    } else if (this.decimal == 1) {
      outA = String(this.a) + '.';
    } else {
      outA = this.a.toFixed(this.decimal - 1);
    }

    document.getElementById('OUTA').innerHTML = outA
  }

  appendNumber(id) {
    this.a = Math.abs(this.a);
    if (this.decimal > 0) {
      this.a = this.a + (this.numbers[id] / Math.pow(10, this.decimal));
      this.decimal++;
    } else {
      this.a = (this.a * 10) + this.numbers[id];
    }
    if (this.negative) {
      this.a = -this.a;
    }
  }

  setOperation(id) {
    if (this.operation) document.getElementById(this.operation).classList.remove('btnhold');
    this.operation = id;
    document.getElementById(id).classList.add('btnhold');
  }

  computeResult(a, b) {
    switch (this.operation) {
      case undefined:
        return a;
      case 'O_ADD':
        return b + a;
      case 'O_SUB':
        return b - a;
      case 'O_MUL':
        return b * a;
      case 'O_DIV':
        return b / a;
      case 'O_EXP':
        return Math.pow(b, a);
      case 'O_SQT':
        return Math.pow(b, 1 / a);
      case 'O_LOG':
        return Math.log(b) / Math.log(a);
      case 'O_EE':
        return b * Math.pow(10, a);
    }
  }

  setDecimal() {
    if (this.decimal == 0) this.decimal = 1;
  }

  setNegative() {
    this.negative = true;
    this.a = -this.a;
  }

  clear() {
    if (this.operation) document.getElementById(this.operation).classList.remove('btnhold');
    this.a = 0;
    this.b = 0;
    this.decimal = 0;
    this.operation = undefined;
    this.negative = false;
    this.prevKey = undefined;
  }

  clearEntry() {
    this.a = 0;
    this.decimal = 0;
    this.negative = false;
  }

  more() {
    if (this.moreButtons) {
      document.getElementById('O_ADD').classList.remove('none');
      document.getElementById('O_SUB').classList.remove('none');
      document.getElementById('O_MUL').classList.remove('none');
      document.getElementById('O_DIV').classList.remove('none');
      document.getElementById('O_EXP').classList.add('none');
      document.getElementById('O_SQT').classList.add('none');
      document.getElementById('O_LOG').classList.add('none');
      document.getElementById('O_EE').classList.add('none');
      document.getElementById('MORE').classList.remove('btnhold');
      this.moreButtons = false;
    } else {
      document.getElementById('O_ADD').classList.add('none');
      document.getElementById('O_SUB').classList.add('none');
      document.getElementById('O_MUL').classList.add('none');
      document.getElementById('O_DIV').classList.add('none');
      document.getElementById('O_EXP').classList.remove('none');
      document.getElementById('O_SQT').classList.remove('none');
      document.getElementById('O_LOG').classList.remove('none');
      document.getElementById('O_EE').classList.remove('none');
      document.getElementById('MORE').classList.add('btnhold');
      this.moreButtons = true;

    }
  }
}

var calc = new Calculator;