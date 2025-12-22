export const ATT_REASONS_STATUS = [
  { reason: "Approved Extended Lunch", validity: "VALID" },
  { reason: "Bereavement Leave", validity: "VALID" },
  { reason: "Client Changed Schedule - New Schedule", validity: "VALID" },
  { reason: "Client Changed Schedule - Temporary", validity: "VALID" },
  { reason: "Client Device Issue", validity: "VALID" },
  { reason: "Client on Holiday", validity: "VALID" },
  { reason: "Currently Onboarding - New Client", validity: "VALID" },
  { reason: "Flexible Schedule", validity: "VALID" },
  { reason: "Floating Schedule", validity: "VALID" },
  { reason: "Hours not met - Completed Shift", validity: "VALID" },
  { reason: "Hubstaff Issue", validity: "VALID" },
  { reason: "Hubstaff Issue: Incorrect Weekly Hours", validity: "VALID" },
  { reason: "Hubstaff Issue: Locked Timesheet", validity: "VALID" },
  { reason: "Hubstaff Issue: Stopped Working", validity: "VALID" },
  { reason: "Hubstaff Issue: Software Update", validity: "VALID" },
  { reason: "Idle Time: Low Ticket Volume", validity: "VALID" },
  { reason: "Idle Time: Minimal", validity: "VALID" },
  { reason: "Incorrect Minimum Hours Plotted", validity: "VALID" },
  { reason: "LOA", validity: "VALID" },
  { reason: "Offboarded", validity: "VALID" },
  { reason: "Outdated HS Schedule", validity: "VALID" },
  { reason: "PTO", validity: "VALID" },
  { reason: "Resigned", validity: "VALID" },
  { reason: "VTO", validity: "VALID" },
  { reason: "Paternity Leave", validity: "VALID" },
  { reason: "Maternity Leave", validity: "VALID" },
  { reason: "Minimal: Agent Device Update", validity: "VALID" },
  { reason: "Health Issue/Sick Leave - HR Validated", validity: "VALID" },
  { reason: "Exempted", validity: "VALID" },
  { reason: "Agent in live training", validity: "VALID" },
  { reason: "Unpaid Time Off", validity: "VALID" },
  { reason: "Power & ISP Interruption", validity: "INVALID" },
  { reason: "Agent Device Issue", validity: "INVALID" },
  { reason: "Emergency", validity: "INVALID" },
  { reason: "Forgot to turn on Hubstaff", validity: "INVALID" },
  { reason: "Health Issue/Sick Leave", validity: "INVALID" },
  { reason: "Idle Time: Excessive", validity: "INVALID" },
  { reason: "ISP Interruption", validity: "INVALID" },
  { reason: "NCNS", validity: "INVALID" },
  { reason: "No Reason Provided", validity: "INVALID" },
  { reason: "Overlunch/Overbreak", validity: "INVALID" },
  { reason: "Pending Agent Confirmation", validity: "INVALID" },
  { reason: "Personal Reasons", validity: "INVALID" },
  { reason: "Unresponded", validity: "INVALID" },
  { reason: "Power Interruption", validity: "INVALID" },
  { reason: "Woke Up Late", validity: "INVALID" },
  { reason: "On Time", validity: "VALID" },
  { reason: "No Schedule", validity: "VALID" },
  { reason: "Rest Day", validity: "VALID" },
  { reason: "Calamity/Force of Nature", validity: "VALID" },
  { reason: "Others", validity: "INVALID" },
];
export const handleReasonRules = (reasonValue) => {
  return (
    reasonValue == "Flexible Schedule" ||
    // reasonValue == "PTO" ||
    reasonValue == "LOA" ||
    reasonValue == "Maternity Leave" ||
    reasonValue == "Paternity Leave"
  );
};
export const formSchema = {
  title: "Customer Service Evaluation",

  sections: [
    {
      id: "communication",
      title: "Communication",
      questions: [
        {
          id: "comm_1",
          label: "How well did the agent greet the customer?",
          sublabel: "Tone, empathy, politeness",
          isOptional: false,
          type: "rating",
          options: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
          ],
        },
        {
          id: "comm_2",
          label: "Was the communication clear?",
          type: "rating",
          isOptional: true,
          options: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
          ],
        },
      ],
    },

    {
      id: "knowledge",
      title: "Product Knowledge",
      questions: [
        {
          id: "kn_1",
          label: "Did the agent demonstrate product knowledge?",
          type: "rating",
          options: [
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "2", value: "2" },
          ],
        },
      ],
    },
  ],
};
