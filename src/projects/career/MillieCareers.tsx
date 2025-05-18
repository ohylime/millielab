import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./MillieCareers.css";
import { MillieTableHTML } from "./MillieCareerTableHTML";

/*
  Practicing Creating Tables and Forms
*/

interface Applicant {
  id: string;
  firstName: string;
  password: string;
  email: string;
  phone: number;
  birthday: string;
}

const tableDisplayHeaders = ["Name", "Email", "Phone", "Birthday", "Password"];

const sampleData: Applicant = {
  id: "1",
  firstName: "millefeuille",
  email: "millie@millefeuille.com",
  phone: 6261234567,
  birthday: "11/11/2021",
  password: "D0gdaysF0r3v3r",
};

function MillieCareers() {
  const [applicants, setApplicants] = useState<Applicant[]>([sampleData]);

  return (
    <div id="millie-careers">
      <MillieTableHTML fields={tableDisplayHeaders} applicants={applicants} />
    </div>
  );
}

export default MillieCareers;
