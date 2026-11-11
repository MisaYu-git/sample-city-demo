export function judgeVital(key, value) {
  switch (key) {
    case "bmi":
      return value >= 25 ? (value >= 30 ? "danger" : "caution") : "normal";
    case "waist":
      return value >= 90 ? (value >= 100 ? "danger" : "caution") : "normal";
    case "systolicBP":
      return value >= 130 ? (value >= 160 ? "danger" : "caution") : "normal";
    case "diastolicBP":
      return value >= 85 ? (value >= 100 ? "danger" : "caution") : "normal";
    case "hba1c":
      return value >= 5.6 ? (value >= 6.5 ? "danger" : "caution") : "normal";
    case "fastingGlucose":
      return value >= 100 ? (value >= 126 ? "danger" : "caution") : "normal";
    case "ldl":
      return value >= 120 ? (value >= 140 ? "danger" : "caution") : "normal";
    case "hdl":
      return value < 40 ? (value < 35 ? "danger" : "caution") : "normal";
    case "triglycerides":
      return value >= 150 ? (value >= 300 ? "danger" : "caution") : "normal";
    case "ast":
      return value >= 31 ? (value >= 51 ? "danger" : "caution") : "normal";
    case "alt":
      return value >= 31 ? (value >= 51 ? "danger" : "caution") : "normal";
    case "gammaGtp":
      return value >= 51 ? (value >= 101 ? "danger" : "caution") : "normal";
    default:
      return "normal";
  }
}

export const JUDGE_LABELS = {
  normal: "基準内",
  caution: "要注意",
  danger: "要指導",
};

export const VITAL_ITEMS = [
  {
    key: "height",
    label: "身長",
    unit: "cm",
    ref: "-",
    numeric: false,
  },
  {
    key: "weight",
    label: "体重",
    unit: "kg",
    ref: "-",
    numeric: false,
  },
  {
    key: "bmi",
    label: "BMI",
    unit: "",
    ref: "< 25.0",
    numeric: true,
  },
  {
    key: "waist",
    label: "腹囲",
    unit: "cm",
    ref: "男<85 / 女<90",
    numeric: true,
  },
  {
    key: "systolicBP",
    label: "収縮期血圧",
    unit: "mmHg",
    ref: "< 130",
    numeric: true,
  },
  {
    key: "diastolicBP",
    label: "拡張期血圧",
    unit: "mmHg",
    ref: "< 85",
    numeric: true,
  },
  {
    key: "hba1c",
    label: "HbA1c",
    unit: "%",
    ref: "< 5.6",
    numeric: true,
  },
  {
    key: "fastingGlucose",
    label: "空腹時血糖",
    unit: "mg/dL",
    ref: "< 100",
    numeric: true,
  },
  {
    key: "ldl",
    label: "LDLコレステロール",
    unit: "mg/dL",
    ref: "< 120",
    numeric: true,
  },
  {
    key: "hdl",
    label: "HDLコレステロール",
    unit: "mg/dL",
    ref: ">= 40",
    numeric: true,
  },
  {
    key: "triglycerides",
    label: "中性脂肪",
    unit: "mg/dL",
    ref: "< 150",
    numeric: true,
  },
  {
    key: "ast",
    label: "AST(GOT)",
    unit: "U/L",
    ref: "<= 30",
    numeric: true,
  },
  {
    key: "alt",
    label: "ALT(GPT)",
    unit: "U/L",
    ref: "<= 30",
    numeric: true,
  },
  {
    key: "gammaGtp",
    label: "γ-GTP",
    unit: "U/L",
    ref: "<= 50",
    numeric: true,
  },
  {
    key: "smoking",
    label: "喫煙",
    unit: "",
    ref: "-",
    numeric: false,
  },
];
