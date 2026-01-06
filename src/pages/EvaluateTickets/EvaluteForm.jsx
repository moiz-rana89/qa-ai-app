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
import {
  getTicketTagsAndAiGradedJson,
  submitFormTicket,
} from "../../reduxStore/action/evalute";
import Skeleton from "../../components/Skeleton";
import { AntDNotification } from "../../components/AntDNotification";
import { useNavigate } from "react-router-dom";
export const EvaluteForm = () => {
  // NEW: lifted states that QAForm previously kept
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({});
  const { selectedFormToEvaluate } = useSelector(
    (store) => store.formsManagement
  );
  const { gradedJsonWithTags, isLoading, isLoadingSubmitTicket } = useSelector(
    (store) => store.evalute
  );
  // Add gradedJsonWithTags to the formState

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
    // call the tags and ai_graded_json api here

    dispatch(
      getTicketTagsAndAiGradedJson(
        currentItem?.ticket_id,
        currentItem?.client_id
      )
    );
  }, [currentItem]);

  // useEffect(() => {
  //   if (gradedJsonWithTags) {
  //     setFormState({ ...formState, ...gradedJsonWithTags });
  //   }
  // }, [gradedJsonWithTags]);

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, total - 1));
  };

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  /**
   * Remove object from JSON by id
   */
  // const removeById = (id) => {
  //   setItems((prev) =>
  //     prev.filter((item) => {
  //       console.log("first", item.id !== id);
  //     })
  //   );
  // };

  const nextAndRemove = () => {
    setItems((prevItems) => {
      if (!prevItems || prevItems.length === 0) return prevItems;

      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // remove current item

      return updatedItems;
    });

    setIndex((prevIndex) => {
      // if we were at the last item, move index back safely
      return Math.min(prevIndex, items.length - 2);
    });
  };

  if (!total) {
    // return <div>No evaluations available</div>;
    // AntDNotification({
    //   status: "info",
    //   title: "No Tickets Available",
    //   description: "No tickets available to evaluate",
    //   duration: 5,
    // });
    navigate("/evaluate-tickets");
  }

  const handleTicketSubmitSuccess = (status) => {
    if (status) {
      AntDNotification({
        status: "success",
        title: "Ticket Submitted",
        description: "Ticket Submitted successfully",
        duration: 5,
      });
      nextAndRemove();
    } else {
      AntDNotification({
        status: "error",
        title: "Error Updating Ticket",
        description: "Failed to submit Ticket, please try again",
        duration: 5,
      });
    }
  };

  const handleStateChange = (updatedData) => {
    setFormState(updatedData);
    // console.log("[v0] Form state updated:", updatedData);
  };

  const handleTicketSubmit = (id) => {
    // console.log("currentIndex", currentItem?.ticket_id, currentItem?.client_id);
    // removeById(id);
    const userDetails = JSON.parse(localStorage.getItem("user_details"));
    const role =
      userDetails?.role == "tl" ? "tl_graded_json" : "qas_graded_json";
    dispatch(
      submitFormTicket(
        {
          ticket_id: currentItem?.ticket_id,
          client_id: currentItem?.client_id,
          grading_key: role,
          grading_value: {
            categories: formState?.categories,
            ticket_id: currentItem?.ticket_id,
          },
        },
        handleTicketSubmitSuccess
      )
    );
  };
  // --- Render (only changed bits shown) ---

  return (
    <div className="bg-[#FFFFFF] flex flex-col w-[100vw] h-[100vh] overflow-auto scrollbar-hidden">
      <EvaluteHeader
        total={total}
        currentIndex={index}
        next={next}
        prev={prev}
        id={
          gradedJsonWithTags?.ai_graded_json?.ticket_id ||
          currentItem?.ticket_id
        }
        aiJson={gradedJsonWithTags?.ai_graded_json?.categories}
        userJson={formState?.categories}
        submit={handleTicketSubmit}
        isLoading={isLoadingSubmitTicket}
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
            {isLoading ? (
              <Skeleton className="w-[90%] h-[50vh] m-auto mt-[20px]" />
            ) : (
              <ConversationScreen
                ticketSubject={gradedJsonWithTags?.subject}
                tags={gradedJsonWithTags?.tags || []}
                messages={gradedJsonWithTags?.conversation_json}
                // messages={conversationData}
                data={gradedJsonWithTags}
              />
            )}
          </main>

          {/* Sidebar (right) */}
          <aside className="bg-[#FCFCFC] shadow-[-4px_0_10px_0_rgba(22,49,67,0.09)]">
            {isLoading ? (
              <Skeleton className="w-[90%] h-[50vh] m-auto mt-[20px]" />
            ) : (
              <QAForm
                initialData={gradedJsonWithTags?.ai_graded_json}
                details={gradedJsonWithTags}
                onStateChange={handleStateChange}
              />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
