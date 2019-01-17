import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import ENV from 'open-event-frontend/config/environment';

export default Controller.extend({
  importStatus   : 'Importing',
  importError    : 'Import Error',
  btnImportEvent : false,
  file           : false,
  fileName       : '',
  importTask(taskUrl) {
    let _this = this;
    run.later(() => {
      this.get('loader')
        .load(taskUrl)
        .then(data => {
          if (data.state !== 'SUCCESS') {
            this.set('importStatus', `Status: ${  data.state}`);
            _this.importTask(taskUrl);
          } else {
            this.set('importStatus', `Status: ${  data.state}`);
            document.location = `/events/${  data.result.id}`;
          }
        })
        .catch(e => {
          this.set('');
          this.set('importError', e.message);
          this.set('btnImportEvent', false);
          this.set('file', false);
        });
    }, 3000);
  },
  actions: {
    uploadFile(files) {
      let _this = this;
      let [file] = files;
      var data = new FormData();
      var endpoint = 'import/json';
      var ext = file.name.split('.');
      ext = ext[ext.length - 1].toLowerCase();
      if (ext === 'xml') {
        endpoint = 'import/pentabarf';
      } else if (ext === 'ical') {
        endpoint = 'import/ical';
      }
      data.append('file', file);

      this.set('importStatus', 'Uploading file.. Please don\'t close this window');
      this.set('importError', '');
      this.set('btnImportEvent', true);
      this.set('file', true);

      this.get('loader').post(
        `${`${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/events/`}${endpoint}`,
        data,
        { isExternal: true, isFile: true }
      ).then(data => {
        _this.importTask(`tasks/${data.task_url.split('/')[3]}`);
      }).catch(e => {
        this.set('');
        this.set('importError', e.message);
      });
    }
  }
});
