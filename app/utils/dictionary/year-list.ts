let year: number = new Date().getFullYear();
const earliestYear = 1930;
const dateDropdown = [];
while (year >= earliestYear) {
  const data = {
    year
  }
  dateDropdown.push(data)
  year -= 1;
}
export const years = dateDropdown;
