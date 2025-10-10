-- Seed Rituals and Ritual Guides

-- Morning Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_morning_1', 'Sun Salutation Ritual', 'Morning', 'Greet the day with gratitude and set intentions while honoring the life-giving energy of the sun.', 15, 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], ARRAY['Yoga mat', 'Comfortable clothing', 'Optional: incense'], 'Energize your body and mind, set positive intentions for the day, and connect with solar energy.'),
('ritual_morning_2', 'Sacred Morning Tea Ceremony', 'Morning', 'A mindful tea ritual to center yourself and begin the day with presence and gratitude.', 20, 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Taurus'], ARRAY['Tea', 'Teapot', 'Cup', 'Quiet space'], 'Cultivate mindfulness, gratitude, and peaceful energy to carry throughout your day.');

-- Evening Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_evening_1', 'Gratitude and Release', 'Evening', 'Reflect on your day, express gratitude, and release what no longer serves you.', 15, 'Earth', 'Calm', ARRAY['Taurus', 'Virgo', 'Capricorn'], ARRAY['Journal', 'Pen', 'Candle'], 'Process the day''s experiences, cultivate gratitude, and prepare for restful sleep.'),
('ritual_evening_2', 'Moon Gazing Meditation', 'Evening', 'Connect with lunar energy through contemplation and receive the moon''s calming wisdom.', 20, 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], ARRAY['View of the moon', 'Blanket or cushion', 'Optional: crystals'], 'Attune to lunar cycles, calm the mind, and receive intuitive guidance.');

-- Full Moon Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_fullmoon_1', 'Full Moon Release Ceremony', 'Full Moon', 'Harness the full moon''s powerful energy to release what no longer serves your highest good.', 30, 'Water', 'Active', ARRAY['Cancer', 'Scorpio', 'Pisces'], ARRAY['Paper', 'Pen', 'Fireproof bowl', 'Matches', 'Water'], 'Release old patterns, emotions, and beliefs that block your growth and transformation.'),
('ritual_fullmoon_2', 'Full Moon Charging Ritual', 'Full Moon', 'Charge your crystals, intentions, and spiritual tools with the full moon''s amplifying energy.', 25, 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], ARRAY['Crystals', 'Written intentions', 'White cloth'], 'Amplify your intentions and cleanse/charge your spiritual tools.');

-- New Moon Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_newmoon_1', 'New Moon Intention Setting', 'New Moon', 'Plant seeds of intention during the new moon to manifest your desires in the coming lunar cycle.', 30, 'Earth', 'Balanced', ARRAY['Taurus', 'Virgo', 'Capricorn'], ARRAY['Journal', 'Pen', 'Candle', 'Crystals'], 'Set clear intentions and begin new projects aligned with your soul''s purpose.'),
('ritual_newmoon_2', 'New Beginnings Ritual Bath', 'New Moon', 'Cleanse your energy field and prepare for new beginnings with a sacred ritual bath.', 45, 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], ARRAY['Bath salts', 'Essential oils', 'Candles', 'Herbs'], 'Purify your energy and create space for new opportunities and growth.');

-- Cleansing Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_cleanse_1', 'Smoke Cleansing Ceremony', 'Cleansing', 'Clear negative energy from your space and aura using sacred smoke.', 15, 'Air', 'Active', ARRAY['Gemini', 'Libra', 'Aquarius'], ARRAY['Sage or palo santo', 'Fireproof bowl', 'Matches', 'Feather (optional)'], 'Remove stagnant or negative energy from your space and energy field.'),
('ritual_cleanse_2', 'Salt Water Purification', 'Cleansing', 'Use the purifying properties of salt and water to cleanse your energy and space.', 20, 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Scorpio'], ARRAY['Sea salt', 'Water', 'Bowl', 'White cloth'], 'Deep energetic cleansing and protection of your personal space.');

-- Seasonal Rituals
INSERT INTO rituals (id, name, type, description, duration, element, energy, signs, items, purpose) VALUES
('ritual_seasonal_1', 'Equinox Balance Ritual', 'Seasonal', 'Honor the balance of light and dark during the spring or autumn equinox.', 30, 'Air', 'Balanced', ARRAY['Libra', 'Gemini', 'Aquarius'], ARRAY['White and black candles', 'Flowers or leaves', 'Journal'], 'Find balance in your life and align with natural cycles of change.'),
('ritual_seasonal_2', 'Solstice Celebration', 'Seasonal', 'Celebrate the longest or shortest day of the year and honor the sun''s journey.', 40, 'Fire', 'Active', ARRAY['Leo', 'Aries', 'Sagittarius'], ARRAY['Candles', 'Seasonal items', 'Offerings', 'Fire (if safe)'], 'Connect with solar energy and mark the turning of the wheel of the year.');

-- Ritual Guides
INSERT INTO ritual_guides (id, ritual_id, title, tradition, steps, timing, preparation, closing) VALUES
('guide_ritual_morning_1', 'ritual_morning_1', 'Traditional Sun Salutation', 'Yoga/Hindu', 
'[
  {"step": 1, "title": "Face the Rising Sun", "description": "Stand facing east (or the direction of sunrise). Place your palms together at your heart center. Take three deep breaths."},
  {"step": 2, "title": "Offer Gratitude", "description": "Speak or think: ''I honor the sun, source of all life. I welcome this new day with gratitude and open heart.''"},
  {"step": 3, "title": "Set Your Intention", "description": "Silently or aloud, state your intention for the day. What energy do you wish to embody? What do you wish to create?"},
  {"step": 4, "title": "Perform Sun Salutations", "description": "Complete 3-12 rounds of sun salutations (Surya Namaskar), moving with your breath. Each movement is a prayer of gratitude."},
  {"step": 5, "title": "Stand in Mountain Pose", "description": "Return to standing. Feel the energy flowing through your body. Visualize yourself filled with golden sunlight."},
  {"step": 6, "title": "Seal Your Practice", "description": "Place hands at heart center again. Bow slightly, honoring the sun and your commitment to the day ahead."}
]',
'Sunrise or early morning',
'Prepare your space the night before. Lay out your yoga mat facing east. Wear comfortable clothing. Optional: light incense or a candle.',
'Take a moment of stillness. Notice how you feel. Carry this energy with you throughout your day. Drink water to ground yourself.');

