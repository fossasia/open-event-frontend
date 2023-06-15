let year: number = new Date().getFullYear();
let earliestYear = 1970;
const dateDropdown = [];   
while (year >= earliestYear) {
  const data = {
    'year': year
  }                 
  dateDropdown.push(data)
  year -= 1;    
}
export const years = dateDropdown;