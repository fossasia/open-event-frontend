import Ember from 'ember';

export default Ember.Component.extend({
  isShowing : false,
  notifications : ["The first things left to do here","The second things left to do here","this is 3rd"],
  countShow : true,
  actions : {
    notification_show(){
      if(this.isShowing==false){
        this.set('isShowing',true);
      }
      else
        this.set('isShowing',false);
    },
    setCountShow(){
      this.set('countShow',false);
    },
    showPop(){
      console.log("single");
      $(' .par').popup({
        popup : '.popup',
        on    : 'click'
      })
    }

  }
});



