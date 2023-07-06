//Let's setup the basic, a macro for the size of each tiles and one function to check tiles data
#macro TILES 64

function getTiles(_x, _y, _stringTilesLayer){
        var _layerId = layer_get_id(_stringTilesLayer);
        var _mapId = layer_tilemap_get_id(_layerId);
        return tilemap_get_at_pixel(_mapId, _x, _y);
}

//now we ini the surface we are going to use
var mapWidht = room_width div TILES;
var mapHeight = room_height div TILES;
surface = surface_create(mapWidht, mapHeight);

surface_set_target(surface);
draw_clear_alpha(c_black, 0);

//we loop the map, if we meet a tiles (the room editor tiles layer is named Tiles_collisions here) , we draw a dot to the surface
for (var i = 0; i < mapWidht; ++i){
    for (var j = 0; j < mapHeight; ++j){   
        if (getTiles(i * TILES, j * TILES, "Tiles_collisions") != 0){
            draw_point_color(i, j, c_black);
        }
    }
}

surface_reset_target();

//now we build a sprite using this surface and use it as collision mask (using precise collision)
collisionMask = sprite_create_from_surface(surface, 0, 0, room_width, room_height, false, false, 0, 0);
sprite_collision_mask(collisionMask, false, 1, 0, 0, 0, 0, bboxkind_precise, 0);

sprite_index = collisionMask;
mask_index = collisionMask;
image_xscale = TILES;
image_yscale = TILES;

//note you can turn visible on to preview collisions
visible = false;