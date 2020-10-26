import { A } from '@ember/array';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  classNames: ['ui', 'basic', 'segment'],

  socialLinks: A(),

  twitterLink: computed('socialLinks.[]', function() {
    return this.socialLinks.findBy('isTwitter', true);
  }),
   calender:computed('eventtime','eventtimeends','eventname','eventlocation',function(){
   let startparams=this.get('eventtime');
   let endparams=this.get('eventtimeends');
   const starttime=moment(startparams).tz("Asia/Kolkata").utc().format('YYYYMMDD[T]HHmmSS[Z]');
   const endtime=moment(endparams).tz("Asia/Kolkata").utc().format('YYYYMMDD[T]HHmmSS[Z]');
   return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${starttime}/${endtime}&text=${this.get('eventname')}&location=${this.get('eventlocation')}&sf=true`;

  })
});
