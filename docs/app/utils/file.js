import { Promise as RSVPPromise } from 'rsvp';

export const humanReadableBytes = (sizeInKb, absolute = true, si = true) => {
  const thresh = si ? 1000 : 1024;
  let bytes = sizeInKb * thresh;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * 100) / 100 >= thresh && u < units.length - 1);
  return `${bytes.toFixed(absolute ? 0 : 1)} ${units[u]}`;
};

export const isFileValid = (file, maxSizeInMb, fileTypes = []) => {
  return new RSVPPromise((resolve, reject) => {
    if (file.size > (maxSizeInMb * 1024)) {
      return reject(`File size larger than ${humanReadableBytes(maxSizeInMb)}`);
    }

    // If Uint8Array support is available, get the actual file type using file header. (Preferred way)
    if ('Uint8Array' in window) {
      const fileReader = new FileReader();
      fileReader.onloadend = function(e) {
        const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        let type;
        // Magic number reference: from http://www.astro.keele.ac.uk/oldusers/rno/Computing/File_magic.html & http://en.wikipedia.org/wiki/List_of_file_signatures
        switch (header) {
          case '89504e47':
            type = 'image/png';
            break;
          case '47494638':
            type = 'image/gif';
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffdb':
          case 'ffd8ffee':
            type = 'image/jpeg';
            break;
          case '25504446':
            type = 'application/pdf';
            break;
          case 'd0cf11e0':
            type = 'application/vnd.ms-powerpoint';
            break;
          case '66747970':
            type = 'video/mp4';
            break;
          case '504b34':
            type = 'application/vnd.oasis.opendocument.presentation';
            break;
          default:
            type = 'unknown';
            break;
        }
        if (type !== 'unknown' && fileTypes.includes(file.type)) {
          return resolve();
        } else {
          return reject('File type not supported.');
        }
      };
      fileReader.readAsArrayBuffer(file);

    } else {
      // If no support for Uint8Array, get the mime from the blob directly (Easily spoof-able)
      if (fileTypes.includes(file.type)) {
        return resolve();
      } else {
        return reject('File type not supported.');
      }
    }
  });
};
