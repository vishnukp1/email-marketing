import Axios from "../auth/Autherization";

// Example of a custom hook for fetching data
export const useGetData = (url) => {
  const fetchData = async () => {
    try {
      const response = await Axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return fetchData;
};

// Example of a service function for posting data
export const postData = async (url, data) => {
  try {
    const response = await Axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Function to delete a node
export const deleteNode = async (userId, nodeId) => {
  try {
    await Axios.delete(`/api/flow/${userId}/node/${nodeId}`);
    console.log("Node deleted successfully");
  } catch (error) {
    console.error("Error deleting node:", error);
    throw error; // You can choose to throw the error for handling in the component
  }
};

// Function to update a node's label
export const updateNodeLabel = async (userId, nodeId, label) => {
  try {
    await Axios.put(`/api/flow/${userId}/node/${nodeId}`, { label });
    console.log("Node label updated successfully");
  } catch (error) {
    console.error("Error updating node label:", error);
    throw error; // You can choose to throw the error for handling in the component
  }
};

// Function to create a flow
export const createFlow = async (url, userId, title, nodes, edges) => {
    try {
      const response = await Axios.post(url, {
        userId,
        title,
        nodes,
        edges,
      });
      console.log("Flow created successfully:", response.data);
    } catch (error) {
      console.error("Error creating flow:", error);
      throw error;
    }
  };
  
