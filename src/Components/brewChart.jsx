import React, { Component, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
  } from "recharts";

const BrewChart = () => {
    const [breweryData, setBreweryData] = useState(null);

    useEffect(() => {
        const fetchBreweryData = async () => {
          const response = await fetch(
            "https://api.openbrewerydb.org/v1/breweries?per_page=50"
          );
          const data = await response.json();
          const breweryCountByType = data.reduce((acc, brewery) => {
            if (brewery.brewery_type in acc) {
              acc[brewery.brewery_type] += 1;
            } else {
              acc[brewery.brewery_type] = 1;
            }
            return acc;
          }, {});

          const breweryData = Object.entries(breweryCountByType).map(
            ([type, count]) => {
              return { type, count };
            }
          );
          setBreweryData(breweryData);
        };
        fetchBreweryData().catch(console.error);
      }, []);

      return (
     <div>
          <h3>Number of Breweries by Type</h3>
          {breweryData && (
            <BarChart
              width={800}
              height={400}
              data={breweryData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type"/>
              <Label value="Type" offset={0} position="insideBottom" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      );
  };

export default BrewChart;