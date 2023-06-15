let year: number = new Date().getFullYear();
const earliestYear = 1970;
const dateDropdown = [];
while (year >= earliestYear) {
  const data = {
    year
  }
  dateDropdown.push(data)
  year -= 1;
}
export const years = dateDropdown;
