-- Seed Meditation Types and Guides

-- Mindfulness Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_mindful_1', 'Basic Mindfulness', 'Mindfulness', 'A foundational practice of present-moment awareness, observing thoughts and sensations without judgment.', 15, 'Beginner', 'Air', 'Calm', ARRAY['Gemini', 'Libra', 'Aquarius', 'Virgo'], ARRAY['Reduces stress', 'Improves focus', 'Enhances emotional regulation', 'Increases self-awareness']),
('med_mindful_2', 'Mindful Breathing', 'Mindfulness', 'Focus on the natural rhythm of your breath to anchor yourself in the present moment.', 10, 'Beginner', 'Air', 'Calm', ARRAY['Gemini', 'Libra', 'Aquarius'], ARRAY['Calms the mind', 'Reduces anxiety', 'Improves concentration']);

-- Body Scan Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_body_1', 'Full Body Scan', 'Body Scan', 'Systematically bring awareness to each part of your body, releasing tension and cultivating deep relaxation.', 20, 'Beginner', 'Earth', 'Calm', ARRAY['Taurus', 'Virgo', 'Capricorn'], ARRAY['Releases physical tension', 'Improves body awareness', 'Promotes deep relaxation', 'Aids sleep']),
('med_body_2', 'Progressive Relaxation', 'Body Scan', 'Tense and release muscle groups throughout the body for deep physical and mental relaxation.', 15, 'Beginner', 'Earth', 'Balanced', ARRAY['Taurus', 'Virgo', 'Capricorn', 'Cancer']);

-- Loving-Kindness Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_loving_1', 'Metta Meditation', 'Loving-Kindness', 'Cultivate unconditional love and compassion for yourself and all beings through traditional phrases.', 20, 'Intermediate', 'Water', 'Balanced', ARRAY['Cancer', 'Scorpio', 'Pisces', 'Libra'], ARRAY['Increases compassion', 'Reduces negative emotions', 'Improves relationships', 'Enhances empathy']),
('med_loving_2', 'Self-Compassion Practice', 'Loving-Kindness', 'Direct loving-kindness specifically toward yourself, healing inner criticism and building self-love.', 15, 'Beginner', 'Water', 'Calm', ARRAY['Cancer', 'Pisces', 'Libra']);

-- Transcendental Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_trans_1', 'Mantra Meditation', 'Transcendental', 'Use a personal mantra to transcend ordinary thinking and access deeper states of consciousness.', 20, 'Intermediate', 'Fire', 'Active', ARRAY['Aries', 'Leo', 'Sagittarius'], ARRAY['Deepens consciousness', 'Reduces stress', 'Enhances creativity', 'Spiritual awakening']),
('med_trans_2', 'Silent Awareness', 'Transcendental', 'Rest in pure awareness beyond thought, experiencing the essence of consciousness itself.', 25, 'Advanced', 'Fire', 'Balanced', ARRAY['Aries', 'Leo', 'Sagittarius', 'Aquarius']);

-- Breath Work Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_breath_1', 'Box Breathing', 'Breath Work', 'Equal-length inhales, holds, exhales, and pauses create balance and calm the nervous system.', 10, 'Beginner', 'Air', 'Balanced', ARRAY['Gemini', 'Libra', 'Aquarius'], ARRAY['Reduces anxiety', 'Improves focus', 'Balances energy', 'Calms nervous system']),
('med_breath_2', 'Alternate Nostril Breathing', 'Breath Work', 'Ancient yogic technique that balances the left and right hemispheres of the brain.', 15, 'Intermediate', 'Air', 'Balanced', ARRAY['Gemini', 'Libra', 'Aquarius', 'Virgo']);

-- Visualization Meditations
INSERT INTO meditations (id, name, type, description, duration, difficulty, element, energy, signs, benefits) VALUES
('med_visual_1', 'Healing Light Visualization', 'Visualization', 'Imagine healing light flowing through your body, clearing blockages and restoring vitality.', 15, 'Beginner', 'Fire', 'Active', ARRAY['Leo', 'Sagittarius', 'Aries'], ARRAY['Promotes healing', 'Energizes body', 'Clears blockages', 'Enhances vitality']),
('med_visual_2', 'Sacred Space Journey', 'Visualization', 'Create and explore your inner sanctuary, a place of peace and wisdom within.', 20, 'Intermediate', 'Water', 'Calm', ARRAY['Pisces', 'Cancer', 'Scorpio']);

