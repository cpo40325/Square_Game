
const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneReady extends cc.Component {

    start () {

        let anim: cc.Animation = this.node.getChildByName("SpriteReady").getComponent(cc.Animation);

        /**
         * Ready動畫結束後, 載入場景ScenePlay
         */
        anim.once("finished", function(){

            cc.director.loadScene("ScenePlay");

        }, this);
        anim.play("Ready");
        
    }

}
