import { sortBy } from 'lodash-es';

interface CustomFormField {
    fieldIdentifier: string,
    isComplex: boolean
}

export function sortCustomFormFields(fields: CustomFormField[], fieldOrder: string[]): CustomFormField[] {
  fieldOrder = [...fieldOrder].reverse();
  return sortBy(fields, 'isComplex', item => -fieldOrder.indexOf(item.fieldIdentifier));
}
