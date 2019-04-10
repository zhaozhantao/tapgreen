
const {ccclass, property} = cc._decorator;

@ccclass
export default class Cube extends cc.Component {

    speed:number = 50;
    clickCb:Function = null;
    mainClick () {
        this.clickCb();
    }
    update (dt) {
        this.node.y -= this.speed * dt;
    }
}
