import "./App.css";
import InputSalaryPage from "./pages/InputSalaryPage";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const App = () => {
  return (
    <div className="App">
      <div className="title">
        <CalculateOutlinedIcon fontSize="large" />
        <h1>연봉 상승률 계산기</h1>
      </div>
      <div className="App-content">
        <InputSalaryPage />
      </div>
    </div>
  );
};

export default App;
