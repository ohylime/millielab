interface MillieTableHTMLProps {
  fields: string[];
  applicants: any[];
}

export const MillieTableHTML: React.FC<MillieTableHTMLProps> = ({
  fields,
  applicants,
}) => {
  return (
    <table id="applicant-table">
      <tr key="header-display">
        {fields.map((field: string) => (
          <th>{field}</th>
        ))}
      </tr>

      {applicants.map((applicant) => {
        return (
          <tr key={applicant.id}>
            <td>{applicant.firstName}</td>
            <td>{applicant.email}</td>
            <td>{applicant.phone}</td>
            <td>{applicant.birthday}</td>
            <td>{applicant.password}</td>
          </tr>
        );
      })}
    </table>
  );
};