INSERT INTO ritual_guides (id, ritual_id, title, tradition, steps, timing, preparation, closing) VALUES
('guide_ritual_fullmoon_1', 'ritual_fullmoon_1', 'Full Moon Release Ceremony', 'Eclectic Pagan', 
'[
  {"step": 1, "title": "Create Sacred Space", "description": "Find a quiet place where you can see the moon. Light a candle. Take several deep breaths to center yourself."},
  {"step": 2, "title": "Acknowledge the Moon", "description": "Gaze at the full moon. Speak: ''Grandmother Moon, I honor your fullness and your power. I ask for your assistance in releasing what no longer serves me.''"},
  {"step": 3, "title": "Write What You Release", "description": "On paper, write everything you wish to release: fears, limiting beliefs, toxic patterns, old pain. Be specific and honest."},
  {"step": 4, "title": "Read Aloud", "description": "Read each item aloud, feeling the weight of it. Then say: ''I release you with love. You no longer have power over me.''"},
  {"step": 5, "title": "Burn the Paper", "description": "Safely burn the paper in your fireproof bowl. Watch the smoke carry your releases up to the moon. Feel the liberation."},
  {"step": 6, "title": "Cleanse with Water", "description": "Pour water over the ashes, symbolizing emotional cleansing and the completion of the release."},
  {"step": 7, "title": "Fill the Space", "description": "Place your hands on your heart. Visualize white moonlight filling the spaces where you released old energy. Invite in peace, love, and new possibilities."},
  {"step": 8, "title": "Express Gratitude", "description": "Thank the moon: ''Thank you, Grandmother Moon, for witnessing my release. I am renewed. I am free. So it is.''"}
]',
'Night of the full moon, ideally when the moon is visible',
'Gather your materials beforehand. Ensure you have a safe place to burn paper. Check the moon rise time. Fast or eat lightly before the ritual.',
'Extinguish your candle. Dispose of the ashes respectfully (bury them or scatter in running water). Ground yourself by eating something or touching the earth. Journal about your experience.');

INSERT INTO ritual_guides (id, ritual_id, title, tradition, steps, timing, preparation, closing) VALUES
('guide_ritual_newmoon_1', 'ritual_newmoon_1', 'New Moon Manifestation Ritual', 'Modern Mysticism', 
'[
  {"step": 1, "title": "Prepare Your Space", "description": "Cleanse your space with smoke or sound. Light a candle. Arrange any crystals or meaningful objects around you."},
  {"step": 2, "title": "Ground and Center", "description": "Sit comfortably. Close your eyes. Take 10 deep breaths, feeling yourself becoming present and centered."},
  {"step": 3, "title": "Invoke New Moon Energy", "description": "Speak: ''Dark Moon, New Moon, I honor your mystery and potential. In this darkness, all things are possible. I plant my seeds of intention.''"},
  {"step": 4, "title": "Clarify Your Intentions", "description": "In your journal, write your intentions for this lunar cycle. Use present tense as if they''re already true: ''I am...'', ''I have...'', ''I create...''"},
  {"step": 5, "title": "Visualize Manifestation", "description": "Close your eyes. Visualize each intention as already manifested. Feel the emotions. See the details. Make it real in your mind and heart."},
  {"step": 6, "title": "Charge Your Intentions", "description": "Hold your journal or paper to your heart. Visualize your intentions being charged with your life force energy and the new moon''s potential."},
  {"step": 7, "title": "Make a Commitment", "description": "Speak aloud one action you''ll take in the next 48 hours toward each intention. Commitment activates manifestation."},
  {"step": 8, "title": "Seal the Ritual", "description": "Say: ''By the power of the New Moon and my own divine will, these intentions are set. As the moon grows, so do my dreams. And so it is.''"}
]',
'Within 24 hours of the new moon',
'Take a cleansing bath or shower before the ritual. Wear comfortable clothing. Have your journal and a special pen ready. Optional: create a vision board.',
'Keep your intentions somewhere you''ll see them daily. Take your committed action within 48 hours. Thank the new moon. Extinguish your candle. Ground with food or drink.');
