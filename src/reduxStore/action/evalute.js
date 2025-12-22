import axios from "axios";
import Api from "../lib/api";
import * as types from "./types";

export function setLoaderAction(data) {
  return {
    type: types.IS_LOADING,
    data,
  };
}
export function setAllEvaluteTickets(data) {
  return {
    type: types.GET_ALL_FORMS_TICKETS,
    data,
  };
}

export const getAllEvaluteTickets = (pagination, filters) => {
  return (dispatch) => {
    try {
      dispatch(setLoaderAction(true));

      const params = new URLSearchParams();

      // Pagination
      if (pagination?.page) params.append("page", pagination.page);
      if (pagination?.size) params.append("size", pagination.size);

      if (pagination?.sort_order) {
        params.append(
          "sort_order",
          pagination.sort_order === "ascend" ? "asc" : "desc"
        );
      }

      if (pagination?.sort_by) {
        params.append("sort_by", pagination.sort_by);
      }

      // Filters (single value OR array)
      if (filters && typeof filters === "object") {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              if (v !== null && v !== undefined) {
                params.append(key, v);
              }
            });
          } else if (value !== null && value !== undefined && value !== "") {
            params.append(key, value);
          }
        });
      }

      const url = `/qa_ai_apis/form-evaluations?${params.toString()}`;

      Api.get(url).then((resp) => {
        dispatch(setAllEvaluteTickets(resp.data));
        dispatch(setLoaderAction(false));
      });
    } catch (error) {
      dispatch(setLoaderAction(false));
    }
  };
};
