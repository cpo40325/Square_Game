import MainFacade from "../ＭainFacade";
import SquareMediator from "./SquareMediator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Square extends cc.Component {


    no: number;
    anim: cc.Animation;
    label: cc.Label;
    start () {

        this.label = this.node.getChildByName("Number").getComponent(cc.Label);
        this.anim = this.node.getComponent(cc.Animation);
   
        this.label.string = ""+this.no;
        MainFacade.getInstance().registerMediator(new SquareMediator("Square_" + this.uuid ,this));

    }


    onDestroy(){
        MainFacade.getInstance().removeMediator("Square_" + this.uuid);
    }


    /**
     * 計時
     */
    t:number = 0;
    
    /**
     * 移動間格時間變數
     */
    delta:number = 1 + Math.floor(Math.random()*5);
   
    update(dt){

        this.t+= dt;

        if(this.t>this.delta){

            this.move();
            this.t =0;

        }

    }

    /**
     * 方塊移動
     */
    move(){
      
           let action = cc.moveTo(1, cc.v2(480 - Math.random()*960, 320 - Math.random()*640));

            action.easing(cc.easeIn(2.0));
            this.node.runAction(action);


    }

}
