-- Seed Inspirational Quotes for Intelligent Meditation System
-- Each quote is tagged with element, energy, theme, and compatible signs

-- WISDOM QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Who looks outside, dreams; who looks inside, awakes.', 'Carl Jung', 'Wisdom', 'Water', 'Calm', ARRAY['Pisces', 'Scorpio', 'Cancer'], 'True awakening comes from inner exploration, not external seeking', NOW(), NOW()),
  (gen_random_uuid(), 'The privilege of a lifetime is to become who you truly are.', 'Carl Jung', 'Wisdom', 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], 'Your greatest work is discovering and embodying your authentic self', NOW(), NOW()),
  (gen_random_uuid(), 'Knowing yourself is the beginning of all wisdom.', 'Aristotle', 'Wisdom', 'Air', 'Balanced', ARRAY['Aquarius', 'Gemini', 'Libra'], 'Self-knowledge is the foundation of all understanding', NOW(), NOW());

-- GROWTH QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'What you seek is seeking you.', 'Rumi', 'Growth', 'Fire', 'Active', ARRAY['Sagittarius', 'Aries', 'Leo'], 'Your desires are calling you toward your destiny', NOW(), NOW()),
  (gen_random_uuid(), 'The wound is the place where the Light enters you.', 'Rumi', 'Growth', 'Water', 'Calm', ARRAY['Pisces', 'Cancer', 'Scorpio'], 'Your pain is the doorway to transformation and healing', NOW(), NOW()),
  (gen_random_uuid(), 'Be patient with yourself. Self-growth is tender; it is holy ground.', 'Stephen Covey', 'Growth', 'Earth', 'Calm', ARRAY['Taurus', 'Virgo', 'Capricorn'], 'Honor the sacred pace of your personal evolution', NOW(), NOW());

-- PEACE QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Peace comes from within. Do not seek it without.', 'Buddha', 'Peace', 'Water', 'Calm', ARRAY['Pisces', 'Cancer', 'Scorpio'], 'External circumstances cannot give you the peace that lives within', NOW(), NOW()),
  (gen_random_uuid(), 'In the midst of movement and chaos, keep stillness inside of you.', 'Deepak Chopra', 'Peace', 'Earth', 'Balanced', ARRAY['Taurus', 'Capricorn', 'Virgo'], 'Cultivate an unshakeable center amidst life''s storms', NOW(), NOW()),
  (gen_random_uuid(), 'The quieter you become, the more you can hear.', 'Ram Dass', 'Peace', 'Air', 'Calm', ARRAY['Libra', 'Aquarius', 'Gemini'], 'Silence reveals the wisdom that noise obscures', NOW(), NOW());

-- LOVE QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.', 'Rumi', 'Love', 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], 'Love is your nature; you need only remove what blocks it', NOW(), NOW()),
  (gen_random_uuid(), 'Love is the bridge between you and everything.', 'Rumi', 'Love', 'Air', 'Balanced', ARRAY['Libra', 'Gemini', 'Aquarius'], 'Love connects you to the unity of all existence', NOW(), NOW()),
  (gen_random_uuid(), 'Where there is love there is life.', 'Mahatma Gandhi', 'Love', 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], 'Love is the vital force that animates all creation', NOW(), NOW());

-- COURAGE QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'The cave you fear to enter holds the treasure you seek.', 'Joseph Campbell', 'Courage', 'Fire', 'Active', ARRAY['Aries', 'Leo', 'Sagittarius'], 'Your greatest gifts lie beyond your greatest fears', NOW(), NOW()),
  (gen_random_uuid(), 'Do not be afraid of your difficulties. Do not wish you could be in other circumstances. The best circumstances are those you are in now.', 'Paramahansa Yogananda', 'Courage', 'Earth', 'Balanced', ARRAY['Capricorn', 'Taurus', 'Virgo'], 'Your current challenges are perfectly designed for your growth', NOW(), NOW()),
  (gen_random_uuid(), 'Everything you want is on the other side of fear.', 'Jack Canfield', 'Courage', 'Air', 'Active', ARRAY['Gemini', 'Aquarius', 'Libra'], 'Fear is the threshold you must cross to claim your desires', NOW(), NOW());

-- TRANSFORMATION QUOTES
INSERT INTO quotes (id, text, author, theme, element, energy, signs, insight, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.', 'Rumi', 'Transformation', 'Water', 'Balanced', ARRAY['Scorpio', 'Pisces', 'Cancer'], 'True power lies in transforming yourself, not the world', NOW(), NOW()),
  (gen_random_uuid(), 'The only way to make sense out of change is to plunge into it, move with it, and join the dance.', 'Alan Watts', 'Transformation', 'Fire', 'Active', ARRAY['Sagittarius', 'Aries', 'Leo'], 'Embrace change as the natural rhythm of existence', NOW(), NOW()),
  (gen_random_uuid(), 'We cannot become what we want by remaining what we are.', 'Max DePree', 'Transformation', 'Earth', 'Active', ARRAY['Capricorn', 'Virgo', 'Taurus'], 'Growth requires releasing who you were to become who you are meant to be', NOW(), NOW());
