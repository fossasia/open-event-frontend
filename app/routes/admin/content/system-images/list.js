import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken() {
    return this.l10n.t('Subtopics');
  },
  model(params) {
    this.set('params', params);
    if (this.get('params.topic_id') === 'other') {
      return (
        [
          {
            id          : 4545,
            name        : 'avatar',
            placeholder : {
              originalImageUrl : 'https://placeimg.com/360/360/any',
              copyright        : 'All rights reserved',
              origin           : 'Google Images'
            }
          },
          {
            id          : 4545,
            name        : 'logo',
            placeholder : {
              originalImageUrl : 'http://via.placeholder.com/350x150',
              copyright        : 'All rights reserved',
              origin           : 'Google Images'
            }
          }
        ]
      );
    }
    return (
      [
        {
          id          : 1,
          name        : 'Auto',
          placeholder : {
            originalImageUrl : 'https://placeimg.com/360/360/any',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 1,
          name        : 'Bikes',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 2,
          name        : 'Boat',
          placeholder : {
            originalImageUrl : 'https://placeimg.com/360/360/any',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 3,
          name        : 'Donation',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 4,
          name        : 'Photography',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 3,
          name        : 'Random',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 4,
          name        : 'Random',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 4,
          name        : 'Dummyy text',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        },
        {
          id          : 2,
          name        : 'Dummy',
          placeholder : {
            originalImageUrl : 'https://something.com/image.png',
            copyright        : 'All rights reserved',
            origin           : 'Google Images'
          }
        }
      ]
    );
  }
});
