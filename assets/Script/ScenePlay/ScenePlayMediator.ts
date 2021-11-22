import GameProxy from "../Game/GameProxy";
import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import NotificationMap from "../Map/NotificationMap";
import MainFacade from "../ＭainFacade";
import ScenePlay from "./ScenePlay";
import Square from "./Square";


export default class ScenePlayMediator extends KYPureMediator {
    static NAME = "ScenePlayMediator";

    squareArray: Square[] = [];

    time: number = 0;

    constructor(viewComponent) {
        super(ScenePlayMediator.NAME, viewComponent);
    }


    onRegister(){
        this.initScene();
        this.setTimer();

    }


    /**
     * 計時器
     */
    setTimer(){
        let labelTime = this.getComponent().node.getChildByName("LabelTime").getComponent(cc.Label);
        
        this.getComponent().schedule(()=>{
            this.time++;
            labelTime.string = "Time: " + this.time;
            this.sendNotification(CommandMap.UPDATE_TIME, this.time);
                },1);

    }

    initScene(){
        this.updateTarget(1);
        let proxy :GameProxy = MainFacade.getInstance().retrieveProxy(GameProxy.NAME);
        this.updateTotal(proxy.total);
    }

    getComponent(): ScenePlay {
        return super.getComponent();
    }


    listNotificationInterests(): string[] {
        return [NotificationMap.POP_SQUARE_ARRAY,
        NotificationMap.UPDATE_TARGET,
        NotificationMap.UPDATE_TOTAL];
    }

    handleNotification(notification: KYPureNotification) {
        
        switch (notification.getName()) {

            case NotificationMap.POP_SQUARE_ARRAY:

                this.popSquareArray();
                break;
            case NotificationMap.UPDATE_TARGET:
                this.updateTarget(notification.getBody());
                break;
            case NotificationMap.UPDATE_TOTAL:
                this.updateTotal(notification.getBody());
                break;

        }
    }

    /**
     * 更新total
     */
    updateTotal(total) {
        // console.log("updateTotal");
        
        let labelTotal = this.getComponent().node.getChildByName("LabelTotal").getComponent(cc.Label);
        labelTotal.string = "Total: " + total;
    }

    /**
     * 更新target
     */
    updateTarget(target) {
        // console.log("updateTarget");
        let labelTarget = this.getComponent().node.getChildByName("LabelTarget").getComponent(cc.Label);
        labelTarget.string = "Target: " + target;
    }

    /**
     * 陣列取出
     */
    popSquareArray() {
        let square: Square = this.squareArray.pop();

    }


    /**
     * 添加方塊到場景
     */
    addSquare() {


        let proxy: GameProxy = this.getFacade().retrieveProxy(GameProxy.NAME);


        for (let i = 1; i <= proxy.total; i++) {


            let node = cc.instantiate(this.getComponent().squarePrefab);

            let square: Square = node.getComponent("Square");

            square.no = i;

            node.setPosition(480 - Math.random()*960, 320 - Math.random()*640    );
            node.zIndex = proxy.total - i;
            this.getComponent().node.getChildByName("Layout").addChild(node);
            
            this.squareArray.unshift(square);
        }



    }
}
