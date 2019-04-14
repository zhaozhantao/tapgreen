import Cube from "./Cube";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    Cube:cc.Prefab = null;
    @property(cc.Node)
    gameNode:cc.Node = null;
    @property(cc.Node)
    gameOverNode:cc.Node = null;
    @property(cc.Label)
    scoreLabel:cc.Label = null;
    // 游戏是否在进行中
    static gaming = true;
    // 游戏进行时长
    private gameTime = 0;
    // 最近一次判定产生方块的时间
    private lastRandGenCube = 0;

    private score:number = 0;
    start () {
        this.restartGame();
    }
    restartGame() {
        Game.gaming = true;
        this.gameOverNode.x = 10000;
        this.scoreLabel.string = "0";
        this.gameNode.removeAllChildren();
        this.lastRandGenCube = 0;
        this.gameTime = 0;
    }
    update(dt) {
        if (!Game.gaming) {
            return;
        }
        this.gameTime += dt;
        if (this.gameTime - this.lastRandGenCube > 1 - this.score * 1/50) {
            this.lastRandGenCube = this.gameTime;
            if (Math.random() < 0.5) {
                this.genCube();
            }
        }
    }
    /** 产生方块 */
    private genCube() {
        let cubeNode = cc.instantiate(this.Cube);
        let cube = cubeNode.getComponent(Cube);
        cubeNode.parent = this.gameNode;
        cubeNode.x = Math.random() * (this.gameNode.width - cubeNode.width) - (this.gameNode.width - cubeNode.width)/2;
        cubeNode.y = this.gameNode.height / 2 + cubeNode.height/2;
        cube.speed = Math.random() * 450 + 300 + this.score * 1000 / 50;
        if (Math.random() < 0.8) {
            cube.setGreen();
        }
        cube.scoreCb = ()=>{
            this.score++;
            this.scoreLabel.string = String(this.score);
            cubeNode.destroy();
        };
        cube.overCb = ()=>{
            Game.gaming = false;
            this.gameOverNode.x = 0;
        };
        }
}
