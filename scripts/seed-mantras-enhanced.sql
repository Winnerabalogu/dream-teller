-- Enhanced Mantras with Guides

-- Update existing mantras with pronunciation, repetitions, and guides
UPDATE mantras SET 
  pronunciation = 'ohm mah-nee pahd-may hoom',
  repetitions = 108,
  best_time = 'Morning',
  origin = 'Sanskrit',
  guide = '["Sit comfortably with spine straight", "Take three deep breaths to center yourself", "Begin chanting slowly, feeling each syllable", "Visualize compassion flowing from your heart", "Continue for 108 repetitions using mala beads", "End with three breaths of silence"]'
WHERE text = 'Om Mani Padme Hum';

UPDATE mantras SET 
  pronunciation = 'ohm shah-ntee shah-ntee shah-ntee',
  repetitions = 27,
  best_time = 'Anytime',
  origin = 'Sanskrit',
  guide = '["Find a quiet space", "Close your eyes and breathe deeply", "Chant each Om Shanti slowly", "Feel peace radiating through your body", "Repeat 27 times", "Sit in silence for 2 minutes"]'
WHERE text = 'Om Shanti Shanti Shanti';

UPDATE mantras SET 
  pronunciation = 'soh-hahm',
  repetitions = 108,
  best_time = 'Anytime',
  origin = 'Sanskrit',
  guide = '["Breathe naturally without forcing", "On inhale, mentally say So", "On exhale, mentally say Ham", "Continue this rhythm", "Let the mantra merge with your breath", "Practice for 10-15 minutes"]'
WHERE text = 'So Hum';
