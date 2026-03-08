
DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Users or system insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
