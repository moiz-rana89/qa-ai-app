import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationData,
  SAMPLE_CATEGORIES,
  TEST_TAGS,
} from "../../utils/formsConstant";
import ConversationScreen from "./DynamicForm/ConversationScreen";
import QAForm from "./DynamicForm/QAForm";
import EvaluteHeader from "./EvaluteHeader";

export const EvaluteForm = () => {
  // NEW: lifted states that QAForm previously kept
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({});

  const { selectedFormToEvaluate } = useSelector(
    (store) => store.formsManagement
  );

  const [items, setItems] = useState(selectedFormToEvaluate || []);
  const [index, setIndex] = useState(0);

  const total = items.length;
  const currentItem = items[index];
  // Keep index valid after removals
  useEffect(() => {
    if (selectedFormToEvaluate?.length > 0) {
      setItems(selectedFormToEvaluate);
    }
  }, [selectedFormToEvaluate]);
  useEffect(() => {
    if (index >= total && total > 0) {
      setIndex(total - 1);
    }
  }, [total]);
  useEffect(() => {
    setFormState(currentItem?.graded_form_json);
  }, [currentItem]);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, total - 1));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  /**
   * Remove object from JSON by id
   */
  const removeById = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (!total) {
    return <div>No evaluations available</div>;
  }

  const handleStateChange = (updatedData) => {
    setFormState(updatedData);
    console.log("[v0] Form state updated:", updatedData);
  };

  const handleTicketSubmit = (id) => {
    console.log("currentIndex", id);
    removeById(id);
  };
  // --- Render (only changed bits shown) ---
  return (
    <div className="bg-[#FFFFFF] flex flex-col w-[100vw] h-[100vh] overflow-auto scrollbar-hidden">
      <EvaluteHeader
        total={total}
        currentIndex={index}
        next={next}
        prev={prev}
        id={currentItem?.id}
        aiJson={currentItem?.graded_form_json?.categories}
        userJson={formState?.categories}
        submit={handleTicketSubmit}
      />
      <div className="flex-1 flex flex-row">
        {/* <MLSideBar /> */}
        {/* rana */}
        <div
          className="h-[90vh] grid grid-cols-1  
          sm:grid-cols-[1fr_30%] 
          md:grid-cols-[1fr_40%] 
          lg:grid-cols-[1fr_40%] 
          xl:grid-cols-[1fr_40%] 
          2xl:grid-cols-[1fr_35%] w-full"
        >
          {/* Main Content (left) */}
          <main className="bg-[#FFFFFF] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* <ConversationView
              Conversation={intialFormData?.agent_user_messages}
              subject={intialFormData?.subject}
              loading={loading}
              tag={intialFormData?.tags}
            /> */}
            <ConversationScreen
              ticketSubject="Re: Ticket #1234 - Login Error"
              tags={TEST_TAGS}
              messages={currentItem?.conversation_json}
              // messages={conversationData}
              data={currentItem}
            />
          </main>

          {/* Sidebar (right) */}
          <aside className="bg-[#FCFCFC] shadow-[-4px_0_10px_0_rgba(22,49,67,0.09)]">
            <QAForm initialData={formState} onStateChange={handleStateChange} />
            {/* <Tabs>
              <Tab data-label="QA Form">
                <div className="flex flex-col overflow-auto scrollbar-hidden h-[84vh]">
                  <QAForm
                    setTypeScores={setTypeScores}
                    responses={responses}
                    setResponses={setResponses}
                    loading={loading}
                    extraQuestions={intialFormData?.extraQuestions}
                    includedQuestions={includedQuestions}
                    setIncludedQuestions={setIncludedQuestions}
                    formData={formData}
                    setFormData={setFormData}
                    sectionScore={sectionScore}
                    setSectionScore={setSectionScore}
                    sectionQuestions={sectionQuestions}
                    setSectionQuestions={setSectionQuestions}
                  />
                </div>
              </Tab>
              <Tab data-label="Ticket Details">
                <ML_Tickets_Details_Tab
                  loading={loading}
                  AgentName={intialFormData?.agent_full_name}
                  TeamLeadName={intialFormData?.team_lead}
                  ClientName={intialFormData?.account}
                  DateOfAudit={intialFormData?.dateOfAudit}
                  MonitoringType={MonitoringType}
                  TicketLink={intialFormData?.uri}
                  TicketType={TicketType}
                  CustomerConcerns={CustomerConcerns}
                  setAgentName={() => {}}
                  setTeamLeadName={() => {}}
                  setClientName={() => {}}
                  setDateOfAudit={() => {}}
                  setMonitoringType={setMonitoringType}
                  setTicketLink={() => {}}
                  setTicketType={setTicketType}
                  setCustomerConcerns={setCustomerConcerns}
                  imageLink={""}
                  setImageLink={() => {}}
                />
              </Tab>
            </Tabs> */}
          </aside>
        </div>
      </div>
    </div>
  );
};
