import apiClient from "./client";

export async function getPublicEvents(filters = {}) {
  const response = await apiClient.get("/events", {
    params: filters,
  });
  return response.data;
}

export async function getEventById(id) {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}

export async function getMyEvents() {
  const response = await apiClient.get("/events/manage/mine");
  return response.data;
}

export async function createEvent(eventData) {
  const response = await apiClient.post("/events", eventData);
  return response.data;
}

export async function updateEvent(id, eventData) {
  const response = await apiClient.put(`/events/${id}`, eventData);
  return response.data;
}

export async function publishEvent(id) {
  const response = await apiClient.post(`/events/${id}/publish`);
  return response.data;
}

export async function cancelEvent(id) {
  const response = await apiClient.post(`/events/${id}/cancel`);
  return response.data;
}