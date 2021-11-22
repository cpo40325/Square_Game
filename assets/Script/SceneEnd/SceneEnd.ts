import MainFacade from "../ＭainFacade";
import SceneEndMediator from "./SceneEndMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneEnd extends cc.Component {

    start () {

        MainFacade.getInstance().registerMediator(new SceneEndMediator(this));

    }


    onDestroy(){
        MainFacade.getInstance().removeMediator(SceneEndMediator.NAME);
    }

}
