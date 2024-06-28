// Import the dataset
import data from "../assets/data/Manufac _ India Agro Dataset.json";

// Process the data to extract only the year from the 'Year' field
const processedData = data.map((item) => {
  const year = item.Year.split(",")[1];
  return { ...item, Year: year };
});

// Group the processed data by year
const groupedByYear = Object.groupBy(processedData, ({ Year }) => Year);
const yearWiseData = [];

for (let year in groupedByYear) {
  // Sort the data for each year by crop production in descending order
  groupedByYear[year] = groupedByYear[year].sort(
    (a, b) =>
      b["Crop Production (UOM:t(Tonnes))"] -
      a["Crop Production (UOM:t(Tonnes))"]
  );

  // Map the sorted data to ensure empty values are treated as zero
  const sortedData = groupedByYear[year].map((obj) => ({
    ...obj,
    "Crop Production (UOM:t(Tonnes))":
      obj["Crop Production (UOM:t(Tonnes))"] === ""
        ? 0
        : obj["Crop Production (UOM:t(Tonnes))"],
  }));

  groupedByYear[year] = sortedData;

  // Create a summary object for each year with max and min crop production
  const yearlySummary = {
    Year: year,
    "Crop with Maximum Production in that Year":
      sortedData[0]["Crop Production (UOM:t(Tonnes))"],
  };

  let minProduction;
  // Find the minimum crop production in the year (excluding zeros)
  for (let i = sortedData.length - 1; i >= 0; i--) {
    if (sortedData[i]["Crop Production (UOM:t(Tonnes))"] !== 0) {
      minProduction = sortedData[i]["Crop Production (UOM:t(Tonnes))"];
      break;
    }
  }

  // Add the minimum production to the yearly summary
  yearlySummary["Crop with Minimum Production in that Year"] = minProduction;
  yearWiseData.push(yearlySummary);
}

// Process the original data to standardize crop name keys
data.forEach((obj) => {
  obj["Crop_Name"] = JSON.parse(JSON.stringify(obj["Crop Name"]));
  delete obj["Crop Name"];
});

// Group the data by crop name
const groupedData = Object.groupBy(data, ({ Crop_Name }) => Crop_Name);

const cropWiseData = [];

for (let key in groupedData) {
  const items = groupedData[key];
  const n = items.length;

  // Calculate the sum of yields and average yield for each crop
  const yieldSum = items.reduce((acc, curr) => {
    const yieldValue =
      parseInt(curr["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
    return acc + yieldValue;
  }, 0);
  let averageYield = yieldSum / n;
  averageYield = averageYield.toFixed(3);

  // Calculate the sum of cultivation areas and average cultivation area for each crop
  const cultivationSum = items.reduce((acc, curr) => {
    const cultivationValue =
      parseInt(curr["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
    return acc + cultivationValue;
  }, 0);
  let averageCultivation = cultivationSum / n;
  averageCultivation = averageCultivation.toFixed(3);

  // Create an object with the crop name and its average yield and cultivation area
  const obj = {
    Crop: key,
  };
  if (averageYield) {
    obj["Average Yield of the Crop between 1950-2020"] = averageYield;
  }
  if (averageCultivation) {
    obj["Average Cultivation Area of the Crop between 1950-2020"] =
      averageCultivation;
  }
  cropWiseData.push(obj);
}

// Export the processed data for use in other parts of the application
export const yearWiseCropData = yearWiseData;
export const cropWiseAverage = cropWiseData;
