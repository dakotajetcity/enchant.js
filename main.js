'use strict';
enchant();

var game;
var gs = {
	height:320
	,width:320
	,fps:30
};

window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
	game.onload = function(){};
	game.start();
};

