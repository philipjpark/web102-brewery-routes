import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BrewDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getBreweryDetail = async () => {
          const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/${params.symbol}`
          );
          const json = await response.json();
          setFullDetails(json);
        };
        getBreweryDetail().catch(console.error);
      }, []);
    

    return (
        <div>
            {fullDetails ? (
        <div>
            <h2>{fullDetails.name}</h2>
            <p>Brewery by type: {fullDetails.brewery_type}</p>
            <p>{fullDetails.address_1}</p>
            <p>{fullDetails.city} {fullDetails.state_province} {fullDetails.postal_code}</p>
            <p>{fullDetails.phone}</p>
            <p><a href={fullDetails.website_url}>{fullDetails.website_url}</a></p>
      </div>
            ) : null}
        </div>
    );
}

export default BrewDetail;