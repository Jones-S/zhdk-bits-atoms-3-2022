class PntTIFF {
  constructor(x, y, colVal, scale) {
    this.x = x;
    this.y = y;
    this.colVal = colVal;
    this.scale = scale;
  }

  pushToArray(potVal, potential) {
    potVal.x = this.x;
    potVal.y = this.y;
    potVal.stC = this.colVal;
    potVal.stW =
      map(brightness(this.colVal), 0, 255, 1.2, 8) *
      map(brightness(this.colVal), 0, 255, 1.2, 8) *
      this.scale;
    potential.push(JSON.parse(JSON.stringify(potVal)));
  }
}
