'use strict';
enchant();

var game;
var gs = {
	height:320
	,width:320
	,fps:30
};

// 穴クラスの定義
var Pit = Class.create(Sprite,{
    initialize:function(x,y){
        Sprite.call (this,48, 48);
        this.image = game.assets['assets/mogura.png'];
        this.x = x;
        this.y = y;
        this.mode = 0;
    },
    move:function(){
        if (game.frame % 3 != 0){
            return;
        }
        switch (this.mode) {
            // 穴から出てくる
            case 0:
                this.frame++;
                if (this.frame > 4 -1 ){
                    this.mode = 1;
                }
                break;
            // 穴に隠れる
            case 1:
                this.frame--;
                if (this.frame < 1) {
                    this.mode = 0;
                }
                break;
        }
    },
    onenterframe:function(){
        this.move();
    }
});

window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
    game.preload('assets/mogura.png');
	game.onload = function(){
        var pit = new Pit(100, 100);
        game.rootScene.addChild(pit);
    };
	game.start();
};

