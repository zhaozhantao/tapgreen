import Cube from "./Cube";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    Cube:cc.Prefab = null;
    @property(cc.Node)
    gameNode:cc.Node = null;
    @property(cc.Label)
    scoreLabel:cc.Label = null;


    private score:number = 0;
    start () {

    }
    update() {
        if (Math.random() < 0.01) {
            let cubeNode = cc.instantiate(this.Cube);
            let cube = cubeNode.getComponent(Cube);
            cubeNode.parent = this.gameNode;
            cubeNode.x = Math.random() * (this.gameNode.width - cubeNode.width) - (this.gameNode.width - cubeNode.width)/2;
            cubeNode.y = this.gameNode.height / 2 + cubeNode.height/2;
            cube.speed = Math.random() * 50 + 100;
            cube.clickCb = ()=>{
                this.score++;
                this.scoreLabel.string = String(this.score);
                cubeNode.destroy();
            };
        }
    }
}
