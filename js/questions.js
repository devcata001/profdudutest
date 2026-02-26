// Study With Prof Dudu - Questions Database
// All questions organized by subject with correct answers

// ============================================================
// SHARED QUESTION BANKS (Maths & English — compulsory for all)
// ============================================================

const sharedMaths = {
    name: "Mathematics",
    questions: [
        { id: 1, question: "A man 1.7 m tall observes a bird on top of a tree at an angle of elevation of 30°. If the distance between the man's head and the bird is 25 m, what is the height of the tree?", options: ["26.7 m", "14.2 m", "1.7 + (25√3)/3 m", "1.7 + (25√2)/2 m"], answer: "C" },
        { id: 2, question: "The first term of a geometric progression is twice its common ratio. Find the sum of the first two terms of the GP if its sum to infinity is 8.", options: ["8/5", "8/3", "72/25", "56/9"], answer: "A" },
        { id: 3, question: "What is the result when 2434₆ is divided by 42₆?", options: ["23", "35", "52", "55"], answer: "A" },
        { id: 4, question: "A trader bought 100 oranges at 5 for ₦1.20. Twenty oranges got spoilt and the remaining were sold at 4 for ₦1.50. Find the percentage gain or loss.", options: ["30% gain", "25% gain", "30% loss", "25% loss"], answer: "B" },
        { id: 5, question: "If log₁₀ 8 = x, evaluate log₈ 5 in terms of x.", options: ["½ x", "x − ¼", "x − ⅓", "x − ½"], answer: "C" },
        { id: 6, question: "Divide 4x³ − 3x + 1 by 2x − 1.", options: ["2x² − x + 1", "2x² − x − 1", "2x² + x + 1", "2x² + x − 1"], answer: "A" },
        { id: 7, question: "Solve for x if 3x − 7 = 11.", options: ["4", "5", "6", "7"], answer: "C" },
        { id: 8, question: "Find the mean of the first five even numbers: 2, 4, 6, 8, 10.", options: ["4", "6", "5", "8"], answer: "B" },
        { id: 9, question: "If sin θ = 3/5, where θ is acute, find cos θ.", options: ["3/4", "4/5", "5/4", "5/3"], answer: "B" },
        { id: 10, question: "Simplify: 2/3 + 5/6.", options: ["1", "7/6", "3/2", "11/6"], answer: "C" },
        { id: 11, question: "The sum of the interior angles of a polygon is 1080°. How many sides has the polygon?", options: ["6", "8", "7", "9"], answer: "B" },
        { id: 12, question: "If 2^x = 32, find x.", options: ["3", "4", "5", "6"], answer: "C" },
        { id: 13, question: "Find the value of x if 2x/5 = 6/10.", options: ["2", "3", "4", "5"], answer: "B" },
        { id: 14, question: "A straight line subtends an angle of 180° at a point. What angle does a semicircle subtend at the circumference?", options: ["45°", "60°", "90°", "180°"], answer: "C" },
        { id: 15, question: "Convert 101101₂ to base 10.", options: ["43", "45", "46", "47"], answer: "B" },
        { id: 16, question: "Simplify: (3x²y)(2xy²).", options: ["6x³y³", "5x²y²", "6x²y³", "3x³y²"], answer: "A" },
        { id: 17, question: "The probability of picking a red ball from a bag is 3/7. What is the probability of not picking a red ball?", options: ["3/7", "4/7", "1/7", "6/7"], answer: "B" },
        { id: 18, question: "A car travels at 72 km/h for 2½ hours. Find the distance covered.", options: ["150 km", "160 km", "180 km", "200 km"], answer: "C" },
        { id: 19, question: "Find the median of the numbers: 3, 7, 5, 9, 11.", options: ["5", "6", "7", "8"], answer: "C" },
        { id: 20, question: "If x + 1/x = 5, find x² + 1/x².", options: ["21", "23", "25", "27"], answer: "B" }
    ]
};

