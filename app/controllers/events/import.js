import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { action } from '@ember/object';

export default class extends Controller {
  importStatus = '';
  importError  = '';
  isImporting  = false;
  file         = false;
  fileName     = '';

  importTask(taskUrl) {
    run.later(() => {
      this.loader
        .load(taskUrl)
        .then(data => {
          if (data.state !== 'SUCCESS') {
            this.set('importStatus', `Status: ${data.state}`);
            this.importTask(taskUrl);
          } else {
            this.set('importStatus', `Status: ${data.state}`);
            this.transitionToRoute('events.view', data.result.id);
          }
        })
        .catch(e => {
          this.setProperties({
            'importError' : e.message,
            'isImporting' : false,
            'file'        : false
          });
        });
    }, 3000);
  }

  @action
  uploadFile(files) {
    let [file] = files;
    let data = new FormData();
    let endpoint = 'import/json';
    let ext = file.name.split('.');
    ext = ext[ext.length - 1].toLowerCase();
    if (ext === 'xml') {
      endpoint = 'import/pentabarf';
    } else if (ext === 'ics' || ext === 'ical') {
      endpoint = 'import/ical';
    } else if (ext === 'xcal') {
      endpoint = 'import/xcal';
    }
    data.append('file', file);

    this.setProperties({
      'importStatus' : 'Uploading file.. Please don\'t close this window',
      'importError'  : '',
      'isImporting'  : true,
      'file'         : true
    });

    this.loader.post(
      `/events/${endpoint}`,
      data,
      { isFile: true }
    ).then(data => {
      this.importTask(`tasks/${data.task_url.split('/')[3]}`);
    }).catch(e => {
      this.set('importError', e.message);
    });
  }
}
