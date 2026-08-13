import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import {
  getTickets,
  getTicketById,
  createTicket,
  replyToTicket,
  updateTicketStatus,
  clearError,
  selectTickets,
  selectTicketDetails,
  selectHelpLoading,
  selectHelpError,
  selectHelpSuccess,
} from '@/redux/slices/helpSlice';

/**
 * Encapsulates support-ticket state + actions behind one hook.
 */
export const useSupport = () => {
  const dispatch = useAppDispatch();

  const tickets = useAppSelector(selectTickets);
  const ticketDetails = useAppSelector(selectTicketDetails);
  const loading = useAppSelector(selectHelpLoading);
  const error = useAppSelector(selectHelpError);
  const success = useAppSelector(selectHelpSuccess);

  const fetchTickets = useCallback((params) => dispatch(getTickets(params)), [dispatch]);
  const fetchTicketById = useCallback((id) => dispatch(getTicketById(id)), [dispatch]);
  const openTicket = useCallback((payload) => dispatch(createTicket(payload)), [dispatch]);
  const sendReply = useCallback((id, message) => dispatch(replyToTicket({ id, payload: { message } })), [dispatch]);
  const setStatus = useCallback((id, status) => dispatch(updateTicketStatus({ id, status })), [dispatch]);
  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    // state
    tickets,
    ticketDetails,
    loading,
    error,
    success,
    // actions
    fetchTickets,
    fetchTicketById,
    openTicket,
    sendReply,
    setStatus,
    resetError,
  };
};

export default useSupport;
