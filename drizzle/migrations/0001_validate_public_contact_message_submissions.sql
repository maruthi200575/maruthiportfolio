DROP POLICY "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a valid message" ON public.contact_messages
FOR INSERT TO anon
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 254
  AND email = btrim(email)
  AND position('@' IN email) > 1
  AND position('.' IN split_part(email, '@', 2)) > 1
  AND char_length(btrim(subject)) BETWEEN 1 AND 200
  AND char_length(btrim(message)) BETWEEN 1 AND 5000
);