import axios from "axios";


const api = axios.create({
  baseURL: "https://event-management-server-0yt8.onrender.com", 
});

export const createUser = (name, email, password) =>
    api.post("/user/sign-up", {
      name,
      email,
      password,
    });
  
  export const loginUser = (name, email, password) =>
    api.post(
      "/user/sign-in",
      { name, email, password }
    );
    
  export const authenticateUser = () =>
    api.get(
      "/user/authenticate-user",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

export const createEvent= (formData) =>{
  api.post("/events/create-event", formData)
}

export const getAllApprovedEvents = async () => {
  try {
    const response = await api.get("/events/get-approved-events");
    return response.data;  
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;  
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/get-all-users");
    return response.data;  
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;  
  }
};

export const updateUserRole = async ({userId, userRole}) =>{
  try {
    const response = await api.put("/user/set-user-role",{id:userId, role:userRole});
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;  
  }
}

export const getOrganizersEvents = async (userId) =>{
  try {
    const response = await api.get(`/events/get-organizers-events/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;  
  }
}

export const createApprovalRequest = async (userId, eventId, adminId, message) =>  api.post("/requests/request-for-approval", { userId, eventId, message, adminId });;

export const getAllAdmins = async () => api.get("/user/get-all-admins");

export const approveEvents = async (eventId, status)=> api.put("/requests/approve-events",{eventId, status})

export const getAllRequest = async (id) => api.get(`/requests/all-requests/${id}`)