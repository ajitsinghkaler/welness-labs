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
      queryClient.invalidateQueries({ queryKey: ['surveyHistory'] });
      queryClient.invalidateQueries({ queryKey: ['adminResponses'] });
      queryClient.invalidateQueries({ queryKey: ['currentSurvey'] });
    },
  });
};

// Auth mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.login,
    onSuccess: () => {
      // Invalidate queries when user logs in to refresh data
      queryClient.invalidateQueries();
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      // Invalidate queries when user registers to refresh data
      queryClient.invalidateQueries();
    },
  });
}; 