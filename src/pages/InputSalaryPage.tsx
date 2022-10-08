import { TextField, Box, Button, Grid } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import classes from "./InputSalaryPage.module.css";
import { SetStateAction, useState, useEffect } from "react";
import { Salary } from "../model/SalaryModel";
import SalaryTable from "../components/SalaryTable";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import {
  getSalaryData,
  saveSalaryData,
  resetSalaryData,
} from "../store/localstorageUtil";
import CustomTextField from "../components/CustomTextField";

const InputSalaryPage = () => {
  const [salaryList, setSalaryList] = useState<Salary[]>([]);
  const [currentInputValue, setCurrentInputValue] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>();

  useEffect(() => {
    const stoageData = getSalaryData();
    if (stoageData) {
      setSalaryList(stoageData);
    }
  }, []);

  const calculateRiseRate = (currSalaryList: Salary[]) => {
    let newSalaryList: Salary[] = [];
    currSalaryList.forEach((el, idx) => {
      const salary: Salary = {
        ...el,
      };
      if (idx > 0) {
        const prevNum = currSalaryList[idx - 1].amount;
        const nextNum = salary.amount;
        salary.riseRate = ((nextNum - prevNum) / prevNum) * 100;
      } else {
        salary.riseRate = undefined;
      }
      newSalaryList.push(salary);
    });
    setSalaryList(newSalaryList);
    saveSalaryData(newSalaryList);
  };

  const addData = () => {
    if (!currentInputValue) {
      return;
    }

    const stringData = startDate
      ? `${startDate.getFullYear()}년 ${startDate.getMonth() + 1}월`
      : "";

    calculateRiseRate([
      ...salaryList,
      {
        id: Date.now(),
        date: stringData,
        amount: parseInt(currentInputValue),
      },
    ]);
    setCurrentInputValue("");
    setStartDate(null);
  };

  const deleteItem = (itemId: number) => {
    const newList = salaryList.filter((el) => el.id !== itemId);
    calculateRiseRate(newList);
  };

  return (
    <>
      <Grid className={classes.row} container spacing={2}>
        <Grid item>
          <div>
            <DatePicker
              placeholderText="적용 일시를 선택해주세요."
              selected={startDate}
              className={classes.datePicker}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy년 MM월"
              showMonthYearPicker
              clearButtonTitle="초기화"
              customInput={<TextField />}
              locale={ko}
            />
          </div>
        </Grid>
        <Grid item>
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="연봉을 입력하세요."
            className={classes.inputBox}
            suffix="원"
            groupSeparator=","
            allowNegativeValue={false}
            allowDecimals={false}
            value={currentInputValue}
            customInput={TextField}
            onValueChange={(value) => setCurrentInputValue(value ?? "")}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={addData}
            sx={{ margin: "0 8px" }}
          >
            추가
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.infoText}>
        <HelpOutlineOutlinedIcon />
        <span>과거 데이터부터 추가해주세요.</span>
      </Box>
      <SalaryTable salaryList={salaryList} deleteItem={deleteItem} />
      <Box>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setSalaryList([]);
            resetSalaryData();
          }}
          sx={{ width: "100%", margin: "0 8px", marginTop: "2rem" }}
          color="warning"
        >
          RESET
        </Button>
      </Box>
    </>
  );
};

export default InputSalaryPage;