const sharedEnglish = {
    name: "English",
    questions: [
        { id: 1, question: "Choose the option that best conveys the meaning of the underlined portion: In the match against the uplanders team, the submariners turned out to be the dark horse.", options: ["played most brilliantly", "played below their usual form", "won unexpectedly", "lost as expected", "won as expected"], answer: "C" },
        { id: 2, question: "Choose the option that best conveys the meaning of the underlined portion: Only the small fry gets punished for such social misdemeanours.", options: ["small boys", "unimportant people", "frightened people", "frivolous people", "inexperienced people"], answer: "B" },
        { id: 3, question: "Choose the option that best conveys the meaning of the underlined portion: He spoke with his heart in his mouth.", options: ["courageously", "with such unusual cowardice", "with a lot of confusion in his speech", "without being able to make up his mind", "with fright and agitation"], answer: "E" },
        { id: 4, question: "Choose the option that best conveys the meaning of the underlined portion: The leader in today's issue of our popular newspaper focuses on inflation.", options: ["president", "headline", "editorial", "columnist", "proprietor"], answer: "C" },
        { id: 5, question: "Choose the option that best conveys the meaning of the underlined portion: From the way my friend talks, you can see he is such a bore.", options: ["rude", "brilliant", "uninteresting", "overbearing", "humorous"], answer: "C" },
        { id: 6, question: "Choose the option that best conveys the meaning of the underlined portion: His jail terms were to run concurrently.", options: ["simultaneously", "uniformly", "laboriously", "consecutively", "judiciously"], answer: "A" },
        { id: 7, question: "Choose the option that best conveys the meaning of the underlined portion: There is some obvious symmetry in the whole presentation.", options: ["confusion", "hesitation", "excitement", "orderliness", "dissatisfaction"], answer: "D" },
        { id: 8, question: "Choose the option that best conveys the meaning of the underlined portion: The bill has to wait as we are now insolvent.", options: ["overworked", "bankrupt", "unsettled", "insoluble", "affluent"], answer: "B" },
        { id: 9, question: "Choose the option that best conveys the meaning of the underlined portion: All his plans fell through.", options: ["failed", "were accomplished", "had to be reviewed", "were rejected", "fell"], answer: "A" },
        { id: 10, question: "Choose the option that best conveys the meaning of the underlined portion: The balance sheet at the end of the business year shows that we broke even.", options: ["lost heavily", "made profit", "neither lost nor gained", "had no money to continue business", "were heavily indebted to our bankers"], answer: "C" },
        { id: 11, question: "THE LEKKI HEADMASTER — What was the common ritual at the morning assembly at Stardom on Tuesdays and Thursdays?", options: ["Christian and Muslim Prayers", "Words of Exaltation", "The second stanza of the national anthem", "The principal's address"], answer: "C" },
        { id: 12, question: "How much was the boarding house fee per session at Stardom before it was reduced?", options: ["one hundred and sixty three thousand naira", "two hundred and fifty thousand naira", "one hundred and sixty thousand naira", "ninety three thousand naira"], answer: "B" },
        { id: 13, question: "Who instructed the Chemistry teacher to conclude the assembly after Mr Bepo burst into tears?", options: ["The principal", "The Managing Director", "The Vice Principal", "The school nurse"], answer: "C" },
        { id: 14, question: "Why did the Vice Principal contact the MD after Mr Bepo's crying incident at the assembly?", options: ["To arrange an emergency meeting", "Because parents were calling with concerns", "To announce the principal's retirement", "To discuss boarding fee reductions"], answer: "B" },
        { id: 15, question: "The principal was nicknamed 'The Lekki Headmaster' because:", options: ["He lived in Lekki during his time as a headmaster", "He humorously imitated characters from the Village Headmaster", "He introduced a new curriculum in the school", "He founded Stardom Kiddies School"], answer: "B" },
        { id: 16, question: "Which teachers were reprimanded because two of their candidates had Ds in their subjects?", options: ["Mr. Ope Wande and Mrs. Grace Apeh", "Mr. Audu and Mr. Justus Anabel", "Mr. Obong Ukake and Miss Taye Kareem", "Mr. Bepo and Mr. Ope Wande"], answer: "C" },
        { id: 17, question: "Who among the staff at Stardom School is also a pastor?", options: ["Mr. Justus Anabel", "Mr. Ope Wande", "Mr. Audu", "Mr. Obong Ukake"], answer: "B" },
        { id: 18, question: "What was given as a reward to teachers whose students scored distinctions in their subjects?", options: ["₦30,000 each", "₦20,000 each", "Bottles of wine only", "A special commendation letter"], answer: "A" },
        { id: 19, question: "Why did the MD decide to send the principal home after the crying incident?", options: ["To protect the school's reputation", "To avoid disturbing the students further", "To allow the principal to rest", "To prepare for a replacement"], answer: "A" },
        { id: 20, question: "Who accompanied the principal to his home on the day of the crying incident?", options: ["The MD herself", "The guidance counsellor", "Pastor Wande", "The school nurse"], answer: "B" }
    ]
};

// ============================================================
// MAIN QUESTIONS DATA OBJECT
// ============================================================

