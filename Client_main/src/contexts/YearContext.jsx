// import React, { createContext, useContext, useState, useMemo } from 'react';
// import data from '../Packages/data.json';

// const YearContext = createContext();

// export const useYear = () => {
//   const context = useContext(YearContext);
//   if (!context) {
//     throw new Error('useYear must be used within a YearProvider');
//   }
//   return context;
// };

// // Helper function to get the greatest year from data.json
// const getGreatestYear = () => {
//   if (!data.yearGroups || !Array.isArray(data.yearGroups)) {
//     return '';
//   }
//   const years = data.yearGroups.map((item) => item.year);
//   if (years.length === 0) {
//     return '';
//   }
//   // Convert to numbers for proper comparison, then return as string
//   const numericYears = years.map(year => parseInt(year, 10));
//   const maxYear = Math.max(...numericYears);
//   return maxYear.toString();
// };

// export const YearProvider = ({ children }) => {
//   // Initialize with the greatest year from data.json
//   const [selectedYear, setSelectedYear] = useState(() => getGreatestYear());

//   return (
//     <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
//       {children}
//     </YearContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { publicApi } from '../api/publicApi';

const YearContext = createContext();

export const useYear = () => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error('useYear must be used within a YearProvider');
  }
  return context;
};

export const YearProvider = ({ children }) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch years from API on mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching years from API...');
        const data = await publicApi.getAllYears();
        console.log('Years data received:', data);
        
        setYears(data || []);
        
        // Auto-select the first year from API response
        if (data && data.length > 0) {
          console.log('Setting first year:', data[0]);
          setSelectedYear(data[0]);
        } else {
          console.warn('No years found in API response');
        }
      } catch (err) {
        console.error('Failed to fetch years:', err);
        setError('Failed to load years. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, []);

  // Get selected year ID for API calls
  // Try multiple possible ID field names
  const selectedYearId = useMemo(() => {
    if (!selectedYear) return null;
    // Try common ID field names
    const id = selectedYear._id || selectedYear.id || selectedYear.yearId;
    console.log('Selected year ID:', id, 'from year:', selectedYear);
    return id || null;
  }, [selectedYear]);

  const value = {
    years,
    selectedYear,
    selectedYearId,
    setSelectedYear,
    loading,
    error,
  };

  return (
    <YearContext.Provider value={value}>
      {children}
    </YearContext.Provider>
  );
};