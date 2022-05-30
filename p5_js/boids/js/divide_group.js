class DivideGroup {
  constructor(w, h, r) {
    this.r = r;
    this.groups = [];
    this.row_length = Math.ceil(w / r);
    this.count = this.row_length * Math.ceil(h / r);

    for (let i = 0; i < this.count; i++) {
      this.groups.push([]);
    }
  }

  update(obj) {
    const i =
      Math.floor(obj.position.y / this.r) * this.row_length +
      Math.floor(obj.position.x / this.r);
    if (i !== obj.group) {
      if (obj.group !== undefined) {
        // 更新処理
        const before = this.groups[obj.group];
        const ii = obj.group_index;
        before[ii] = before[before.length - 1];
        before[ii].group_index = ii;
        before.pop();
      }
      obj.group = i;
      obj.group_index = this.groups[i].length;
      this.groups[i].push(obj);
    }
  }

  get_near_objs(obj) {
    let all = [];
    let y = Math.floor(obj.group / this.row_length);
    let x = obj.group - y * this.row_length;
    let i = obj.group - 1 - this.row_length;
    x--;
    y--;
    x *= this.r;
    y *= this.r;
    // 1からスタート

    // 1 2 3
    // 4 5 6
    // 7 8 9
    for (let cnt = 1; cnt <= 9; cnt++) {
      if (cnt % 3 === 0) {
        this.concat(all, i, x, y);
        i += this.row_length - 2;
        x -= this.r + this.r;
        y += this.r;
      } else {
        this.concat(all, i, x, y);
        i++;
        x += this.r;
      }
    }

    return all;
  }

  concat(all, i, x, y) {
    if (x >= 0 && y >= 0 && x < width && y < height) {
      all.push(this.groups[i]);
    }
  }
}
