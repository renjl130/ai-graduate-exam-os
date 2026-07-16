-- Correct seven ECDICT entries whose source phonetic field is empty
UPDATE vocabulary SET phonetic='/æks/' WHERE lower(word)='axe' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/ˈkəʊzi/' WHERE lower(word)='cosy' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/krəˈdenʃəlz/' WHERE lower(word)='credentials' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/ˈsaɪbəspeɪs/' WHERE lower(word)='cyberspace' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/ɪˈmɜːdʒɪŋ/' WHERE lower(word)='emerging' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/ˈlæptɒp/' WHERE lower(word)='laptop' AND user_id IS NULL;
UPDATE vocabulary SET phonetic='/ˈmjuːtɪd/' WHERE lower(word)='muted' AND user_id IS NULL;
