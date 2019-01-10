import $ from 'jquery';
import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';
import ENV from 'open-event-frontend/config/environment';

export default Component.extend(FormMixin, {
  classNames: ['ui', 'stackable', 'centered', 'grid'],
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        file: {
          identifier : 'file',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please upload a file')
            },
            {
              type   : 'regExp',
              value  : '/^(.*.((zip|xml|ical|ics|xcal)$))?[^.]*$/i',
              prompt : this.get('l10n').t('Please upload a file in suggested format')
            }
          ]
        }
      }
    };
  },
  importTask(url) {
    let _this = this;
    this.get('loader')
      .load(url)
      .then(data => {
        if (data.state !== 'SUCCESS') {
          $('#import_status').html(`<b>Status:</b> ${  data.state}`);
          setTimeout(function() {
            _this.importTask(url);
          }, 3000);
        } else {
          $('#import_status').html(`<b>Status:</b> ${  data.state}`);
          document.location = `/events/${  data.result.id}`;
        }
      })
      .catch(e => {
        $('#import_status').text('');
        $('#btnImportEvent').prop('disabled', false);
        $('#import_file').prop('disabled', false);
        $('#import_error').text(e.message);
      });
  },
  actions: {
    submit() {
      let _this = this;
      this.onValid(() => {
        var data = new FormData();
        var endpoint = 'import/json';
        $.each($('#file')[0].files, function(i, file) {
          var ext = file.name.split('.');
          ext = ext[ext.length - 1].toLowerCase();
          if (ext === 'xml') {
            endpoint = 'import/pentabarf';
          } else if (ext === 'ical') {
            endpoint = 'import/ical';
          }
          data.append('file', file);

          $('#import_status').text('Uploading file.. Please don\'t close this window');
          $('#import_error').text('');
          $('#btnImportEvent').prop('disabled', true);
          $('#file').prop('disabled', true);

          _this.get('loader').post(
            `${`${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/events/`}${endpoint}`,
            data,
            { isExternal: true, isFile: true }
          ).then(data => {
            setTimeout(function() {
              _this.importTask(`tasks/${data.task_url.split('/')[3]}`);
            }, 1000);
          }).catch(e => {
            $('#import_status').text('');
            $('#import_error').text(e);
          });
        });
      });
    }
  }
});
