import axios from "axios";
// import.meta.env.VITE_API_URL ||

// ✅ Create Axios instance with baseURL and default headers
export const axiosInstance = axios.create({
  baseURL:  'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: for cookies
});

// ✅ Generic API Connector
export const apiConnector = async (method, url, bodyData, customHeaders = {}, params = null) => {
  try {
    const token = localStorage.getItem('token');
    console.log("token:", token);

    const headers = {
      ...customHeaders,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData,
      params: params,
      headers: headers,
    });
    console.log("response:", response);
    return response.data; // only data, no extra junk
  } catch (error) {
    console.log("error in apiConnector:", error);
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ✅ Auth API
export const login = (email, password) => apiConnector('POST', '/auth/login', { email, password });

// ✅ Topics CRUD
export const createTopic = (data) => apiConnector('POST', '/topics', data);
export const getTopics = () => apiConnector('GET', '/topics');
export const getTopicById = (id) => apiConnector('GET', `/topics/${id}`);
export const updateTopic = (id, data) => apiConnector('PUT', `/topics/${id}`, data);
export const deleteTopic = (id) => apiConnector('DELETE', `/topics/${id}`);

// ✅ Subtopics CRUD
export const createSubtopic = (data) => apiConnector('POST', '/topics/subtopics', data);
export const getSubtopics = () => apiConnector('GET', '/topics/subtopics');
export const getSubtopicById = (id) => apiConnector('GET', `/subtopics/${id}`);
export const updateSubtopic = (id, data) => apiConnector('PUT', `/subtopics/${id}`, data);
export const deleteSubtopic = (id) => apiConnector('DELETE', `/topics/subtopics/${id}`);

// ✅ Questions CRUD
export const createQuestion = (data) => apiConnector('POST', '/questions', data);
export const getQuestions = () => apiConnector('GET', '/questions/all');
export const getQuestionById = (id) => apiConnector('GET', `/questions/${id}`);
export const updateQuestion = (id, data) => apiConnector('PUT', `/questions/${id}`, data);
export const deleteQuestion = (id) => apiConnector('DELETE', `/questions/${id}`);
