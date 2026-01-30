export const formTypes = [
  {
    id: "customer-service-email",
    title: "Customer Service - Email/Chat",
    sections: [
      {
        id: "greeting",
        title: "Greeting & Personalization",
        questions: [
          {
            id: "A1",
            label:
              "Did the agent greet the customer warmly and use their name if known?",
            sublabel: "(3 point) (A1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the agent acknowledge the customer’s situation and respond with Empathy & Tone and understanding?",
            sublabel: "(4 point) (A2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Did the agent fully address all of the customer’s questions or concerns in their reply/replies?",
            sublabel: "(5 point) (A3)",
            points: 5,
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
            id: "A4",
            label:
              "Did the agent use available context (like order details, past conversations, or account notes) to personalize the response and demonstrate awareness of the customer’s situation?",
            sublabel: "(3 point) (A4)",
            isOptional: true,
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
      {
        id: "empathy",
        title: "Empathy & Tone",
        questions: [
          {
            id: "B1",
            label:
              "Did the agent maintain a friendly, professional, and engaging tone that aligned with the brand’s voice throughout the conversation?",
            sublabel: "(6 point) (B1)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "B2",
            label:
              "Did the agent recognize and adapt to the customer’s emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(7 point) (B2)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the agent demonstrate genuine Empathy & Tone or care in their tone and phrasing throughout the interaction—helping the customer feel heard, supported, and valued?",
            sublabel: "(7 point) (B3)",
            points: 7,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
        ],
      },
      {
        id: "knowledge",
        title: "Knowledge & Value Representation",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent demonstrate strong knowledge of the product, policies, or processes by providing a complete, accurate, and well-informed response that included all relevant details based on the context of the ticket?",
            sublabel: "(10 point) (C1)",
            points: 10,
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
            id: "C2",
            label:
              "Did the agent tailor their response based on the customer’s issue or concern—and make sure their guidance or next steps aligned with what the customer needed?",
            sublabel: "(10 point) (C2)",
            points: 10,
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
            id: "C3",
            label:
              "If a macro was used or needed, did the agent pick the right one and update it to clearly answer the customer’s question—showing they understood the issue and added value?",
            sublabel: "(10 point) (C3)",
            points: 10,
            isOptional: true,
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
        id: "communication",
        title: "Communication",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent explain product info, subscription options, or next steps clearly and concisely — avoiding confusing language, awkward phrasing, or unnecessary jargon?",
            sublabel: "(5 point) (D1)",
            points: 5,
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
            id: "D2",
            label:
              "Did the agent use correct grammar, spelling, and punctuation throughout the conversation, with no more than two minor errors that did not affect clarity, tone, or professionalism?",
            sublabel: "(2 point) (D2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D3",
            label:
              "Did the agent proactively communicate any delays — including transfers, research time, or slow responses — in a clear, courteous, and professional way to keep the customer informed and engaged?",
            sublabel: "(4 point) (D3)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D4",
            label:
              "If this was a live chat, did the agent keep the conversation flowing naturally—replying at a comfortable pace without long delays or overwhelming blocks of text?",
            sublabel: "(2 point) (D4)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D5",
            label:
              "If a resolution was likely provided, did the agent check if the customer needed any additional assistance before closing the conversation?",
            sublabel: "(2 point) (D5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D6",
            label:
              "Did the agent handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(3 point) (D6)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "D7",
            label:
              "If the customer’s issue wasn’t fully resolved during the conversation — did the agent set clear expectations around next steps or follow-up, so the customer knew what to expect moving forward?",
            sublabel: "(2 point) (D7)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "response",
        title: "Response & Resolution Time",
        questions: [
          {
            id: "E1",
            label:
              "Was the first reply sent within the expected SLA—or, if the ticket came in after hours, as soon as the agent was back online?",
            sublabel: "(5 point) (E1)",
            points: 5,
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
            label:
              "If applicable, did the agent maintain timely follow-up throughout the conversation, based on the channel, and avoid long gaps that could affect the experience?",
            sublabel: "(5 point) (E2)",
            points: 5,
            isOptional: true,
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
            label:
              "If applicable, was the issue fully resolved within the expected resolution SLA?",
            sublabel: "(5 point) (E3)",
            points: 5,
            isOptional: true,
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
  },
  {
    id: "brand-concierge-live-chat",
    title: "Brand Concierge – Live Chat",
    sections: [
      {
        id: "speed_rt",
        title: "Brand Concierge – Live Chat – Speed/RT",
        questions: [
          {
            id: "A1",
            label:
              "Did the concierge send an initial response within the expected service level agreement (SLA), such as under 30 seconds for live chat?",
            sublabel: "(2 point) (A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the concierge maintain timely follow-up throughout the live chat conversation and avoid long gaps that could disrupt engagement or affect the customer experience?",
            sublabel: "(3 point) (A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
      {
        id: "greet_personal",
        title: "Brand Concierge – Live Chat – Greet/Personal",
        questions: [
          {
            id: "B1",
            label:
              "Did the concierge greet the customer warmly, introduce themselves/the brand, and use the customer’s name if known?",
            sublabel: "(2 point) (B1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "B2",
            label:
              "Did the concierge attempt to build a friendly connection/rapport (e.g., showing personal interest, engaging in light conversation, complimenting a choice, acknowledging a need, or matching the customer’s tone)?",
            sublabel: "(2 point) (B2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the concierge avoid sounding overly “salesy” or scripted while still conveying empathy and willingness to help?",
            sublabel: "(2 point) (B3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "B4",
            label:
              "Did the concierge reference any known context (e.g., cart items, order history, browsing behavior, or past interactions) to personalize the experience?",
            sublabel: "(4 point) (B4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
        ],
      },
      {
        id: "disc_listen",
        title: "Brand Concierge – Live Chat – Disc/Listen",
        questions: [
          {
            id: "C1",
            label:
              "Did the concierge ask thoughtful, open-ended questions to understand the customer’s goals or what they were hoping to achieve—so they could guide them toward the right solution?",
            sublabel: "(5 point) (C1)",
            points: 5,
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
            label:
              "Did the concierge keep the conversation focused on the customer’s needs or goals, rather than leading with a product pitch or promotion?",
            sublabel: "(4 point) (C2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "C3",
            label:
              "Did the concierge summarize what the customer shared to confirm understanding before offering a suggestion or next step?",
            sublabel: "(4 point) (C3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "C4",
            label:
              "If appropriate, did the concierge ask follow-up questions to clarify concerns, goals, or expectations — especially when the customer’s response was unclear — to better understand the situation and offer support?",
            sublabel: "(3 point) (C4)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "C5",
            label:
              "If appropriate, did the concierge ask follow-up questions to better understand the customer’s specific needs or hesitations—so they could recommend the most relevant product, plan, or next step with confidence?",
            sublabel: "(4 point) (C5)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
        ],
      },
      {
        id: "empathy_tone_obj",
        title: "Brand Concierge – Live Chat – Emp/Tone/Obj",
        questions: [
          {
            id: "D1",
            label:
              "Did the concierge maintain a friendly, professional, and engaging tone that aligned with the brand’s voice throughout the conversation?",
            sublabel: "(3 point) (D1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "D2",
            label:
              "Did the concierge recognize and adapt to the customer’s emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(3 point) (D2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "D3",
            label:
              "If the customer expressed an objection after the concierge guided them toward a purchase, did the concierge go beyond acknowledgment by showing genuine empathy that made the customer feel heard and understood?",
            sublabel: "(4 point) (D3)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D4",
            label:
              "After validating the customer’s concern, did the concierge make a genuine effort to resolve the objection by offering relevant solutions or alternatives — rather than simply accepting it and ending the conversation?",
            sublabel: "(4 point) (D4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D5",
            label:
              "After addressing the customer’s concern, did the concierge clearly invite the customer to move forward with the purchase or next steps?",
            sublabel: "(2 point) (D5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D6",
            label:
              "If the customer raised a new objection after the concierge had already addressed a concern, did the concierge continue validating it, offering a relevant solution, and encouraging next steps — rather than ending the call prematurely?",
            sublabel: "(2 point) (D6)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D7",
            label:
              "Did the concierge remain calm, empathetic, and constructive when handling objections or challenging customer moments?",
            sublabel: "(2 point) (D7)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "knowledge_value",
        title: "Brand Concierge – Live Chat – Know/Value",
        questions: [
          {
            id: "E1",
            label:
              "Did the concierge demonstrate a strong understanding of the product line, pricing, promotions, shipping, returns, or warranties by confidently addressing customer questions or concerns?",
            sublabel: "(5 point) (E1)",
            points: 5,
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
            label:
              "Did the concierge guide their recommendations based on the customer’s goals or concerns—clearly connecting how the product or solution addresses the customer’s needs, rather than leading with product features or a hard sell?",
            sublabel: "(5 point) (E2)",
            points: 5,
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
            label:
              "If applicable, did the concierge recommend additional products or services only when they were genuinely beneficial to the customer?",
            sublabel: "(2 point) (E3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E4",
            label:
              "If applicable, did the concierge confidently highlight pricing, promotions, or subscription options in a way that felt impactful—while guiding the customer toward the best solution, not just the most expensive one?",
            sublabel: "(3 point) (E4)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E5",
            label:
              "Did the concierge adapt their approach based on whether the customer was new or returning—providing essential brand info for new customers while avoiding unnecessary repetition for returning shoppers?",
            sublabel: "(2 point) (E5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E6",
            label:
              "If applicable, did the concierge reference internal knowledge bases or brand policies to ensure accurate responses?",
            sublabel: "(1 point) (E6)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "communication_chat",
        title: "Brand Concierge – Live Chat – Comm/Chat",
        questions: [
          {
            id: "F1",
            label:
              "Did the concierge use proper grammar, spelling, and punctuation throughout the chat, with no more than two minor errors?",
            sublabel: "(2 point) (F1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "F2",
            label:
              "Did the concierge explain product details, subscription options, or next steps in a clear, concise, and jargon-free manner—communicating in a way that did not cause confusion for the customer?",
            sublabel: "(3 point) (F2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F3",
            label:
              "Did the concierge maintain an efficient, natural flow throughout the chat—responding at a comfortable pace without unnecessary delays or overwhelming blocks of text?",
            sublabel: "(3 point) (F3)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F4",
            label:
              "If applicable, did the concierge proactively communicate any delays — including transfers, research time, or slow responses — in a clear, courteous, and professional way to keep the customer informed and engaged?",
            sublabel: "(1 point) (F4)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F5",
            label:
              "If applicable, did the concierge seamlessly use the script, CRM notes, or knowledge base in a way that was customized to the customer’s situation—communicating naturally without sounding robotic or overly scripted?",
            sublabel: "(1 point) (F5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F6",
            label:
              "If applicable, did the concierge handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(1 point) (F6)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Brand Concierge – Live Chat – Closing",
        questions: [
          {
            id: "G1",
            label:
              "Did the concierge check if the customer had any remaining questions or concerns — especially related to the product, pricing, or next steps — before ending the chat?",
            sublabel: "(2 point) (G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G2",
            label:
              "Did the concierge clearly guide the customer toward a productive next step — whether that meant assisting with their purchase, providing product or shipping details, or clarifying what to expect if they weren’t ready to order?",
            sublabel: "(3 point) (G2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "G3",
            label:
              "Did the concierge end the chat with a brand-aligned closing message that left the conversation on a positive note?",
            sublabel: "(2 point) (G3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G4",
            label:
              "If applicable, did the concierge invite the customer to proceed with the purchase in a confident, non-aggressive way?",
            sublabel: "(1 point) (G4)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "G5",
            label:
              "If the customer declined, did the concierge handle it politely while keeping the door open for future engagement?",
            sublabel: "(1 point) (G5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "doc_follow",
        title: "Brand Concierge – Live Chat – Doc/Follow",
        questions: [
          {
            id: "H1",
            label:
              "Were notes or tags properly created in the CRM, helpdesk, or tracking log to document the outcome, next steps, or any unique circumstances?",
            sublabel: "(2 point) (H1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "H2",
            label:
              "If another teammate needs to step in later, was sufficient information documented (e.g., interest level, concerns, recommended product) to ensure continuity?",
            sublabel: "(2 point) (H2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "H3",
            label:
              "If the customer did not complete a purchase during the call—whether due to needing more time, information, or receiving a checkout link—did the concierge set up next steps, including when and how they would follow up?",
            sublabel: "(3 point) (H3)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "brand-concierge-post-purchase-call",
    title: "Brand Concierge – Post Purchase Call",
    sections: [
      {
        id: "greeting_rapport",
        title: "Brand Concierge – Post Purchase Call – Greeting & Rapport",
        questions: [
          {
            id: "A1",
            label:
              "Did the concierge greet the customer warmly, introduce themselves/the brand, and use the customer’s name (if known)?",
            sublabel: "(4 point) (A1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the concierge clarify why they were reaching out (e.g., to thank the customer for their purchase or check if they had any questions) in a friendly, non-pushy way?",
            sublabel: "(4 point) (A2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Did the concierge attempt to build a friendly connection/rapport (e.g., showing personal interest, engaging in light conversation, complimenting a choice, acknowledging a need, or matching the customer’s tone)?",
            sublabel: "(4 point) (A3)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "A4",
            label:
              "Did the concierge express genuine enthusiasm and excitement about the customer’s purchase, sounding sincere rather than scripted or over-the-top?",
            sublabel: "(4 point) (A4)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "A5",
            label:
              "Did the concierge reference any available context (e.g., recent order, previous purchases, or customer history) to personalize the thank-you call and make the customer feel acknowledged and valued?",
            sublabel: "(2 point) (A5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "discovery_listening",
        title: "Brand Concierge – Post Purchase Call – Discovery & Listening",
        questions: [
          {
            id: "B1",
            label:
              "Did the concierge ask thoughtful, open-ended questions or prompts to either learn more about the customer’s experience or guide them toward the intended next step (e.g., leaving a product review)?",
            sublabel: "(5 point) (B1)",
            points: 5,
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
            label:
              "Did the concierge actively listen to the customer’s responses — responding naturally and making the conversation feel engaging and attentive (without interrupting)?",
            sublabel: "(4 point) (B2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the concierge summarize the customer’s feedback or comments to confirm understanding?",
            sublabel: "(5 point) (B3)",
            points: 5,
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
            id: "B4",
            label:
              "If appropriate, did the concierge ask relevant follow-up questions to clarify unclear responses or uncover needs, preferences, or hesitations — helping guide the conversation toward the best solution or next step?",
            sublabel: "(4 point) (B4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
        ],
      },
      {
        id: "empathy_tone_alignment",
        title:
          "Brand Concierge – Post Purchase Call – Empathy, Tone & Alignment",
        questions: [
          {
            id: "C1",
            label:
              "Did the concierge maintain a friendly, professional, and engaging tone that aligned with the brand’s voice throughout the conversation?",
            sublabel: "(7 point) (C1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
          {
            id: "C2",
            label:
              "Did the concierge recognize and adapt to the customer’s emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(7 point) (C2)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
          {
            id: "C3",
            label:
              "If applicable, did the concierge acknowledge and respond to the customer’s statements with empathy, enthusiasm, or validation — in a way that felt genuine and not over-the-top?",
            sublabel: "(6 point) (C3)",
            points: 6,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
        ],
      },
      {
        id: "knowledge_value",
        title: "Brand Concierge – Post Purchase Call – Knowledge & Value",
        questions: [
          {
            id: "D1",
            label:
              "Did the concierge proactively share a helpful tip, suggestion, or best practice to help the customer get the most out of their product or experience?",
            sublabel: "(5 point) (D1)",
            points: 5,
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
            id: "D2",
            label:
              "If the opportunity presented itself, did the concierge guide the conversation based on the customer’s stated goals or concerns — clearly connecting how the suggested product or solution addresses the customer’s needs?",
            sublabel: "(4 point) (D2)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D3",
            label:
              "If appropriate, did the concierge proactively offer information about product use, helpful resources, or the brand’s community to support the customer post-purchase?",
            sublabel: "(3 point) (D3)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "D4",
            label:
              "If applicable in the conversation, did the concierge inform the customer of any benefits, such as upcoming promos, loyalty programs, or subscription options — while ensuring the information felt helpful rather than pushy?",
            sublabel: "(4 point) (D4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D5",
            label:
              "If applicable, did the concierge reference internal knowledge bases or brand policies to ensure accurate responses?",
            sublabel: "(2 point) (D5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "communication_call_flow",
        title:
          "Brand Concierge – Post Purchase Call – Communication & Call Flow",
        questions: [
          {
            id: "E1",
            label:
              "Did the concierge maintain smooth control of the conversation — keeping it efficient and on-topic without rushing, dragging, or creating awkward pauses or transitions?",
            sublabel: "(3 point) (E1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E2",
            label:
              "If the customer expressed uncertainty or concern, did the concierge calmly acknowledge it, offer reassurance or guidance, and keep the conversation going — rather than brushing it off or moving on too quickly?",
            sublabel: "(3 point) (E2)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E3",
            label:
              "If applicable, were holds or transfers handled promptly and explained in a courteous, professional manner?",
            sublabel: "(1 point) (E3)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "E4",
            label:
              "If applicable, did the concierge seamlessly use the script, CRM notes, or knowledge base in a way that was customized to the customer’s situation — communicating naturally without sounding robotic or overly scripted?",
            sublabel: "(2 point) (E4)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E5",
            label:
              "If applicable, did the concierge handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(1 point) (E5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Brand Concierge – Post Purchase Call – Closing",
        questions: [
          {
            id: "F1",
            label:
              "Did the concierge check if the customer had any remaining questions or concerns — especially related to their recent order, product use, or what to expect next — before ending the call?",
            sublabel: "(2 point) (F1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "F2",
            label:
              "Did the concierge clearly restate the purpose of the call as a thank-you — and express sincere appreciation for the customer’s purchase or loyalty by using warm, brand-aligned language?",
            sublabel: "(3 point) (F2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F3",
            label:
              "Did the concierge end the call with a brand-aligned closing message that left the conversation on a positive note?",
            sublabel: "(2 point) (F3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "F4",
            label:
              "If appropriate, did the concierge confidently guide the customer toward a natural next step — like sharing feedback, leaving a review, or engaging with the brand — in a way that felt aligned with their experience?",
            sublabel: "(3 point) (F4)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
      {
        id: "documentation_followup",
        title:
          "Brand Concierge – Post Purchase Call – Documentation & Follow-up",
        questions: [
          {
            id: "G1",
            label:
              "Were notes or tags properly created in the CRM, helpdesk, or tracking log to document the outcome, next steps, or any unique circumstances?",
            sublabel: "(2 point) (G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G2",
            label:
              "If the customer requested additional information (e.g., usage videos, tips, or an email follow-up), did the concierge promptly send or schedule the follow-up as needed?",
            sublabel: "(2 point) (G2)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G3",
            label:
              "If the customer shared feedback about the product, brand, or experience, did the concierge acknowledge it and capture it clearly so it could be used to improve future products, services, or brand initiatives?",
            sublabel: "(2 point) (G3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "brand-concierge-subscription",
    title: "Brand Concierge - Subscription",
    sections: [
      {
        id: "greeting-rapport",
        title: "Greeting & Rapport",
        questions: [
          {
            id: "A1",
            label:
              "Did the concierge greet the customer warmly, introduce themselves/the brand, and use the customer's name (if known)?",
            sublabel: "(2 points) (A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the concierge clarify why they are contacting the customer (e.g., to discuss the recent subscription cancellation/request to cancel) in a friendly, non-pushy way?",
            sublabel: "(2 points) (A2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Did the concierge attempt to build a friendly connection/rapport (e.g., showing personal interest, engaging in light conversation, complimenting a choice, acknowledging a need, or matching the customer's tone)?",
            sublabel: "(2 points) (A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A4",
            label:
              'Did the concierge avoid sounding overly "salesy" or scripted while still conveying empathy and willingness to help?',
            sublabel: "(2 points) (A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A5",
            label:
              "Did the concierge reference relevant subscription details (e.g., current plan, deliveries, or changes) to personalize the call and help the customer feel acknowledged, supported, and valued in their experience?",
            sublabel: "(2 points) (A5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "discover-listen",
        title: "Discover & Listen",
        questions: [
          {
            id: "B1",
            label:
              "Did the concierge ask questions to better understand the customer's goals or expectations—and explore what led them to cancel or want to cancel their subscription, so they could offer any relevant support or solutions?",
            sublabel: "(6 points) (B1)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "B2",
            label:
              "Did the concierge actively listen to the customer's responses — responding naturally and making the conversation feel engaging and attentive (without interrupting)?",
            sublabel: "(4 points) (B2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the concierge summarize the customer's reason for cancellation of subscription/desire to cancel to confirm understanding?",
            sublabel: "(5 points) (B3)",
            points: 5,
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
            id: "B4",
            label:
              "If appropriate, did the concierge ask relevant follow-up questions to clarify unclear responses or uncover needs, preferences, or hesitations — helping guide the conversation toward the best solution or next step?",
            sublabel: "(5 points) (B4)",
            points: 5,
            isOptional: true,
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
        id: "empathy-tone-objection",
        title: "Empathy, Tone & Objection Handling",
        questions: [
          {
            id: "C1",
            label:
              "Did the concierge maintain a friendly, professional, and engaging tone that aligned with the brand's voice throughout the conversation?",
            sublabel: "(3 points) (C1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "C2",
            label:
              "Did the concierge recognize and adapt to the customer's emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(3 points) (C2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "C3",
            label:
              "Did the concierge go beyond basic acknowledgment of the customer's reason for wanting to end the subscription by demonstrating genuine, relatable empathy that made the customer feel understood?",
            sublabel: "(5 points) (C3)",
            points: 5,
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
            id: "C4",
            label:
              "After validating the customer's concerns, did the concierge make an effort to resolve the customer's objections/reason by offering solutions or alternatives, rather than accepting the objection and ending the call?",
            sublabel: "(6 points) (C4)",
            points: 6,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "C5",
            label:
              "After addressing the customer's objection, did the concierge clearly invite the customer to move forward with keeping or reactivating their subscription?",
            sublabel: "(5 points) (C5)",
            points: 5,
            isOptional: true,
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
            id: "C6",
            label:
              "If the customer raised a new objection after the concierge had already addressed a concern, did the concierge continue validating it, offering a relevant solution, and encouraging next steps — rather than ending the call prematurely?",
            sublabel: "(5 points) (C6)",
            points: 5,
            isOptional: true,
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
            id: "C7",
            label:
              "Did the concierge remain calm, empathetic, and constructive when handling objections or challenging customer moments?",
            sublabel: "(3 points) (C7)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
      {
        id: "knowledge-value",
        title: "Knowledge & Value",
        questions: [
          {
            id: "D1",
            label:
              "Did the concierge demonstrate an understanding of the subscription, product, or service by addressing customer questions or concerns — ensuring the customer understood their options or the value of keeping their subscription?",
            sublabel: "(6 points) (D1)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "D2",
            label:
              "Did the concierge guide the conversation based on the customer's goals—clearly demonstrating how the product or subscription continues to meet their needs, rather than focusing on product features or a hard sell?",
            sublabel: "(5 points) (D2)",
            points: 5,
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
            id: "D3",
            label:
              "If applicable, did the concierge recommend thoughtful subscription modifications or complementary products that genuinely aligned with the customer's needs and concerns?",
            sublabel: "(3 points) (D3)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "D4",
            label:
              "If applicable, did the concierge confidently highlight pricing, promos, or savings in a helpful, customer-focused way — while guiding the customer toward the best option to stay subscribed?",
            sublabel: "(2 points) (D4)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D5",
            label:
              "If applicable, did the concierge reference internal knowledge bases or brand policies to ensure accurate responses?",
            sublabel: "(2 points) (D5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "communication-call-management",
        title: "Communication & Call Management",
        questions: [
          {
            id: "E1",
            label:
              "Did the concierge explain information clearly and concisely — in a way that was easy for the customer to understand and free from confusion, unclear language, or unnecessary complexity?",
            sublabel: "(3 points) (E1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E2",
            label:
              "Did the concierge maintain smooth control of the conversation — keeping it efficient and on-topic without rushing, dragging, or creating awkward pauses or transitions?",
            sublabel: "(2 points) (E2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E3",
            label:
              "If applicable, did the concierge proactively communicate any delays — including transfers, research time, or slow responses — in a clear, courteous, and professional way to keep the customer informed and engaged?",
            sublabel: "(1 points) (E3)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "E4",
            label:
              "If applicable, did the concierge seamlessly use the script, CRM notes, or knowledge base in a way that was customized to the customer's situation—communicating naturally without sounding robotic or overly scripted?",
            sublabel: "(2 points) (E4)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E5",
            label:
              "If applicable, did the concierge handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(2 points) (E5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "F1",
            label:
              "Did the concierge check if the customer had any remaining questions or concerns — especially related to their subscription, account, or next steps — before ending the call, even if the customer chose to cancel or not move forward?",
            sublabel: "(1 point) (F1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F2",
            label:
              "Did the concierge confidently guide the customer toward a clear next step — such as confirming subscription status, explaining changes, clarifying cancellation, or setting expectations moving forward?",
            sublabel: "(3 points) (F2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F3",
            label:
              "Did the concierge end the call with a brand-aligned closing message that left the conversation on a positive note?",
            sublabel: "(1 point) (F3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F4",
            label:
              "If applicable, did the concierge confidently invite the customer to keep or modify their subscription in a non-aggressive way?",
            sublabel: "(1 point) (F4)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F5",
            label:
              "If the customer insisted on canceling, did the concierge handle it politely while keeping the door open for future engagement?",
            sublabel: "(1 point) (F5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "documentation-followup",
        title: "Documentation & Follow-Up",
        questions: [
          {
            id: "G1",
            label:
              "Were notes or tags properly created in the CRM, helpdesk, or tracking log to document the outcome, next steps, or any unique circumstances?",
            sublabel: "(2 points) (G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G2",
            label:
              "If another teammate needs to step in later, was sufficient information documented (e.g., interest level, concerns, recommended product) to ensure continuity?",
            sublabel: "(1 point) (G2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "G3",
            label:
              "If the customer requested more time or information before making a decision, did the concierge set a clear follow-up plan, specifying when and how they would follow up (e.g., call, email, or SMS)?",
            sublabel: "(2 points) (G3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "brand-concierge-abandon-cart",
    title: "Brand Concierge - Abandon Cart",
    sections: [
      {
        id: "greeting-rapport",
        title: "Greeting & Rapport",
        questions: [
          {
            id: "A1",
            label:
              "Did the concierge greet the customer warmly, introduce themselves/the brand, and use the customer's name (if known)?",
            sublabel: "(2 points) (A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the concierge clarify why they are contacting the customer (e.g., Abandoned Cart) in a friendly, non-pushy way?",
            sublabel: "(3 points) (A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Did the concierge attempt to build a friendly connection/rapport (e.g., showing personal interest, engaging in light conversation, complimenting a choice, acknowledging a need, or matching the customer's tone)?",
            sublabel: "(2 points) (A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A4",
            label:
              'Did the concierge avoid sounding overly "salesy" or scripted while still conveying empathy and willingness to help?',
            sublabel: "(2 points) (A4)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A5",
            label:
              "Did the concierge reference any known context (e.g., cart items, order history, browsing behavior, or past interactions) to personalize the experience?",
            sublabel: "(1 points) (A5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "discover-listen",
        title: "Disc & Listen",
        questions: [
          {
            id: "B1",
            label:
              "Did the concierge ask thoughtful, open-ended questions to understand the customer's goals or expectations—and uncover any reasons they may have left items in their cart, so they could offer any relevant support or solutions?",
            sublabel: "(6 points) (B1)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "B2",
            label:
              "Did the concierge actively listen to the customer's responses — responding naturally and making the conversation feel engaging and attentive (without interrupting)?",
            sublabel: "(4 points) (B2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the concierge summarize the customer's reason for abandoning their cart to confirm understanding?",
            sublabel: "(5 points) (B3)",
            points: 5,
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
            id: "B4",
            label:
              "If appropriate, did the concierge ask follow-up questions to clarify concerns, goals, or expectations — especially when the customer's response was unclear — to better understand the situation and offer support?",
            sublabel: "(5 points) (B4)",
            points: 5,
            isOptional: true,
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
        id: "empathy-tone-objection",
        title: "Emp/Tone/Obj",
        questions: [
          {
            id: "C1",
            label:
              "Did the concierge maintain a friendly, professional, and engaging tone that aligned with the brand's voice throughout the conversation?",
            sublabel: "(3 points) (C1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "C2",
            label:
              "Did the concierge recognize and adapt to the customer's emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(3 points) (C2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "C3",
            label:
              "Did the concierge go beyond basic acknowledgment of the customer's reason for abandoning their cart by demonstrating genuine, relatable empathy that made the customer feel understood?",
            sublabel: "(5 points) (C3)",
            points: 5,
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
            id: "C4",
            label:
              "After validating the customer's concerns, did the concierge make an effort to resolve the customer's objections/reason by offering relevant solutions, rather than accepting the objection and ending the call?",
            sublabel: "(6 points) (C4)",
            points: 6,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "C5",
            label:
              "After addressing the customer's objection, did the concierge clearly invite the customer to move forward with the purchase or next steps?",
            sublabel: "(5 points) (C5)",
            points: 5,
            isOptional: true,
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
            id: "C6",
            label:
              "If the customer raised a new objection after the concierge had already addressed a concern, did the concierge continue validating it, offering a relevant solution, and encouraging next steps — rather than ending the chat prematurely?",
            sublabel: "(5 points) (C6)",
            points: 5,
            isOptional: true,
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
            id: "C7",
            label:
              "Did the concierge remain calm, empathetic, and constructive when handling objections or challenging customer moments?",
            sublabel: "(3 points) (C7)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
      {
        id: "knowledge-value",
        title: "Knowledge & Value",
        questions: [
          {
            id: "D1",
            label:
              "Did the concierge show strong product knowledge by confidently addressing questions or hesitations, helping the customer clearly understand their options or the value of moving forward?",
            sublabel: "(6 points) (D1)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "D2",
            label:
              "Did the concierge guide the conversation based on the customer's stated goals or concerns—connecting how the product or solution addresses the customer's needs, rather than leading with product features or a hard sell?",
            sublabel: "(6 points) (D2)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
          {
            id: "D3",
            label:
              "If applicable, did the concierge recommend additional products or services only when they were genuinely beneficial to the customer?",
            sublabel: "(2 points) (D3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "D4",
            label:
              "If applicable, did the concierge confidently highlight pricing, promotions, or subscription options in a way that felt helpful and customer-focused—while guiding the customer toward the best solution?",
            sublabel: "(4 points) (D4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "D5",
            label:
              "If applicable, did the concierge reference internal knowledge bases or brand policies to ensure accurate responses?",
            sublabel: "(2 points) (D5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "communication-call-management",
        title: "Comm & Call Control",
        questions: [
          {
            id: "E1",
            label:
              "Did the concierge explain information clearly and concisely — in a way that was easy for the customer to understand and free from confusion, unclear language, or unnecessary complexity?",
            sublabel: "(3 points) (E1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E2",
            label:
              "Did the concierge maintain smooth control of the conversation — keeping it efficient and on-topic without rushing, dragging, or creating awkward pauses or transitions?",
            sublabel: "(2 points) (E2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E3",
            label:
              "If applicable, did the concierge proactively communicate any delays — including transfers, research time, or slow responses — in a clear, courteous, and professional way to keep the customer informed and engaged?",
            sublabel: "(1 points) (E3)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "E4",
            label:
              "If applicable, did the concierge seamlessly use the script, CRM notes, or knowledge base in a way that was customized to the customer's situation—communicating naturally without sounding robotic or overly scripted?",
            sublabel: "(1 points) (E4)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "E5",
            label:
              "If applicable, did the concierge handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(1 points) (E5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "F1",
            label:
              "Did the concierge check if the customer had any remaining questions or concerns — especially related to the product, pricing, or next steps — before ending the call?",
            sublabel: "(1 points) (F1)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F2",
            label:
              "Did the concierge clearly guide the customer toward the next step — whether that meant assisting with their purchase, providing helpful product or shipping details, or clarifying what to expect if they weren't ready to order?",
            sublabel: "(3 points) (F2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F3",
            label:
              "Did the concierge end the call with a brand-aligned closing message that left the conversation on a positive note?",
            sublabel: "(1 points) (F3)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F4",
            label:
              "If applicable, did the concierge invite the customer to proceed with the purchase in a confident, non-aggressive way?",
            sublabel: "(1 points) (F4)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "F5",
            label:
              "If the customer declined, did the concierge handle it politely while keeping the door open for future engagement?",
            sublabel: "(1 points) (F5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "documentation-followup",
        title: "Doc/Follow",
        questions: [
          {
            id: "G1",
            label:
              "Were notes or tags properly created in the CRM, helpdesk, or tracking log to document the outcome, next steps, or any unique circumstances?",
            sublabel: "(2 points) (G1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G2",
            label:
              "If another teammate needs to step in later, was sufficient information documented (e.g., interest level, concerns, recommended product) to ensure continuity?",
            sublabel: "(1 points) (G2)",
            points: 1,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
          {
            id: "G3",
            label:
              "If the customer did not complete a purchase during the call—whether due to needing more time, information, or receiving a checkout link—did the concierge set next steps, including when and how they would follow up?",
            sublabel: "(2 points) (G3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "customer-service-phone",
    title: "Customer Service - Phone",
    sections: [
      {
        id: "greeting-introduction",
        title: "Greeting & Introduction",
        questions: [
          {
            id: "A1",
            label:
              "Did the agent greet the customer warmly, introduce themselves/the brand, and use the customer's name (if known)?",
            sublabel: "(2 points) (A1)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A2",
            label:
              "Did the agent clearly clarify or confirm the reason for the call in a friendly, customer-first way?",
            sublabel: "(3 points) (A2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "A3",
            label:
              "Did the agent attempt to build a friendly connection or rapport during the interaction (e.g., acknowledging their concern, showing empathy, engaging in light conversation, or matching the customer's tone)?",
            sublabel: "(2 points) (A3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "A4",
            label:
              "Did the agent open the call in a clear, confident, and professional way that helped build trust and reassure the customer they were in good hands?",
            sublabel: "(3 points) (A4)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "A5",
            label:
              "Did the agent use available context (like order details, past conversations, or account notes) to personalize the response and demonstrate awareness of the customer's situation?",
            sublabel: "(2 points) (A5)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "discovery-active-listening",
        title: "Discovery & Active Listening",
        questions: [
          {
            id: "B1",
            label:
              "Did the agent ask thoughtful, open-ended questions to fully understand the customer's issue, needs, or expectations before providing support?",
            sublabel: "(5 points) (B1)",
            points: 5,
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
            label:
              "Did the agent actively listen to the customer's responses without interrupting, ensuring a natural and productive conversation?",
            sublabel: "(4 points) (B2)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "B3",
            label:
              "Did the agent summarize or repeat back the customer's concern to confirm understanding?",
            sublabel: "(5 points) (B3)",
            points: 5,
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
            id: "B4",
            label:
              "When appropriate, did the agent ask follow-up questions to clarify unclear customer responses or better understand their needs for accurate support?",
            sublabel: "(4 points) (B4)",
            points: 4,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
        ],
      },
      {
        id: "empathy-tone",
        title: "Empathy & Tone",
        questions: [
          {
            id: "C1",
            label:
              "Did the agent maintain a friendly, professional, and engaging tone that aligned with the brand's voice throughout the conversation?",
            sublabel: "(5 points) (C1)",
            points: 5,
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
            label:
              "Did the agent recognize and adapt to the customer's emotional cues (e.g., excitement, confusion, frustration) by adjusting their tone and approach to match the situation?",
            sublabel: "(5 points) (C2)",
            points: 5,
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
            id: "C3",
            label:
              "Did the agent demonstrate genuine empathy or care in their tone and phrasing throughout the interaction—helping the customer feel heard, supported, and valued?",
            sublabel: "(5 points) (C3)",
            points: 5,
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
        id: "knowledge-value-presentation",
        title: "Knowledge & Value Presentation",
        questions: [
          {
            id: "D1",
            label:
              "Did the agent demonstrate strong knowledge of the product, policies, or processes by delivering a clear, confident, and accurate response that showed they understood the issue and how to resolve it?",
            sublabel: "(7 points) (D1)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
          {
            id: "D2",
            label:
              "Did the agent handle the interaction efficiently by avoiding unnecessary delays, holds, or escalations — especially for routine or commonly asked questions they should be able to address independently?",
            sublabel: "(5 points) (D2)",
            points: 5,
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
            id: "D3",
            label:
              "Did the agent provide a complete and thorough verbal response/solutions—covering all key details needed to fully address the customer's question, based on the context of the call?",
            sublabel: "(7 points) (D3)",
            points: 7,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
              { value: "7.00", label: "7.00" },
            ],
          },
          {
            id: "D4",
            label:
              "Did the agent tailor their response to the customer's specific issue or concern — ensuring their guidance or next steps directly aligned with the customer's needs?",
            sublabel: "(6 points) (D4)",
            points: 6,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
              { value: "5.00", label: "5.00" },
              { value: "6.00", label: "6.00" },
            ],
          },
        ],
      },
      {
        id: "communication-call-control",
        title: "Communication & Call Control",
        questions: [
          {
            id: "E1",
            label:
              "Did the agent explain information clearly and concisely — in a way that was easy for the customer to understand and free from confusion, unclear language, or unnecessary complexity?",
            sublabel: "(4 points) (E1)",
            points: 4,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
              { value: "4.00", label: "4.00" },
            ],
          },
          {
            id: "E2",
            label:
              "Did the agent maintain an efficient, natural flow throughout the call without rushing, interrupting, or unnecessarily extending the conversation?",
            sublabel: "(3 points) (E2)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "E3",
            label:
              "If applicable, were holds or transfers handled promptly and explained in a courteous, professional manner?",
            sublabel: "(2 points) (E3)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E4",
            label:
              "If applicable, did the agent effectively use available resources (e.g., scripts, CRM notes, or knowledge base) in a way that felt personalized and natural — avoiding robotic or overly scripted communication?",
            sublabel: "(2 points) (E4)",
            points: 2,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "E5",
            label:
              "If applicable, did the agent handle sensitive customer data (e.g., new billing info, address changes) in accordance with company privacy and security protocols?",
            sublabel: "(1 point) (E5)",
            points: 1,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        questions: [
          {
            id: "F1",
            label:
              "Did the agent confirm there were no remaining questions before wrapping up the call?",
            sublabel: "(3 points) (F1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "F2",
            label:
              "Did the agent confidently and clearly guide the customer toward resolution or the appropriate next step — whether by providing instructions, summarizing recommendations, or outlining what happens next?",
            sublabel: "(5 points) (F2)",
            points: 5,
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
            id: "F3",
            label:
              "Did the agent close the conversation in a professional and brand-aligned way that left the customer with a positive final impression?",
            sublabel: "(2 points) (F3)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
        ],
      },
      {
        id: "documentation-follow-up",
        title: "Documentation & Follow-Up",
        questions: [
          {
            id: "G1",
            label:
              "Were notes or tags properly created in the CRM, helpdesk, or tracking log to document the outcome, next steps, or any unique circumstances?",
            sublabel: "(3 points) (G1)",
            points: 3,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
          {
            id: "G2",
            label:
              "If another teammate needed to step in later, did the agent document enough information (e.g., issue details, customer concerns, recommended next steps) to ensure a smooth and seamless handoff?",
            sublabel: "(2 points) (G2)",
            points: 2,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
            ],
          },
          {
            id: "G3",
            label:
              "If the customer's issue wasn't fully resolved during the conversation — did the agent set clear expectations around next steps or follow-up, so the customer knew what to expect moving forward?",
            sublabel: "(3 points) (G3)",
            points: 3,
            isOptional: true,
            options: [
              { value: "0.00", label: "0.00" },
              { value: "1.00", label: "1.00" },
              { value: "2.00", label: "2.00" },
              { value: "3.00", label: "3.00" },
            ],
          },
        ],
      },
    ],
  },
];

export function getFormTypeById(id) {
  return formTypes.find((type) => type.id === id);
}

export function calculateSectionScore(section, responses, includedQuestions) {
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
        current += Number.parseFloat(response);
      }
    }
  });

  return { current, total };
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

  return { current: totalCurrent, total: totalPossible };
}
