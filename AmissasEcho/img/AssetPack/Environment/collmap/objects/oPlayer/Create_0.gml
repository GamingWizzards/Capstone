#region functions
	function playerMove(){
		var _keyLeft = keyboard_check(vk_left);
		var _keyRight = keyboard_check(vk_right);
		var _keyUp = keyboard_check(vk_up);
		var _keyDown = keyboard_check(vk_down);
		var _speed = 2;
		
		if ((_keyLeft) && (!place_meeting(x - _speed, y, oMap))){
			x -= _speed;
		}else if ((_keyRight) && (!place_meeting(x + _speed, y, oMap))){
			x += _speed;
		}
		
		if ((_keyUp) && (!place_meeting(x, y - _speed, oMap))){
			y -= _speed;
		}else if ((_keyDown) && (!place_meeting(x, y + _speed, oMap))){
			y += _speed;
		}
		
	}
	
	function showCollisionMask(){
		var _debugMask = keyboard_check_pressed(vk_space);

		if (_debugMask){
			oMap.visible = !oMap.visible;
		}
	}
#endregion