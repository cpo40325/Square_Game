import MainFacade from "../ＭainFacade";

	
 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Game extends cc.Component{

    facade: MainFacade;

    start () {

        this.facade = new MainFacade();
        cc.debug.setDisplayStats(false);
        cc.director.loadScene("SceneStart");
    }


}
