import DS from 'ember-data';
import palette from 'npm:google-material-color';
import { random } from 'lodash';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name  : attr('string'),
  color : attr('string', {
    defaultValue: () => {
      const shades = ['600', '700', '800', '900'];
      return palette.random(shades[random(0, 3)]);
    }
  }),
  description : attr('string'),
  imageUrl    : attr('string'),

  sessions : hasMany('session'),
  event    : belongsTo('event')
});
