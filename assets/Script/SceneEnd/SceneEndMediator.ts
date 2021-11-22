import GameProxy from "../Game/GameProxy";
import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import MainFacade from "../ＭainFacade";
import SceneEnd from "./SceneEnd";


export default class SceneEndMediator extends KYPureMediator {


    static NAME = "SceneEndMediator";

    constructor(viewComponet){
        super(SceneEndMediator.NAME, viewComponet);
    }


    handleNotification(notification: KYPureNotification){

        switch(notification){

        }

    }
    listNotificationInterests():string[]{
        return[];
    }



    setView(){
        
        let proxy :GameProxy = MainFacade.getInstance().retrieveProxy(GameProxy.NAME);

        this.getComponent().node.
        getChildByName("LabelTime").
        getComponent(cc.Label).string = "Time: "+proxy.time;

        
        this.getComponent().node.getChildByName("LabelPlay").on("click",()=>{
            cc.director.loadScene("SceneStart");
        },this);
    }

    getComponent(): SceneEnd{
        return super.getComponent();
    }
    onRegister(){

        this.setView();

    }

}
