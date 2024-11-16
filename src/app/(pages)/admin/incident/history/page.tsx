"use client"

import { FaExclamationTriangle } from 'react-icons/fa';
import BoxWrapper from '@/app/components/UI/BoxWrapper';
import Table from '@/app/components/UI/Table';
import { Incident } from '@/app/model/IncidentModel';
import { useState } from 'react';
import Pagination from '@/app/components/UI/Pagination';
import Search from '@/app/components/UI/Search';
const incidentsData = [
  {
    "region": "Addis Ababa",
    "residence": "Bole",
    "gender": "Male",
    "age_group": "25-34",
    "education": "Bachelor's Degree",
    "occupation": "Engineer",
    "date": "2024-10-01T08:30:00Z",
    "location": "Bole Medhanialem",
    "incident_happened": {
      "woreda": "Bole 1",
      "zone": "Addis Ketema"
    },
    "category": "Road Accident",
    "source_of_information": "Police Report"
  },
  {
    "region": "Oromia",
    "residence": "Adama",
    "gender": "Female",
    "age_group": "35-44",
    "education": "High School",
    "occupation": "Teacher",
    "date": "2024-09-22T15:00:00Z",
    "location": "Adama City",
    "incident_happened": {
      "woreda": "Adama 3",
      "zone": "East Shewa"
    },
    "category": "Domestic Violence",
    "source_of_information": "Witness"
  },
  {
    "region": "Amhara",
    "residence": "Bahir Dar",
    "gender": "Male",
    "age_group": "18-24",
    "education": "Diploma",
    "occupation": "Student",
    "date": "2024-10-05T10:45:00Z",
    "location": "Bahir Dar University",
    "incident_happened": {
      "woreda": "Bahir Dar 2",
      "zone": "Western Gojjam"
    },
    "category": "Campus Conflict",
    "source_of_information": "Peer"
  },
  {
    "region": "Tigray",
    "residence": "Mekelle",
    "gender": "Female",
    "age_group": "45-54",
    "education": "Master's Degree",
    "occupation": "Government Employee",
    "date": "2024-08-15T12:00:00Z",
    "location": "Mekelle City",
    "incident_happened": {
      "woreda": "Mekelle 1",
      "zone": "Central Zone"
    },
    "category": "Corruption",
    "source_of_information": "Public Announcement"
  },
  {
    "region": "Sidama",
    "residence": "Hawassa",
    "gender": "Male",
    "age_group": "55-64",
    "education": "Primary School",
    "occupation": "Farmer",
    "date": "2024-07-20T14:30:00Z",
    "location": "Hawassa City",
    "incident_happened": {
      "woreda": "Hawassa 1",
      "zone": "Sidama Zone"
    },
    "category": "Agricultural Incident",
    "source_of_information": "Family Member"
  },
  {
    "region": "SNNPR",
    "residence": "Jima",
    "gender": "Female",
    "age_group": "35-44",
    "education": "Bachelor's Degree",
    "occupation": "Healthcare Worker",
    "date": "2024-09-10T17:00:00Z",
    "location": "Jima Town",
    "incident_happened": {
      "woreda": "Jima 2",
      "zone": "Jimma Zone"
    },
    "category": "Healthcare Incident",
    "source_of_information": "Healthcare Provider"
  },
  {
    "region": "Gambela",
    "residence": "Gambela City",
    "gender": "Male",
    "age_group": "18-24",
    "education": "Secondary School",
    "occupation": "Unemployed",
    "date": "2024-08-30T09:00:00Z",
    "location": "Gambela City Center",
    "incident_happened": {
      "woreda": "Gambela 1",
      "zone": "Gambela Zone"
    },
    "category": "Theft",
    "source_of_information": "Police Report"
  },
  {
    "region": "Benishangul-Gumuz",
    "residence": "Asosa",
    "gender": "Female",
    "age_group": "45-54",
    "education": "No Formal Education",
    "occupation": "Housewife",
    "date": "2024-06-12T11:30:00Z",
    "location": "Asosa Town",
    "incident_happened": {
      "woreda": "Asosa 1",
      "zone": "Asosa Zone"
    },
    "category": "Domestic Violence",
    "source_of_information": "Family Member"
  },
  {
    "region": "Harari",
    "residence": "Harar",
    "gender": "Male",
    "age_group": "25-34",
    "education": "Doctorate",
    "occupation": "Professor",
    "date": "2024-09-18T13:30:00Z",
    "location": "Harar University",
    "incident_happened": {
      "woreda": "Harar 2",
      "zone": "Harari Zone"
    },
    "category": "Academic Fraud",
    "source_of_information": "Academic Colleague"
  },
  {
    "region": "Dire Dawa",
    "residence": "Dire Dawa City",
    "gender": "Female",
    "age_group": "65+",
    "education": "Master's Degree",
    "occupation": "Retired",
    "date": "2024-10-02T16:15:00Z",
    "location": "Dire Dawa City Center",
    "incident_happened": {
      "woreda": "Dire Dawa 3",
      "zone": "Dire Dawa Zone"
    },
    "category": "Elder Abuse",
    "source_of_information": "Social Worker"
  }
]

const columns: (keyof Incident)[] = [
  'region',
  'residence',
  'gender',
  'age_group',
  'education',
  'occupation',
  'date',
  'location',
  'incident_happened',
  'category',
  'source_of_information',
];
const IncidentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; 
  const totalPages = Math.ceil(incidentsData.length / rowsPerPage);

  const currentData = incidentsData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);  
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };


  return (
    <BoxWrapper
      icon={<FaExclamationTriangle />}  
      title="Incidents"  
      borderColor="border-primary"  
      borderThickness="border-b-4" 
    >
        <div className="m-2 w-full">
      <Search onSearch={handleSearch} placeholder="Search Incidents..." buttonText="Search Incidents" />
      </div>
      <Table columns={columns} data={currentData} /> 
      <div className="flex justify-end mt-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
    </BoxWrapper>
  );
};

export default IncidentsList;
