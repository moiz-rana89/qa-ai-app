export const ATT_REASONS = [
  "Approved Extended Lunch",
  "Bereavement Leave",
  "Client Changed Schedule - New Schedule",
  "Client Changed Schedule - Temporary",
  "Client Device Issue",
  "Client on Holiday",
  "Currently Onboarding - New Client",
  "Flexible Schedule",
  "Floating Schedule",
  "Hours not met - Completed Shift",
  "Hubstaff Issue",
  "Hubstaff Issue: Incorrect Weekly Hours",
  "Hubstaff Issue: Locked Timesheet",
  "Hubstaff Issue: Stopped Working",
  "Hubstaff Issue: Software Update",
  "Idle Time: Low Ticket Volume",
  "Idle Time: Minimal",
  "Incorrect Minimum Hours Plotted",
  "LOA",
  "Offboarded",
  "Outdated HS Schedule",
  "PTO",
  "Resigned",
  "VTO",
  "Paternity Leave",
  "Maternity Leave",
  "Minimal: Agent Device Update",
  "Health Issue/Sick Leave - HR Validated",
  "Exempted",
  "Power & ISP Interruption",
  "Agent Device Issue",
  "Emergency",
  "Forgot to turn on Hubstaff",
  "Health Issue/Sick Leave",
  "Idle Time: Excessive",
  "ISP Interruption",
  "NCNS",
  "No Reason Provided",
  "Overlunch/Overbreak",
  "Pending Agent Confirmation",
  "Personal Reasons",
  "Unresponded",
  "Power Interruption",
  "Woke Up Late",
  "Others",
  "Agent in live training",
  "On Time", // not        valid
  "No Schedule", // not    valid
  "Rest Day", // not       valid
];

