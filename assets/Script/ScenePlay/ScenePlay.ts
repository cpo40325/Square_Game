import MainFacade from "../ＭainFacade";
import ScenePlayMediator from "./ScenePlayMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScenePlay extends cc.Component {


    @property(cc.Prefab)
    squarePrefab: cc.Prefab = null;


    start() {

        let m = new ScenePlayMediator(this);
        MainFacade.getInstance().registerMediator(m);
        m.addSquare();

    }

    onDestroy(){
        MainFacade.getInstance().removeMediator(ScenePlayMediator.NAME);
    }




}
