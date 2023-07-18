Array.prototype.parse2D = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 128) {
    rows.push(this.slice(i, i + 128))
  }

  return rows
}

Array.prototype.createObjectsFrom2D = function () {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 5857 ||symbol=== 1454) {
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
            symbol: symbol,
            isLethal: false,
          })
        );
      } else if (symbol === 5856 ||symbol=== 1453) {
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
            symbol: symbol,
            isLethal: true,
          })
        );
      }
      
    });
  });

  

  return objects
}
