import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Prospect, CreateProspectDTO, Visit } from '../types';

export const useProspects = () => {
  return useQuery({
    queryKey: ['prospects'],
    queryFn: api.prospects.list,
  });
};

export const useProspect = (id: string) => {
  return useQuery({
    queryKey: ['prospects', id],
    queryFn: () => api.prospects.get(id),
    enabled: !!id,
  });
};

export const useCreateProspect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.prospects.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });
};

export const useUpdateProspect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.prospects.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
      queryClient.invalidateQueries({ queryKey: ['prospects', data.id] });
    },
  });
};

export const useDeleteProspect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.prospects.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });
};

export const useAddVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prospectId, visit }: { prospectId: string; visit: Visit }) =>
      api.visits.add(prospectId, visit),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['prospects', variables.prospectId] });
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });
};

export const useDeleteVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ prospectId, visitId }: { prospectId: string; visitId: string }) =>
      api.visits.delete(prospectId, visitId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['prospects', variables.prospectId] });
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    },
  });
};
