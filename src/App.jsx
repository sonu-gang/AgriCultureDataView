// Import React and necessary styles
import React from "react";
import "@mantine/core/styles.css"; // Mantine core styles
import "./App.css"; // Custom styles

// Import MantineProvider for Mantine components and data utilities
import { MantineProvider } from "@mantine/core";

// Import data from utils/dataUtils and components
import { yearWiseCropData, cropWiseAverage } from "./utils/dataUtils";
import YearlyCropDataTable from "./Components/YearlyCropDataTable";
import AverageCropDataTable from "./Components/AverageCropDataTable";

// Define the App component
const App = () => {
  return (
    <MantineProvider>
      {/* Wrap the application in MantineProvider for Mantine components */}
      {/* Render the YearlyCropDataTable component with year-wise crop data */}
      <YearlyCropDataTable data={yearWiseCropData} />
      {/* Render the AverageCropDataTable component with crop-wise average data */}
      <AverageCropDataTable data={cropWiseAverage} />
    </MantineProvider>
  );
};

// Export the App component for use in other parts of the application
export default App;
