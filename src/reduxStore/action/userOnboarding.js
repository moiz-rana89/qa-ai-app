import Api from "../lib/api";

// Onboard a user by looking them up in HubSpot and provisioning an internal
// account. Backend endpoint is currently public (no auth required) per the
// spec — still gated to admin / dev on the frontend so the form isn't
// exposed to every signed-in role.
//
// Returns the full user record including a plaintext `password` field that
// is shown ONCE on creation. Callers must display it to the admin and warn
// it won't be shown again.
export const onboardUserFromHubspot = (body, handleResponse) => () => {
  Api.post(`/users/from-hubspot`, body)
    .then(({ data }) => handleResponse?.(true, data))
    .catch((err) => {
      handleResponse?.(false, err);
      console.error("Error onboarding user from HubSpot:", err);
    });
};
