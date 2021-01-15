
import { module, test } from 'qunit';
import { extractYoutubeUrl } from 'open-event-frontend/utils/url';

module('Unit | URL | URL Utils Test', function() {
  test('test youtube URL extractor', function(assert) {
    assert.equal(extractYoutubeUrl(null), null);
    assert.equal(extractYoutubeUrl('https://hello.mate'), null);
    assert.equal(extractYoutubeUrl('not even a url'), null);
    assert.equal(extractYoutubeUrl(''), null);
    assert.equal(extractYoutubeUrl('https://www.not-youtube.com/watch?v=dUxVR8oSzLU'), null);
    assert.equal(extractYoutubeUrl('http://youtube.com/watch?v=dUxVR8oSzLU'), 'dUxVR8oSzLU');
    assert.equal(extractYoutubeUrl('https://youtube.com/watch?v=dUxVR8oSzLU'), 'dUxVR8oSzLU');
    assert.equal(extractYoutubeUrl('https://www.youtube.com/watch?v=dUxVR8oSzLU'), 'dUxVR8oSzLU');
    assert.equal(extractYoutubeUrl('https://youtu.be/dUxVR8oSzLU'), 'dUxVR8oSzLU');
  });
});
