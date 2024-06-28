// Import necessary components from Mantine and React
import { Pagination, Table } from "@mantine/core";
import React, { useState } from "react";

// Define the YearlyCropDataTable component which receives 'data' as a prop
const YearlyCropDataTable = ({ data }) => {
  // State to keep track of the active page for pagination
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 10; // Number of rows to display per page

  // Calculate the start and end indices for the current page's data
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the data to get only the rows for the current page
  const paginatedData = data.slice(startIndex, endIndex);

  // Get the headers from the keys of the first object in the data array
  const headers = Object.keys(data[0]);

  // Map the paginated data to table rows
  const rows = paginatedData.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td className="center-text">{element["Year"]}</Table.Td>
      <Table.Td className="center-text">
        {element["Crop with Maximum Production in that Year"]}
      </Table.Td>
      <Table.Td className="center-text">
        {element["Crop with Minimum Production in that Year"]}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="table-container">
      <div className="table-tag">
        {/* Render the table with headers and rows */}
        <Table withColumnBorders withTableBorder highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {headers.map((head, index) => (
                <Table.Th key={index} className="center-text">
                  {head}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      <div className="table-paginnation">
        {/* Render the pagination component */}
        <Pagination
          page={activePage}
          onChange={setActivePage}
          total={Math.ceil(data.length / rowsPerPage)}
          position="center"
          mt="md"
        />
      </div>
    </div>
  );
};

// Export the YearlyCropDataTable component for use in other parts of the application
export default YearlyCropDataTable;