export const ATT_REASONS_STATUS = [
  {
    reason: "Approved Extended Lunch",
    validity: "VALID",
    description: "Client approved Extended Lunch",
    fileReqMessage:
      "Screenshot discussion of the Date and time of the approved EL.",
    isFileReq: true,
  },
  {
    reason: "Bereavement Leave",
    validity: "VALID",
    description: "Death in their family",
    fileReqMessage:
      "Death Certificate, Bereavement Leave Request and Notification Email from HR (After completing HR form) or Member's Slack Communication",
    isFileReq: true,
  },
  {
    reason: "Client Changed Schedule - New Schedule",
    validity: "VALID",
    description: "Client approved NEW schedule of the agent",
    fileReqMessage:
      "Screenshot of the discussion agreed by TL/Client and Agent for the new schedule",
    isFileReq: true,
  },
  {
    reason: "Client Changed Schedule - Temporary",
    validity: "VALID",
    description:
      "Client approved temporary schedule for the agents(waps, early outs, rest days, coverage)",
    fileReqMessage:
      "Screenshot of the discussion provided by TL/Client and Agent for the Temporary coverage schedule",
    isFileReq: true,
  },
  {
    reason: "Client Device Issue",
    validity: "VALID",
    description:
      "Agent encounters issues with the client's software, device or platform, affecting their ability to perform their duties.",
    fileReqMessage: "Proof of what was the error with date and time shown.",
    isFileReq: true,
  },
  {
    reason: "Client on Holiday",
    validity: "VALID",
    description:
      "If the client is on holiday, and the agent is instructed not to work or to have adjusted hours.",
    fileReqMessage:
      "Screenshot of the holiday leave / vacation was offered by the client",
    isFileReq: true,
  },
  {
    reason: "Currently Onboarding - New Client",
    validity: "VALID",
    description:
      "Agent is in the process of onboarding with a new client, which may affect their schedule or availability.",
    fileReqMessage:
      "Include the date and screenshot of Hubspot that the agent is currently on boarding.",
    isFileReq: true,
  },
  {
    reason: "Flexible Schedule",
    validity: "VALID",
    description:
      "Agent works a consistent flexible schedule approved by the client.",
    fileReqMessage:
      "Discussion of the flexible hours of the agent agreed by TL and client. This has an end date for monitoring.",
    isFileReq: true,
  },
  {
    reason: "Hours not met - Completed Shift",
    validity: "VALID",
    description:
      "If agent have completed their shift but worked slightly less than the required hours. For missing missing hours within 5 minutes",
    fileReqMessage:
      "Validated schedule duration , minimum duration and actual time seen in TP APP.",
    isFileReq: true,
  },
  {
    reason: "Hubstaff Issue",
    validity: "VALID",
    description: `Use this tag for general Hubstaff issues that do not fall under the following categories:
• Hubstaff Issue: Incorrect Weekly Hours
• Hubstaff Issue: Locked Timesheet
• Hubstaff Issue: Stopped Working
• Hubstaff Issue: Software Update`,
    fileReqMessage: "Specific to the error in the Hubstaff.",
    isFileReq: true,
  },
  {
    reason: "Hubstaff Issue: Locked Timesheet",
    validity: "VALID",
    description:
      "Agent’s timesheet is locked after submission, preventing them from starting their Hubstaff timer prior to the cutoff time.",
    fileReqMessage:
      "Please provide a screenshot of the error your getting when trying to turn on your Hubstaff.",
    isFileReq: true,
  },
  {
    reason: "Hubstaff Issue: Stopped Working",
    validity: "VALID",
    description: `Agent’s Hubstaff timer stops working unexpectedly, (did not notice the issue right away or was unaware that their timer had stopped)
This tag should be used in cases where the timer stopped due to application issues such as application crashes and maintenance.`,
    fileReqMessage: `Most of Hubstaff Issue: Stopped Working reason and also based on my experince, there's no error showing when this happen. The hubstaff just suddenly stopped w/o you knowing it however.
  
A screenshot of the agents claim that their HS stopped working can suffic as an attachment/proof.`,
    isFileReq: false,
  },
  {
    reason: "Hubstaff Issue: Software Update",
    validity: "VALID",
    description:
      "Agent experiences issues with Hubstaff due to a software update. This can include problems such as the application not starting, timers not recording accurately, or any other disruptions caused by the update.",
    fileReqMessage:
      "Please provide a screenshot or a proof that your Hubstaff is updating.(but most of the time, the trigger will ask you to update it now, or later).",
    isFileReq: true,
  },
  {
    reason: "Idle Time: Low Ticket Volume",
    validity: "VALID",
    description:
      "Agent experiences idle time due to low ticket volume. This tag is applicable when the agent is waiting for tasks or there are periods of inactivity because of the volume of work available. Please ensure that this tag is not used for idle time caused by coaching sessions, as Minimal idle time is most applicable for that scenario.",
    fileReqMessage:
      "Provide a screenshot(GORGIAS TICKET or any client tools used by the agent) that shows that the queue has been zeroed out or a low volume queue.",
    isFileReq: true,
  },
  {
    reason: "LOA",
    validity: "VALID",
    description: "Used when Agent takes Leave of Absence",
    fileReqMessage: "Specific approval with duration date for the LOA",
    isFileReq: true,
  },
  {
    reason: "Offboarded",
    validity: "VALID",
    description:
      "Used when Agent was offboarded. Needs to include date of Notification.",
    fileReqMessage:
      "Provided a screenshot of the hubspot showing the status of the agent that has been offboarded.",
    isFileReq: true,
  },
  {
    reason: "PTO",
    validity: "VALID",
    description:
      "Used when Agent is on PTO (These requests are less than 2 weeks)",
    fileReqMessage: `Include "Time off Request" screenshot in hubstaff`,
    isFileReq: true,
  },
  {
    reason: "Resigned",
    validity: "VALID",
    description: "When Agent resigned or is terminated",
    fileReqMessage: `• HR resignation confirmation or clearance
• Official last working day documentation
• Email or HR system record validating resignation status`,
    isFileReq: true,
  },
  {
    reason: "VTO",
    validity: "VALID",
    description: "Agent was offered VTO by the client due to low volume etc.",
    fileReqMessage: "Proof of clients initiated VTO being offered.",
    isFileReq: true,
  },
  {
    reason: "Paternity Leave",
    validity: "VALID",
    description: "Agent is on Paternity Leave",
    fileReqMessage: `• HR-approved paternity leave request
• Leave approval email or HR system screenshot
• Indicated leave dates matching the infraction date`,
    isFileReq: true,
  },
  {
    reason: "Maternity Leave",
    validity: "VALID",
    description: "Agent is on Maternity Leave",
    fileReqMessage: `• HR-approved maternity leave documentation
• Leave approval confirmation with covered dates`,
    isFileReq: true,
  },
  {
    reason: "Minimal: Agent Device Update",
    validity: "VALID",
    description: "Agent's device has an update or has any issue.",
    fileReqMessage: `• Screenshot of the device update notification or system update log
• Timestamp showing overlap with the affected shift
• TL validation note confirming minimal impact
`,
    isFileReq: true,
  },
  {
    reason: "Health Issue/Sick Leave - HR Validated",
    validity: "VALID",
    description:
      "Used if the Agent has health Issues and HR already have verified the Medical Certificate",
    fileReqMessage: `• HR validation or approval
• Medical certificate or supporting document (if required by HR)
• Approved sick leave record with matching dates`,
    isFileReq: true,
  },
  {
    reason: "Agent in live training",
    validity: "VALID",
    description: "Agent is undergoing training",
    fileReqMessage: `• Training invite, calendar event, or attendance log
• Training schedule covering the affected date and time`,
    isFileReq: true,
  },
  {
    reason: "Unpaid Time Off",
    validity: "VALID",
    description: "Unpaid time off requests are done in Hubstaff",
    fileReqMessage: "Communication approved",
    isFileReq: true,
  },
  {
    reason: "Schedule plotted for Billing Purposes",
    validity: "VALID",
    description: "New agent",
    fileReqMessage: "Add hubspot sccreenshot. Should have end date",
    isFileReq: true,
  },
  {
    reason: "Power & ISP Interruption",
    validity: "INVALID",
    description:
      "Applied when the agent is unable to log in, continue, or complete their shift due to an unexpected power outage or internet service provider (ISP) interruption beyond the agent’s control.",
    fileReqMessage: `if ISP intrerruption, a proof from provider or ticket raising the concern
Power interruption, a raised ticket on any electric company or proof that there's a power incident.`,
    isFileReq: true,
  },
  {
    reason: "Agent Device Issue",
    validity: "INVALID",
    description: `When Agent's device has an update or has any issue.
(Not related to the Minimal: Agent Device Update)`,
    fileReqMessage: `Proof of what's the issue in their device (Not related to the updating of the laptop).`,
    isFileReq: true,
  },
  {
    reason: "Emergency",
    validity: "INVALID",
    description: `Any abrupt reason with the word "emergency" in it`,
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Forgot to turn on Hubstaff",
    validity: "INVALID",
    description:
      "Agent failed to turn on Hubstaff at the start of the shift or when getting back from lunch",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Health Issue/Sick Leave",
    validity: "INVALID",
    description: "Any health related issues without Med Cert or unverified",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Idle Time: Excessive",
    validity: "INVALID",
    description: "Used when Agent was idle for 15 minutes or more.",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "ISP Interruption",
    validity: "INVALID",
    description: "If agent has internet related issues",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "NCNS",
    validity: "INVALID",
    description: "When agent does not notify or reply to TLs messages",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Overlunch/Overbreak",
    validity: "INVALID",
    description: "When agent goes on unapproved extended lunch or quick break",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Personal Reasons",
    validity: "INVALID",
    description: "Used for personal or domestic reasons(non emergency related)",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Woke Up Late",
    validity: "INVALID",
    description: "When agent wakes up late and was not able to log in on time",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Calamity/Force of Nature",
    validity: "VALID",
    description: "",
    fileReqMessage: "",
    isFileReq: false,
  },
  {
    reason: "Work Limit",
    validity: "VALID",
    description: "When members reach their Hubstaff work limit",
    fileReqMessage: "",
    isFileReq: false,
  },
];
export const handleReasonRules = (reasonValue) => {
  return (
    reasonValue == "Flexible Schedule" ||
    // reasonValue == "PTO" ||
    reasonValue == "LOA" ||
    reasonValue == "Maternity Leave" ||
    reasonValue == "Paternity Leave" ||
    reasonValue == "Schedule plotted for Billing Purposes"
  );
};
