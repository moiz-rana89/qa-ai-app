export const FORM_TYPES = [
  { label: "Quality Assurance", value: "QA" },
  { label: "RCA", value: "RCA" },
  { label: "Shadowing", value: "Shadowing" },
];
export const FORM_CHANNEL = [
  { label: "Email", value: "email" },
  { label: "Chat", value: "chat" },
];
export const FORM_HELPDESK = [
  { label: "Zendesk", value: "zendesk" },
  { label: "Gorgias", value: "gorgias" },
];
export const QUESTION_TYPE = [
  { label: "Text", value: "text" },
  { label: "Multiple Choice", value: "multiselect" },
  { label: "Yes/No", value: "boolean" },
];
export const QUESTION_SCORE = Array.from({ length: 21 }, (_, i) => ({
  label: String(i),
  value: i,
}));

// backend enum
// category_form_type_enum	{QA,RCA,Shadowing}
// form_type_enum	{QA,RCA,Shadowing}
// helpdesk_source_enum	{zendesk,gorgias}
// message_source_enum	{zendesk,gorgias}
// qf_form_type_enum	{QA,RCA,Shadowing}
// question_type_enum	{numeric,text,multiselect,singleselect,boolean}
// reconstructed_source_enum	{zendesk,gorgias}
// ticket_source_enum	{zendesk,gorgias}

export const SAMPLE_CATEGORIES = [
  {
    ticket_id: "242672346",
    categories: [
      {
        questions: [
          {
            note: "No greeting was given by the agent in the response.",
            text: "question test 2",
            score: 0,
            max_points: 3,
            question_id: 61,
          },
          {
            note: "The agent's message began with 'Hi there!', which serves as a greeting.",
            text: "Test Question 1\n(A1) (3 points)",
            score: 1,
            max_points: 3,
            question_id: 62,
          },
          {
            note: "The agent opened with 'Hi there!', which qualifies as a greeting.",
            text: "Test question 1 \n(A1) (Points 3)",
            score: 1,
            max_points: 3,
            question_id: 63,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in the first message.",
            text: "question 4 test",
            score: 1,
            max_points: 3,
            question_id: 64,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in the first message.",
            text: "test 3 q",
            score: 1,
            max_points: 3,
            question_id: 65,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in the first message.",
            text: "test 2",
            score: 1,
            max_points: 3,
            question_id: 66,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in their initial response.",
            text: "test5",
            score: 1,
            max_points: 3,
            question_id: 67,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in their initial response.",
            text: "test 57",
            score: 1,
            max_points: 3,
            question_id: 68,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' in their initial message.",
            text: "test7",
            score: 1,
            max_points: 3,
            question_id: 69,
          },
          {
            note: "The agent greeted the customer with 'Hi there!' at the start of their message.",
            text: "test8",
            score: 1,
            max_points: 3,
            question_id: 70,
          },
          {
            note: "Each criterion has a score of 0.4, totaling 2.0 points, so the maximum score is awarded.",
            text: "test text question",
            score: 2,
            max_points: 2,
            question_id: 72,
          },
          {
            note: "Each criterion has a score of 0.6, totaling 3.0 points, so the maximum score is awarded.",
            text: "Test Multiselect",
            score: 3,
            max_points: 3,
            question_id: 73,
          },
        ],
        category_name: "test1 (Copy)",
        category_index: null,
      },
      {
        questions: [
          {
            note: "The agent greeted the customer with 'Hi there!' in the first message.",
            text: "Test Q1 for this",
            score: 1,
            max_points: 10,
            question_id: 71,
          },
        ],
        category_name: "test2 (Copy)",
        category_index: null,
      },
    ],
  },
];

export const conversationData = [
  {
    sender: "None <ccyruss@icloud.com>",
    lastname: "",
    firstname: "",
    attachments: [
      { url: "http://g.com", filename: "Test file" },
      { url: "http://g.com", filename: "Test file" },
    ],
    message_body:
      "Hi I'm a new customer can I get Botox today in Dallas Texas? ",
    internal_note: "2025-12-14 21:04:30.369000+00:00",
    created_datetime: "2025-12-14 21:04:30.369000+00:00",
  },
  {
    sender: "Gorgias Bot <1v6lmg7z2xn5jyqr@email.gorgias.com>",
    lastname: "Bot",
    firstname: "Gorgias",
    attachments: [],
    message_body:
      "Thanks for reaching out! We will get back to you in about 3 minutes.",
    internal_note: null,
    created_datetime: "2025-12-14 21:04:30.370000+00:00",
  },
  {
    sender: "Jade S. <jade.serrano@alchemy43.com>",
    lastname: "S.",
    firstname: "Jade",
    attachments: null,
    message_body:
      "Hi there, thanks for reaching out. We're thrilled you're planning on visiting us! Our Dallas location is closed today, but will reopen tomorrow, and we can see you as early as 12:45 pm. Does that time work for you? 🙂",
    internal_note: null,
    created_datetime: "2025-12-14 21:10:33.941335+00:00",
  },
  {
    sender: "None <ccyruss@icloud.com>",
    lastname: "",
    firstname: "",
    attachments: [],
    message_body:
      "Hello does the Houston location have any availability this afternoon/ or evening ?",
    internal_note: null,
    created_datetime: "2025-12-16 21:04:47.457000+00:00",
  },
  {
    sender: "Emma A. <emma.abellana@alchemy43.com>",
    lastname: "A.",
    firstname: "Emma",
    attachments: null,
    message_body:
      "Hi there! Our Houston Memorial location has availability today at 3:45 pm, 5 pm, and 5:30 pm for Botox. Since this is your first visit, we just need you to book online to secure your appointment. You can book online here: https://alchemy43.com/book-now. This helps us have all the details we need and securely add your card for our cancellation policy, so your first visit goes smoothly. A $75 fee applies for no-shows or cancellations under 24 hours, and the consultation fee is also $75 (waived if you're treated the same day. Let us know if you have any questions—we're happy to help!",
    internal_note: null,
    created_datetime: "2025-12-16 21:08:05.508645+00:00",
  },
];

export const TEST_TAGS = [
  "Edit Subscription",
  "lifetime",
  "Active Lifestyle",
  "Product Subscriptions",
  "Tier1",
];
