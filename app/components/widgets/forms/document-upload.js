import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class DocumentUpload extends Component {
//   init() {
//     super.init(...arguments);
//     this.set('selectedFile', this.fileUrl);
//     if (this.selectedFile) {
//       this.set('needsConfirmation', true);
//     }
//   }

  //   didInsertElement() {
  //     super.didInsertElement(...arguments);
  //     $(this.element)
  //       .on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
  //         e.preventDefault();
  //         e.stopPropagation();
  //       })
  //       .on('dragover dragenter', () => {
  //         $('.upload.segment', this.element).addClass('drag-hover');
  //       })
  //       .on('dragleave dragend drop', () => {
  //         $('.upload.segment', this.element).removeClass('drag-hover');
  //       })
  //       .on('drop', e => {
  //         this.processFiles(e.originalEvent.dataTransfer.files);
  //       });
  //   }

//   willDestroyElement() {
//     super.willDestroyElement(...arguments);
//     $(this.element).off('drag dragstart dragend dragover dragenter dragleave drop');
//   }
}
