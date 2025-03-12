import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';

// Survey queries
export const useCurrentSurvey = () => {
  return useQuery({
    queryKey: ['currentSurvey'],
    queryFn: apiClient.getCurrentSurvey,
  });
};

export const useSurveyHistory = () => {
  return useQuery({
    queryKey: ['surveyHistory'],
    queryFn: apiClient.getSurveyHistory,
  });
};

export const useAdminResponses = () => {
  return useQuery({
    queryKey: ['adminResponses'],
    queryFn: apiClient.getAdminResponses,
  });
};

// Survey mutations
export const useSubmitSurveyResponse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.submitSurveyResponse,
    onSuccess: () => {
      // Invalidate and refetch survey history after submission
      queryClient.invalidateQueries({ queryKey: ['surveyHistory', 'adminResponses'] });
    },
  });
};

// Auth mutations
export const useLogin = () => {
  return useMutation({
    mutationFn: apiClient.login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: apiClient.register,
  });
}; 