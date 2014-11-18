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
        this.image = game.assets['./assets/mogura.png'];
        this.x = x;
        this.y = y;
        this.mode = 2;
        this.nextMode = 0;
        this.waitFor = game.frame + rand(100);
        this.hitflag = false;
    },
    move:function(){
        switch (this.mode) {
            // 穴から出てくる
            case 0:
            // console.log("0");
                this.frame++;
                if (this.frame > 4 -1 ){
                    // 待ったあとに遷移するモードは1(隠れる)
                    this.changeMode(1,30);
                }
                break;
            // 穴に隠れる
            case 1:
            // console.log("1");
                this.frame--;
                if (this.frame < 1) {
                    // 待った後に遷移するモードは0(出現)
                    this.changeMode(0,200);

                    // ドロイド君の最大数を減らす
                    if (--maxDroid < 1) {
                        this.mode = 3;
                    }
                }
                break;
            case 2:
            // console.log("2");
                if (game.frame > this.waitFor) {
                    this.mode = this.nextMode;
                }
                break;
            // 何もしない (穴からドロイド君が表示されない)
            case 3:
                break;
        }
    },
    changeMode:function(nextMode,random) {
        // 出きったら、モード2(待つ)へ
        this.mode = 2;
        this.nextMode = nextMode;
        this.waitFor = game.frame + rand(random);
    },
    onenterframe:function(){
        if (game.frame % 2 != 0) {
            this.move();
        }
    },
    ontouchstart:function() {
        this.hit();
    },
    hit:function() {
        if (this.frame > 1 && this.frame < 5) {
            // this.hitflag = true;
            this.frame = 5;
            // this.changeMode(1,100);
            // 参考書の書き方
            this.nextMode = 1;
            this.waitFor = game.frame + 10;

            // スコアを加算する処理
            score.add(1);
        }
    }
});

var Score = Class.create(Label,{
    initialize:function(x,y) {
        Label.call(this);
        this.x = x || 5;
        this.y = y || 5;
        this.text = "SCORE : 0";
        this.font = "14px bold Meiryo";
        this.score = 0;
    },
    add:function(point) {
        this.score += point;
        this.text = "SCORE : " + this.score;
    }
});

var score;
var maxDroid = 30;
window.onload = function(){
	game = new Core(gs.width,gs.height);
	game.fps = gs.fps;
    game.preload('./assets/mogura.png');
	game.onload = function(){

        // スコアの表示
        score = new Score();
        game.rootScene.addChild(score);
        // 汎用性の高いやり方
        var offset = {x:40, y: 40};
        var size = 48;
        var split = 5;

        for (var i = 0; i < split * split; i ++) {
            var pit = new Pit(
                size * (i % split) + offset.x
                ,size * ~~(i /split) + offset.y
            );
            game.rootScene.addChild(pit);
        }
        // gameover.png
    };
	game.start();
};

function rand(num){
    return ~~(Math.random() * num);
}
