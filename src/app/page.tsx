"use client";

import { useEffect, useState } from "react";

export interface Advocate {
  firstName: string,
  lastName: string,
  city: string,
  degree: string,
  specialties: string[],
  yearsOfExperience: number,
  phoneNumber: number
}

export default function Home() {
  // const RESULTS_PER_PAGE = 10;
  const [advocates, setAdvocates] = useState<Advocate[]>();
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        console.log("fetching advocates...");
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (error) {
        console.log("Error fetching advocates:", error);
      }
    };
    fetchAdvocates();
  }, []);

  const handleSearchClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputTerm = e.target.value.toLowerCase();    
    setSearchTerm(searchInputTerm);
    
    console.log("filtering advocates...");
    const filteredAdvocates = advocates?.filter((advocate) => {
      return (
        advocate.firstName?.toLowerCase().includes(searchTerm) ||
        advocate.lastName?.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.some((s) => s.toLowerCase().includes(searchTerm)) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const handleResetClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleSearchClick} />
        <button onClick={handleResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates?.map((advocate, index) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, index) => (
                    <div key={index}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
