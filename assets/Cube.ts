import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cube extends cc.Component {

    speed:number = 50;
    scoreCb:Function = null;
    overCb:Function = null;
    private isGreen = false;
    mainClick () {
        if (this.isGreen) {
            this.scoreCb();
        } else {
            this.overCb();
        }
    }
    update (dt) {
        if (!Game.gaming) {
            return;
        }
        this.node.y -= this.speed * dt;
        if (this.isGreen && this.node.y < -cc.winSize.height/2) {
            this.overCb();
        }
    }
    setGreen() {
        this.isGreen = true;
        this.node.color = cc.Color.GREEN;
    }
    getGreen() {
        return this.isGreen;
    }
}
