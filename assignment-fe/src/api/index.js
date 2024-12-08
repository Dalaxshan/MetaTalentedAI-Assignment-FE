import { API_CONSTANTS } from "@/network/NetworkConstants";

class TasksApi {

    async createTask(request) {
        try {
          const response = await apiManager.post(API_CONSTANTS.task, request);
          return response.data.data;
        } catch (err) {
          console.error('[ReviewAPI - createReview]: ', err.response?.data);
          throw new Error(err.response?.data?.userMessage);
        }
      }
    

    async getAllTasks() {
        try {
            const response = await apiManager.get(API_CONSTANTS.task);
            console.log("feched tasks:",response);
          return response;
        } catch (err) {
          console.error('[TasksAPI - getAllTasks]: ', err.response?.data);
          throw new Error(err.response?.data?.userMessage);
        }
      }

    async getTaskByTaskId(taskId) {
        try {
          const response = await apiManager.get(API_CONSTANTS.getTaskByTaskId(taskId));
          return response;
        } catch (err) {
          console.error('[ReviewAPI - getReviewById]: ', err.response?.data);
          throw new Error(err.response?.data?.userMessage);
        }
      }
    
      async editTaskByTaskId(taskId, request) {
        try {
          const response = await apiManager.put(API_CONSTANTS.editTaskByTaskId(taskId), request);
          return response;
        } catch (err) {
          console.error('[ReviewAPI - editReview]: ', err.response?.data);
          throw new Error(err.response?.data?.userMessage);
        }
      }
  
}

export const tasksApi = new TasksApi();