-- Meditation Guides
INSERT INTO meditation_guides (id, meditation_id, title, author, tradition, steps, duration) VALUES
('guide_mindful_1', 'med_mindful_1', 'Jon Kabat-Zinn''s Mindfulness Practice', 'Jon Kabat-Zinn', 'Modern Mindfulness', 
'[
  {"step": 1, "title": "Find Your Posture", "description": "Sit comfortably with your spine upright but not rigid. Rest your hands on your lap or knees. Close your eyes or maintain a soft downward gaze."},
  {"step": 2, "title": "Settle Into Your Body", "description": "Take a few deep breaths. Feel the weight of your body on the chair or cushion. Notice the points of contact."},
  {"step": 3, "title": "Bring Attention to Breath", "description": "Without changing your breath, simply observe it. Notice the sensation of air entering and leaving your nostrils, or the rise and fall of your chest or belly."},
  {"step": 4, "title": "Notice When Mind Wanders", "description": "Your mind will wander—this is natural. When you notice this, gently acknowledge it without judgment."},
  {"step": 5, "title": "Return to Breath", "description": "Each time you notice your mind has wandered, gently bring your attention back to your breath. This returning is the practice."},
  {"step": 6, "title": "Expand Awareness", "description": "In the last few minutes, expand your awareness to include sounds, sensations, and thoughts, while maintaining a sense of presence."},
  {"step": 7, "title": "Close Gently", "description": "When ready, slowly open your eyes. Take a moment to notice how you feel before moving on with your day."}
]', 15);

INSERT INTO meditation_guides (id, meditation_id, title, author, tradition, steps, duration) VALUES
('guide_body_1', 'med_body_1', 'Traditional Body Scan', 'Thich Nhat Hanh', 'Buddhist', 
'[
  {"step": 1, "title": "Lie Down Comfortably", "description": "Lie on your back with arms at your sides, palms facing up. Allow your feet to fall naturally outward."},
  {"step": 2, "title": "Breathe and Settle", "description": "Take several deep breaths. With each exhale, allow your body to sink deeper into relaxation."},
  {"step": 3, "title": "Begin with Your Feet", "description": "Bring your attention to your left foot. Notice any sensations—warmth, coolness, tingling, or nothing at all. Breathe into this area."},
  {"step": 4, "title": "Move Up the Left Leg", "description": "Slowly move your attention up through your ankle, calf, knee, and thigh. Spend 30-60 seconds with each area."},
  {"step": 5, "title": "Scan the Right Leg", "description": "Repeat the process with your right foot and leg, moving slowly and mindfully."},
  {"step": 6, "title": "Continue Through Torso", "description": "Move through your pelvis, lower back, abdomen, chest, and upper back. Notice areas of tension and breathe into them."},
  {"step": 7, "title": "Scan Arms and Hands", "description": "Bring awareness to both arms simultaneously, from shoulders down through fingers."},
  {"step": 8, "title": "Complete with Head", "description": "Scan your neck, jaw, face, and crown of head. Release any tension you find."},
  {"step": 9, "title": "Whole Body Awareness", "description": "Feel your entire body as one unified field of sensation, breathing as a complete being."},
  {"step": 10, "title": "Return Slowly", "description": "Wiggle fingers and toes. Stretch gently. Roll to one side before sitting up slowly."}
]', 20);

INSERT INTO meditation_guides (id, meditation_id, title, author, tradition, steps, duration) VALUES
('guide_loving_1', 'med_loving_1', 'Classical Metta Practice', 'Sharon Salzberg', 'Buddhist', 
'[
  {"step": 1, "title": "Settle and Center", "description": "Sit comfortably and take a few deep breaths. Allow your body and mind to settle."},
  {"step": 2, "title": "Begin with Yourself", "description": "Bring yourself to mind with kindness. Silently repeat: ''May I be happy. May I be healthy. May I be safe. May I live with ease.''"},
  {"step": 3, "title": "Feel the Phrases", "description": "Don''t just say the words—feel their meaning. Connect with the genuine wish for your own wellbeing."},
  {"step": 4, "title": "Extend to a Benefactor", "description": "Think of someone who has helped you. Offer them the same phrases: ''May you be happy. May you be healthy. May you be safe. May you live with ease.''"},
  {"step": 5, "title": "Include a Friend", "description": "Bring to mind a good friend. Extend the same loving wishes to them."},
  {"step": 6, "title": "Neutral Person", "description": "Think of someone you neither like nor dislike—perhaps someone you see regularly but don''t know well. Offer them loving-kindness."},
  {"step": 7, "title": "Difficult Person", "description": "If you feel ready, bring to mind someone you have difficulty with. Start with someone mildly difficult, not your greatest challenge."},
  {"step": 8, "title": "All Beings Everywhere", "description": "Expand your awareness to include all beings: ''May all beings be happy. May all beings be healthy. May all beings be safe. May all beings live with ease.''"},
  {"step": 9, "title": "Rest in Loving-Kindness", "description": "Sit quietly, resting in the feeling of loving-kindness you''ve cultivated."},
  {"step": 10, "title": "Dedicate the Merit", "description": "Dedicate the positive energy of your practice to the benefit of all beings."}
]', 20);
