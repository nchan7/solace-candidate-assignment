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
        const response = await fetch("/api/advocates");
        const jsonResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      } catch (error) {
        console.error("Error fetching advocates:", error);
      }
    };
    fetchAdvocates();
  }, []);

  const handleSearchClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputTerm = e.target.value.toLowerCase();    
    setSearchTerm(searchInputTerm);
    
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
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const formatPhoneNumber = (number: number): string => {
    const phoneNumber = number.toString();
    return phoneNumber.slice(0,3) + "-" + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6, phoneNumber.length)

  }

  return (
    <main className="m-24 flex flex-col h-screen">
      <h1 className="-text--primary--default text-5xl font-bold">Solace Advocates</h1>
      <br />
      <br />
      <div className="my-4 flex items-center gap-2 relative  rounded-lg max-w-4xl">
        {/* <p>Search</p>
        <p>
          Search: <span id="search-term"></span>
        </p> */}
        <label htmlFor="search-input">Search</label>
        <input id="search-input" className="focus-within:ring focus-within:-ring--primary--focused flex-1 p-2 -bg--neutral--light-grey -text--neutral--grey placeholder-neutral--light-gray rounded-lg focus:outline-none" onChange={handleSearchClick} />
        <button className="px-4 py-2 -bg--primary--default hover:-bg--primary--focused absolute right-0 rounded-r-md -text--neutral--white hover:-text--accent--gold--light font-bold" onClick={handleResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table className="table-auto sm:table-fixed w-full border-collapse">
        <thead className="sticky top-0 -bg--primary--default text-white z-10 text-left"> 
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
        <tbody className="text-left">
          {filteredAdvocates?.map((advocate, index) => {
            return (
              <tr key={index} className="even:-bg--accent--mid-opal">
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, index) => (
                    <div key={index} className="even:-text--primary--default">{s}</div>
                  ))}
                </td>
                <td className="pl-4">{advocate.yearsOfExperience}</td>
                <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
