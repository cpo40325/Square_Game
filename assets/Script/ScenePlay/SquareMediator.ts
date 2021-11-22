import KYPureMediator from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Mediator/KYPureMediator";
import KYPureNotification from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Observer/KYPureNotification";
import CommandMap from "../Map/CommandMap";
import NotificationMap from "../Map/NotificationMap";
import ScenePlayMediator from "./ScenePlayMediator";
import Square from "./Square";


export default class SquareMediator extends KYPureMediator {

 
    handleNotification(notification: KYPureNotification) {
        switch (notification.getName()) {
            case NotificationMap.DESTROY_SQUARE_NOTIFICATION:
                if (notification.getBody() == this.getComponent().no) {
                    this.destroySquare();
                }
                break;
        }
    }
    listNotificationInterests(): string[] {

        return [NotificationMap.DESTROY_SQUARE_NOTIFICATION];

    }

    onRegister() {
        this.getComponent().node.on(cc.Node.EventType.MOUSE_ENTER, this.mouseIn, this);
    }


    /**
     * 滑鼠移入方塊
     */
    mouseIn() {

        console.log('mouseIn');

        let mediator: ScenePlayMediator = this.getFacade().retrieveMediator(ScenePlayMediator.NAME);
        let array = mediator.squareArray;

        //判斷指到的數字和陣列第一個加入一樣時, 下銷毀指令
        if (array[array.length - 1].no == this.getComponent().no) {
            this.sendNotification(CommandMap.DESTROY_SQUARE);
        }
        // var action = cc.scaleTo(0.5, 2, 2);
        // action.easing(cc.easeIn(3.0));


    }


 
    /**
     * 方塊銷毀
     */
    destroySquare() {

        console.log("destroySquare");

        //播完動畫銷毀
        let self = this;
        this.getComponent().anim.once("finished", function () {

            self.getComponent().node.destroy();

        }, this);
        this.getComponent().anim.play("Square");

    }


    getComponent(): Square {
        return super.getComponent();
    }



}
