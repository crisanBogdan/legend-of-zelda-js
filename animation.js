
class TextAnimation {
  _text;
  _animate;
  _frame = 0;
  _charsToShow = 1;
  _textLength = 0;

  constructor(text, animate) {
    this._text = text;
    this._animate = animate;
    this._textLength = text.reduce((acc, line) => acc + line.text.length, 0);
  }

  getText() {
    if (!this._animate) {
      return this._text;
    }
    this._frame++;
    if (this._frame === 5) {
      this._frame = 0;
      this._charsToShow++;
    }
    if (this._charsToShow === this._textLength) {
      this._animate = false;
      return this.getText();
    }
    let charsToShow = this._charsToShow;

    return this._text.reduce((acc, line) => {
      if (charsToShow < 0) return acc;
      acc.push({ ...line, text: line.text.slice(0, charsToShow) });
      charsToShow -= line.text.length;
      return acc;
    }, []);
  }
}