const questionsData = {

    // ========================
    // SCIENCE SUBJECTS
    // ========================
    science: {
        maths: sharedMaths,
        english: sharedEnglish,

        physics: {
            name: "Physics",
            questions: [
                { id: 1, question: "Which of the following is applicable to a seat belt?", options: ["Newton's third law", "Newton's second law", "Newton's first law", "Momentum"], answer: "C" },
                { id: 2, question: "What is the unit of power?", options: ["Newton", "Watt", "Joules", "Mole"], answer: "B" },
                { id: 3, question: "Impulse is proportional to:", options: ["Change in velocity", "Product of mass and velocity", "Change in momentum", "B and C"], answer: "D" },
                { id: 4, question: "Rate of change of work done is:", options: ["Energy", "Work rate", "Power", "Force"], answer: "C" },
                { id: 5, question: "Which of the following is a scalar quantity?", options: ["Luminous intensity", "Force", "Displacement", "Acceleration"], answer: "A" },
                { id: 6, question: "Power is measured in:", options: ["J/s", "Nm", "Joules", "Henry"], answer: "A" },
                { id: 7, question: "Which of these has the highest frequency?", options: ["X-ray", "Ultraviolet rays", "Microwaves", "Gamma rays"], answer: "D" },
                { id: 8, question: "Which of these has the highest wavelength?", options: ["Gamma rays", "X-ray", "Microwave", "Radio waves"], answer: "D" },
                { id: 9, question: "The best conductor is:", options: ["Copper", "Silver", "Gold", "Aluminium"], answer: "B" },
                { id: 10, question: "Volume is directly proportional to:", options: ["Temperature", "Pressure", "Kinetic energy", "Absolute temperature"], answer: "D" },
                { id: 11, question: "The average value of an A.C current or voltage is:", options: ["Zero", "One", "Twice the current", "1/2"], answer: "A" },
                { id: 12, question: "Opposition to the flow of A.C offered by a capacitor is:", options: ["Resistivity", "Conductance", "Resistance", "Reactance"], answer: "D" },
                { id: 13, question: "Resonance occurs at:", options: ["Minimum current", "Maximum current", "Average current", "All current"], answer: "B" },
                { id: 14, question: "The relationship between pressure and height is:", options: ["Directly proportional", "Product", "Inversely proportional", "Summation"], answer: "C" },
                { id: 15, question: "___ is used to detect and measure radiant energy.", options: ["Thermocouple", "Thermostat", "Thermodynamo", "Thermopile"], answer: "D" },
                { id: 16, question: "1 kilowatt-hour is equal to:", options: ["3.6×10³ joules", "3.6×10⁶ joules", "2.6×10³ joules", "2.6×10⁶ joules"], answer: "B" },
                { id: 17, question: "The meniscus of water is:", options: ["Concave", "Plano", "Bi-concave", "Convex"], answer: "A" },
                { id: 18, question: "Ammeters are connected in:", options: ["Parallel", "Series", "Opposite", "Transversely"], answer: "B" },
                { id: 19, question: "If the incident ray has a constant direction and the mirror is rotated through an angle ∅, the reflected ray is rotated through an angle:", options: ["∅", "90°", "2∅", "∅/2"], answer: "C" },
                { id: 20, question: "Red + green gives:", options: ["Yellow", "Cyan", "Magenta", "Blue"], answer: "A" }
            ]
        },

        biology: {
            name: "Biology",
            questions: [
                { id: 1, question: "The most appropriate instrument for measuring the diameter of a small insect leg is:", options: ["Meter rule", "Vernier calipers", "Measuring tape", "Thermometer"], answer: "B" },
                { id: 2, question: "Which of the following is a characteristic of living organisms?", options: ["Crystallization", "Diffusion only", "Irritability", "Sublimation"], answer: "C" },
                { id: 3, question: "In the binomial system of nomenclature, the second name represents the:", options: ["Family", "Class", "Genus", "Species"], answer: "D" },
                { id: 4, question: "A cross between two heterozygous tall plants (Tt × Tt) will produce offspring in the phenotypic ratio of:", options: ["1 : 2 : 1", "3 : 1", "2 : 1", "1 : 1"], answer: "B" },
                { id: 5, question: "A man with blood group AB marries a woman with blood group O. What is the possible blood group of their children?", options: ["A and B", "AB only", "O only", "A, B and O"], answer: "A" },
                { id: 6, question: "A colour-blind man marries a normal woman who is a carrier. What percentage of their sons will be colour-blind?", options: ["0%", "25%", "50%", "75%"], answer: "C" },
                { id: 7, question: "The physical expression of a gene is referred to as:", options: ["Genotype", "Phenotype", "Allele", "Chromosome"], answer: "B" },
                { id: 8, question: "According to Lamarck, organisms evolve because they:", options: ["Possess favourable mutations", "Compete for survival", "Use and disuse their organs", "Undergo natural selection"], answer: "C" },
                { id: 9, question: "One major contribution of Charles Darwin to evolutionary theory is the concept of:", options: ["Acquired characteristics", "Natural selection", "Mutation theory", "Gene recombination"], answer: "B" },
                { id: 10, question: "Homologous structures are evidence of evolution because they:", options: ["Perform the same function", "Have similar embryological origin", "Have different origins", "Exist in unrelated organisms"], answer: "B" },
                { id: 11, question: "Industrial melanism in peppered moth is an example of:", options: ["Artificial selection", "Mutation", "Natural selection", "Gene linkage"], answer: "C" },
                { id: 12, question: "The primary source of energy in most ecosystems is:", options: ["Wind", "Sun", "Water", "Soil"], answer: "B" },
                { id: 13, question: "In the food chain: Grass → Grasshopper → Frog → Snake, the frog is a:", options: ["Producer", "Primary consumer", "Secondary consumer", "Tertiary consumer"], answer: "C" },
                { id: 14, question: "The process by which green plants manufacture food is:", options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"], answer: "C" },
                { id: 15, question: "Which of the following organisms is a decomposer?", options: ["Goat", "Mushroom", "Hawk", "Grass"], answer: "B" },
                { id: 16, question: "Energy decreases along a food chain because:", options: ["Organisms refuse to eat", "Energy is lost as heat", "Producers are fewer", "Carnivores dominate"], answer: "B" },
                { id: 17, question: "The relationship between a tapeworm and a human is:", options: ["Mutualism", "Commensalism", "Parasitism", "Symbiosis"], answer: "C" },
                { id: 18, question: "Lichens (algae and fungi living together) represent:", options: ["Parasitism", "Mutualism", "Predation", "Competition"], answer: "B" },
                { id: 19, question: "Two goats feeding on the same pasture are exhibiting:", options: ["Interspecific competition", "Intraspecific competition", "Mutualism", "Parasitism"], answer: "B" },
                { id: 20, question: "A bird feeding on insects disturbed by grazing cattle is an example of:", options: ["Parasitism", "Predation", "Commensalism", "Competition"], answer: "C" }
            ]
        },

        chemistry: {
            name: "Chemistry",
            questions: [
                { id: 1, question: "What is the IUPAC name for CH₃CH₂CH₂OH?", options: ["Propan-1-ol", "Propan-2-ol", "Butan-1-ol", "Ethanol"], answer: "A" },
                { id: 2, question: "Which gas is responsible for global warming?", options: ["CO₂", "SO₂", "NO₂", "CO"], answer: "A" },
                { id: 3, question: "What is the pH of a neutral solution?", options: ["5", "7", "9", "11"], answer: "B" },
                { id: 4, question: "Which metal is extracted from bauxite?", options: ["Aluminum", "Copper", "Iron", "Zinc"], answer: "A" },
                { id: 5, question: "What is the formula for ethanol?", options: ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "C₄H₉OH"], answer: "B" },
                { id: 6, question: "Which type of bond involves sharing electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: "B" },
                { id: 7, question: "What is the main component of natural gas?", options: ["Methane", "Ethane", "Propane", "Butane"], answer: "A" },
                { id: 8, question: "Which scientist developed the periodic table?", options: ["Mendeleev", "Dalton", "Rutherford", "Bohr"], answer: "A" },
                { id: 9, question: "What is the process of converting solid directly to gas?", options: ["Melting", "Boiling", "Sublimation", "Condensation"], answer: "C" },
                { id: 10, question: "Which element is a noble gas?", options: ["Helium", "Oxygen", "Nitrogen", "Carbon"], answer: "A" },
                { id: 11, question: "Which type of reaction absorbs heat?", options: ["Exothermic", "Endothermic", "Neutralization", "Combustion"], answer: "B" },
                { id: 12, question: "What is the name of the process of separating mixtures based on boiling points?", options: ["Distillation", "Filtration", "Chromatography", "Crystallization"], answer: "A" },
                { id: 13, question: "Which metal is the best conductor of electricity?", options: ["Copper", "Silver", "Gold", "Aluminum"], answer: "B" },
                { id: 14, question: "What is the pH range for acidic solutions?", options: ["0–6", "7–14", "7", "8–14"], answer: "A" },
                { id: 15, question: "Which gas is used in fire extinguishers?", options: ["CO₂", "O₂", "N₂", "H₂"], answer: "A" },
                { id: 16, question: "What is the name of the compound NaCl?", options: ["Sodium chloride", "Sodium carbonate", "Sodium hydroxide", "Sodium oxide"], answer: "A" },
                { id: 17, question: "Which process involves the gain of electrons?", options: ["Oxidation", "Reduction", "Neutralization", "Combustion"], answer: "B" },
                { id: 18, question: "What is the symbol for potassium?", options: ["P", "K", "Pt", "Po"], answer: "B" },
                { id: 19, question: "Which type of bond involves the transfer of electrons?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], answer: "B" },
                { id: 20, question: "What is the main cause of acid rain?", options: ["CO₂", "SO₂", "NO₂", "CO"], answer: "B" }
            ]
        }
    },

    // ========================
    // ARTS SUBJECTS
    // ========================
    arts: {
        maths: sharedMaths,
        english: sharedEnglish,

        literature: {
            name: "Literature",
            questions: [
                { id: 1, question: "What is the literary device used to give human-like qualities to non-human things?", options: ["Metaphor", "Simile", "Personification", "Alliteration"], answer: "C" },
                { id: 2, question: "What is the term for a comparison between two things using 'like' or 'as'?", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], answer: "B" },
                { id: 3, question: "What is the literary device used to convey a meaning that is opposite of its literal meaning?", options: ["Irony", "Sarcasm", "Metaphor", "Allusion"], answer: "A" },
                { id: 4, question: "What is the term for a reference to a person, place, or event outside the text?", options: ["Allusion", "Alliteration", "Metaphor", "Simile"], answer: "A" },
                { id: 5, question: "What is the literary device used to create a vivid and exaggerated description?", options: ["Hyperbole", "Imagery", "Metaphor", "Personification"], answer: "A" },
                { id: 6, question: "What is the term for the repetition of similar sounds at the beginning of words?", options: ["Alliteration", "Assonance", "Consonance", "Onomatopoeia"], answer: "A" },
                { id: 7, question: "What is the literary device used to create a contrast between two ideas?", options: ["Oxymoron", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 8, question: "What is the term for a word that imitates the sound it describes?", options: ["Onomatopoeia", "Alliteration", "Assonance", "Consonance"], answer: "A" },
                { id: 9, question: "What is the literary device used to create a sense of uncertainty or doubt?", options: ["Ambiguity", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 10, question: "What is the term for a comparison between two things without using 'like' or 'as'?", options: ["Metaphor", "Simile", "Personification", "Hyperbole"], answer: "A" },
                { id: 11, question: "What is the literary device used to create a sense of tension or excitement?", options: ["Suspense", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 12, question: "What is the term for a phrase or expression that has a figurative meaning?", options: ["Idiom", "Metaphor", "Simile", "Hyperbole"], answer: "A" },
                { id: 13, question: "What is the literary device used to create a sense of nostalgia or longing?", options: ["Nostalgia", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 14, question: "What is the term for a character that represents an abstract idea?", options: ["Symbol", "Metaphor", "Simile", "Personification"], answer: "A" },
                { id: 15, question: "What is the literary device used to create a sense of contrast between two ideas placed side by side?", options: ["Juxtaposition", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 16, question: "What is the term for a repeated element or idea in a text?", options: ["Motif", "Metaphor", "Simile", "Hyperbole"], answer: "A" },
                { id: 17, question: "What is the literary device used to create a sense of uncertainty or unpredictability?", options: ["Ambiguity", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 18, question: "What is the term for a statement that is opposite of what is meant?", options: ["Irony", "Sarcasm", "Metaphor", "Simile"], answer: "A" },
                { id: 19, question: "What is the literary device used to create a sense of tension or conflict?", options: ["Conflict", "Irony", "Metaphor", "Simile"], answer: "A" },
                { id: 20, question: "What is the term for a word or phrase that has a different meaning in a particular context?", options: ["Connotation", "Denotation", "Metaphor", "Simile"], answer: "A" }
            ]
        },

        government: {
            name: "Government",
            questions: [
                { id: 1, question: "Nigeria's head of government in 1963 was:", options: ["Chief Nnamdi Azikiwe", "General Yakubu Gowon", "Alhaji Abubakar Tafawa Balewa", "Major Gen Aguiyi Ironsi"], answer: "C" },
                { id: 2, question: "Government by the wealthy is known as:", options: ["Democracy", "Plutocracy", "Oligarchy", "Aristocracy"], answer: "B" },
                { id: 3, question: "The main function of the Code of Conduct Bureau is to:", options: ["Give the police more power to make arrests", "Ensure accountability in government business", "Give the judiciary more powers to discipline erring judges", "Protect public officers from the press"], answer: "B" },
                { id: 4, question: "The fees collected by the local government are:", options: ["Income tax", "User charge", "Fines", "Levies"], answer: "D" },
                { id: 5, question: "The absence of the rule of law in government will bring about:", options: ["Human rights abuse", "Political apathy", "Corrupt practices", "Treasonable offences"], answer: "A" },
                { id: 6, question: "The Economic Community of West African States has made progress in the area of:", options: ["Increased trade among members", "Providing financial aids to members", "Political integration of region", "Free movement of persons and right of residence"], answer: "A" },
                { id: 7, question: "___ was the first Nigerian permanent representative to the United Nations.", options: ["Chief Samuel Adebo", "Professor Ibrahim Gambari", "Alhaji Yusuf Maitama Sule", "General Joseph Garba"], answer: "D" },
                { id: 8, question: "The Murtala/Obasanjo regime in Nigeria increased the number of states from:", options: ["30 to 36", "19 to 20", "12 to 19", "4 to 12"], answer: "C" },
                { id: 9, question: "The ___ is responsible for advising the president on the sovereignty and territorial integrity of the country.", options: ["National Defence Council", "Council of State", "National Security Council", "Federal Executive Council"], answer: "A" },
                { id: 10, question: "Before Nigeria became a republic, the highest body charged with the administration of justice was the:", options: ["Court of Appeal", "Highest Court", "Privy Council", "Supreme Court"], answer: "C" },
                { id: 11, question: "A major issue that distinguishes pressure groups from political parties is:", options: ["Ideology", "Objective", "Membership drive", "Voting pattern"], answer: "B" },
                { id: 12, question: "When Nigeria achieved independence in 1960, who was head of state?", options: ["Queen of England", "President", "Prime minister", "Governor-General"], answer: "A" },
                { id: 13, question: "After 1945, the demand of African nationalists changed from reform to independence because:", options: ["The second world war enhanced colonial rule", "Colonial rule became less oppressive", "Colonial rule was in disarray", "The second world war boosted their morale"], answer: "D" },
                { id: 14, question: "___ was the method used by the British to facilitate the administration of southern Nigeria.", options: ["Trade association", "Divide and rule", "Dialogue", "Persuasion"], answer: "B" },
                { id: 15, question: "One argument against a multi-party system is the:", options: ["Inability to attract foreign assistance", "High cost of conducting election", "Banning of interest groups", "Encouragement of imposition and instability"], answer: "B" },
                { id: 16, question: "___ refers to the manipulation of boundaries of constituencies in order to win more seats.", options: ["Delimitation", "Devolution", "Determination", "Gerrymandering"], answer: "D" },
                { id: 17, question: "The fundamental rights of citizens include the following EXCEPT:", options: ["Association, property and social security", "Life, liberty and property", "Free education, employment and freedom of thought", "Life, speech and association"], answer: "C" },
                { id: 18, question: "A constitution is a legal document:", options: ["Drawn up by lawyers", "Enacted by military decree", "Forming the basis upon which a government rules the country", "Only likely to succeed in countries where there is union government"], answer: "C" },
                { id: 19, question: "A government in which control of ultimate power is by a few who rule in their selfish interest is classified as:", options: ["An Oligarchy", "A Dictatorship", "An Aristocracy", "A Monarchy"], answer: "A" },
                { id: 20, question: "The judicial organ of government is the body which:", options: ["Implements the law", "Makes the law", "Punishes lawbreakers", "Interprets the law"], answer: "D" }
            ]
        },

        crs: {
            name: "CRS",
            questions: [
                { id: 1, question: "When Jesus asked his disciples 'Who do men say that I am?', Peter said he was:", options: ["John the Baptist", "One of the prophets", "Jesus", "Elijah"], answer: "B" },
                { id: 2, question: "Paul instructed that any Christian that is idle and lazy should be:", options: ["Ostracised", "Disqualified from being a member", "Given a job", "Stoned to death"], answer: "A" },
                { id: 3, question: "Obadiah, who was in charge of Ahab's household:", options: ["Hid a hundred prophets from Jezebel's wrath", "Was in charge of the worship of Baal", "Was eventually killed by Jezebel", "Confronted Ahab when he slew prophets"], answer: "D" },
                { id: 4, question: "In Paul's 2nd epistle to the Thessalonians, what did he deem fit to thank God on their behalf?", options: ["Their salvation, growing faith, brotherly love and effective prayer life", "Their salvation", "Their salvation and growing faith", "Their salvation, growing faith and brotherly love"], answer: "A" },
                { id: 5, question: "David submitted to the will of God when God killed the child he had with Bathsheba by:", options: ["Weeping profusely", "Having another child", "Ending his fast", "Thanking God"], answer: "D" },
                { id: 6, question: "'But my God shall supply all your need according to his riches in glory by Christ Jesus.' This was made by Paul to the:", options: ["Colossians", "Philippians", "Ephesians", "Galatians"], answer: "C" },
                { id: 7, question: "Paul and Silas were sent on a mission by the:", options: ["Disciples", "Church in Antioch", "Church in Lystra", "Church in Jerusalem"], answer: "A" },
                { id: 8, question: "In Paul's letter to Philemon, he stated that forgiveness should be:", options: ["Incessant", "Rewarded", "Willingly given", "Compulsory"], answer: "B" },
                { id: 9, question: "Before the death of Jesus, he promised to give us another:", options: ["Disciple", "Comforter", "Saviour", "Christ"], answer: "B" },
                { id: 10, question: "According to Romans, those that commit the act of homosexuality are worthy of:", options: ["Childlessness", "Death", "Eternal condemnation", "Being ostracised from the body of Christ"], answer: "B" },
                { id: 11, question: "The first martyr of Christ died:", options: ["On the cross", "By drowning", "By severing of the head", "Through stoning"], answer: "A" },
                { id: 12, question: "The transfiguration took place on a high mountain in the presence of the following, EXCLUDING:", options: ["James", "Peter", "Andrew", "John"], answer: "B" },
                { id: 13, question: "When Herod sought Jesus to kill him, his father hid him in:", options: ["Haran", "Egypt", "Canaan", "Lebanon"], answer: "D" },
                { id: 14, question: "Who was King Ahasuerus' chamberlain who kept his concubines?", options: ["Shaashgaz", "Regain", "Hatach", "Hege"], answer: "B" },
                { id: 15, question: "Paul told believers that the coming of the Lord will be accompanied by:", options: ["Thunder and lightning", "An earthquake", "A shout", "A host of angels"], answer: "C" },
                { id: 16, question: "'Seeing that you reject it, behold we turn to the Gentiles.' The circumstance surrounding this statement by Paul and Barnabas was:", options: ["The Sadducees antagonised the teaching of resurrection", "The Jews contradicted the gospel, trying to mislead others", "The Jews disbelieved the gospel", "The Jews rejected the Holy Spirit"], answer: "A" },
                { id: 17, question: "According to James, effective prayer is that which is offered:", options: ["According to the schedule", "In faith", "Loudly", "In the temple"], answer: "C" },
                { id: 18, question: "The consequence of Hiel's building of Jericho was that he:", options: ["Was made a commander in Ahab's army", "Was highly respected by his tribe", "Lost 2 of his sons", "Was killed by Ahab"], answer: "D" },
                { id: 19, question: "Jesus coming to the world in the form of a human showed his:", options: ["Impartiality", "Humility", "Obedience", "Responsibility"], answer: "A" },
                { id: 20, question: "In the Sermon on the Mount, Jesus said those who make peace should rejoice because:", options: ["The kingdom of God is theirs", "They will see God", "They will inherit the earth", "They will be called God's children"], answer: "D" }
            ]
        }
    },

    // ========================
    // COMMERCIAL SUBJECTS
    // ========================
    commercial: {
        maths: sharedMaths,
        english: sharedEnglish,

        economics: {
            name: "Economics",
            questions: [
                { id: 1, question: "The central problem of economics is:", options: ["Inflation", "Scarcity", "Taxation", "Population"], answer: "B" },
                { id: 2, question: "Which of the following is NOT a factor of production?", options: ["Land", "Labour", "Capital", "Market"], answer: "D" },
                { id: 3, question: "The reward for capital is:", options: ["Rent", "Wage", "Interest", "Profit"], answer: "C" },
                { id: 4, question: "Opportunity cost is best defined as:", options: ["Total money spent", "Cost of the best alternative forgone", "Cost of labour", "Market price"], answer: "B" },
                { id: 5, question: "A rightward shift in the demand curve may be caused by:", options: ["Fall in income", "Increase in income", "Increase in price", "Decrease in population"], answer: "B" },
                { id: 6, question: "If supply is greater than demand, there will be:", options: ["Shortage", "Surplus", "Equilibrium", "Inflation"], answer: "B" },
                { id: 7, question: "Price elasticity of demand measures:", options: ["Responsiveness of supply to price", "Responsiveness of demand to price", "Change in income", "Change in cost"], answer: "B" },
                { id: 8, question: "A firm operating under perfect competition is a:", options: ["Price maker", "Price taker", "Monopoly", "Cartel"], answer: "B" },
                { id: 9, question: "Which of the following is an indirect tax?", options: ["Income tax", "Company tax", "VAT", "Personal tax"], answer: "C" },
                { id: 10, question: "When total revenue equals total cost, the firm is said to be at:", options: ["Profit", "Loss", "Break-even", "Shutdown"], answer: "C" },
                { id: 11, question: "The body responsible for issuing currency in Nigeria is:", options: ["Federal Ministry of Finance", "Commercial Banks", "Central Bank of Nigeria", "World Bank"], answer: "C" },
                { id: 12, question: "Balance of payments records:", options: ["Only exports", "Only imports", "All economic transactions between a country and others", "Government revenue"], answer: "C" },
                { id: 13, question: "GDP measures:", options: ["Income of citizens only", "Total value of goods and services produced within a country", "Government expenditure", "Export earnings"], answer: "B" },
                { id: 14, question: "A decrease in general price level is known as:", options: ["Inflation", "Deflation", "Stagflation", "Reflation"], answer: "B" },
                { id: 15, question: "Which market structure has many buyers and many sellers?", options: ["Monopoly", "Oligopoly", "Perfect competition", "Duopoly"], answer: "C" },
                { id: 16, question: "The demand curve slopes downward because of:", options: ["Law of supply", "Law of diminishing returns", "Law of demand", "Law of utility"], answer: "C" },
                { id: 17, question: "If the price of rice increases from ₦400 to ₦500 and quantity demanded falls from 100kg to 80kg, demand is:", options: ["Perfectly elastic", "Elastic", "Inelastic", "Unit elastic"], answer: "C" },
                { id: 18, question: "Government budget deficit occurs when:", options: ["Revenue > Expenditure", "Expenditure > Revenue", "Revenue = Expenditure", "Tax increases"], answer: "B" },
                { id: 19, question: "Which of the following is a function of money?", options: ["Store of value", "Control of population", "Price regulation", "Production"], answer: "A" },
                { id: 20, question: "Structural unemployment is caused by:", options: ["Seasonal changes", "Lack of relevant skills", "Retirement", "Illness"], answer: "B" }
            ]
        },

        commerce: {
            name: "Commerce",
            questions: [
                { id: 1, question: "The production activity that turns processed raw materials into consumer and industrial goods is described as:", options: ["Extractive", "Manufacturing", "Constructive", "Processing"], answer: "B" },
                { id: 2, question: "Buying and selling of goods and services is the factor that led to the development of:", options: ["Technology", "Commerce", "Accounting", "Banking"], answer: "B" },
                { id: 3, question: "The factor of production that is subject to depreciation is:", options: ["Capital", "Land", "Labor", "Entrepreneur"], answer: "A" },
                { id: 4, question: "One of the following defines commerce:", options: ["Man's production, distribution and consumption of goods and services", "Man's utilization of the resources in his physical environment", "Conversion of raw materials into finished goods", "Man's buying, selling and distributing activities"], answer: "D" },
                { id: 5, question: "Which of the following provides indirect service?", options: ["Civil servants", "Family doctors", "Household servants", "Entertainers"], answer: "A" },
                { id: 6, question: "Which of the following is NOT an aid to trade?", options: ["Tourism", "Banking", "Fund", "Transportation"], answer: "C" },
                { id: 7, question: "Commerce is ___ and ___:", options: ["Trade and aids to trade", "Marketing and profit making", "Advertising and producing", "None of the above"], answer: "D" },
                { id: 8, question: "Extractive activities are classified as:", options: ["Primary production", "Technical production", "Manufacturing production", "None of the above"], answer: "A" },
                { id: 9, question: "Terms of trade is:", options: ["Trade agreement between two or more countries", "The rate at which export pays for import", "The period at which trade occurs", "The rate of exchange for foreign currencies"], answer: "B" },
                { id: 10, question: "Transportation, retailing, and wholesaling industries rely heavily on:", options: ["Banking", "Insurance", "Manufacturing", "Railway"], answer: "C" },
                { id: 11, question: "Warehousing is a productive function because it increases the:", options: ["Quantity of goods", "Utility of goods", "Quality of goods", "Price of goods"], answer: "B" },
                { id: 12, question: "Communication process involves the transmission of a message over a selected channel to the:", options: ["Encoder", "Receiver", "Audience", "Sender"], answer: "B" },
                { id: 13, question: "Which advertising medium appeals only to the literate in the society?", options: ["Radio advertising", "Cinema advertising", "Print advertising", "Television advertising"], answer: "C" },
                { id: 14, question: "The two main forms of communication are:", options: ["Oral and written", "Verbal and nonverbal", "Traditional and modern media", "Email and fax"], answer: "B" },
                { id: 15, question: "The slogan 'a wonderful world' used by a communication network is a form of:", options: ["Packaging", "Publicity", "Product differentiation", "Persuasive advertising"], answer: "D" },
                { id: 16, question: "The final link in the chain of distribution is:", options: ["Wholesaling", "Consumer", "Retailing", "Middleman"], answer: "B" },
                { id: 17, question: "A country's terms of trade are said to improve when the ratio of her exports:", options: ["Remains constant", "Increases", "Equals import", "Decreases"], answer: "B" },
                { id: 18, question: "Communication is relevant in business activities because it:", options: ["Creates wealth for people", "Reduces the cost and risk of traveling", "Connects people", "Enhances delivery of goods and services"], answer: "B" },
                { id: 19, question: "The most effective type of advertising for branded products is:", options: ["Mass advertising", "Persuasive advertising", "Informative advertising", "Competitive advertising"], answer: "C" }
            ]
        },

        accounting: {
            name: "Financial Accounting",
            questions: [
                // Q1 — STRUCTURAL
                { id: 1, type: "structural", question: "What is the fundamental accounting equation?", acceptableAnswers: ["assets = liabilities + equity", "assets = liabilities + owners equity", "a = l + e"] },
                // Q2 — MCQ
                { id: 2, question: "Which of the following is considered a liability?", options: ["Cash", "Accounts Receivable", "Accounts Payable", "Inventory"], answer: "C" },
                // Q3 — STRUCTURAL
                { id: 3, type: "structural", question: "What does the 'going concern' assumption imply?", acceptableAnswers: ["enterprise will continue in operation", "business will continue to operate", "the business continues to operate", "the company will continue operating"] },
                // Q4 — STRUCTURAL
                { id: 4, type: "structural", question: "If a company buys machinery with cash, what is the impact on the accounting equation?", acceptableAnswers: ["assets remain unchanged", "no change to total assets", "one asset increases another decreases", "assets unchanged"] },
                // Q5 — STRUCTURAL
                { id: 5, type: "structural", question: "Which financial statement reports a company's financial position at a specific point in time?", acceptableAnswers: ["balance sheet", "statement of financial position"] },
                // Q6 — MCQ
                { id: 6, question: "Halidu and Hamed are business partners. At year end, profit of ₦12,000 (including Halidu's salary of ₦3,000) was made. Hamed's share of the profit should be:", options: ["Credited to partners' capital account", "Credited to partners' current account", "Credited to appropriation account", "Debited to partners' drawing account"], answer: "B" },
                // Q7 — MCQ
                { id: 7, question: "If a trial balance totals do not agree, the difference is entered in:", options: ["The Profit and Loss Account", "A Nominal Account", "A Suspense Account", "The Capital Account"], answer: "C" },
                // Q8 — STRUCTURAL
                { id: 8, type: "structural", question: "What is the purpose of a journal entry?", acceptableAnswers: ["to record a business transaction in chronological order", "record transactions in chronological order", "to record business transactions chronologically"] },
                // Q9 — STRUCTURAL
                { id: 9, type: "structural", question: "Which accounting principle requires revenue to be recognised when earned, not when cash is received?", acceptableAnswers: ["revenue recognition principle", "accrual basis", "revenue recognition principle (accrual basis)", "accrual accounting"] },
                // Q10 — STRUCTURAL
                { id: 10, type: "structural", question: "What is the matching principle?", acceptableAnswers: ["expenses should be recognised in the same period as revenues", "match expenses to revenues in the same period", "expenses matched to the revenues they help generate", "expenses are matched to revenues"] },
                // Q11 — MCQ
                { id: 11, question: "Which of the following is an intangible asset?", options: ["Buildings", "Inventory", "Patent", "Cash"], answer: "C" },
                // Q12 — STRUCTURAL
                { id: 12, type: "structural", question: "The process of allocating the cost of a tangible asset over its useful life is called:", acceptableAnswers: ["depreciation"] },
                // Q13 — STRUCTURAL
                { id: 13, type: "structural", question: "What is the key difference between a current and a non-current liability?", acceptableAnswers: ["current liabilities are due within one year", "current due within one year non-current beyond one year", "current liabilities due within 12 months"] },
                // Q14 — STRUCTURAL
                { id: 14, type: "structural", question: "What is unearned revenue?", acceptableAnswers: ["money received for services not yet performed", "a liability for services not yet rendered", "cash received before service is delivered", "revenue received but not yet earned"] },
                // Q15 — STRUCTURAL
                { id: 15, type: "structural", question: "What is the formula for calculating Net Income?", acceptableAnswers: ["revenue - expenses", "revenues - expenses", "revenue minus expenses", "total revenue minus total expenses"] },
                // Q16 — MCQ
                { id: 16, question: "Which inventory valuation method assumes the oldest items are sold first?", options: ["LIFO", "FIFO", "Weighted Average", "Specific Identification"], answer: "B" },
                // Q17 — MCQ
                { id: 17, question: "A machine purchased for ₦56,000 has a lifespan of 5 years and residual value of ₦1,000. Calculate yearly depreciation using the straight-line method.", options: ["₦11,200", "₦11,000", "₦10,000", "₦9,000"], answer: "B" },
                // Q18 — STRUCTURAL
                { id: 18, type: "structural", question: "If inventory is sold for more than its cost, what happens to gross profit?", acceptableAnswers: ["it increases", "increases", "gross profit increases"] },
                // Q19 — STRUCTURAL
                { id: 19, type: "structural", question: "What is the formula for Cost of Goods Sold (COGS)?", acceptableAnswers: ["opening inventory + purchases - closing inventory", "beginning inventory + purchases - ending inventory", "opening stock + purchases - closing stock"] },
                // Q20 — STRUCTURAL
                { id: 20, type: "structural", question: "When using the Allowance Method, what happens when an account is written off?", acceptableAnswers: ["allowance for doubtful accounts is debited and accounts receivable is credited", "debit allowance for doubtful accounts credit accounts receivable", "dr allowance for doubtful accounts cr accounts receivable"] }
            ]
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getAllQuestions(category) {
    const subjects = questionsData[category];
    let allQuestions = [];
    for (const subjectKey in subjects) {
        const subject = subjects[subjectKey];
        subject.questions.forEach((q) => {
            allQuestions.push({
                ...q,
                subject: subjectKey,
                subjectName: subject.name,
                globalIndex: allQuestions.length
            });
        });
    }
    return allQuestions;
}

function getSubjectNames(category) {
    const subjects = questionsData[category];
    const names = {};
    for (const subjectKey in subjects) {
        names[subjectKey] = subjects[subjectKey].name;
    }
    return names;
}

function getTotalQuestions(category) {
    const subjects = questionsData[category];
    let total = 0;
    for (const subjectKey in subjects) {
        total += subjects[subjectKey].questions.length;
    }
    return total;
}
