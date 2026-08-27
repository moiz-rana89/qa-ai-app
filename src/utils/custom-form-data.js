
export const formTypes = [
  {
    id: "customer-service-email",
    title: "Email QA Form",
    clientId: 150365,
    clientName: "Olukai",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label: "Did agent properly greet, thank, and address the customer?",
            sublabel: "(2 point) (A1)",
            points: 2,
            inputType: "checkbox",

            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2 point) (A2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2 point) (A3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2 point) (A4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: "Not applicable for Brand Tone",
          //   sublabel: "(2 point) (A5)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: "Not applicable for Empathy",
          //   sublabel: "(2 point) (A6)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did the agent collect and verify all account information details needed to proceed with the process?",
            sublabel: "(3 point) (B1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "B2",
          //   label:
          //     "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
          //   sublabel: "(3 point) (B2)",
          //   points: 3,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did we provide effective, clear, and concise communication?",
            sublabel: "(10 point) (C1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label: "Were SOPs located in trainual and followed properly?",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did we ask relevant, proactive questions when needed (i.e. if travel/moving is mentioned, did we ask for a date to provide the best service)?",
            sublabel: "(4 point) (E1)",
            points: 4,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(4 point) (E2)",
          //   points: 4,
          //   inputType: "checkbox",
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did we clearly state what is needed to proceed and what we can offer?",
            sublabel: "(5 point) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did we explain to the consumer what our next steps will be in assisting them?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label: "Correct brand canned action selected and edited as needed",
            sublabel: "(5 point) (F3)",
            points: 5,
            inputType: "checkbox",
            isOptional: true,
            comments: true,
          },
          {
            id: "F4",
            label: "Did we offer options of resolution if possible?",
            sublabel: "(5 point) (F4)",
            points: 5,
            inputType: "checkbox",
            isOptional: true,
            comments: true,
          },
          {
            id: "F5",
            label:
              "Did we offer a complete resolution? (making sure they hit every concern)",
            sublabel: "(5 point) (F5)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label: "Did we go the extra mile?",
            sublabel: "(5 point) (F6)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F8)",
            points: 5,
            inputType: "checkbox",
            isOptional: true,
            comments: true,
          },
          // {
          //   id: "F9",
          //   label:
          //     "Not Applicable as no macro was used and message was personalized accurately",
          //   sublabel: "(5 point) (F9)",
          //   points: 5,
          //   inputType: "checkbox",
          //   isOptional: true,
          // },
          // {
          //   id: "F10",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(5 point) (F10)",
          //   points: 5,
          //   inputType: "checkbox",
          //   isOptional: true,
          // },
          // {
          //   id: "F11",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(5 point) (F11)",
          //   points: 5,
          //   inputType: "checkbox",
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(10 point) (G1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "H1",
            label:
              "Did we educate or provide resources to avoid this concern/issue in the future?",
            sublabel: "(2 point) (H1)",
            points: 2,
            inputType: "checkbox",
            isOptional: true,
            comments: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(4 point) (H2)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(4 point) (H3)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "H4",
          //   label: "Not Applicable (No Self-Help Option Required)",
          //   sublabel: "(2 point) (H4)",
          //   points: 2,
          //   inputType: "checkbox",
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION ",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(3 point) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(2 point) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // hamra mayer corp

  {
    id: "email-qa-form",
    title: "Email QA Form",
    clientId: 354461,
    clientName: "Meyer Corp",
    sections: [
      {
        id: "timeliness",
        title: "TIMELINESS",
        questions: [
          {
            id: "A1",
            label: "Initial response time within company standards.",
            sublabel: "(A1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label:
              "Follow-up responses (if applicable) timely and as promised.",
            sublabel: "(A2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "proffesionalism-tone",
        title: "Proffesionalism and Tone",
        questions: [
          {
            id: "B1",
            label: "Communication is professional, courteous, and respectful.",
            sublabel: "(B1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B2",
            label: "Tone is appropriate to the customer's issue and sentiment.",
            sublabel: "(B2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "clarity-conciseness",
        title: "Clarity and Conciseness",
        questions: [
          {
            id: "C1",
            label: "Message is clear and easy to understand.",
            sublabel: "(C1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Information is provided concisely, avoiding unnecessary jargon or complexity.",
            sublabel: "(C2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "understanding-accuracy",
        title: "Understanding and Accuracy",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent demonstrates understanding of the customer's issue?",
            sublabel: "(D1)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D2",
            label: "Accurate information and solutions are provided.",
            sublabel: "(D2)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D3",
            label:
              "All of customer's questions were addressed in a single response (if possible).",
            sublabel: "(D3)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "personalization-empathy",
        title: "Personalization and Empathy",
        questions: [
          {
            id: "E1",
            label:
              "Customer's name and relevant details are used appropriately.",
            sublabel: "(E1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "E2",
            label: "Empathy and understanding are coveyed in the response.",
            sublabel: "(E2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "resolution-follow-up",
        title: "Resolution and Follow-up",
        questions: [
          {
            id: "F1",
            label: "A clear resolution or next step is provided.",
            sublabel: "(F1)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F2",
            label: "Customers are asked if they need further assistance.",
            sublabel: "(F2)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Instructions for follow-up or traditional resources (if necessary) are included.",
            sublabel: "(F3)",
            points: 0.66,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.33", label: "1.00" },
              { value: "0.66", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "phone-qa-form",
    title: "Phone QA Form",
    clientId: 354461,
    clientName: "Meyer Corp",
    sections: [
      {
        id: "greeting-introduction",
        title: "Greeting and Introduction",
        questions: [
          {
            id: "A1",
            label: "Did the agent provided a professional greeting?",
            sublabel: "(A1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label: "Did the agent introduced themselves and the company?",
            sublabel: "(A2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did the agent asked for the customer's name and used it during the conversation?",
            sublabel: "(A3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "communication-skills",
        title: "Communication Skills",
        questions: [
          {
            id: "B1",
            label: "Did the agent spoke clearly and at an appropriate pace?",
            sublabel: "(B1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Did the agent demonstrated active listening (e.g., summarizing points, asking clarifying questions)?",
            sublabel: "(B2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B3",
            label: "Did the agent maintained a positive and professional tone?",
            sublabel: "(B3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "understanding-empathy",
        title: "Understanding and Empathy",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent accurately identified the customer's needs or issue?",
            sublabel: "(C1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Did the agent expressed empathy and understanding of the customer's issue?",
            sublabel: "(C2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C3",
            label:
              "Did the agent offered appropriate solutions or alternatives?",
            sublabel: "(C3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "efficiency-accuracy",
        title: "Efficiency and Accuracy",
        questions: [
          {
            id: "D1",
            label: "Did the agent provided accurate information and solutions?",
            sublabel: "(D1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D2",
            label:
              "Did the agent efficiently navigated systems or tools during the call?",
            sublabel: "(D2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D3",
            label:
              "Did the agent resolved or escalated appropriately within a reasonable time frame?",
            sublabel: "(D3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "compliance-procedure-adherence",
        title: "Compliance and Procedure Adherence",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent followed all relevant company policies and procedures?",
            sublabel: "(E1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "E2",
            label:
              "Did the agent verified customer information for security purposes?",
            sublabel: "(E2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "E3",
            label:
              "Did the agent provided correct and compliant disclaimer or legal information (if applicable)?",
            sublabel: "(E3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "closure-follow-up",
        title: "Closure and Follow-up",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent confirmed that the customer's issue was fully addresed?",
            sublabel: "(F1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent provided information on the next steps (if any)?",
            sublabel: "(F2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent offered additional assistance and thanked the customer?",
            sublabel: "(F3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "0.5", label: "1.00" },
              { value: "1.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // true classic 321215

  {
    id: "email-chat-quality-form",
    title: "Email/Chat Quality Form",
    clientId: 321215,
    clientName: "True Classic",
    sections: [
      {
        id: "greetings",
        title: "Greetings",
        questions: [
          {
            id: "A1",
            label: "Did agent properly greet, thank, and address the customer?",
            sublabel: "(2.5 point) (A1)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2.5 point) (A2)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2.5 point) (A3)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2.5 point) (A4)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: "Not applicable for Brand Tone",
          //   sublabel: "(2.5 point) (A5)",
          //   points: 2.5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: "Not applicable for Empathy",
          //   sublabel: "(2.5 point) (A6)",
          //   points: 2.5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "Verification-problem-identification",
        title: "verification + Problem Identification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(5 point) (B1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(5 point) (B2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "B3",
            label: "Did the agent maintained a positive and professional tone?",
            sublabel: "(5 point) (B3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "communication-grammar",
        title: "Communication + Grammar",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate best practices when handling the Live Chat/SMS or Social Media Message?",
            sublabel: "(1 point) (C1)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Was the agent empathetic and human-centric in his/her responses?",
            sublabel: "(1 point) (C2)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "C3",
            label: "Grammar and Spelling",
            sublabel: "(1 point) (C3)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "C4",
            label: "Capitalization, Punctuation Mark, Excessive spacing",
            sublabel: "(1 point) (C3)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "following-client-sop",
        title: "Following Client Sop",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent responded within the threshold time? (within 2 minutes)",
            sublabel: "(2 point) (D1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "D2",
            label:
              "Is the overall resolution provided within the Client's SOP?",
            sublabel: "(3.3 point) (D2)",
            points: 3.3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "D3",
            label: "Did the agent merge the ticket if applicable?",
            sublabel: "(3.3 point) (D3)",
            points: 3.3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "D4",
            label:
              "Did the agent add detailed internal notes in Kustomer, Shopify, Govalo, and Inveterate? (If applicable)",
            sublabel: "(3.3 point) (D4)",
            points: 3.3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "D5",
            label:
              "Did the agent update the customer's profile with the Customer's Name and Email Address? (If applicable)",
            sublabel: "(3.3 point) (D5)",
            points: 3.3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "D6",
            label: "Did the agent merge multiple accounts? (If applicable)",
            sublabel: "(3.3 point) (D6)",
            points: 3.3,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "E1",
            label:
              "Was the appropriate and complete  solution provided based on the Client's SOP?",
            sublabel: "(4.1 point) (E1)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "E2",
            label:
              "Did the agent inform the customer about any next steps and expectations as needed?",
            sublabel: "(4.1 point) (E2)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "E3",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(4.1 point) (E3)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "E4",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(4.1 point) (E4)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "E5",
            label:
              "Did the agent follow the Client's escalation SOP (Escalated if needed, Escalated if not needed, Added Notes, etc)",
            sublabel: "(4.1 point) (E5)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "E6",
            label:
              "Did the agent add the correct tags, contact reason, and remove incorrect tags?",
            sublabel: "(4.1 point) (E6)",
            points: 4.1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E7",
          //   label: "1 - 2 Markdowns (half score)",
          //   sublabel: "(12.5 point) (E7)",
          //   points: 12.5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "E8",
          //   label: "3 or more Markdowns ( Auto Zero)",
          //   sublabel: "(0 point) (E8)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "closing-tools-tilization",
        title: "Closing + Tools Utilization (AutoZero)",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future if applicable?",
            sublabel: "(3 point) (F1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(3 point) (F2)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(3 point) (F3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent use the CS Platform tools properly (Appropriate tags, Merging, Snoozing, and Pending)",
            sublabel: "(3 point) (F4)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label:
              "Was grabbing the ticket from AI valid? Did the AI provide inaccurate information, or was the agent’s response personalized?",
            sublabel: "(3 point) (F5)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F6",
          //   label:
          //     "If the ticket was grabbed invalidly, the response was not personalized, or the response was copied and pasted from AI. (Auto Zero)",
          //   sublabel: "(0 point) (F6)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "sales-conversion",
        title: "Sales Conversion (AutoZero)",
        questions: [
          {
            id: "G1",
            label:
              "How well did the representative build rapport and establish a connection with the prospect?",
            sublabel: "(2 point) (G1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G2",
            label:
              "Were relationship-building tactics employed to enhance the customer experience?",
            sublabel: "(2 point) (G2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G3",
            label:
              "Were opportunities for cross-selling or upselling identified and pursued?",
            sublabel: "(2 point) (G3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G4",
            label:
              "How well did the representative educate the prospect on additional offerings?",
            sublabel: "(2 point) (G4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G5",
            label:
              "Did the representative effectively use sales tools (e.g., Size charts/fit calculator, website links) during the interaction?",
            sublabel: "(2 point) (G5)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G6",
            label: "Not Applicable as there was no opportunity for sales",
            sublabel: "(10 point) (G6)",
            points: 10,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "overall-summary",
        title: "Overall Summary",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "social-media-qa-form",
    title: "Social Media QA Form",
    clientId: 321215,
    clientName: "True Classic",
    sections: [
      {
        id: "greetings",
        title: "Greetings",
        questions: [
          {
            id: "A1",
            label: "Did agent properly greet and address the customer?",
            sublabel: "(2.5 point) (A1)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2.5 point) (A2)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2.5 point) (A3)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2.5 point) (A4)",
            points: 2.5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: "Not applicable for Brand Tone",
          //   sublabel: "(2.5 point) (A5)",
          //   points: 2.5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: "Not applicable for Empathy",
          //   sublabel: "(2.5 point) (A6)",
          //   points: 2.5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(5 point) (B1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "B2",
          //   label:
          //     "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question) / Linking Not Applicable/Non Customer",
          //   sublabel: "(5 point) (B2)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate best practices when handling the Facebook/Instagram/Twitter Direct Messages?(Note that we wouldn't want to sound as if we are BOTS, make it as natural , lax but professional tone.)",
            sublabel: "(15 point) (C1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop-for-social-media",
        title: "Follow Client Sop For Social Media",
        questions: [
          {
            id: "D1",
            label:
              "Follow your True Classic's conventions for writing in social channels.",
            sublabel: "(5 point) (D1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(5 point) (E1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(5 point) (E2)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(1 point) (F1)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(1 point) (F2)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent use the correct macro/templates when handling the customer's concern?",
            sublabel: "(1 point) (F3)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent offer options when trying to solve the customer's concern? (Proactive approach)",
            sublabel: "(1 point) (F4)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(10 point) (F5)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(1 point) (F6)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(1 point) (F7)",
            points: 1,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(1 point) (F8)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F9",
            label:
              "When necessary, ask the customer to move to a private channel (DM or FB Message). Note: Ensure that we publicly address the DM as well prior to moving to DM however, if it's too NEGATIVE towards the company, please delete after reaching out.",
            sublabel: "(2 point) (F9)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F10",
            label: "Include hyperlinks that push helpful content.",
            sublabel: "(1 point) (F10)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F11",
            label:
              "INFLUENCER GUIDELINES:\nMaking sure we follow influencer needs:\n- IF someone is ONLY looking for Lauren or said they were working with someone and now they can't reach them:\nSend them this:\n\"Please feel free to reach out to Megan at Megan.Feathers@trueclassic.com She will be taking over everything from here. Thank you!\"\n\n- Influencer with OVER 100,000+ Followers AND/OR Blue Check: You can see this in the right side of their DM in SS.\nSEND Tiffany THE LINK to their DM and she'll handle it - DO NOT send them to Megan or send them the influencer reply - this weighs her email down and Tiffany can help them in the moment.\n\n- Anyone UNDER 100,000 Followers and NO blue check:\nSend them our normal influencer 1st reply macro",
            sublabel: "(10 point) (F11)",
            points: 10,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F12",
          //   label:
          //     "Not Applicable to move the conversation to a private channel (DM or FB Message).",
          //   sublabel: "(2 point) (F12)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F13",
          //   label: "No Applicable hyperlinks that push helpful content.",
          //   sublabel: "(1 point) (F13)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F14",
          //   label: "Not Applicable (Non Influencer)",
          //   sublabel: "(10 point) (F14)",
          //   points: 10,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F15",
          //   label:
          //     "Not Applicable as no macro was used and message was personalized accurately",
          //   sublabel: "(1 point) (F15)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F16",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(1 point) (F16)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F17",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(1 point) (F17)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "grammar",
        title: "Grammar",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (zero instances; one instance is a markdown)",
            sublabel: "(7.5 point) (G1)",
            points: 7.5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G2",
            label:
              "Responded in a complete sentence free of any grammatical/lexical issues. (zero instances; one instance is a markdown)",
            sublabel: "(7.5 point) (G2)",
            points: 7.5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(3 point) (H1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(4 point) (H2)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?\nA closing should be dependent on the tone of the DM as a whole.\nExamples:\nProduct/Sizing Questions should already be replied with a UTM, so we dont need to send another.\nIf we REALLY helped someone with an issue and the tone is SUPER positive, we should be sending a review link for Trust Pilot OR one of those.\nUpset - we shouldn't be sending any links and be VERY to the point while helping.",
            sublabel: "(3 point) (H3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "H4",
          //   label: "Not Applicable (No Self-Help Option Required)",
          //   sublabel: "(3 point) (H4)",
          //   points: 3,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the kustomer Social tool properly (Tags, Merging, Snooze etc) - removes tag when duplicating Shopify order (if not, markdown)",
            sublabel: "(5 point) (I1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "I2",
          //   label:
          //     "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Zowie/Sprout etc)?",
          //   sublabel: "(5 point) (I2)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "Summary Notes",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "email-qa-form-simplehuman",
    title: "Email QA Form",
    clientId: 170380,
    clientName: "simplehuman",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label: "Did agent properly greet, thank, and address the customer?",
            sublabel: "(2 point) (A1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2 point) (A2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2 point) (A3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2 point) (A4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: "Not applicable for Brand Tone",
          //   sublabel: "(2 point) (A5)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: "Not applicable for Empathy",
          //   sublabel: "(2 point) (A6)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(5 point) (B1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
            sublabel: "(5 point) (B2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate email communication best practices?",
            sublabel: "(5 point) (C1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "Follow Client Sop",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(4 point) (E1)",
            points: 4,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(4 point) (E2)",
          //   points: 4,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(5 point) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent place the resolution effectively within their response?",
            sublabel: "(5 point) (F3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F4",
            label:
              "Did the agent use the correct macro when handling the customer?",
            sublabel: "(5 point) (F4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(5 point) (F5)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F6",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(5 point) (F6)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(10 point) (F7)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(5 point) (F8)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F9",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F9)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "F10",
          //   label:
          //     "Not Applicable as no macro was used and message was personalized accurately",
          //   sublabel: "(5 point) (F10)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F11",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(5 point) (F11)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          {
            id: "F12",
            label: "Not Applicable for Client/Manager Escalation",
            sublabel: "(5 point) (F12)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "Grammar",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(5 point) (G1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(2 points) (H1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(2 points) (H2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(4 points) (H3)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "H4",
          //   label: "Not Applicable (No Self-Help Option Required)",
          //   sublabel: "(2 points) (H4)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(3 point) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(2 point) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "Summary Notes",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "phone-quality-form-simplehuman",
    title: "Phone Quality Form",
    clientId: 170380,
    clientName: "simplehuman",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(3 points) (A1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(3 points) (A2)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did agent take time to paraphrase concern to confirm understanding?",
            sublabel: "(3 points) (A3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(3 points) (A4)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A5",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(3 points) (A5)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A6",
          //   label: "Not applicable for Brand Tone",
          //   sublabel: "(3 points) (A6)",
          //   points: 3,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          {
            id: "A7",
            label: "Not applicable for Empathy",
            sublabel: "(3 points) (A7)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(3 point) (B1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "B2",
            label:
              "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
            sublabel: "(3 point) (B2)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(7 point) (C1)",
            points: 7,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "Follow Client Sop",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(5 point) (D1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(5 point) (E1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(5 point) (E2)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(5 points) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 points) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent place the resolution effectively within their response?",
            sublabel: "(5 points) (F3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F4",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(5 points) (F4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(5 points) (F5)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(5 points) (F6)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(5 points) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 points) (F8)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F9",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(5 points) (F9)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F10",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(5 points) (F10)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(2 points) (G1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(2 points) (G2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(3 points) (G3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(3 points) (G4)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "G5",
          //   label: "Not applicable (No Self-Help Option Required)",
          //   sublabel: "(2 points) (G5)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "call-handling",
        title: "Call Handling",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(5 points) (H1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H2",
            label:
              "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(2 points) (H2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(2 points) (H3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(1 point) (H4)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "H5",
          //   label: "Not Applicable for Correct Hold Procedure",
          //   sublabel: "(2 points) (H5)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "H6",
          //   label: "Not Applicable for Correct Transfer Procedure",
          //   sublabel: "(2 points) (H6)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "H7",
          //   label: "Not Applicable for Correct Call Back Procedure",
          //   sublabel: "(1 point) (H7)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(3 points) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)",
            sublabel: "(2 points) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "Summary Notes",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "email-qa-form-Aroma360",
    title: "Email QA Form",
    clientId: 173786,
    clientName: "Aroma360",
    sections: [
      {
        id: "security",
        title: "Security",
        questions: [
          {
            id: "A1",
            label:
              "Confirm if the associate is working in the correct account (e.g., replacements/refunds issued to the correct account).",
            sublabel: "(20 points) (A1)",
            points: 20,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "comm1",
        title: "Comm 1",
        questions: [
          {
            id: "B1",
            label:
              "Check if the associate is assisting the customer within the correct SLA (working the case as soon as the ticket is assigned).",
            sublabel: "(15 points) (B1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "comm2",
        title: "Comm 2",
        questions: [
          {
            id: "C1",
            label:
              "Correct usage of macros/blurbs within Gorgias (customer interaction, empathy, etc.).",
            sublabel: "(6 points) (C1)",
            points: 6,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "reqdetails",
        title: "Req Details",
        questions: [
          {
            id: "D1",
            label:
              "Ensure the associate follows the SOP for all HC customer service contacts.",
            sublabel: "(25 points) (D1)",
            points: 25,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "contact-structure",
        title: "Contact Structure",
        questions: [
          {
            id: "E1",
            label:
              "Confirm the structure of each contact channel was followed correctly.",
            sublabel: "(15 points) (E1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "non-critical",
        title: "Non-Critical",
        questions: [
          {
            id: "F1",
            label:
              "Grammar errors, no notes assigned in the customer account, no notification sent to the customer when canceling a subscription, etc.",
            sublabel: "(10 points) (F1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "cfr",
        title: "CFR (Customer First Resolution)",
        questions: [
          {
            id: "G1",
            label: "Customer First Resolution.",
            sublabel: "(100 points) (G1)",
            points: 100,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "extra-1",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "X1",
            label: "Opportunities",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "X2",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "X3",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "phone-qa-form-call-1-lucky-voice",
    title: "Phone QA Form Call 1",
    clientId: 378361,
    clientName: "Lucky Voice",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(10 point) (A1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: " Did agent acknowledge the customer's concern?",
            sublabel: "(10 point) (A2)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(10 point) (A4)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(10 point) (C1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "G1",
            label:
              " Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(5 point) (G1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(5 point) (G2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(5 point) (G3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(5 point) (G4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "call-handling",
        title: "Call Handling",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(5 point) (H1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H2",
            label:
              "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(5 point) (H2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(5 point) (H3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(5 point) (H4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(10 point) (F1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)",
            sublabel: "(0 point) (F3)",
            points: 0,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "phone-qa-form-call-2-lucky-voice",
    title: "Phone QA Form Call 2",
    clientId: 378361,
    clientName: "Lucky Voice",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(10 point) (A1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: " Did agent acknowledge the customer's concern?",
            sublabel: "(10 point) (A2)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(10 point) (A4)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(10 point) (C1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "G1",
            label:
              " Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(5 point) (G1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(5 point) (G2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(5 point) (G3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(5 point) (G4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "call-handling",
        title: "Call Handling",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(5 point) (H1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H2",
            label:
              "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(5 point) (H2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(5 point) (H3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(5 point) (H4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(10 point) (F1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)",
            sublabel: "(0 point) (F3)",
            points: 0,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "email-qa-form-hotel-collection",
    title: "Email QA Form",
    clientId: 151112,
    clientName: "Hotel Collection",
    sections: [
      {
        id: "security",
        title: "Security",
        questions: [
          {
            id: "A1",
            label:
              "Confirm if the associate is working in the correct account. (Replacements/Refunds issued to the correct account).",
            sublabel: "(20 point) (A1)",
            points: 20,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "comm-1",
        title: "Comm 1",
        questions: [
          {
            id: "B1",
            label:
              "Here we are going to focus if the associate is assiting the customer in the correct SLA. (Working in the case as soon as the ticket is assigned).",
            sublabel: "(15 point) (B1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "comm-2",
        title: "Comm 2",
        questions: [
          {
            id: "C1",
            label:
              "This is going to be related to the currect ussage of macros or Blurbs within Gorgias (Customer interaction, empathy, etc).",
            sublabel: "(15 point) (C1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "req-details",
        title: "Req Details",
        questions: [
          {
            id: "D1",
            label:
              "Req Details will be related to make sure the associate is following the Standard Operation Process for all HC customer service contacts.",
            sublabel: "(25 point) (D1)",
            points: 25,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "contact-structure",
        title: "Contact Structure",
        questions: [
          {
            id: "E1",
            label:
              "Confirm if the structure of each contact chanel was followed correctly.",
            sublabel: "(15 point) (E1)",
            points: 15,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "non-critical",
        title: "Non-Critical",
        questions: [
          {
            id: "F1",
            label:
              "Grammar errors, no notes assigned in the customer account, no notification sent to the customer when cancelling a subscription, etc.",
            sublabel: "(10 point) (F1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "cfr-customer-first-resolution",
        title: "CFR (Customer First Resolution)",
        questions: [
          {
            id: "G1",
            label: "Customer First Resolution",
            sublabel: "(100 point) (G1)",
            points: 100,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // sol dejen
  {
    id: "quality-assurance-scorecard-sol-de-janeiro",
    title: "Quality Assurance Scorecard",
    clientId: 159082,
    clientName: "Sol De Janeiro",
    sections: [
      {
        id: "problem-solving-skills",
        title: "Problem Solving Skills",
        questions: [
          {
            id: "A1",
            label:
              "Did the agent correctly identify the customer's concerns and completely and accurately answer all of the customer’s questions in the first response?",
            sublabel: "(2 points) (A1)",
            points: 7,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3.5", label: "Growth Needed" },
              { value: "7", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label: "Did the agent offer the correct resolution(s)?",
            sublabel: "(2 points) (A2)",
            points: 7,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3.5", label: "Growth Needed" },
              { value: "7", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did the agents proactively answer any potential follow-up questions from the customer?",
            sublabel: "(2 points) (A3)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A4",
            label:
              "Did the agent apply the correct tags (Gorgias + Shopify) and ticket fields?",
            sublabel: "(2 points) (A4)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "attention-to-detail",
        title: "Attention to Detail",
        questions: [
          {
            id: "B1",
            label: "Did the agent greet the customer properly?",
            sublabel: "(2 points) (B1)",
            points: 2,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "1", label: "Growth Needed" },
              { value: "2", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Did the agent communicate all necessary, correct, and helpful information while being clear and concise? Identify problem, answer questions, offer solution, and timeline for response.",
            sublabel: "(2 points) (B2)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B3",
            label: "Did the agent use proper grammar, spelling, and syntax?",
            sublabel: "(2 points) (B3)",
            points: 3,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "3", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B4",
            label:
              "Does the response flow naturally and read as authentic/human?",
            sublabel: "(2 points) (B4)",
            points: 5,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "5", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B5",
            label:
              "Does the response match the SDJ brand voice and tone as outlined in our brand guidelines? (Genuine, free from overly apologetic, formal, and negative language)",
            sublabel: "(2 points) (B5)",
            points: 5,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "5", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "empathy",
        title: "Empathy",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent acknowledge and show understanding of the customer's concerns and questions? If applicable, did the agent take ownership of the situation and frustration that was caused?",
            sublabel: "(2 points) (C1)",
            points: 7,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "4", label: "Growth Needed" },
              { value: "7", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Did the agent match the customer's sentiment to make sure the customer felt understood?",
            sublabel: "(2 points) (C2)",
            points: 5,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "5", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C3",
            label:
              "Did the agent provide helpful resources to the customer? i.e. support articles, links to PDPs",
            sublabel: "(2 points) (C3)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C4",
            label:
              "Did the agent close the response by offering further assistance and saying they were happy to help?",
            sublabel: "(2 points) (C4)",
            points: 2,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "1", label: "Growth Needed" },
              { value: "2", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "personalization",
        title: "Personalization",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent edit any macros used to respond to the customer's specific questions/concerns? If the agent did not use macros, did they ensure that their message addressed the customer's unique circumstance?",
            sublabel: "(2 points) (D1)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D2",
            label:
              "Did the agent reference anything specific about the customer's purchase history, subscription(s), preferences, or loyalty status (or lack thereof)?",
            sublabel: "(2 points) (D2)",
            points: 7,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "4", label: "Growth Needed" },
              { value: "7", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D3",
            label:
              "Did the agent provide a suitable resolution or alternative solutions based on the customer's specific issue, location, preferences, loyalty status, etc.?",
            sublabel: "(2 points) (D3)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "brand-loyalty",
        title: "Brand Loyalty",
        questions: [
          {
            id: "E1",
            label: `Did the agent take the opportunity to go above and beyond and add a personalized brand loyalty touch to the ticket? Including one or more of the following:  
              - DTC Differentiation (mentioning SPR tier/perks, subscription products, DTC exclusives, etc.)  
              - Upsell/Cross-sell Efforts (product recommendations, sharing product knowledge, etc.)  
              - Surprise & Delight (discount code, additional SPR points, an OTC replacement, etc.)`,
            sublabel: "(2 points) (E1)",
            points: 18,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "9", label: "Growth Needed" },
              { value: "18", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "admin-task-required",
        title: "Admin Task Required",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent add any necessary information to the CX Quality Tracker?",
            sublabel: "(10%) Total Deducted in This Category",
            points: 0,
            options: [
              { value: "0", label: "Yes" },
              { value: "-10", label: "No" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
        hideScore: true,
      },
    ],
    extraSections: [
      {
        id: "overall-feedback",
        title: "Overall Feedback",
        questions: [
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  {
    id: "quality-assurance-scorecard-social-media-sol-de-janeiro",
    title: "Quality Assurance Scorecard - Social Media",
    clientId: 159082,
    clientName: "Sol De Janeiro",
    sections: [
      {
        id: "problem-solving-skills",
        title: "Problem Solving Skills",
        questions: [
          {
            id: "A1",
            label:
              "Did the agent correctly identify the customer's concerns and completely and accurately answer all of the customer’s questions in the first response?",
            sublabel: "(2 points) (A1)",
            points: 8,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "4", label: "Growth Needed" },
              { value: "8", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label: "Did the agent offer the correct resolution(s)?",
            sublabel: "(2 points) (A2)",
            points: 7,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "4", label: "Growth Needed" },
              { value: "7", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did the agents proactively answer any potential follow-up questions from the customer?",
            sublabel: "(2 points) (A3)",
            points: 3,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "3", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A4",
            label:
              "Did the agent apply the correct BrandBastion & Shopify tags?",
            sublabel: "(2 points) (A4)",
            points: 2,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "0", label: "Growth Needed" },
              { value: "2", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "attention-to-detail",
        title: "Attention to Detail",
        questions: [
          {
            id: "B1",
            label: `Did the agent greet the customer properly using their first name when possible? (Use of greetings like "olá", or "hey")`,
            sublabel: "(2 points) (B1)",
            points: 5,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "0", label: "Growth Needed" },
              { value: "5", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Did the agent communicate all necessary, correct, and helpful information while being clear and concise? Identify problem, answer questions, offer solution, and timeline for response",
            sublabel: "(2 points) (B2)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B3",
            label:
              "Did the agent use proper grammar, spelling, and syntax while effectively using emojis, bullets and spacing and including links when appropriate?",
            sublabel: "(2 points) (B3)",
            points: 5,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "5", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B4",
            label:
              "Is the agents entire response in brand tone while sounding clear, humanlike, and free from unnecessary repetetion & filler langauage?",
            sublabel: "(2 points) (B4)",
            points: 3,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "3", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B5",
            label:
              "Was the agents response genuine and free from overly apologetic & negative language?",
            sublabel: "(2 points) (B5)",
            points: 3,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "3", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "empathy",
        title: "Empathy",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent acknowledge and show empathy to the customer's concerns and questions? If applicable, did the agent take ownership of the situation and frustration that was caused?",
            sublabel: "(2 points) (C1)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Did the agent provide helpful brand related resources to the customer? i.e. support articles, links to pdps",
            sublabel: "(2 points) (C2)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C3",
            label:
              "Did the agent close the response by offering further assistance and saying they were happy to help?",
            sublabel: "(2 points) (C3)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C4",
            label:
              "Did the agent match the customer's sentiment to make sure the customer felt understood?",
            sublabel: "(2 points) (C4)",
            points: 8,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "0", label: "Growth Needed" },
              { value: "8", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "personalization",
        title: "Personalization",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent edit any macros used to respond to the customer's specific questions/concerns? If the agent did not use macros, did they ensure that their message addressed the customer's unique circumstance?",
            sublabel: "(2 points) (D1)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D2",
            label:
              "Did the agent reference anything specific about the customer's purchase history, subscription(s), preferences, or loyalty status (or lack thereof)?",
            sublabel: "(2 points) (D2)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D3",
            label:
              "Did the agent provide a suitable resolution or alternative solutions based on the customer's specific issue, location, preferences, loyalty status, etc.?",
            sublabel: "(2 points) (D3)",
            points: 6,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "3", label: "Growth Needed" },
              { value: "6", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "D4",
            label:
              "Did the agent ask questions to understand the customer’s location to help personalize their shopping experience and surprise-and-delight options?",
            sublabel: "(2 points) (D4)",
            points: 4,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "4", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "brand-loyalty",
        title: "Brand Loyalty",
        questions: [
          {
            id: "E1",
            label: `Did the agent take the opportunity to go above and beyond and add a personalized brand loyalty touch to the ticket? Including one or more of the following:  

            - DTC Differentiation (mentioning SPR tier/perks, subscription products, DTC exclusives, etc.)  
            - Upsell/Cross-sell Efforts (product recommendations, sharing product knowledge, etc.)  
            - Surprise & Delight (discount code, additional SPR points, an OTC replacement, etc.)      `,
            sublabel: "(2 points) (E1)",
            points: 17,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "9", label: "Growth Needed" },
              { value: "17", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "E2",
            label: `Did the agent properly close out the ticket by applying the "closed dm tag" to ensure that the CSAT survey is triggered and sent to the customer? (For customer experience inquiries only)`,
            sublabel: "(2 points) (E1)",
            points: 3,
            options: [
              { value: "0", label: "Below Expectations" },
              { value: "2", label: "Growth Needed" },
              { value: "3", label: "Meets/Exceeds Expectations" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "admin-task-required",
        title: "Admin Task Required",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent add any necessary information to the CX Quality Tracker?",
            sublabel: "(10%) Total Deducted in This Category",
            points: 0,
            options: [
              { value: "0", label: "Yes" },
              { value: "-10", label: "No" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
        hideScore: true,
      },
    ],
    extraSections: [
      {
        id: "overall-feedback",
        title: "Overall Feedback",
        questions: [
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  // ancient nutrition
  {
    id: "phone-qa-form-ancient-nutrition",
    title: "Phone QA Form",
    clientId: 173810,
    clientName: "Ancient Nutrition",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(3 point) (A1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(3 point) (A2)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did agent take time to paraphrase concern to confirm understanding?",
            sublabel: "(3 point) (A3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(3 point) (A4)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A5",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(3 point) (A5)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A6",
          //   label: "Did agent use client's Brand Tone during discussion?",
          //   sublabel: "(0 point) (A6)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A7",
          //   label: "Not applicable for Empathy",
          //   sublabel: "(0 point) (A7)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(3 point) (B1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "B2",
          //   label:
          //     "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
          //   sublabel: "(0 point) (B2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(7 point) (C1)",
            points: 7,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "Follow Client SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(5 point) (E1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(0 point) (E2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(5 point) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(6 point) (F3)",
            points: 6,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(5 point) (F4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F5",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(6 point) (F5)",
            points: 6,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(6 point) (F6)",
            points: 6,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F9",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(0 point) (F9)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(2 point) (G1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(2 point) (G2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(2 point) (G3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(2 point) (G4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "G5",
            label: "Not applicable (No Self-Help Option Required)",
            sublabel: "(2 point) (G5)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "call-handling",
        title: "Call Handling",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(5 point) (H1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H2",
            label:
              "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(2 point) (H2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(2 point) (H3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(1 point) (H4)",
            points: 1,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "H5",
          //   label: "Not Applicable for Correct Hold Procedure",
          //   sublabel: "(2 point) (H5)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "H6",
          //   label: "Not Applicable for Correct Transfer Procedure",
          //   sublabel: "(2 point) (H6)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "H7",
          //   label: "Not Applicable for Correct Call Back Procedure",
          //   sublabel: "(1 point) (H7)",
          //   points: 1,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(3 point) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)",
            sublabel: "(2 point) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "email-qa-form-ancient-nutrition",
    title: "Email QA Form",
    clientId: 173810,
    clientName: "Ancient Nutrition",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer? ",
            sublabel: "(2 point) (A1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2 point) (A2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2 point) (A3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2 point) (A4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: " Not applicable for Brand Tone",
          //   sublabel: "(0 point) (A5)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: " Not applicable for Empathy",
          //   sublabel: "(0 point) (A6)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(3 point) (B1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "B2",
          //   label:
          //     "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
          //   sublabel: "(0 point) (B2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow approporiate email communication best practices?",
            sublabel: "(10 point) (C1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "Follow Client SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(4 point) (E1)",
            points: 4,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(0 point) (E2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(5 point) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent use the correct macro when handling the customer?",
            sublabel: "(5 point) (F3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(5 point) (F4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(5 point) (F5)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(5 point) (F6)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F8)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F9",
          //   label:
          //     "Not Applicable as no macro was used and message was personalized accurately",
          //   sublabel: "(5 point) (F9)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F10",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(5 point) (F10)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F11",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(5 point) (F11)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "grammar",
        title: "Grammar",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(10 point) (G1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(2 point) (H1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(4 point) (H2)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(4 point) (H3)",
            points: 4,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "H4",
          //   label: "Not Applicable (No Self-Help Option Required)",
          //   sublabel: "(2 point) (H4)",
          //   points: 2,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(3 point) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(2 point) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "chat-sms-sm-qa-form-ancient-nutrition",
    title: "Chat/SMS/SM QA Form",
    clientId: 173810,
    clientName: "Ancient Nutrition",
    sections: [
      {
        id: "greeting",
        title: "Greeting",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer? ",
            sublabel: "(2 point) (A1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(2 point) (A2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(2 point) (A3)",
            points: 2,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(2 point) (A4)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "A5",
          //   label: " Not applicable for Brand Tone",
          //   sublabel: "(0 point) (A5)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "A6",
          //   label: " Not applicable for Empathy",
          //   sublabel: "(0 point) (A6)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "verification",
        title: "Verification",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(3 point) (B1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "B2",
          //   label:
          //     "Not Applicable for Customer Verification (Concerns/Issue not related to orders/Generic Question)",
          //   sublabel: "(0 point) (B2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate best practices when handling the Live Chat/SMS or Social Media Message?",
            sublabel: "(12 point) (C1)",
            points: 12,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "Follow Client SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "Problem Identification",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(4 point) (E1)",
            points: 4,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "E2",
          //   label: "Not Applicable as client concern was clear",
          //   sublabel: "(0 point) (E2)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "resolution",
        title: "Resolution",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(5 point) (F1)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(5 point) (F2)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F3",
            label:
              "Did the agent use the correct macro when handling the customer?",
            sublabel: "(5 point) (F3)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(5 point) (F4)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(5 point) (F5)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(5 point) (F6)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(5 point) (F7)",
            points: 5,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(5 point) (F8)",
            points: 5,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          // {
          //   id: "F9",
          //   label:
          //     "Not Applicable as no macro was used and message was personalized accurately",
          //   sublabel: "(0 point) (F9)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F10",
          //   label:
          //     "Not Applicable for offering options when solving agent's concern",
          //   sublabel: "(5 point) (F10)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
          // {
          //   id: "F11",
          //   label: "Not Applicable for Client/Manager Escalation",
          //   sublabel: "(5 point) (F11)",
          //   points: 5,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "grammar",
        title: "Grammar",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(10 point) (G1)",
            points: 10,
            inputType: "checkbox",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(2 point) (H1)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(3 point) (H2)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(3 point) (H3)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          // {
          //   id: "H4",
          //   label: "Not Applicable (No Self-Help Option Required)",
          //   sublabel: "(0 point) (H4)",
          //   points: 0,
          //   inputType: "checkbox",
          //   comments: true,
          //   isOptional: true,
          // },
        ],
      },
      {
        id: "tools-utilization",
        title: "Tools Utilization",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(3 point) (I1)",
            points: 3,
            inputType: "checkbox",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(2 point) (I2)",
            points: 2,
            inputType: "checkbox",
            comments: true,
            isOptional: true,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // new form for Complement

  {
    id: "email-chat-ticket-monitoring-complement",
    title: "Email/Chat Ticket Monitoring Form",
    clientId: 308974,
    clientName: "Complement",
    sections: [
      {
        id: "opening",
        title: "OPENING",
        questions: [
          {
            id: "A1",
            label: "Proper Greeting and acknowledgement",
            sublabel: "(5 point) (A1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "A2",
            label: "Customer's name used",
            sublabel: "(5 point) (A2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "B1",
            label: "Grammar, spelling, and punctuation correct",
            sublabel: "(5 point) (B1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "B2",
            label: "Empathy demonstrated when needed",
            sublabel: "(5 point) (B2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "B3",
            label: "Extramile effort (going beyond expectations)",
            sublabel: "(5 point) (B3)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "C1",
            label:
              "Resolution provided or proper information provided (Front End)",
            sublabel: "(15 point) (C1)",
            points: 15,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
              { value: "8.00", label: "8.00" },
              { value: "9.00", label: "9.00" },
              { value: "10.00", label: "10.00" },
              { value: "11.00", label: "11.00" },
              { value: "12.00", label: "12.00" },
              { value: "13.00", label: "13.00" },
              { value: "14.00", label: "14.00" },
              { value: "15.00", label: "15.00" },
            ],
          },
          {
            id: "C2",
            label:
              "Action properly taken in Shopify/Recurly/Logicpod (Back End)",
            sublabel: "(15 point) (C2)",
            points: 15,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
              { value: "8.00", label: "8.00" },
              { value: "9.00", label: "9.00" },
              { value: "10.00", label: "10.00" },
              { value: "11.00", label: "11.00" },
              { value: "12.00", label: "12.00" },
              { value: "13.00", label: "13.00" },
              { value: "14.00", label: "14.00" },
              { value: "15.00", label: "15.00" },
            ],
          },
        ],
      },
      {
        id: "sop",
        title: "SOP",
        questions: [
          {
            id: "D1",
            label: "Necessary ticket tags applied",
            sublabel: "(10 point) (D1)",
            points: 10,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
              { value: "8.00", label: "8.00" },
              { value: "9.00", label: "9.00" },
              { value: "10.00", label: "10.00" },
            ],
          },
          {
            id: "D2",
            label: "Filled out ticket fields",
            sublabel: "(10 point) (D2)",
            points: 10,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
              { value: "8.00", label: "8.00" },
              { value: "9.00", label: "9.00" },
              { value: "10.00", label: "10.00" },
            ],
          },
          {
            id: "D3",
            label: "Ticket ownership",
            sublabel: "(10 point) (D3)",
            points: 10,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
              { value: "8.00", label: "8.00" },
              { value: "9.00", label: "9.00" },
              { value: "10.00", label: "10.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "E1",
            label: "Asked if customer needed additional assistance",
            sublabel: "(5 point) (E1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "E2",
            label: "Professional closing signature used",
            sublabel: "(5 point) (E2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "E3",
            label: "Internal note added with context (if needed)",
            sublabel: "(5 point) (E3)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  {
    id: "qa-form-gorgias",
    title: "QA Form",
    clientId: 400001,
    clientName: "Gorgias",
    sections: [
      {
        id: "inquiry-resolution",
        title: "INQUIRY RESOLUTION (50% WEIGHT)",
        questions: [
          {
            id: "A1",
            label: "Was the customer's core inquiry resolved?",
            sublabel: "(5 point) (A1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Was the agent able to follow the proper troubleshooting procedures?",
            sublabel: "(5 point) (A2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Was the agent able to utilise forward resolution to reduce future contacts from the customer?",
            sublabel: "(5 point) (A3)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
      {
        id: "conversation-tone-flow",
        title: "CONVERSATION TONE AND FLOW (30% WEIGHT)",
        questions: [
          {
            id: "B1",
            label:
              "Were the agent's communication skills good and the conversation tone appropriate?",
            sublabel: "(5 point) (B1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "B2",
            label: "Was the agent able to match the conversation flow?",
            sublabel: "(5 point) (B2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
      {
        id: "internal-processes",
        title: "INTERNAL PROCESSES (19% WEIGHT)",
        questions: [
          {
            id: "C1",
            label: "Did the agent add the required ticket fields?",
            sublabel: "(5 point) (C1)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
          {
            id: "C2",
            label: "Did the agent follow the proper ticket handling procedure?",
            sublabel: "(5 point) (C2)",
            points: 5,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
            ],
          },
        ],
      },
      {
        id: "impact-on-customer-perception",
        title: "IMPACT ON CUSTOMER PERCEPTION (1% WEIGHT/ AUTOFAIL)",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent cause a negative impact on how customers perceive Gorgias?",
            sublabel: "(1 point) (D1)",
            points: 1,
            inputType: "select",
            comments: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
  // ─── Cozy Earth — Quality Form V2.0 ────────────────────────────────
  // 4-anchor rubric: Does Not Meet (0) / Partially Meet (half of weight) /
  // Meets (full weight) / Not Applicable (full weight — client rule).
  // Weights sum to 100 across four sections. Critical (Auto Fail) is
  // surfaced via `isCritical` on individual questions.
  {
    id: "cozy-earth-quality-form-v2",
    title: "Cozy Earth Quality Form V2.0",
    clientId: 151608,
    clientName: "Cozy Earth",
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
    sections: [
      {
        id: "customer-attunement",
        title: "A. Customer Attunement",
        description:
          "The ability to accurately perceive, understand, and respond to the customer's emotions, tone, and needs.",
        questions: [
          {
            id: "A1",
            label:
              "How consistently did the agent greet the customer, use their name when available, and personalize the message to create a warm and professional experience?",
            sublabel: "(3 points) (A1)",
            points: 3,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1.5", label: "Partially Meet Expectations" },
              { value: "3", label: "Meets Expectations" },
              { value: "3", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label:
              "Did the agent demonstrate clear acknowledgment of the customer's concern/sentiment during the interaction?",
            sublabel: "(4 points) (A2)",
            points: 4,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "2", label: "Partially Meet Expectations" },
              { value: "4", label: "Meets Expectations" },
              { value: "4", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did the agent show empathy—especially when the customer seemed frustrated, confused, or emotional—and were any opportunities missed to acknowledge their situation more genuinely?",
            sublabel: "(4 points) (A3)",
            points: 4,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "2", label: "Partially Meet Expectations" },
              { value: "4", label: "Meets Expectations" },
              { value: "4", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A4",
            label:
              "Was the tone professional and appropriate for the situation (customer or internal)?",
            sublabel: "(2 points) (A4)",
            points: 2,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1", label: "Partially Meet Expectations" },
              { value: "2", label: "Meets Expectations" },
              { value: "2", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A5",
            label:
              "If the agent likely resolved the customer's issue, did they check if additional assistance was needed before closing?",
            sublabel: "(2 points) (A5)",
            points: 2,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1", label: "Partially Meet Expectations" },
              { value: "2", label: "Meets Expectations" },
              { value: "2", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "communication-execution",
        title: "B. Communication Execution & Tools Usage",
        description:
          "The clarity, structure, professionalism, and effectiveness of communication, including proper use of tools and resources.",
        questions: [
          {
            id: "B1",
            label:
              "Was the response clear, well-structured, and grammatically correct?",
            sublabel: "(3 points) (B1)",
            points: 3,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1.5", label: "Partially Meet Expectations" },
              { value: "3", label: "Meets Expectations" },
              { value: "3", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B2",
            label:
              "Did the agent use macros/templates appropriately and adjust them as needed (if applicable)?",
            sublabel: "(3 points) (B2)",
            points: 3,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1.5", label: "Partially Meet Expectations" },
              { value: "3", label: "Meets Expectations" },
              { value: "3", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B3",
            label:
              "Were relevant and functional links/resources provided (if applicable)?",
            sublabel: "(3 points) (B3)",
            points: 3,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1.5", label: "Partially Meet Expectations" },
              { value: "3", label: "Meets Expectations" },
              { value: "3", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "B4",
            label:
              "Were the agent's solutions clearly tailored to the customer's specific situation—and could they have done more to clarify next steps or prevent unnecessary back-and-forth?",
            sublabel: "(3 points) (B4)",
            points: 3,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "1.5", label: "Partially Meet Expectations" },
              { value: "3", label: "Meets Expectations" },
              { value: "3", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "process-adherence",
        title: "C. Process Adherence & Compliance",
        description:
          "The extent to which workflows, policies, and required procedures are followed accurately and consistently.",
        questions: [
          {
            id: "C1",
            label:
              "Were the agent's questions/actions sufficient to properly diagnose or handle the issue?",
            sublabel: "(9 points) (C1)",
            points: 9,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "4.5", label: "Partially Meet Expectations" },
              { value: "9", label: "Meets Expectations" },
              { value: "9", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C2",
            label:
              "Critical (Auto Fail): Did the agent follow the correct workflow and applicable policies (e.g., warranties, returns, exchanges)?",
            sublabel: "(19 points) (C2) — Critical",
            points: 19,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "9.5", label: "Partially Meet Expectations" },
              { value: "19", label: "Meets Expectations" },
              { value: "19", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
            isCritical: true,
          },
          {
            id: "C3",
            label:
              "Did the agent follow required follow-up procedures (e.g., requesting missing info, offering alternatives)?",
            sublabel: "(9 points) (C3)",
            points: 9,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "4.5", label: "Partially Meet Expectations" },
              { value: "9", label: "Meets Expectations" },
              { value: "9", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "C4",
            label:
              "Critical (Auto Fail): Did the agent complete all required steps before resolution (no skipped processes)?",
            sublabel: "(18 points) (C4) — Critical",
            points: 18,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "9", label: "Partially Meet Expectations" },
              { value: "18", label: "Meets Expectations" },
              { value: "18", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
            isCritical: true,
          },
        ],
      },
      {
        id: "documentation",
        title: "D. Documentation & Case Management",
        description:
          "Measures the completeness, clarity, and accuracy of internal notes and case tracking.",
        questions: [
          {
            id: "D1",
            label:
              "Critical (Auto Fail): Did the agent leave clear and complete notes in all required areas? Also, are the notes detailed enough for another agent to take over without confusion?",
            sublabel: "(11 points) (D1) — Critical",
            points: 11,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "5.5", label: "Partially Meet Expectations" },
              { value: "11", label: "Meets Expectations" },
              { value: "11", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
            isCritical: true,
          },
          {
            id: "D2",
            label:
              "Did the agent accurately track the case (e.g., Date Created, Date Processed, Status) without manipulating or misrepresenting SLA data?",
            sublabel: "(7 points) (D2)",
            points: 7,
            options: [
              { value: "0", label: "Does Not Meet Expectations" },
              { value: "3.5", label: "Partially Meet Expectations" },
              { value: "7", label: "Meets Expectations" },
              { value: "7", label: "Not Applicable" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
    ],
  },

  // gamer supps 125369

  {
    id: "email-chat-qa-form-gamer-supps",
    title: "Email/Chat Quality Form",
    clientId: 125369,
    clientName: "Gamer Supps",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        // Source sheet references "A4 - Not applicable for Empathy" in this
        // section, but A1-A3 are all greeting-related (no empathy question)
        // and no other question references it either — left unresolved,
        // confirm with Gamer Supps which question this should belong to.
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer?",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "A3",
            label:
              "Did the agent include a statement that reassures customers of the team's willingness and commitment to assist.",
            sublabel: "(A3)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable for Customer Verification (Concerns/Issue not
            // related to orders/Generic Question)" — modeled as the
            // existing include/exclude toggle rather than a 3rd dropdown
            // option, since the scoring engine only reads that toggle.
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate email communication best practices?",
            sublabel: "(C1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable as client concern was clear"
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(F1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F2",
            label: "Did the agent use the correct macro when handling the customer?",
            sublabel: "(F2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable as no macro was used and message was
            // personalized accurately"
            isOptional: true,
          },
          {
            id: "F3",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(F3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable for offering options when solving agent's
            // concern"
            isOptional: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F4)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F5",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(F5)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F6",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(F6)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(F7)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable for Client/Manager Escalation"
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(G1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future? Agents should proactively offer self-service options or provide assistance in managing subscriptions whenever applicable.",
            sublabel: "(H1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            // "Not Applicable (No Self-Help Option Required)"
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(H3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(I1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
          },
        ],
      },
    ],
    // Zero-tolerance / auto-fail checklist — unscored (points: 0, doesn't
    // count toward the 100-point total) but each answer can carry a
    // negative deduction subtracted from the earned score. J1/J2 are
    // phrased as "did the agent do the right thing" (Yes = correct, so No
    // costs -10); J3 is phrased as "did a violation happen" (Yes = bad, so
    // Yes costs -10) — opposite polarity from J1/J2, confirmed with the
    // client.
    autoFailSection: {
      id: "zero-tolerance",
      title: "ZERO TOLERANCE / AUTO FAIL",
      questions: [
        {
          id: "J1",
          label: "Verify Order ID number (if needed)",
          sublabel: "(J1)",
          points: 0,
          options: [
            { value: "0", label: "Yes" },
            { value: "-10", label: "No" },
          ],
          inputType: "select",
        },
        {
          id: "J2",
          label:
            "Did the agent uncheck the restock box in Shopify if the customer requested a cancellation of a specific item?",
          sublabel: "(J2)",
          points: 0,
          options: [
            { value: "0", label: "Yes" },
            { value: "-10", label: "No" },
          ],
          inputType: "select",
        },
        {
          id: "J3",
          label: "Inaccurate Information",
          sublabel: "(J3)",
          points: 0,
          options: [
            { value: "-10", label: "Yes" },
            { value: "0", label: "No" },
          ],
          inputType: "select",
        },
      ],
    },
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // hello molly 183502

  {
    id: "hello-molly-email-quality-form",
    title: "Email Quality Form",
    clientId: 183502,
    clientName: "Hello Molly",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer?",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer?",
            sublabel: "(C1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C2",
            label:
              "Did the agent follow appropriate email communication best practices?",
            sublabel: "(C2)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer options or a potential resolution?",
            sublabel: "(F1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and provide a complete and accurate resolution?",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label:
              "Did the agent use the correct macro when handling the customer? (If applicable)",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent showcase proper attention to detail and go above and beyond to support the customer?",
            sublabel: "(F4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F5",
            label:
              "Did the agent escalate the concern to the client/manager? (If applicable)",
            sublabel: "(F5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent use correct spelling and capitalization throughout the communication? (More than 2 errors = markdown)",
            sublabel: "(G1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label:
              "Did the agent use proper punctuation marks (e.g., periods, commas) without excessive spacing or errors? (More than 2 errors = markdown)",
            sublabel: "(G2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G3",
            label:
              "Did the agent format the message correctly without unnecessary spacing or formatting mistakes? (More than 2 errors = markdown)",
            sublabel: "(G3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G4",
            label:
              "Did the agent avoid any other grammatical mistakes that affect readability? (More than 2 errors = markdown)",
            sublabel: "(G4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources and offer further assistance, or ask if concerns were resolved?",
            sublabel: "(H1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H2",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)",
            sublabel: "(I1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // us luggage 168387

  {
    id: "us-luggage-email-quality-form",
    title: "Email Quality Form",
    clientId: 168387,
    clientName: "US Luggage",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer?",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A4)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate email communication best practices?",
            sublabel: "(B1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent ensure all actions are aligned to the client's SOP/CS best practices?",
            sublabel: "(C1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(D1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E2",
            label:
              "Did the agent educate the customer about the issue and highlight what he/she can do?",
            sublabel: "(E2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E3",
            label:
              "Did the agent use the correct macro when handling the customer?",
            sublabel: "(E3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "E4",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(E4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "E5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(E5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(E6)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(E7)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(E8)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "F1",
            label:
              "Was the agent free of spelling, capitalization, punctuation, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances is a markdown)",
            sublabel: "(F1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "G2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(G3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Hold/Pending)?",
            sublabel: "(H1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // us luggage 168387 (phone)

  {
    id: "us-luggage-phone-quality-form",
    title: "Phone Quality Form",
    clientId: 168387,
    clientName: "US Luggage",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(A1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label:
              "Did agent take time to paraphrase the concern to confirm understanding?",
            sublabel: "(A3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A5",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A5)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify the customer and their account details?",
            sublabel: "(B1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(C1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the client's SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(F1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlight what he/she can do?",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F5",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(F5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F6",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(F6)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(F7)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(G3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(G4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "call-handling",
        title: "CALL HANDLING",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(H1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H2",
            label: "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(H3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(H4)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(I1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // open farm 347053

  {
    id: "open-farm-email-quality-form",
    title: "Email Quality Form",
    clientId: 347053,
    clientName: "Open Farm",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer?",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify Customer and their account details?",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate email communication best practices?",
            sublabel: "(C1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the clients SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(F1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlighted what he/she can do?",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label: "Did the agent use the correct macro when handling the customer?",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(F4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F6",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(F6)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F7",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(F7)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F8",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(F8)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent have multiple spelling, capitalization, punctuation mark, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances of these examples is a markdown)",
            sublabel: "(G1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(H1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(H3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)?",
            sublabel: "(I1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // moose knuckles 344467

  {
    id: "moose-knuckles-email-chat-quality-form",
    title: "Email/Chat Quality Form",
    clientId: 344467,
    clientName: "Moose Knuckles",
    sections: [
      {
        id: "greeting-and-personalization",
        title: "GREETING AND PERSONALIZATION",
        questions: [
          {
            id: "A1",
            label:
              "Agent opened with a proper greeting appropriate to the channel (email: salutation with customer name where available; chat: brand welcome, agent name introduction)",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label:
              "Agent acknowledged the customer's reason for contact or expressed willingness to help",
            sublabel: "(A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Agent demonstrated empathy when appropriate",
            sublabel: "(A3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label:
              "Agent maintained brand voice and tone throughout the interaction",
            sublabel: "(A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "verification-and-account-security",
        title: "VERIFICATION AND ACCOUNT SECURITY",
        questions: [
          {
            id: "B1",
            label:
              "Agent followed the correct verification process when required (e.g., requested relevant order or account details)",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication-effectiveness",
        title: "COMMUNICATION EFFECTIVENESS",
        questions: [
          {
            id: "C1",
            label: "Response was clear, concise, and easy to understand",
            sublabel: "(C1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C2",
            label:
              "Agent demonstrated active listening by addressing all concerns raised",
            sublabel: "(C2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C3",
            label:
              "Agent provided a personalized response tailored to the customer's specific situation, avoiding generic or templated language",
            sublabel: "(C3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "process-and-sop-compliance",
        title: "PROCESS AND SOP COMPLIANCE",
        questions: [
          {
            id: "D1",
            label: "Agent followed the correct SOP and process for the interaction",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "D2",
            label:
              "Agent resolved the concern independently without seeking clarification on items covered by existing SOPs",
            sublabel: "(D2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification-and-ownership",
        title: "PROBLEM IDENTIFICATION AND OWNERSHIP",
        questions: [
          {
            id: "E1",
            label:
              "Agent asked relevant probing questions when needed and correctly identified the root cause of the customer's concern",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "E2",
            label: "Agent demonstrated ownership of the customer's concern",
            sublabel: "(E2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "resolution-and-customer-guidance",
        title: "RESOLUTION AND CUSTOMER GUIDANCE",
        questions: [
          {
            id: "F1",
            label: "Provided accurate resolution or next steps",
            sublabel: "(F1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label: "Set proper expectations/timelines",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label: "Explained the reason behind the resolution",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F4",
            label: "Offered applicable alternatives/options",
            sublabel: "(F4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Escalated appropriately when required",
            sublabel: "(F5)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar-and-professional-writing",
        title: "GRAMMAR AND PROFESSIONAL WRITING",
        questions: [
          {
            id: "G1",
            label: "Proper grammar, punctuation, capitalization, and spelling",
            sublabel: "(G1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label: "Professional formatting and readability",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing-and-customer-experience",
        title: "CLOSING AND CUSTOMER EXPERIENCE",
        questions: [
          {
            id: "H1",
            label:
              "Agent provided relevant self-help resources or references when applicable",
            sublabel: "(H1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label: "Agent confirmed if further assistance was needed",
            sublabel: "(H2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H3",
            label:
              "Agent closed the interaction professionally and thanked the customer appropriately",
            sublabel: "(H3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "documentation-and-tools-utilization",
        title: "DOCUMENTATION AND TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label: "Proper documentation/notes completed",
            sublabel: "(I1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label: "Correct platform usage (tags, merge, snooze, macros)",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // moose knuckles 344467 (phone)

  {
    id: "moose-knuckles-phone-quality-form",
    title: "Phone Quality Form",
    clientId: 344467,
    clientName: "Moose Knuckles",
    sections: [
      {
        id: "greetings-and-personalization",
        title: "GREETINGS AND PERSONALIZATION",
        questions: [
          {
            id: "A1",
            label:
              "Agent opened with a proper greeting appropriate to the channel (thanked the customer for calling, stated the company name and their own name)",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label:
              "Agent acknowledged the customer's reason for contact or expressed willingness to help",
            sublabel: "(A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Agent demonstrated empathy when appropriate",
            sublabel: "(A3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label:
              "Agent maintained brand voice and tone throughout the interaction",
            sublabel: "(A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "verification-and-account-security",
        title: "VERIFICATION AND ACCOUNT SECURITY",
        questions: [
          {
            id: "B1",
            label:
              "Agent followed the correct verification process when required (e.g., requested relevant order or account details)",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication-effectiveness",
        title: "COMMUNICATION EFFECTIVENESS",
        questions: [
          {
            id: "C1",
            label: "Response was clear, concise, and easy to understand",
            sublabel: "(C1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C2",
            label:
              "Agent demonstrated active listening by addressing all concerns raised",
            sublabel: "(C2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C3",
            label:
              "Agent provided a personalized response tailored to the customer's specific situation, avoiding generic or templated language",
            sublabel: "(C3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "process-and-sop-compliance",
        title: "PROCESS AND SOP COMPLIANCE",
        questions: [
          {
            id: "D1",
            label: "Agent followed the correct SOP and process for the interaction",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "D2",
            label:
              "Agent resolved the concern independently without seeking clarification on items covered by existing SOPs",
            sublabel: "(D2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification-and-ownership",
        title: "PROBLEM IDENTIFICATION AND OWNERSHIP",
        questions: [
          {
            id: "E1",
            label:
              "Agent asked relevant probing questions when needed and correctly identified the root cause of the customer's concern",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "E2",
            label: "Agent demonstrated ownership of the customer's concern",
            sublabel: "(E2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "resolution-and-customer-guidance",
        title: "RESOLUTION AND CUSTOMER GUIDANCE",
        questions: [
          {
            id: "F1",
            label: "Provided accurate resolution or next steps",
            sublabel: "(F1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label: "Set proper expectations/timelines",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label: "Explained the reason behind the resolution",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F4",
            label: "Offered applicable alternatives/options",
            sublabel: "(F4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F5",
            label: "Escalated appropriately when required",
            sublabel: "(F5)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "call-handling",
        title: "CALL HANDLING",
        questions: [
          {
            id: "G1",
            label:
              "Agent managed dead air appropriately (filled silence with updates or acknowledgment)",
            sublabel: "(G1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label:
              "Agent followed correct hold procedure (asked permission, provided reason, thanked customer upon return)",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "closing-and-customer-experience",
        title: "CLOSING AND CUSTOMER EXPERIENCE",
        questions: [
          {
            id: "H1",
            label:
              "Agent provided relevant self-help resources or references when applicable",
            sublabel: "(H1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label: "Agent confirmed if further assistance was needed",
            sublabel: "(H2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H3",
            label:
              "Agent closed the interaction professionally and thanked the customer appropriately",
            sublabel: "(H3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "documentation-and-tools-utilization",
        title: "DOCUMENTATION AND TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label: "Proper documentation/notes completed",
            sublabel: "(I1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label: "Correct platform usage (tags, merge, snooze, macros)",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // women's best 151610

  {
    id: "womens-best-email-quality-form",
    title: "Email Quality Form",
    clientId: 151610,
    clientName: "Women's Best",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label: "Did the agent provide a proper and appropriate greeting?",
            sublabel: "(A1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label:
              "Did the agent demonstrate and encourage a positive tone throughout the conversation?",
            sublabel: "(A2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "personalization",
        title: "PERSONALIZATION",
        questions: [
          {
            id: "B1",
            label: "Did the agent acknowledge the customer's issue?",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B2",
            label: "Did the agent provide empathy when needed?",
            sublabel: "(B2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "B3",
            label:
              "Did the agent display ownership of the issue? (if applicable)",
            sublabel: "(B3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "problem-solving",
        title: "PROBLEM SOLVING",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent ask relevant questions to get to the bottom of the issue all at once?",
            sublabel: "(C1)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C2",
            label:
              "Did the agent obtain all necessary information to check the customer's account and add it to Zendesk where it's visible to others?",
            sublabel: "(C2)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C3",
            label:
              "Did the agent know all the tools to access and gain more information about what happened? (Zendesk, Shopify, other client mandated tools)",
            sublabel: "(C3)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C4",
            label:
              "Did the agent provide the correct resolution based on the client's SOP? (including macro usage)",
            sublabel: "(C4)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C5",
            label: "Did the agent follow the process down to a T?",
            sublabel: "(C5)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C6",
            label: "Did the agent answer all the customer's concerns?",
            sublabel: "(C6)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "8.00", label: "8.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "email-chat-specifics",
        title: "EMAIL/CHAT SPECIFICS",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent follow Casual American English Language? (Including spelling, capitalization and formatting - 3 instances or very evident)",
            sublabel: "(D1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "D2",
            label:
              "Provided links, screenshots, proof of delivery and payment invoice that are needed and essential to resolve the issue",
            sublabel: "(D2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "D3",
            label:
              "Proofread the macro and tailor-fit the response format to the channel being used",
            sublabel: "(D3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "E1",
            label: "Did the agent set proper expectations to the customer?",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E2",
            label:
              "Did the agent provide next steps to resolve the issue or prevent it from happening again?",
            sublabel: "(E2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E3",
            label:
              "Did the agent offer self-help options for the customer's future reference?",
            sublabel: "(E3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "E4",
            label: "Did the agent provide a personalized closing statement?",
            sublabel: "(E4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // hammitt 418613

  {
    id: "hammitt-email-quality-form",
    title: "Email Quality Form",
    clientId: 418613,
    clientName: "Hammitt",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly greet, thank, and address the customer?",
            sublabel: "(A1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A4",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A4)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify the customer and their account details?",
            sublabel: "(B1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate with the customer and follow appropriate email communication best practices?",
            sublabel: "(C1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the client's SOP/CS best practices?",
            sublabel: "(D1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent educate the customer about the issue and highlight what he/she can do?",
            sublabel: "(F1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent showcase proper attention to detail and offer options for the customer?",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label: "Did the agent use the correct macro when handling the customer?",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F5",
            label:
              "Did the agent escalate the issue to the Hammitt internal team? (if applicable)",
            sublabel: "(F5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F6",
            label:
              "Did the agent identify and attempt upsell or cross-sell opportunities?",
            sublabel: "(F6)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F7",
            label:
              "Did the agent attempt to mitigate a potential return or cancellation?",
            sublabel: "(F7)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar",
        title: "GRAMMAR",
        questions: [
          {
            id: "G1",
            label:
              "Was the agent free of spelling, capitalization, punctuation, excessive spacing, formatting or other grammatical mistakes? (More than 2 instances is a markdown)",
            sublabel: "(G1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "H1",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(H1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H2",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(H2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H3",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(H3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent use the CS Platform tools properly (Tags, Merging, Snooze)?",
            sublabel: "(I1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label:
              "Did agent properly leave notes and document the conversation in all applicable channels (Shopify/Gorgias etc)?",
            sublabel: "(I2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // hammitt 418613 (phone)

  {
    id: "hammitt-phone-quality-form",
    title: "Phone Quality Form",
    clientId: 418613,
    clientName: "Hammitt",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label:
              "Did agent take time to paraphrase the concern to confirm understanding?",
            sublabel: "(A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A5",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A5)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify the customer and their account details?",
            sublabel: "(B1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(C1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the client's SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(F1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlight what he/she can do?",
            sublabel: "(F2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(F3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F4)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F5",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(F5)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F6",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(F6)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(F7)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F8",
            label:
              "Did the agent identify and attempt upsell or cross-sell opportunities?",
            sublabel: "(F8)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F9",
            label:
              "Did the agent attempt to mitigate a potential return or cancellation?",
            sublabel: "(F9)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F10",
            label:
              "Did the agent demonstrate strong product knowledge to reassure or inform the customer?",
            sublabel: "(F10)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "4.00", label: "4.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(G3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(G4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "call-handling",
        title: "CALL HANDLING",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(H1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H2",
            label: "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(H3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(H4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(I1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label: "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // scentiment 426941

  {
    id: "scentiment-email-quality-form",
    title: "Email Quality Form",
    clientId: 426941,
    clientName: "Scentiment",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label: "Tone of the greeting - is it polite and warm?",
            sublabel: "(A1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label:
              "Personalization: was the greeting tailored to the customer (using their name)?",
            sublabel: "(A2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label:
              "Timeliness: was the response quick and did the greeting align with the response?",
            sublabel: "(A3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "courtesy-and-communication",
        title: "COURTESY & COMMUNICATION",
        questions: [
          {
            id: "B1",
            label: "Politeness: is the language used polite and respectful?",
            sublabel: "(B1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B2",
            label:
              "Clarity: is the information clearly communicated without jargon or confusion?",
            sublabel: "(B2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B3",
            label:
              "Conciseness: is the response concise without unnecessary information?",
            sublabel: "(B3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B4",
            label:
              "Professionalism: did the agent maintain a professional tone throughout?",
            sublabel: "(B4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "issue-resolution",
        title: "ISSUE RESOLUTION",
        questions: [
          {
            id: "C1",
            label: "Did the agent provide an accurate and complete resolution?",
            sublabel: "(C1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C2",
            label:
              "Did the agent clearly explain the resolution to ensure the customer understands?",
            sublabel: "(C2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C3",
            label: "Did the agent process the request as promised to the customer?",
            sublabel: "(C3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C4",
            label:
              "Proactiveness: did the agent offer additional solutions or alternatives if needed?",
            sublabel: "(C4)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "C5",
            label: "Correctness of solution: was the issue resolved correctly?",
            sublabel: "(C5)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "case-documentation",
        title: "CASE DOCUMENTATION",
        questions: [
          {
            id: "D1",
            label: "Agent documented the case correctly",
            sublabel: "(D1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "press-compliance",
        title: "PRESS COMPLIANCE",
        questions: [
          {
            id: "E1",
            label:
              "Adherence to SOPs: did the agent follow standard operating procedures, and was the issue escalated when necessary according to the process?",
            sublabel: "(E1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "E2",
            label: "Effectiveness: was the issue resolved efficiently and effectively?",
            sublabel: "(E2)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // scentiment 426941 (phone)

  {
    id: "scentiment-phone-quality-form",
    title: "Phone Quality Form",
    clientId: 426941,
    clientName: "Scentiment",
    sections: [
      {
        id: "greeting",
        title: "GREETING",
        questions: [
          {
            id: "A1",
            label:
              "Did agent properly thank the customer for calling, mention company name, their name and greet the customer?",
            sublabel: "(A1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A2",
            label: "Did agent acknowledge the customer's concern?",
            sublabel: "(A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A3",
            label:
              "Did agent take time to paraphrase the concern to confirm understanding?",
            sublabel: "(A3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "A4",
            label: "Did agent empathize with the customer on their concern(s)?",
            sublabel: "(A4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A5",
            label: "Did agent use client's Brand Tone during discussion?",
            sublabel: "(A5)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "verification",
        title: "VERIFICATION",
        questions: [
          {
            id: "B1",
            label:
              "Did agent take time to verify the customer and their account details?",
            sublabel: "(B1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication",
        title: "COMMUNICATION",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent effectively communicate and handle the call confidently with the customer?",
            sublabel: "(C1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "7.00", label: "7.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "follow-client-sop",
        title: "FOLLOW CLIENT SOP",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent ensure all actions are aligned to the client's SOP/CS best practices?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "10.00", label: "10.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent ask relevant questions to identify the concern?",
            sublabel: "(E1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "resolution",
        title: "RESOLUTION",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent inform the customer about any next steps and offer a potential resolution?",
            sublabel: "(F1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F2",
            label:
              "Did the agent educate the customer about the issue and highlight what he/she can do?",
            sublabel: "(F2)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F3",
            label:
              "Did the agent offer options when trying to solve the customer's concern?",
            sublabel: "(F3)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F4",
            label: "Did the agent provide a complete and accurate resolution?",
            sublabel: "(F4)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F5",
            label:
              "Did the agent showcase proper attention to detail when handling their concern?",
            sublabel: "(F5)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F6",
            label: "Did the agent go above and beyond to support the customer?",
            sublabel: "(F6)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "F7",
            label:
              "Did the agent escalate the concern to client/manager? (If applicable)",
            sublabel: "(F7)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "closing",
        title: "CLOSING",
        questions: [
          {
            id: "G1",
            label:
              "Did the agent provide a recap regarding the customer issue and a resolution to their issue?",
            sublabel: "(G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G2",
            label:
              "Did the agent provide any reference or self-help resources to solve their situation in the future?",
            sublabel: "(G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "G3",
            label:
              "Did the agent offer further assistance and/or ask if concerns were resolved?",
            sublabel: "(G3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G4",
            label:
              "Did the agent have a personalized closing to the customer communication?",
            sublabel: "(G4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "call-handling",
        title: "CALL HANDLING",
        questions: [
          {
            id: "H1",
            label:
              "Was there minimal to no dead air throughout the call? (Average Handling Time - max 6 min)",
            sublabel: "(H1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "5.00", label: "5.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "H2",
            label: "Did the agent follow the correct hold procedure? (If applicable)",
            sublabel: "(H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H3",
            label:
              "Did the agent follow the correct transfer procedure? (If applicable)",
            sublabel: "(H3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "H4",
            label:
              "Did the agent follow the correct call back procedure? (If applicable)",
            sublabel: "(H4)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "tools-utilization",
        title: "TOOLS UTILIZATION",
        questions: [
          {
            id: "I1",
            label:
              "Did the agent properly leave notes and document all relevant details throughout the conversation?",
            sublabel: "(I1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "3.00", label: "3.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "I2",
            label: "Did the agent use the CS Platform tools properly (Tags, Snooze, Merge)?",
            sublabel: "(I2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "2.00", label: "2.00" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
    ],
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },

  // calpak 435726

  {
    id: "calpak-non-voice-quality-form",
    title: "CX Experience | Non-Voice QA Form",
    clientId: 435726,
    clientName: "CALPAK",
    sections: [
      {
        id: "problem-identification",
        title: "PROBLEM IDENTIFICATION",
        questions: [
          {
            id: "A1",
            label:
              "Did the agent read, understand, and correctly identify the customer's issue?",
            sublabel: "(A1)",
            points: 15,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "15.00", label: "15.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "A2",
            label:
              "Did the agent ask clarifying questions or summarize the inquiry before proceeding?",
            sublabel: "(A2)",
            points: 15,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "15.00", label: "15.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "communication-tone-and-personalization",
        title: "COMMUNICATION, TONE & PERSONALIZATION",
        questions: [
          {
            id: "B1",
            label: "Was the message empathetic, warm, and on-brand?",
            sublabel: "(B1)",
            points: 15,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "7.50", label: "7.50 - Partial" },
              { value: "15.00", label: "15.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B2",
            label: "Was the message clear, well-structured, and easy to read?",
            sublabel: "(B2)",
            points: 12,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "12.00", label: "12.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "B3",
            label:
              "Did the agent personalize the response and build genuine rapport?",
            sublabel: "(B3)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "5.00", label: "5.00 - Partial" },
              { value: "10.00", label: "10.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "grammar-and-spelling",
        title: "GRAMMAR & SPELLING",
        questions: [
          {
            id: "C1",
            label:
              "Was the message free of spelling, grammar, punctuation, and formatting errors? (0-2 minor errors acceptable; 3 or more is a markdown)",
            sublabel: "(C1)",
            points: 5,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "5.00", label: "5.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "sop-and-accuracy",
        title: "SOP & ACCURACY",
        questions: [
          {
            id: "D1",
            label: "Was the resolution correct and policy-aligned?",
            sublabel: "(D1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "10.00", label: "10.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "D2",
            label:
              "Did the agent follow internal procedures and use the correct tools?",
            sublabel: "(D2)",
            points: 8,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "8.00", label: "8.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "resolution-quality",
        title: "RESOLUTION QUALITY",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent take ownership and clearly explain what happens next?",
            sublabel: "(E1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "10.00", label: "10.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
        ],
      },
      {
        id: "documentation",
        title: "DOCUMENTATION",
        questions: [
          {
            id: "F1",
            label:
              "Were actions properly documented within internal tools and trackers?",
            sublabel: "(F1)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "5.00", label: "5.00 - Partial" },
              { value: "10.00", label: "10.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
          {
            id: "F2",
            label: "Were ticket fields correctly completed?",
            sublabel: "(F2)",
            points: 10,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "5.00", label: "5.00 - Partial" },
              { value: "10.00", label: "10.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
      {
        id: "closing-and-csat",
        title: "CLOSING & CSAT",
        questions: [
          {
            id: "G1",
            label: "Did the agent close warmly and offer further help?",
            sublabel: "(G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "2.00", label: "2.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: false,
          },
          {
            id: "G4",
            label:
              "Chat FRT: was the chat picked up within the required pickup time? (N/A for email audits)",
            sublabel: "(G4)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00 - No" },
              { value: "1.00", label: "1.00 - Yes" },
            ],
            inputType: "select",
            comments: true,
            isOptional: true,
          },
        ],
      },
    ],
    // Deliberately calibrated: the sections above sum to 123 points, and
    // each Z-question's "Yes" deducts exactly -123 — since earned points
    // can never exceed 123, this always clamps the final score to 0 via
    // calculateTotalFormScore's Math.max(0, ...), i.e. any zero-tolerance
    // violation fails the whole ticket regardless of the rest of the score.
    autoFailSection: {
      id: "zero-tolerance",
      title: "ZERO TOLERANCE / AUTO FAIL",
      questions: [
        {
          id: "Z1",
          label:
            "Customer Critical: rude, robotic, or rushed tone; unprofessional or disrespectful language toward the customer",
          sublabel: "(Z1)",
          points: 0,
          options: [
            { value: "0", label: "No" },
            { value: "-123", label: "Yes" },
          ],
          inputType: "select",
        },
        {
          id: "Z2",
          label:
            "Business Critical: incorrect process or missed escalation with financial risk to the business",
          sublabel: "(Z2)",
          points: 0,
          options: [
            { value: "0", label: "No" },
            { value: "-123", label: "Yes" },
          ],
          inputType: "select",
        },
        {
          id: "Z3",
          label:
            "Compliance Critical: mishandling of customer data, privacy violations, or breach of security protocol",
          sublabel: "(Z3)",
          points: 0,
          options: [
            { value: "0", label: "No" },
            { value: "-123", label: "Yes" },
          ],
          inputType: "select",
        },
      ],
    },
    extraSections: [
      {
        id: "summary-notes",
        title: "SUMMARY NOTES",
        required: true,
        questions: [
          {
            id: "opportunities",
            label: "OPPORTUNITIES",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "wins",
            label: "WINS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
          {
            id: "recommendations",
            label: "RECOMMENDATIONS",
            sublabel: "",
            points: 0,
            inputType: "textarea",
          },
        ],
      },
    ],
  },
];
export function getFormTypeById(id) {
  return formTypes.find((type) => type.id === id);
}

function isNumericString(str) {
  return (
    typeof str === "string" && !isNaN(Number(str)) && !isNaN(parseFloat(str))
  );
}
function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function calculateSectionScore(
  section,
  responses,
  includedQuestions
) {
  let current = 0;
  let total = 0;

  section.questions.forEach((question) => {
    const isIncluded = question.isOptional
      ? includedQuestions[question.id]
        ? includedQuestions[question.id]
        : false
      : true;

    if (isIncluded) {
      total += question.points;
      const response = responses[question.id];
      if (response) {
        if (isNumericString(response)) {
          current += Number.parseFloat(response);
        } else if (isPlainObject(response)) {
          current += Number.parseFloat(response.value);
        } else if (response.length > 70) {
          current += Number.parseFloat(question.points);
        }
      }
    }
  });

  return { current, total };
}

// Zero-tolerance / auto-fail checklist (currently only Gamer Supps).
// Each question's response carries a negative point value ("No" = -10,
// etc.) when it represents a violation — this sums those and returns a
// positive deduction. Forms without an autoFailSection (every other
// client today) never call this.
export function calculateAutoFailDeduction(autoFailSection, responses) {
  if (!autoFailSection) return 0;

  let deduction = 0;
  autoFailSection.questions.forEach((question) => {
    const response = responses[question.id];
    if (!response) return;

    let numericValue;
    if (isNumericString(response)) {
      numericValue = Number.parseFloat(response);
    } else if (isPlainObject(response)) {
      numericValue = Number.parseFloat(response.value);
    }

    if (!Number.isNaN(numericValue) && numericValue < 0) {
      deduction += Math.abs(numericValue);
    }
  });

  return deduction;
}

export function calculateTotalFormScore(
  formType,
  responses,
  includedQuestions
) {
  let totalCurrent = 0;
  let totalPossible = 0;

  formType.sections.forEach((section) => {
    const { current, total } = calculateSectionScore(
      section,
      responses,
      includedQuestions
    );
    totalCurrent += current;
    totalPossible += total;
  });

  // Auto-fail deductions reduce the earned score only — the max stays the
  // same, so a violation actually lowers the percentage instead of being
  // invisible. Clamped at 0 rather than allowing a negative score.
  if (formType.autoFailSection) {
    const deduction = calculateAutoFailDeduction(
      formType.autoFailSection,
      responses
    );
    totalCurrent = Math.max(0, totalCurrent - deduction);
  }

  return { current: totalCurrent, total: totalPossible };
}

export const ticketTypes = formTypes.map(({ id, title }) => ({
  id,
  title,
}));
export function getFormsByClientId(clientId) {
  return formTypes.filter((form) => form.clientId === clientId);
}
export function getTicketTypesByClient(clientId) {
  return getFormsByClientId(clientId).map(({ id, title }) => ({
    id,
    title,
  }));
}
