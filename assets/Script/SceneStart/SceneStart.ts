import MainFacade from "../ＭainFacade";
import SceneStartMediator from "./SceneStartMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneStart extends cc.Component {


    start () {

        MainFacade.getInstance().registerMediator(new SceneStartMediator(this));

    }

    onDestroy(){
        MainFacade.getInstance().removeMediator(SceneStartMediator.NAME);
    }
}
