// Study With Prof Dudu - Questions Database
// All questions organized by subject with correct answers

const questionsData = {
    // ========================
    // SCIENCE SUBJECTS
    // ========================

    science: {
        maths: {
            name: "Mathematics",
            questions: [
                {
                    id: 1,
                    question: "Which of the following numbers is a surd?",
                    options: ["√16", "√20", "√9", "√25"],
                    answer: "B"
                },
                {
                    id: 2,
                    question: "Simplify: √50",
                    options: ["2√5", "5√2", "10√5", "√25"],
                    answer: "B"
                },
                {
                    id: 3,
                    question: "The product of √3 and √12 is:",
                    options: ["√15", "3√4", "6", "6√2"],
                    answer: "C"
                },
                {
                    id: 4,
                    question: "Which of the following pairs are like surds?",
                    options: ["√3 and √5", "2√7 and 5√7", "3√2 and 3√3", "√2 and √8"],
                    answer: "B"
                },
                {
                    id: 5,
                    question: "Simplify: √18 + 2√8",
                    options: ["3√2 + 4√2", "5√2", "7√2", "2√3"],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "If a = 2 + √5, the conjugate of a is:",
                    options: ["2 + √5", "2 − √5", "−2 + √5", "2√5"],
                    answer: "B"
                },
                {
                    id: 7,
                    question: "Simplify: √(27/3)",
                    options: ["√9", "3√3", "3", "√3"],
                    answer: "C"
                },
                {
                    id: 8,
                    question: "Multiply: (2√5)(3√2)",
                    options: ["5√10", "6√10", "6√5", "10√2"],
                    answer: "B"
                },
                {
                    id: 9,
                    question: "Rationalize: 4 / √2",
                    options: ["2√2", "4√2", "√2 / 4", "2 / √2"],
                    answer: "A"
                },
                {
                    id: 10,
                    question: "Rationalize: 1 / (√3 + √2)",
                    options: ["(√3 - √2)", "(√3 - √2) / (3 - 2)", "1 / (√3 - √2)", "√3 + √2"],
                    answer: "A"
                }
            ]
        },

        english: {
            name: "English",
            questions: [
                {
                    id: 1,
                    question: "Which of the following is a complete sentence?",
                    options: ["Because he was late", "Running very fast", "When the bell rang", "He ran to the class"],
                    answer: "D"
                },
                {
                    id: 2,
                    question: "Which sentence type asks a question?",
                    options: ["Close the door.", "The weather is cold.", "How did you solve the problem?", "What a beautiful dress!"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "Which of the following words is a verb?",
                    options: ["Happiness", "Quickly", "Run", "Beautiful"],
                    answer: "C"
                },
                {
                    id: 4,
                    question: "In the sentence \"The children are playing outside,\" what part of speech is outside?",
                    options: ["Verb", "Adjective", "Adverb", "Noun"],
                    answer: "C"
                },
                {
                    id: 5,
                    question: "Choose the sentence with correct subject–verb agreement.",
                    options: ["The boys was happy.", "The boy were happy.", "The boys are happy.", "The boy are happy."],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "Which sentence is in the simple past tense?",
                    options: ["She is eating rice.", "She eats rice.", "She will eat rice.", "She ate rice."],
                    answer: "D"
                },
                {
                    id: 7,
                    question: "Choose the correct indirect speech for: He said, \"I am tired.\"",
                    options: ["He said that I am tired.", "He said that he was tired.", "He said he is tired.", "He says that he was tired."],
                    answer: "B"
                },
                {
                    id: 8,
                    question: "Which sentence is in the passive voice?",
                    options: ["The teacher punished the boy.", "The boy punished the teacher.", "The boy was punished by the teacher.", "The boy is punishing the teacher."],
                    answer: "C"
                },
                {
                    id: 9,
                    question: "Identify the phrase in the sentence: She sat under the tree.",
                    options: ["She", "Sat", "Under the tree", "She sat"],
                    answer: "C"
                },
                {
                    id: 10,
                    question: "Choose the sentence with correct tense sequence.",
                    options: ["He said he will come yesterday.", "He said he comes yesterday.", "He said he had come yesterday.", "He says he came tomorrow."],
                    answer: "C"
                }
            ]
        },

        physics: {
            name: "Physics",
            questions: [
                {
                    id: 1,
                    question: "The force acting on a body is 100N, calculate the mass of the body (g=10m/s²)",
                    options: ["0.1 kg", "10 g", "10 kg", "0.001kg"],
                    answer: "C"
                },
                {
                    id: 2,
                    question: "Which of the following is the dimension for pressure?",
                    options: ["MLT", "MLT⁻²", "ML⁻¹T⁻²", "ML⁻²T²"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "The dimension for work and energy is:",
                    options: ["ML²T⁻³", "MLT⁻¹", "ML²T⁻²", "ML⁻³"],
                    answer: "C"
                },
                {
                    id: 4,
                    question: "The dimension for power is:",
                    options: ["ML²T⁻³", "ML⁴T⁻¹", "MLT⁻²", "MLT⁻³"],
                    answer: "A"
                },
                {
                    id: 5,
                    question: "A quantity which requires magnitude and direction to be specified is:",
                    options: ["Distance", "Mass", "Displacement", "Temperature"],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "I. Electric potential II. Torque III. Kinetic energy IV. Momentum. Which of the following are vectors?",
                    options: ["I and II", "I and III", "II and III", "II and IV"],
                    answer: "D"
                },
                {
                    id: 7,
                    question: "The pair of scalar quantities are:",
                    options: ["Volume and thrust", "Thrust and weight", "Mass and luminous intensity", "A and C"],
                    answer: "C"
                },
                {
                    id: 8,
                    question: "Which of the following is not a vector quantity?",
                    options: ["Altitude", "Weight", "Displacement", "Acceleration"],
                    answer: "A"
                },
                {
                    id: 9,
                    question: "A ball is thrown vertically into the air with an initial velocity. What's the greatest height reached?",
                    options: ["U/2g", "3U²/2g", "U²/g", "U²/2g"],
                    answer: "D"
                },
                {
                    id: 10,
                    question: "\"A body will continue to be in state of rest or uniform motion until an external force is applied\" - this represents which law?",
                    options: ["Newton's law of energy", "Conservation of motion", "Newton's first law of motion", "Amonton's law"],
                    answer: "C"
                }
            ]
        },

        biology: {
            name: "Biology",
            questions: [
                {
                    id: 1,
                    question: "What is the term for the passing of traits from parents to offspring?",
                    options: ["Mutation", "Variation", "Heredity", "Evolution"],
                    answer: "C"
                },
                {
                    id: 2,
                    question: "Which of the following is an example of a producer in an ecosystem?",
                    options: ["Fungus", "Bacteria", "Green plant", "Animal"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "What type of relationship is exhibited by remora fish and sharks?",
                    options: ["Commensalism", "Mutualism", "Parasitism", "Predation"],
                    answer: "A"
                },
                {
                    id: 4,
                    question: "Which of the following is a characteristic of a functioning ecosystem?",
                    options: ["Lack of producers", "Presence of only one species", "Balance between biotic and abiotic factors", "Absence of decomposers"],
                    answer: "C"
                },
                {
                    id: 5,
                    question: "What is the term for the relationship between two organisms living together for mutual benefit?",
                    options: ["Symbiosis", "Commensalism", "Parasitism", "Predation"],
                    answer: "A"
                },
                {
                    id: 6,
                    question: "Which of the following is an example of predation?",
                    options: ["Lion and zebra", "Clover and nitrogen-fixing bacteria", "Tapeworm and human", "Orchid and tree"],
                    answer: "A"
                },
                {
                    id: 7,
                    question: "What is the main source of genetic variation in a population?",
                    options: ["Mutation", "Gene flow", "Genetic drift", "Meiosis"],
                    answer: "A"
                },
                {
                    id: 8,
                    question: "Which of the following is an abiotic factor in an ecosystem?",
                    options: ["Temperature", "Plant", "Animal", "Bacteria"],
                    answer: "A"
                },
                {
                    id: 9,
                    question: "What type of relationship is exhibited by lichens growing on rocks?",
                    options: ["Commensalism", "Mutualism", "Parasitism", "Symbiosis"],
                    answer: "B"
                },
                {
                    id: 10,
                    question: "What is the term for the process by which organisms adapt to their environment?",
                    options: ["Evolution", "Mutation", "Variation", "Selection"],
                    answer: "A"
                }
            ]
        },

        chemistry: {
            name: "Chemistry",
            questions: [
                {
                    id: 1,
                    question: "Who discovered Electron?",
                    options: ["Eugene Goldstein", "G.J Stoney", "Rutherford", "J J Thompson"],
                    answer: "D"
                },
                {
                    id: 2,
                    question: "Who discovered the cathode ray tube?",
                    options: ["James Chadwick", "Lord Rutherford", "J J Thompson", "Avogadro"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "Who discovered Neutrons?",
                    options: ["John Dalton", "Sir Lavoisier", "Mendeleev", "James Chadwick"],
                    answer: "D"
                },
                {
                    id: 4,
                    question: "Can gas conduct electricity?",
                    options: ["Yes", "No", "B and C", "Not sure"],
                    answer: "A"
                },
                {
                    id: 5,
                    question: "_________ is the purest form of water",
                    options: ["Rain water", "Lake water", "Distilled water", "Spring water"],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "Which of the following can sublime?",
                    options: ["NaCl", "SO₂", "NH₄Cl", "Fe₂O₃"],
                    answer: "C"
                },
                {
                    id: 7,
                    question: "Which of the following can be used to represent the atomic mass?",
                    options: ["Z", "Y", "A", "O"],
                    answer: "C"
                },
                {
                    id: 8,
                    question: "The following are compounds except:",
                    options: ["Blood", "Lactose", "Water", "Slaked lime"],
                    answer: "A"
                },
                {
                    id: 9,
                    question: "The presence of impurities in a solid will make its melting point to:",
                    options: ["Increase", "Increase and subsequently decrease", "Decrease and increase", "Decrease"],
                    answer: "D"
                },
                {
                    id: 10,
                    question: "The addition of water to slaked lime (CaO) leads to:",
                    options: ["Physical change", "Chemical change", "Mixture formation", "Endothermic change"],
                    answer: "B"
                }
            ]
        }
    },

    // ========================
    // ARTS SUBJECTS
    // ========================

    arts: {
        english: {
            name: "English",
            questions: [
                {
                    id: 1,
                    question: "Which of the following is a complete sentence?",
                    options: ["Because he was late", "Running very fast", "When the bell rang", "He ran to the class"],
                    answer: "D"
                },
                {
                    id: 2,
                    question: "Which sentence type asks a question?",
                    options: ["Close the door.", "The weather is cold.", "How did you solve the problem?", "What a beautiful dress!"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "Which of the following words is a verb?",
                    options: ["Happiness", "Quickly", "Run", "Beautiful"],
                    answer: "C"
                },
                {
                    id: 4,
                    question: "In the sentence \"The children are playing outside,\" what part of speech is outside?",
                    options: ["Verb", "Adjective", "Adverb", "Noun"],
                    answer: "C"
                },
                {
                    id: 5,
                    question: "Choose the sentence with correct subject–verb agreement.",
                    options: ["The boys was happy.", "The boy were happy.", "The boys are happy.", "The boy are happy."],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "Which sentence is in the simple past tense?",
                    options: ["She is eating rice.", "She eats rice.", "She will eat rice.", "She ate rice."],
                    answer: "D"
                },
                {
                    id: 7,
                    question: "Choose the correct indirect speech for: He said, \"I am tired.\"",
                    options: ["He said that I am tired.", "He said that he was tired.", "He said he is tired.", "He says that he was tired."],
                    answer: "B"
                },
                {
                    id: 8,
                    question: "Which sentence is in the passive voice?",
                    options: ["The teacher punished the boy.", "The boy punished the teacher.", "The boy was punished by the teacher.", "The boy is punishing the teacher."],
                    answer: "C"
                },
                {
                    id: 9,
                    question: "Identify the phrase in the sentence: She sat under the tree.",
                    options: ["She", "Sat", "Under the tree", "She sat"],
                    answer: "C"
                },
                {
                    id: 10,
                    question: "Choose the sentence with correct tense sequence.",
                    options: ["He said he will come yesterday.", "He said he comes yesterday.", "He said he had come yesterday.", "He says he came tomorrow."],
                    answer: "C"
                }
            ]
        },

        literature: {
            name: "Literature",
            questions: [
                {
                    id: 1,
                    question: "Which of the following best distinguishes drama from prose and poetry?",
                    options: ["Use of figurative language", "Emphasis on narrative structure", "Performance-based nature with dialogue", "Presence of a central theme"],
                    answer: "C"
                },
                {
                    id: 2,
                    question: "In poetry, the term \"enjambment\" refers to:",
                    options: ["A pause at the end of a line", "The rhyme scheme of a stanza", "The continuation of a sentence without a pause beyond the end of a line", "A dramatic monologue"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "Which of the following is NOT a key characteristic of prose fiction?",
                    options: ["Stage directions", "Character development", "Narrative voice", "Plot structure"],
                    answer: "A"
                },
                {
                    id: 4,
                    question: "A tragedy in drama is best defined as:",
                    options: ["A play where all characters die", "A play that ends in confusion", "A play that portrays human suffering leading to catharsis", "A play that uses poetic dialogue"],
                    answer: "C"
                },
                {
                    id: 5,
                    question: "Which of the following is MOST likely to be found in a poem but NOT in a prose narrative?",
                    options: ["Symbolism", "Meter and rhythm", "Character conflict", "Flashback"],
                    answer: "B"
                },
                {
                    id: 6,
                    question: "What literary term describes a character in drama who contrasts sharply with the protagonist to highlight qualities of the main character?",
                    options: ["Antagonist", "Foil", "Flat character", "Static character"],
                    answer: "B"
                },
                {
                    id: 7,
                    question: "A first-person unreliable narrator is most commonly found in which genre?",
                    options: ["Epic Poetry", "Tragic Drama", "Prose Fiction", "Lyrical Poetry"],
                    answer: "C"
                },
                {
                    id: 8,
                    question: "The term \"soliloquy\" is used in drama to describe:",
                    options: ["A speech delivered to another character", "A speech delivered in poetry form", "A speech made alone on stage revealing inner thoughts", "A long dialogue between two characters"],
                    answer: "C"
                },
                {
                    id: 9,
                    question: "Which of the following best differentiates a lyric poem from a narrative poem?",
                    options: ["Use of dialogue", "Presence of characters", "Focus on emotional expression", "Absence of rhyme"],
                    answer: "C"
                },
                {
                    id: 10,
                    question: "What distinguishes modern drama from classical drama?",
                    options: ["Absence of tragic flaws", "Focus on gods and fate", "Emphasis on internal conflict and realism", "Use of verse form only"],
                    answer: "C"
                }
            ]
        },

        government: {
            name: "Government",
            questions: [
                {
                    id: 1,
                    question: "The ________ and ________ is buried with the King in the Yoruba precolonial administration",
                    options: ["Abobaku & Aremo", "Abobaku & Eso", "Abobaku & Bashorun", "Abobaku & Iyalode"],
                    answer: "A"
                },
                {
                    id: 2,
                    question: "The Alaafin has supreme power in ________ but not in ________",
                    options: ["practice, Theory", "Practice, Objective", "Theory, Practice", "Government, Practice"],
                    answer: "C"
                },
                {
                    id: 3,
                    question: "The ________ is the head of British administration system",
                    options: ["Secretary of state", "Queen", "Governor General", "Alaafin"],
                    answer: "B"
                },
                {
                    id: 4,
                    question: "Trust territory were formerly colonized by the defeated country of ________",
                    options: ["Germany", "Britain", "Italy", "Portugal"],
                    answer: "A"
                },
                {
                    id: 5,
                    question: "Which of the following is a crown colony?",
                    options: ["Port Harcourt", "Oyo", "Kano", "Lagos"],
                    answer: "D"
                },
                {
                    id: 6,
                    question: "The ultimate aim of political party is to:",
                    options: ["Formulate and implement policies", "Implement people-oriented programs", "Acquire and exercise power", "Increase the political awareness of the electorate"],
                    answer: "C"
                },
                {
                    id: 7,
                    question: "Elective principles was first introduced in Nigeria by the:",
                    options: ["Richard's", "Macpherson's", "Lyttleton's", "Clifford's"],
                    answer: "D"
                },
                {
                    id: 8,
                    question: "Which of the following is not a consideration in the formation of a federal system?",
                    options: ["Cultural diversity", "Size of the territory", "Population size", "The number of the wealthy leaders"],
                    answer: "D"
                },
                {
                    id: 9,
                    question: "Citizenship of the country may be acquired through:",
                    options: ["Nationalization", "Obedience to the law of a country", "Naturalization", "Nomination"],
                    answer: "C"
                },
                {
                    id: 10,
                    question: "The Nigeria Council was created by:",
                    options: ["Hugh Clifford", "Arthur Richard's", "Fredrick Lugard", "Graeme Thompson"],
                    answer: "C"
                }
            ]
        },

        crs: {
            name: "CRS (Christian Religious Studies)",
            questions: [
                {
                    id: 1,
                    question: "Love is NOT which of the following?",
                    options: ["Patient", "Kind", "Arrogant", "Hope"],
                    answer: "C"
                },
                {
                    id: 2,
                    question: "Love is which of the following?",
                    options: ["Rude", "Jealous", "Resentful", "Kind"],
                    answer: "D"
                },
                {
                    id: 3,
                    question: "Paul's teaching on the supremacy of love was written to the ________",
                    options: ["Galatians", "Corinthians", "Ephesians", "Colossians"],
                    answer: "B"
                },
                {
                    id: 4,
                    question: "According to John's message on love, God made manifest his love for us by:",
                    options: ["By sending us the Holy Spirit", "By instigating marriage", "By sending Jesus into the world", "By creating man"],
                    answer: "C"
                },
                {
                    id: 5,
                    question: "Faith without ________ is nothing",
                    options: ["Patient", "Kindness", "Love", "Hope"],
                    answer: "C"
                },
                {
                    id: 6,
                    question: "Paul in his teaching on humility used ________ as an example calling him an epitome of humility",
                    options: ["David", "Jesus", "Abraham", "Elijah"],
                    answer: "B"
                },
                {
                    id: 7,
                    question: "Philemon's runaway servant name is ________",
                    options: ["Barabas", "Timothy", "Onesimus", "Titus"],
                    answer: "C"
                },
                {
                    id: 8,
                    question: "According to the book of Galatians, ________ is NOT one of the fruit of the flesh",
                    options: ["Strife", "Enmity", "Peace", "Anger"],
                    answer: "C"
                },
                {
                    id: 9,
                    question: "Fruit of the spirit as explained by Paul can be found in the book of:",
                    options: ["James", "Ephesians", "Galatians", "John"],
                    answer: "C"
                },
                {
                    id: 10,
                    question: "Fruit of the spirit are ________ in number",
                    options: ["Four", "Eight", "Nine", "Seven"],
                    answer: "C"
                }
            ]
        }
    }
};

// Helper function to get all questions for a category
function getAllQuestions(category) {
    const subjects = questionsData[category];
    let allQuestions = [];

    for (const subjectKey in subjects) {
        const subject = subjects[subjectKey];
        subject.questions.forEach((q, index) => {
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

// Helper function to get subject names
function getSubjectNames(category) {
    const subjects = questionsData[category];
    const names = {};

    for (const subjectKey in subjects) {
        names[subjectKey] = subjects[subjectKey].name;
    }

    return names;
}

// Get total question count for a category
function getTotalQuestions(category) {
    const subjects = questionsData[category];
    let total = 0;

    for (const subjectKey in subjects) {
        total += subjects[subjectKey].questions.length;
    }

    return total;
}
