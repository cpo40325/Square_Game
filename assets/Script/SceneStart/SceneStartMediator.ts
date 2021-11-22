import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import SceneStart from "./SceneStart";


export default class SceneStartMediator extends KYPureMediator {


    static NAME = 'SceneStartMediator';

    constructor(viewComponent){
        super(SceneStartMediator.NAME, viewComponent);
    }

    handleNotification(n:KYPureNotification){
    }

    listNotificationInterests(): string[]{
        return [CommandMap.CHOOSE_STAGE];
    }

    /**
     * 註冊關卡點擊事件
     */
    onRegister(){

        this.getComponent().node.getChildByName("Sprite5").on("click", function(){
            this.sendNotification(CommandMap.CHOOSE_STAGE, 5);
        }, this);


        this.getComponent().node.getChildByName("Sprite10").on("click", function(){
            this.sendNotification(CommandMap.CHOOSE_STAGE, 10);
        }, this);
        
        this.getComponent().node.getChildByName("Sprite15").on("click", function(){
            this.sendNotification(CommandMap.CHOOSE_STAGE, 15);
        }, this);

    }



    getComponent() : SceneStart{
        return super.getComponent();
    }
}
