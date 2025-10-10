-- Seed Mantras for Intelligent Meditation System
-- Each mantra is tagged with element, energy, and compatible signs

-- PEACE MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Shanti Shanti Shanti', 'Peace, Peace, Peace', 'Peace', 'Water', 'Calm', ARRAY['Pisces', 'Cancer', 'Scorpio'], 'Cultivate deep inner peace and emotional tranquility', NOW(), NOW()),
  (gen_random_uuid(), 'Lokah Samastah Sukhino Bhavantu', 'May all beings everywhere be happy and free', 'Peace', 'Air', 'Balanced', ARRAY['Libra', 'Aquarius', 'Gemini'], 'Extend compassion and peace to all beings', NOW(), NOW()),
  (gen_random_uuid(), 'Om Mani Padme Hum', 'The jewel is in the lotus', 'Peace', 'Earth', 'Calm', ARRAY['Taurus', 'Virgo', 'Capricorn'], 'Ground yourself in compassion and wisdom', NOW(), NOW());

-- GUIDANCE MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Gam Ganapataye Namaha', 'I bow to the remover of obstacles', 'Guidance', 'Earth', 'Active', ARRAY['Capricorn', 'Taurus', 'Virgo'], 'Clear obstacles and find your path forward', NOW(), NOW()),
  (gen_random_uuid(), 'Tat Tvam Asi', 'Thou art that - You are the universe', 'Guidance', 'Fire', 'Active', ARRAY['Aries', 'Leo', 'Sagittarius'], 'Remember your divine nature and inner power', NOW(), NOW()),
  (gen_random_uuid(), 'Om Namah Shivaya', 'I honor the divine within', 'Guidance', 'Water', 'Balanced', ARRAY['Pisces', 'Cancer', 'Scorpio'], 'Connect with your inner wisdom and transformation', NOW(), NOW());

-- WISDOM MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Ah Hum', 'Body, Speech, Mind purification', 'Wisdom', 'Air', 'Calm', ARRAY['Gemini', 'Libra', 'Aquarius'], 'Purify thoughts and align with higher wisdom', NOW(), NOW()),
  (gen_random_uuid(), 'Gate Gate Paragate', 'Gone, gone, gone beyond', 'Wisdom', 'Fire', 'Balanced', ARRAY['Sagittarius', 'Aries', 'Leo'], 'Transcend limitations and expand consciousness', NOW(), NOW()),
  (gen_random_uuid(), 'So Hum', 'I am that - I am the universe', 'Wisdom', 'Water', 'Calm', ARRAY['Pisces', 'Scorpio', 'Cancer'], 'Recognize your unity with all existence', NOW(), NOW());

-- LOVE MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Prema', 'Divine love', 'Love', 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], 'Open your heart to unconditional love', NOW(), NOW()),
  (gen_random_uuid(), 'Aham Prema', 'I am divine love', 'Love', 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], 'Embody and radiate love from within', NOW(), NOW()),
  (gen_random_uuid(), 'Om Shrim Maha Lakshmiyei Namaha', 'I honor the great goddess of abundance', 'Love', 'Earth', 'Balanced', ARRAY['Taurus', 'Libra', 'Virgo'], 'Attract love, beauty, and abundance', NOW(), NOW());

-- GROWTH MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Aim Saraswatyai Namaha', 'I bow to the goddess of wisdom and creativity', 'Growth', 'Air', 'Active', ARRAY['Gemini', 'Aquarius', 'Libra'], 'Enhance learning, creativity, and self-expression', NOW(), NOW()),
  (gen_random_uuid(), 'Om Hreem', 'Seed of manifestation', 'Growth', 'Fire', 'Active', ARRAY['Aries', 'Leo', 'Sagittarius'], 'Manifest your desires and creative power', NOW(), NOW()),
  (gen_random_uuid(), 'Om Kleem', 'Seed of attraction', 'Growth', 'Earth', 'Balanced', ARRAY['Taurus', 'Capricorn', 'Virgo'], 'Attract opportunities for growth and abundance', NOW(), NOW());

-- INTUITION MANTRAS
INSERT INTO mantras (id, text, translation, category, element, energy, signs, intention, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Om Eim Saraswatyai Namaha', 'I honor the goddess of knowledge', 'Intuition', 'Air', 'Calm', ARRAY['Aquarius', 'Gemini', 'Libra'], 'Awaken intuitive wisdom and clear perception', NOW(), NOW()),
  (gen_random_uuid(), 'Om Chandra', 'Moon energy', 'Intuition', 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], 'Connect with lunar wisdom and psychic abilities', NOW(), NOW()),
  (gen_random_uuid(), 'Om Guru', 'I honor the inner teacher', 'Intuition', 'Fire', 'Balanced', ARRAY['Sagittarius', 'Leo', 'Aries'], 'Trust your inner guidance and higher self', NOW(), NOW());
