'use strict';
enchant();

var game;
var gs = {
	height:320
	,width:320
	,fps:30
};

var ePad = Class.create(Pad,{
	initialize:function(){
		Pad.call(this);
		this.moveTo(0,220);
		game.rootScene.addChild(this);
	}
});

//背景の生成
var BackGround = Class.create(Sprite,{
	initialize:function(){
		Sprite.call(this,game.width,game.height);
		this.backgroundColor = 'rgb(0, 200, 255)';
		this.image = this.createImage();
		game.rootScene.addChild(this);
	},
	createImage:function(){
		var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(game.width,game.height);
        var size = 16;
        for (var i = 0; i < game.width; i += size) {
            image.draw(maptip, 7 * size, 0, 16, 16, i, game.height - size, size, size);
        }
        return image;
	}
});

var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

//クマの生成
var Bear = Class.create(Sprite,{
	initialize:function(){
		Sprite.call(this,32,32);
		this.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
        this.x      = (game.width - this.width) / 2;
        this.y      = game.height - this.height - 16;
        this.status = STATUS_WAIT;
        //this.anim   = [10, 11, 10, 12];
        this.frame  = [10, 11, 10, 12];
        game.rootScene.addChild(this);
	},
	onenterframe:function(){
		if (game.input.right){
			this.scaleX = 1;
			this.x += 5;
			if (this.x + this.width > game.width){
				this.x = game.width -this.width;
			}
		}
		if (game.input.left){
			this.scaleX = -1;
			this.x -= 5;
			if (this.x < 0){
				this.x = 0;
			}
		}
	}
});

window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;

	//画像の読み込み
    game.preload('http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif');

    //ロード完了時に呼ばれる
	game.onload = function(){
		// new BackGround();
        // new Bear();
        // new ePad();
        var map = new Map(16,16);
        map.image = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        map.loadData(lines(20, 20, 7));

function lines(rownum,colnum,value){
	var rows = [];
	var empty = -1;
	for (var i = 0; i < rownum -1; i++){
		rows.push(line(colnum,empty));
	};
	rows.push(line(colnum,value));
	return rows;
	
	function line(colnum,value){
		var cols = [];
		for (var i = 0; i < colnum; i++){
			cols.push(value);
		};
		return cols;
	}
}

    game.rootScene.addChild(map);

    };
	game.start();
};

/*
var STATUS_WAIT = 0;
var STATUS_WALK = 1;
var STATUS_JUMP = 2;

enchant();
window.onload = function() {
    //ゲームオブジェクトの生成
    var game = new Game(320, 320);
    game.fps = 16;

    //画像の読み込み
    game.preload('http://enchantjs.com/assets/images/chara1.gif',
        'http://enchantjs.com/assets/images/map0.gif');

    //ロード完了時に呼ばれる
    game.onload = function() {
        //背景の生成
        var bg = new Sprite(320, 320);
        bg.backgroundColor = "rgb(0, 200, 255)";
        var maptip = game.assets['http://enchantjs.com/assets/images/map0.gif'];
        var image = new Surface(320, 320);
        for (var i = 0; i < 320; i += 16) {
            image.draw(maptip, 7 * 16, 0, 16, 16, i, 320 - 16, 16, 16);
        }
        bg.image = image;
        game.rootScene.addChild(bg);
        
        //バーチャルパッドの生成
        var pad = new Pad();
        pad.x   = 0;
        pad.y   = 220;
        game.rootScene.addChild(pad);

        //クマの生成
        var bear = new Sprite(32, 32);
        bear.image  = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
        bear.x      = 160 - 16;
        bear.y      = 320 - 16 - 32;
        bear.status = STATUS_WAIT;
        bear.anim   = [10, 11, 10, 12];
        bear.frame  = 10;
        game.rootScene.addChild(bear);
        
        //クマの定期処理
        bear.tick = 0;
        bear.addEventListener(Event.ENTER_FRAME, function() {
            //上
            if (bear.status != STATUS_JUMP) {
                bear.status = STATUS_WAIT;
                if (game.input.up)  {
                    bear.status = STATUS_JUMP;
                    bear.tick = 0;
                }
            }
            //左
            if (game.input.left)  {
                bear.x -= 3;
                bear.scaleX = -1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }
            //右
            else if (game.input.right) {
                bear.x += 3;
                bear.scaleX =  1;
                if (bear.status != STATUS_JUMP) bear.status = STATUS_WALK;
            }
            //ジャンプ中
            if (bear.status == STATUS_JUMP) {
                if (bear.tick < 8) {
                    bear.y -= 8;
                } else if (bear.tick < 16) {
                    bear.y += 8;
                } else {
                    bear.status = STATUS_WAIT;
                }
            }
            
            //フレームの指定
            bear.tick++;
            if (bear.status == STATUS_WAIT) {
                bear.frame = bear.anim[0];            
            } else if (bear.status == STATUS_WALK) {
                bear.frame = bear.anim[bear.tick % 4];            
            } else if (bear.status == STATUS_JUMP) {
                bear.frame = bear.anim[1];            
            }
        });
    };
    
    //ゲームの開始
    game.start();
};
*/

