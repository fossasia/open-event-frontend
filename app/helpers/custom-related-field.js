import { helper } from '@ember/component/helper';

export  function customRelatedField(params/* , hash*/) {

  const record = params[0].get(params[1]);
  return record.get(params[2]);

}

export default helper(customRelatedField);
