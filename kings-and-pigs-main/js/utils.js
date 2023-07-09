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
      if (symbol === 5858 || symbol === 258) {
        // push a new collision into collisionblocks array
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 64,
              y: y * 64,
            },
          })
        )
      }
    })
  })

  return objects
}
