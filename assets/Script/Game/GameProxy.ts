import KYPrueProxy from "../KYCreatorSDK/DesignPatterns/KYPrueMVC/Proxy/KYPureProxy";
import NotificationMap from "../Map/NotificationMap";


export default class GameProxy extends KYPrueProxy {

    static NAME = 'GameProxy';

    target: number;
    time: number;
    total: number;


    constructor() {
        super(GameProxy.NAME);
    }



    /**
     * 初始化後載入場景
     */
    updateAndStart(c: number) {
        this.total = c;
        this.target = 1;
        this.time = 0;
        cc.director.loadScene("SceneReady");
    }



    updateTime(t) {
        this.time = t;
    }
    /**
     * 更新後銷毀方塊
     */
    updateAndDestroy() {
        //先銷毀在+
        this.sendNotification(NotificationMap.DESTROY_SQUARE_NOTIFICATION, this.target);
        this.target++;


        this.total--;
        //全銷毀則載入場景SceneEnd
        if (this.total == 0) {
            cc.director.loadScene("SceneEnd");
        } else {
            this.sendNotification(NotificationMap.UPDATE_TARGET, this.target);
            this.sendNotification(NotificationMap.UPDATE_TOTAL, this.total);

            this.sendNotification(NotificationMap.POP_SQUARE_ARRAY);
        }

    }
}
