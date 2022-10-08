import { Salary } from "../model/SalaryModel";

export const saveSalaryData = (data: Salary[]) => {
  localStorage.setItem("salaryList", JSON.stringify(data));
};

export const getSalaryData = () => {
  const data = localStorage.getItem("salaryList");
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const resetSalaryData = () => {
  localStorage.clear();
};
