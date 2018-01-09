import {TILES} from './tile.js';
import {init2DArray} from './util.js'
import ROT from 'rot-js';


export class Map {
  constructor(xdim, ydim){
    this.xdim = xdim || 1;
    this.ydim = ydim || 1;
    //this.tileGrid = init2DArray(this.xdim, this.ydim, TILES.NULLTILE);
    this.tileGrid = TILE_GRID_GENERATOR['basicCaves'](xdim, ydim)
  }
  render(display, cameraX, cameraY){
    let cx = 0;
    let cy = 0;
    let xstart = cameraX - Math.trunc(display.getOptions().width / 2);
    let xend = xstart + display.getOptions().width;
    let ystart = cameraY - Math.trunc(display.getOptions().height / 2);
    let yend = ystart + display.getOptions().height;
    for(let xi=xstart;xi<xend;xi++){
      for(let yi=ystart;yi<yend;yi++){
        this.getTile(xi, yi).render(display, cx, cy);
        cy++;
      }
      cy = 0;
      cx++;
    }
  }

  getTile(mapx, mapy){
    if (mapx < 0 || mapx > this.xdim - 1 || mapy < 0 || mapy > this.ydim - 1){
      return TILES.NULLTILE;
    }
    return this.tileGrid[mapx][mapy];
  }
}

let TILE_GRID_GENERATOR = {
  basicCaves: function(xdim, ydim) {
    let tg = init2DArray(xdim, ydim, TILES.NULLTILE);
    let gen = new ROT.Map.Cellular(xdim, ydim, {connected: true});
    gen.randomize(.5);
    for (var i = 3; i > 0; i--){
      gen.create();
    }
    gen.connect(function(x, y, isWall){
      tg[x][y] = (isWall || x==0 || y==0 || x==xdim-1 || y==ydim-1) ? TILES.WALL : TILES.FLOOR;
    });
    return tg;
  }
}
