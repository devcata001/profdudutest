// Study With Prof Dudu - Questions Database
// Updated April 2026 - All questions organized by subject with correct answers

// ============================================================
// SHARED QUESTION BANKS (Maths & English — compulsory for all)
// ============================================================

const sharedMaths = {
    name: "Mathematics",
    questions: [
        { id: 1, question: "If 3x - 5 = 16, find x.", options: ["5", "6", "7", "8"], answer: "C" },
        { id: 2, question: "Solve: 2x² - 7x - 4 = 0", options: ["4, -½", "2, -1", "½, -4", "1, -2"], answer: "A" },
        { id: 3, question: "If log₁₀ x = 2.3010, find x.", options: ["100", "200", "150", "300"], answer: "B" },
        { id: 4, question: "Find x if 2^(x+1) = 16", options: ["2", "3", "4", "5"], answer: "B" },
        { id: 5, question: "Solve simultaneously: 2x + y = 7 and x - y = 1", options: ["x=2, y=3", "x=3, y=1", "x=2, y=1", "x=3, y=2"], answer: "A" },
        { id: 6, question: "Find the sum of first 20 terms of AP: 2, 5, 8, …", options: ["610", "620", "640", "660"], answer: "A" },
        { id: 7, question: "If sinθ = 3/5, find cosθ", options: ["4/5", "5/4", "3/4", "1/5"], answer: "A" },
        { id: 8, question: "Evaluate: 3/4 + 5/6", options: ["19/12", "17/12", "11/12", "13/12"], answer: "A" },
        { id: 9, question: "Find the derivative of y = 3x² + 5x - 2", options: ["6x + 5", "3x + 5", "6x", "5x"], answer: "A" },
        { id: 10, question: "Evaluate: 7!", options: ["5040", "720", "840", "120"], answer: "A" },
        { id: 11, question: "Find the mean of 2, 4, 6, 8, 10", options: ["5", "6", "7", "8"], answer: "A" },
        { id: 12, question: "Solve: x² - 9 = 0", options: ["±2", "±3", "±4", "±5"], answer: "B" },
        { id: 13, question: "Find distance between (2,3) and (6,7)", options: ["4√2", "8", "2√2", "6"], answer: "A" },
        { id: 14, question: "If A = {1,2,3}, B = {2,3,4}, find A ∩ B", options: ["{1,2}", "{2,3}", "{3,4}", "{1,4}"], answer: "B" },
        { id: 15, question: "Evaluate: √144 + √25", options: ["13", "17", "19", "21"], answer: "B" },
        { id: 16, question: "If 5x = 125, find x", options: ["2", "3", "4", "5"], answer: "B" },
        { id: 17, question: "Find the median of 3, 5, 7, 9, 11", options: ["5", "6", "7", "8"], answer: "C" },
        { id: 18, question: "Solve: x/3 + 2 = 5", options: ["6", "7", "8", "9"], answer: "D" },
        { id: 19, question: "Find area of triangle (base=10cm, height=6cm)", options: ["30cm²", "40cm²", "60cm²", "20cm²"], answer: "A" },
        { id: 20, question: "If tanθ = 1, find θ", options: ["30°", "45°", "60°", "90°"], answer: "B" },
        { id: 21, question: "Convert 0.75 to percentage", options: ["7.5%", "75%", "0.75%", "750%"], answer: "B" },
        { id: 22, question: "Evaluate: 2³ × 2⁴", options: ["64", "32", "128", "16"], answer: "A" },
        { id: 23, question: "Solve: logx + log2 = log16", options: ["6", "8", "10", "14"], answer: "A" },
        { id: 24, question: "A car travels 60km in 2 hours. Find speed", options: ["20km/h", "25km/h", "30km/h", "35km/h"], answer: "C" },
        { id: 25, question: "Solve: x² + 4x + 4 = 0", options: ["-2", "2", "±2", "-4"], answer: "A" },
        { id: 26, question: "Find range of 2, 5, 7, 10, 15", options: ["10", "11", "12", "13"], answer: "D" },
        { id: 27, question: "Evaluate: 5! / 3!", options: ["10", "20", "30", "60"], answer: "B" },
        { id: 28, question: "Find circumference of circle (r = 7cm, π = 22/7)", options: ["44cm", "14cm", "21cm", "28cm"], answer: "A" },
        { id: 29, question: "Probability of getting head in a coin toss", options: ["0", "1", "1/2", "1/3"], answer: "C" },
        { id: 30, question: "Solve: 3x - 2 = x + 6", options: ["2", "3", "4", "5"], answer: "C" }
    ]
};

const sharedEnglish = {
    name: "English",
    questions: [
        { id: 1, question: "Choose the option nearest in meaning to ameliorate", options: ["Destroy", "Improve", "Complicate", "Postpone"], answer: "B" },
        { id: 2, question: "Choose the option opposite in meaning to transparent", options: ["Clear", "Obvious", "Opaque", "Bright"], answer: "C" },
        { id: 3, question: "The manager was accused of embezzlement. This implies;", options: ["Theft of money", "Borrowing funds", "Spending wisely", "Saving money"], answer: "A" },
        { id: 4, question: "Choose the correct option: He has great affection __ his children", options: ["on", "for", "at", "with"], answer: "B" },
        { id: 5, question: "Choose the option nearest in meaning to prudent", options: ["Careless", "Wise", "Slow", "Proud"], answer: "B" },
        { id: 6, question: "Choose the correct option: Neither the boy nor his friends __ present", options: ["was", "were", "is", "be"], answer: "B" },
        { id: 7, question: "Choose the opposite of hostile", options: ["Friendly", "Angry", "Violent", "Dangerous"], answer: "A" },
        { id: 8, question: "Choose the word nearest in meaning to meticulous", options: ["Careless", "Thorough", "Quick", "Dirty"], answer: "B" },
        { id: 9, question: "Choose the correct expression: She is married __ a doctor", options: ["with", "to", "by", "for"], answer: "B" },
        { id: 10, question: "Choose the option nearest in meaning to obsolete", options: ["Modern", "Outdated", "Expensive", "Useful"], answer: "B" },
        { id: 11, question: "Choose the correct option: He prevented me __ going", options: ["to", "from", "at", "in"], answer: "B" },
        { id: 12, question: "Choose the opposite of scarcity", options: ["Lack", "Plenty", "Poverty", "Need"], answer: "B" },
        { id: 13, question: "Choose the word nearest in meaning to diligent", options: ["Lazy", "Hardworking", "Careless", "Weak"], answer: "B" },
        { id: 14, question: "Choose the correct option: I look forward to __ from you", options: ["hear", "hearing", "heard", "hears"], answer: "B" },
        { id: 15, question: "Choose the nearest meaning of lucid", options: ["Confusing", "Clear", "Bright", "Loud"], answer: "B" },
        { id: 16, question: "Choose the correct option: No sooner had he arrived __ he fell asleep", options: ["when", "than", "that", "while"], answer: "B" },
        { id: 17, question: "Choose the opposite of expand", options: ["Grow", "Increase", "Contract", "Extend"], answer: "C" },
        { id: 18, question: "Choose the word nearest in meaning to fragile", options: ["Strong", "Breakable", "Heavy", "Big"], answer: "B" },
        { id: 19, question: "Choose the correct option: He is fond __ music", options: ["with", "of", "for", "at"], answer: "B" },
        { id: 20, question: "Choose the nearest meaning of notorious", options: ["Famous for good reasons", "Unknown", "Famous for bad reasons", "Popular"], answer: "C" },
        { id: 21, question: "THE LEKKI HEADMASTER: What was the common ritual at the morning assembly at Stardom on Tuesdays and Thursdays?", options: ["Christian and Muslim prayers", "Words of exaltation", "The second stanza of the national anthem", "The principal's address"], answer: "B" },
        { id: 22, question: "How much was the boarding house fee per session at Stardom before it was reduced?", options: ["₦163,000", "₦250,000", "₦160,000", "₦93,000"], answer: "B" },
        { id: 23, question: "Who instructed the Chemistry teacher to conclude the assembly after Mr Bepo burst into tears?", options: ["The principal", "The Managing Director", "The Vice Principal", "The school nurse"], answer: "C" },
        { id: 24, question: "Why did the Vice Principal contact the Managing Director after the crying incident?", options: ["To arrange an emergency meeting", "Because parents were calling with concerns", "To announce retirement", "To discuss fee reduction"], answer: "B" },
        { id: 25, question: "The principal was nicknamed 'The Lekki Headmaster' because he…", options: ["Lived in Lekki", "Imitated characters from Village Headmaster", "Changed the curriculum", "Founded the school"], answer: "B" },
        { id: 26, question: "The principal's entrance to the podium was unusual because he…", options: ["Smiled warmly", "Lacked his usual cheer", "Walked with vigor", "Spoke loudly"], answer: "B" },
        { id: 27, question: "The book The Lekki Headmaster was first published in…", options: ["Ghana, 2023", "Nigeria, 2023", "Kenya, 2023", "Nigeria, 2022"], answer: "B" },
        { id: 28, question: "Who is the author of The Lekki Headmaster?", options: ["Wole Soyinka", "Kabir Alabi Garba", "Chinua Achebe", "Akinwale Adebola"], answer: "B" },
        { id: 29, question: "The characters and events in the novel are best described as…", options: ["Completely historical", "Purely fictional", "A blend of imagination and experience", "Folklore-based"], answer: "C" },
        { id: 30, question: "What triggered the emotional breakdown of Mr Bepo during assembly?", options: ["Student misconduct", "Financial crisis discussion", "Personal/emotional burden", "Announcement of resignation"], answer: "C" }
    ]
};

const sharedEconomics = {
    name: "Economics",
    questions: [
        { id: 1, question: "The central problem of economics is mainly concerned with:", options: ["Inflation", "Scarcity", "Production", "Distribution"], answer: "B" },
        { id: 2, question: "A good is said to be scarce when it:", options: ["Is expensive", "Has alternative uses", "Is limited relative to demand", "Is produced in small quantity"], answer: "C" },
        { id: 3, question: "Which of the following best explains opportunity cost?", options: ["Total money spent", "Alternative forgone", "Fixed cost", "Cost of labour"], answer: "B" },
        { id: 4, question: "Which of the following is NOT a characteristic of human wants?", options: ["Unlimited", "Competitive", "Satiable", "Recurrent"], answer: "C" },
        { id: 5, question: "The demand curve is usually:", options: ["Upward sloping", "Downward sloping", "Vertical", "Horizontal"], answer: "B" },
        { id: 6, question: "A change in quantity demanded is caused by:", options: ["Income", "Taste", "Price of the good", "Population"], answer: "C" },
        { id: 7, question: "If the price of a complement rises, demand for the related good will:", options: ["Increase", "Decrease", "Remain constant", "Fluctuate"], answer: "B" },
        { id: 8, question: "The supply curve slopes upward because:", options: ["Producers want profit", "Higher prices encourage more supply", "Demand increases", "Costs decrease"], answer: "B" },
        { id: 9, question: "Equilibrium occurs when:", options: ["Demand exceeds supply", "Supply exceeds demand", "Demand equals supply", "Price is fixed"], answer: "C" },
        { id: 10, question: "Which of the following will cause a shift in supply?", options: ["Change in price", "Change in technology", "Change in quantity demanded", "Change in demand"], answer: "B" },
        { id: 11, question: "Total cost is the sum of:", options: ["Fixed cost only", "Variable cost only", "Fixed and variable costs", "Average and marginal costs"], answer: "C" },
        { id: 12, question: "Marginal cost is the:", options: ["Cost of last unit produced", "Total cost", "Fixed cost", "Average cost"], answer: "A" },
        { id: 13, question: "Which of the following is a feature of monopoly?", options: ["Many sellers", "Perfect knowledge", "Single seller", "Free entry"], answer: "C" },
        { id: 14, question: "In perfect competition, firms are:", options: ["Price makers", "Price takers", "Government controlled", "Profit controllers"], answer: "B" },
        { id: 15, question: "Utility is best described as:", options: ["Cost of goods", "Satisfaction derived", "Price level", "Demand level"], answer: "B" },
        { id: 16, question: "Money as a unit of account means it:", options: ["Stores value", "Measures value", "Exchanges goods", "Controls prices"], answer: "B" },
        { id: 17, question: "Which of the following is NOT a function of money?", options: ["Medium of exchange", "Store of value", "Factor of production", "Unit of account"], answer: "C" },
        { id: 18, question: "Credit creation is mainly done by:", options: ["Central Bank", "Commercial Banks", "Government", "Firms"], answer: "B" },
        { id: 19, question: "Open market operations are used by the Central Bank to:", options: ["Control population", "Control money supply", "Increase wages", "Produce goods"], answer: "B" },
        { id: 20, question: "Inflation leads to:", options: ["Increase in purchasing power", "Decrease in purchasing power", "Stable prices", "Increased savings"], answer: "B" },
        { id: 21, question: "Structural unemployment is caused by:", options: ["Seasonal changes", "Economic recession", "Changes in technology", "Laziness"], answer: "C" },
        { id: 22, question: "GDP at market price includes:", options: ["Only exports", "Only imports", "Total value of goods and services", "Government revenue only"], answer: "C" },
        { id: 23, question: "Which of the following is a direct tax?", options: ["VAT", "Customs duty", "Income tax", "Excise duty"], answer: "C" },
        { id: 24, question: "A regressive tax is one where:", options: ["Tax increases with income", "Tax decreases with income", "Same rate for all", "Only rich pay"], answer: "B" },
        { id: 25, question: "Balance of payments records:", options: ["Imports only", "Exports only", "All international transactions", "Government spending"], answer: "C" },
        { id: 26, question: "Devaluation of currency will:", options: ["Increase imports", "Reduce exports", "Encourage exports", "Stabilize prices"], answer: "C" },
        { id: 27, question: "Which of the following is a merit good?", options: ["Cigarettes", "Alcohol", "Education", "Gambling"], answer: "C" },
        { id: 28, question: "Economic development involves:", options: ["Increase in population", "Increase in output only", "Improvement in living standards", "Increase in imports"], answer: "C" },
        { id: 29, question: "The law of diminishing returns applies in the:", options: ["Short run", "Long run", "Market", "Economy"], answer: "A" },
        { id: 30, question: "Which of the following best explains elasticity of demand?", options: ["Change in supply", "Responsiveness of demand to price change", "Cost of production", "Market equilibrium"], answer: "B" }
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
                { id: 1, question: "A body starts from rest and accelerates uniformly at 2 m/s² for 5 s. What is its velocity?", options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"], answer: "C" },
                { id: 2, question: "The SI unit of impulse is:", options: ["N", "Ns", "Nm", "kgm/s²"], answer: "B" },
                { id: 3, question: "Which of the following is a scalar quantity?", options: ["Force", "Velocity", "Acceleration", "Speed"], answer: "D" },
                { id: 4, question: "A 10 Ω resistor carries 2 A current. The power dissipated is:", options: ["20 W", "40 W", "10 W", "5 W"], answer: "B" },
                { id: 5, question: "The principle of moments is based on:", options: ["Newton's first law", "Conservation of energy", "Rotational equilibrium", "Conservation of momentum"], answer: "C" },
                { id: 6, question: "A wave has frequency 50 Hz and wavelength 4 m. Speed is:", options: ["200 m/s", "54 m/s", "25 m/s", "100 m/s"], answer: "A" },
                { id: 7, question: "The unit of capacitance is:", options: ["Ohm", "Farad", "Coulomb", "Volt"], answer: "B" },
                { id: 8, question: "Which radiation is most penetrating?", options: ["Alpha", "Beta", "Gamma", "Neutron"], answer: "C" },
                { id: 9, question: "A transformer works on:", options: ["Joule law", "Faraday's law of electromagnetic induction", "Ohm's law", "Newton's law"], answer: "B" },
                { id: 10, question: "The slope of a velocity-time graph gives:", options: ["Displacement", "Acceleration", "Distance", "Momentum"], answer: "B" },
                { id: 11, question: "If work done is zero, then:", options: ["Force is zero", "Displacement is zero or perpendicular to force", "Velocity is zero", "Energy is lost"], answer: "B" },
                { id: 12, question: "The lens used in human eye is:", options: ["Concave", "Convex", "Plane", "Cylindrical"], answer: "B" },
                { id: 13, question: "The escape velocity from Earth depends on:", options: ["Mass only", "Radius and mass of Earth", "Time", "Temperature"], answer: "B" },
                { id: 14, question: "A body weighs more at:", options: ["Equator", "Pole", "Sea level only", "Space"], answer: "B" },
                { id: 15, question: "Which is not a fundamental quantity?", options: ["Length", "Mass", "Time", "Force"], answer: "D" },
                { id: 16, question: "Ohm's law states:", options: ["V = IR", "P = IV", "F = ma", "E = mc²"], answer: "A" },
                { id: 17, question: "The acceleration due to gravity decreases with:", options: ["Height above Earth surface", "Mass of object", "Speed", "Temperature"], answer: "A" },
                { id: 18, question: "A boy of mass 50 kg climbs 10 m. Work done is (g = 10):", options: ["500 J", "1000 J", "5000 J", "50 J"], answer: "C" },
                { id: 19, question: "The SI unit of pressure is:", options: ["Pascal", "Newton", "Joule", "Watt"], answer: "A" },
                { id: 20, question: "Sound cannot travel through:", options: ["Solid", "Liquid", "Gas", "Vacuum"], answer: "D" },
                { id: 21, question: "A car accelerates from 20 m/s to 30 m/s in 5 s. Acceleration:", options: ["2 m/s²", "3 m/s²", "1 m/s²", "2 m/s²"], answer: "A" },
                { id: 22, question: "The energy possessed by a body due to motion is:", options: ["Potential energy", "Kinetic energy", "Heat energy", "Nuclear energy"], answer: "B" },
                { id: 23, question: "The unit of electric charge is:", options: ["Ampere", "Coulomb", "Volt", "Ohm"], answer: "B" },
                { id: 24, question: "The resistance of a wire depends on:", options: ["Length and area only", "Length, area, and material", "Voltage", "Current"], answer: "B" },
                { id: 25, question: "A device that converts AC to DC is:", options: ["Transformer", "Rectifier", "Generator", "Motor"], answer: "B" },
                { id: 26, question: "The phenomenon of light bending is:", options: ["Reflection", "Refraction", "Diffraction", "Dispersion"], answer: "B" },
                { id: 27, question: "The momentum of a body is:", options: ["mv²", "m/v", "mv", "m + v"], answer: "C" },
                { id: 28, question: "A simple machine multiplies:", options: ["Energy", "Force or speed advantage", "Mass", "Time"], answer: "B" },
                { id: 29, question: "The boiling point of water decreases with:", options: ["Pressure increase", "Pressure decrease in altitude increase", "Mass increase", "Volume increase"], answer: "B" },
                { id: 30, question: "The device used to measure electric current is:", options: ["Voltmeter", "Ammeter", "Barometer", "Thermometer"], answer: "B" }
            ]
        },

        biology: {
            name: "Biology",
            questions: [
                { id: 1, question: "Which organelle is primarily responsible for intracellular digestion?", options: ["Ribosome", "Lysosome", "Golgi apparatus", "Mitochondrion"], answer: "B" },
                { id: 2, question: "The movement of water across a semi-permeable membrane from a region of high water potential to low water potential is called:", options: ["Diffusion", "Active transport", "Osmosis", "Transpiration"], answer: "C" },
                { id: 3, question: "Which of the following is NOT a function of the liver?", options: ["Detoxification", "Glycogen storage", "Bile production", "Insulin secretion"], answer: "D" },
                { id: 4, question: "The structure responsible for protein synthesis in cells is:", options: ["Nucleus", "Ribosome", "Lysosome", "Centriole"], answer: "B" },
                { id: 5, question: "Which of the following diseases is caused by a virus?", options: ["Tuberculosis", "Cholera", "Measles", "Typhoid"], answer: "C" },
                { id: 6, question: "The end products of anaerobic respiration in yeast are:", options: ["Water and carbon dioxide", "Lactic acid", "Ethanol and carbon dioxide", "Oxygen and glucose"], answer: "C" },
                { id: 7, question: "Which part of the nephron is mainly responsible for selective reabsorption?", options: ["Bowman's capsule", "Loop of Henle", "Distal convoluted tubule", "Proximal convoluted tubule"], answer: "D" },
                { id: 8, question: "The process by which green plants manufacture food is known as:", options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"], answer: "C" },
                { id: 9, question: "Which of the following hormones regulates blood sugar levels?", options: ["Adrenaline", "Insulin", "Thyroxine", "Estrogen"], answer: "B" },
                { id: 10, question: "In genetics, a recessive trait is expressed only when:", options: ["Both alleles are dominant", "One allele is dominant", "Both alleles are recessive", "Alleles are codominant"], answer: "C" },
                { id: 11, question: "Which of the following structures is found only in plant cells?", options: ["Mitochondria", "Cell membrane", "Chloroplast", "Ribosome"], answer: "C" },
                { id: 12, question: "The functional unit of the kidney is the:", options: ["Neuron", "Nephron", "Alveolus", "Villus"], answer: "B" },
                { id: 13, question: "Which blood component is responsible for clotting?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], answer: "C" },
                { id: 14, question: "The exchange of gases in humans occurs in the:", options: ["Bronchi", "Trachea", "Alveoli", "Diaphragm"], answer: "C" },
                { id: 15, question: "Which of the following is an example of a monocot plant?", options: ["Beans", "Maize", "Mango", "Hibiscus"], answer: "B" },
                { id: 16, question: "The genetic material in the cell is:", options: ["RNA", "DNA", "Protein", "Lipid"], answer: "B" },
                { id: 17, question: "Which of the following is NOT a component of the central nervous system?", options: ["Brain", "Spinal cord", "Nerves", "Cerebellum"], answer: "C" },
                { id: 18, question: "The process of shedding leaves in plants is called:", options: ["Transpiration", "Abscission", "Germination", "Photosynthesis"], answer: "B" },
                { id: 19, question: "Which vitamin is responsible for blood clotting?", options: ["Vitamin A", "Vitamin B", "Vitamin K", "Vitamin D"], answer: "C" },
                { id: 20, question: "The type of reproduction that involves only one parent is:", options: ["Sexual reproduction", "Asexual reproduction", "Binary fission", "Fertilization"], answer: "B" },
                { id: 21, question: "Which ecological term describes organisms that make their own food?", options: ["Consumers", "Producers", "Decomposers", "Scavengers"], answer: "B" },
                { id: 22, question: "The breakdown of glucose to release energy is called:", options: ["Photosynthesis", "Respiration", "Digestion", "Excretion"], answer: "B" },
                { id: 23, question: "Which of the following is a vector for malaria?", options: ["Housefly", "Tsetse fly", "Female Anopheles mosquito", "Cockroach"], answer: "C" },
                { id: 24, question: "The structure that controls the activities of the cell is the:", options: ["Cytoplasm", "Nucleus", "Cell wall", "Vacuole"], answer: "B" },
                { id: 25, question: "Which of the following is an example of homologous chromosomes?", options: ["X and Y chromosomes", "Two X chromosomes", "X and autosome", "Y and autosome"], answer: "B" },
                { id: 26, question: "The part of the brain responsible for balance is the:", options: ["Cerebrum", "Medulla oblongata", "Cerebellum", "Hypothalamus"], answer: "C" },
                { id: 27, question: "Which of the following is NOT a nitrogenous waste product?", options: ["Urea", "Ammonia", "Uric acid", "Glucose"], answer: "D" },
                { id: 28, question: "Which stage of mitosis involves the alignment of chromosomes at the equator?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], answer: "B" },
                { id: 29, question: "The opening and closing of stomata is controlled by:", options: ["Epidermal cells", "Guard cells", "Mesophyll cells", "Xylem vessels"], answer: "B" },
                { id: 30, question: "Which of the following best describes an ecosystem?", options: ["A group of organisms", "Living organisms only", "Interaction of living and non-living components", "A population of species"], answer: "C" }
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
                { id: 20, question: "What is the main cause of acid rain?", options: ["CO₂", "SO₂", "NO₂", "CO"], answer: "B" },
                { id: 21, question: "What is the atomic number of carbon?", options: ["4", "6", "8", "12"], answer: "B" },
                { id: 22, question: "Which element has the highest electronegativity?", options: ["Chlorine", "Fluorine", "Oxygen", "Nitrogen"], answer: "B" },
                { id: 23, question: "What is the formula for sulfuric acid?", options: ["H₂SO₃", "H₂SO₄", "H₂S", "HSO₄"], answer: "B" },
                { id: 24, question: "Which process involves the loss of electrons?", options: ["Reduction", "Oxidation", "Hydration", "Neutralization"], answer: "B" },
                { id: 25, question: "What is the molar mass of CO₂?", options: ["44 g/mol", "32 g/mol", "48 g/mol", "60 g/mol"], answer: "A" },
                { id: 26, question: "What is the name of the bonds that hold atoms together in a molecule?", options: ["Ionic bonds", "Covalent bonds", "van der Waals forces", "Hydrogen bonds"], answer: "B" },
                { id: 27, question: "Which of the following is an example of a non-metal?", options: ["Iron", "Copper", "Sulfur", "Aluminum"], answer: "C" },
                { id: 28, question: "What is the chemical formula for ammonia?", options: ["NH₃", "NH₄", "N₂H₄", "N₂H₆"], answer: "A" },
                { id: 29, question: "What is the process of adding hydrogen to a substance?", options: ["Hydrogenation", "Dehydration", "Hydrolyzing", "Hydration"], answer: "A" },
                { id: 30, question: "Which element is a halogens?", options: ["Oxygen", "Chlorine", "Nitrogen", "Carbon"], answer: "B" }
            ]
        }
    },

    // ========================
    // ARTS SUBJECTS
    // ========================
    arts: {
        maths: sharedMaths,
        english: sharedEnglish,
        economics: sharedEconomics,

        literature: {
            name: "Literature",
            questions: [
                { id: 1, question: "Who is the author of 'The Tempest'?", options: ["Shakespeare", "Wordsworth", "Dickens", "Achebe"], answer: "A" },
                { id: 2, question: "What is the setting of 'Things Fall Apart'?", options: ["Nigeria", "England", "USA", "India"], answer: "A" },
                { id: 3, question: "In poetry, what is a metaphor?", options: ["Comparing two things using 'like'", "Comparing two things without 'like'", "Giving human traits to non-humans", "A type of rhyme"], answer: "B" },
                { id: 4, question: "Who is the protagonist in 'The Stranger'?", options: ["Meursault", "Ramatoulaye", "Okonkwo", "Prospero"], answer: "A" },
                { id: 5, question: "What is the theme of 'A Raisin in the Sun'?", options: ["Racism", "Love", "Friendship", "Dreams"], answer: "D" },
                { id: 6, question: "What is personification?", options: ["Comparing humans to objects", "Giving human traits to non-humans", "A type of poem", "A literary device for rhyming"], answer: "B" },
                { id: 7, question: "Who wrote 'The Great Gatsby'?", options: ["Hemingway", "Fitzgerald", "Shakespeare", "Austen"], answer: "B" },
                { id: 8, question: "What is the genre of 'Death of a Salesman'?", options: ["Comedy", "Tragedy", "Drama", "Poetry"], answer: "C" },
                { id: 9, question: "In 'Julius Caesar', who is Brutus?", options: ["A friend of Caesar", "A conspirator", "A king", "A slave"], answer: "B" },
                { id: 10, question: "What is symbolism in literature?", options: ["Using objects to represent ideas", "A type of character", "A plot twist", "A theme"], answer: "A" },
                { id: 11, question: "Who is the author of 'The Joy of Motherhood'?", options: ["Chimamanda", "Achebe", "Soyinka", "Buchi Emecheta"], answer: "D" },
                { id: 12, question: "What is the main conflict in 'Romeo and Juliet'?", options: ["Love vs. family feud", "Power struggle", "Friendship", "Betrayal"], answer: "A" },
                { id: 13, question: "What is alliteration?", options: ["Repetition of sounds", "A type of poem", "A literary device for comparison", "A character type"], answer: "A" },
                { id: 14, question: "Who is Okonkwo in 'Things Fall Apart'?", options: ["A weak man", "A strong farmer", "A missionary", "A government official"], answer: "B" },
                { id: 15, question: "What is irony?", options: ["Expected outcome", "Unexpected outcome", "A type of character", "A plot device"], answer: "B" },
                { id: 16, question: "'The Waste Land' is a poem by?", options: ["T.S. Eliot", "Wordsworth", "Shakespeare", "Achebe"], answer: "A" },
                { id: 17, question: "What is the tone of 'The Raven'?", options: ["Happy", "Sad", "Dark", "Humorous"], answer: "C" },
                { id: 18, question: "Who is the narrator in 'The Stranger'?", options: ["Meursault", "Ramatoulaye", "Okonkwo", "Camus"], answer: "A" },
                { id: 19, question: "What is a soliloquy?", options: ["A dialogue between two characters", "A character speaking alone", "A type of poem", "A narrative technique"], answer: "B" },
                { id: 20, question: "In 'A Doll's House', who is Nora?", options: ["A mother", "A wife", "A maid", "A lawyer"], answer: "B" },
                { id: 21, question: "What is imagery in literature?", options: ["Using senses to describe", "A type of character", "A plot twist", "A theme"], answer: "A" },
                { id: 22, question: "Who wrote 'Purple Hibiscus'?", options: ["Chimamanda", "Achebe", "Soyinka", "Adichie"], answer: "D" },
                { id: 23, question: "What is the theme of 'The Lottery'?", options: ["Tradition", "Love", "Power", "Friendship"], answer: "A" },
                { id: 24, question: "What is a flashback?", options: ["A scene from the future", "A scene from the past", "A character's thoughts", "A narrative technique"], answer: "B" },
                { id: 25, question: "Who is Antigone in Greek tragedy?", options: ["A king", "A rebel", "A sister", "A warrior"], answer: "C" },
                { id: 26, question: "What is foreshadowing?", options: ["Hinting at future events", "A type of character", "A plot twist", "A theme"], answer: "A" },
                { id: 27, question: "'The Catcher in the Rye' is written by?", options: ["Hemingway", "Salinger", "Shakespeare", "Austen"], answer: "B" },
                { id: 28, question: "What is the setting of 'A Raisin in the Sun'?", options: ["Nigeria", "USA", "England", "South Africa"], answer: "B" },
                { id: 29, question: "Who is the author of 'Second Class Citizen'?", options: ["Chimamanda", "Buchi Emecheta", "Achebe", "Soyinka"], answer: "B" },
                { id: 30, question: "What is a tragic flaw?", options: ["A character's strength", "A character's weakness", "A plot twist", "A theme"], answer: "B" }
            ]
        },

        government: {
            name: "Government",
            questions: [
                { id: 1, question: "Sovereignty means:", options: ["Rule by military", "Supreme power of the state over its territory and people", "Power of parliament only", "Rule by constitution"], answer: "B" },
                { id: 2, question: "The doctrine of separation of powers was popularized by:", options: ["Rousseau", "Montesquieu", "Locke", "Hobbes"], answer: "B" },
                { id: 3, question: "A constitution that can be easily amended is called:", options: ["Written", "Flexible", "Rigid", "Unwritten"], answer: "B" },
                { id: 4, question: "The main function of the judiciary is:", options: ["Making laws", "Executing laws", "Interpreting laws and settling disputes", "Approving budgets"], answer: "C" },
                { id: 5, question: "Political sovereignty in a democracy resides in:", options: ["The military", "The constitution", "The people", "The president"], answer: "C" },
                { id: 6, question: "One major feature of a unitary system is:", options: ["Division of power", "Centralized authority", "Regional autonomy", "Federal structure"], answer: "B" },
                { id: 7, question: "Franchise means:", options: ["Right to vote", "Right to rule", "Citizenship by birth", "Legal immunity"], answer: "A" },
                { id: 8, question: "A bicameral legislature consists of:", options: ["One house", "Two houses", "Three houses", "Four houses"], answer: "B" },
                { id: 9, question: "Delegated legislation is made by:", options: ["Courts", "Executive agencies under authority of parliament", "Voters", "Political parties"], answer: "B" },
                { id: 10, question: "The rule of law means:", options: ["Rule by judges", "Equality before the law and supremacy of law", "Rule by constitution only", "Rule by parliament"], answer: "B" },
                { id: 11, question: "The first political party in Nigeria was:", options: ["NPC", "NNDP", "AG", "NCNC"], answer: "B" },
                { id: 12, question: "Indirect rule was mainly practiced by:", options: ["France", "Britain", "Portugal", "Germany"], answer: "B" },
                { id: 13, question: "One advantage of federalism is:", options: ["Centralized dictatorship", "Unity only", "Accommodation of diversity", "Weak government"], answer: "C" },
                { id: 14, question: "Citizenship by birth is called:", options: ["Naturalization", "Registration", "Jus soli / Jus sanguinis", "Alien status"], answer: "C" },
                { id: 15, question: "The head of government in Nigeria is:", options: ["Senate President", "Chief Justice", "President", "Speaker"], answer: "C" },
                { id: 16, question: "Electoral college is used in:", options: ["Nigeria", "USA presidential elections", "Ghana", "Kenya"], answer: "B" },
                { id: 17, question: "Political culture refers to:", options: ["Laws of a country", "Attitudes and beliefs toward politics", "Military behavior", "Economic system"], answer: "B" },
                { id: 18, question: "A state is defined by:", options: ["Army and police", "Population, territory, government, sovereignty", "Constitution only", "Election system"], answer: "B" },
                { id: 19, question: "Amnesty means:", options: ["Punishment reduction", "Forgiveness of political offenders or prisoners", "Death sentence", "Deportation"], answer: "B" },
                { id: 20, question: "The highest law in a country is:", options: ["Acts of parliament", "Constitution", "Edicts", "Decrees"], answer: "B" },
                { id: 21, question: "Pressure group differs from political party because:", options: ["It contests elections", "It seeks power", "It does not contest elections but influences government", "It rules the country"], answer: "C" },
                { id: 22, question: "An authoritarian system is characterized by:", options: ["Free elections", "Limited political freedom and centralized power", "Federal structure", "Strong opposition"], answer: "B" },
                { id: 23, question: "Rule of law includes:", options: ["Equality before law", "Military control", "Executive supremacy", "Party supremacy"], answer: "A" },
                { id: 24, question: "The legislature mainly:", options: ["Executes laws", "Makes laws", "Judges laws", "Enforces laws"], answer: "B" },
                { id: 25, question: "Suffrage means:", options: ["Voting right", "Citizenship", "Leadership", "Taxation"], answer: "A" },
                { id: 26, question: "Nigeria became a republic in:", options: ["1957", "1960", "1963", "1979"], answer: "C" },
                { id: 27, question: "Cabinet system is derived from:", options: ["USA", "Britain", "Russia", "France"], answer: "B" },
                { id: 28, question: "The concept of federal character ensures:", options: ["Ethnic dominance", "Fair representation of groups in government appointments", "Military rule", "Party monopoly"], answer: "B" },
                { id: 29, question: "A constitution may be:", options: ["Written only", "Unwritten only", "Rigid or flexible", "Military only"], answer: "C" },
                { id: 30, question: "Democracy is best defined as:", options: ["Rule by one person", "Rule by the rich", "Government of the people, by the people, for the people", "Rule by military"], answer: "C" }
            ]
        },

        crs: {
            name: "CRS",
            questions: [
                { id: 1, question: "Amaziah opposed Amos because", options: ["Amos was false", "Amos spoke against Bethel sanctuary", "Amos was from Judah", "Amos insulted the king"], answer: "B" },
                { id: 2, question: "The sin of Jeroboam was that he", options: ["Married foreign wives", "Built golden calves at Bethel and Dan", "Killed prophets", "Refused sacrifice"], answer: "B" },
                { id: 3, question: "God rejected Saul as king because he", options: ["Was weak", "Disobeyed divine instruction", "Feared enemies", "Was not anointed"], answer: "B" },
                { id: 4, question: "The message “Let justice roll down like waters” is associated with", options: ["Hosea", "Amos", "Isaiah", "Micah"], answer: "B" },
                { id: 5, question: "During the call of Jeremiah, God told him he was appointed over", options: ["Israel only", "Judah only", "Nations and kingdoms", "Priests and kings"], answer: "C" },
                { id: 6, question: "The “suffering servant” theme is found mainly in", options: ["Jeremiah", "Isaiah", "Amos", "Ezekiel"], answer: "B" },
                { id: 7, question: "Ezekiel’s symbolic act of lying on his side represented", options: ["Prayer", "Judgment duration on Israel and Judah", "Rest", "Obedience"], answer: "B" },
                { id: 8, question: "The wife of Hosea symbolized", options: ["Faithfulness", "Israel’s unfaithfulness to God", "Prosperity", "Judgment"], answer: "B" },
                { id: 9, question: "At Mount Carmel, Elijah proved God’s power by", options: ["Raising the dead", "Calling down fire from heaven", "Healing leprosy", "Dividing Jordan"], answer: "B" },
                { id: 10, question: "The covenant at Sinai required Israel to", options: ["Build temple", "Obey God’s laws", "Fight enemies", "Give offerings"], answer: "B" },
                { id: 11, question: "The major issue in the Jerusalem Council was about", options: ["Prayer", "Circumcision of Gentiles", "Leadership", "Tithing"], answer: "B" },
                { id: 12, question: "Stephen was accused of speaking against", options: ["The king", "The temple and the Law", "Romans", "Apostles"], answer: "B" },
                { id: 13, question: "Paul described the law as", options: ["Useless", "Holy but unable to justify", "Evil", "Perfect salvation"], answer: "B" },
                { id: 14, question: "The parable of the talents teaches", options: ["Prayer", "Accountability and stewardship", "Forgiveness", "Love"], answer: "B" },
                { id: 15, question: "Jesus’ teaching on divorce emphasized", options: ["Law of Moses", "Hardness of heart", "Culture", "Tradition"], answer: "B" },
                { id: 16, question: "The rich man and Lazarus parable teaches", options: ["Wealth is evil", "Reversal of fortune after death", "Giving is compulsory", "Poverty is holy"], answer: "B" },
                { id: 17, question: "The purpose of the law according to Paul was to", options: ["Save man", "Reveal sin", "Replace grace", "Destroy man"], answer: "B" },
                { id: 18, question: "Ananias and Sapphira were punished for", options: ["Theft", "Lying to the Holy Spirit", "Murder", "Disobedience"], answer: "B" },
                { id: 19, question: "The new covenant differs from the old in that it is written on", options: ["Stone", "Tablets", "Hearts of men", "Books"], answer: "C" },
                { id: 20, question: "Jesus wept over Jerusalem because", options: ["It was poor", "It rejected God’s visitation", "It lacked leaders", "It was sinful"], answer: "B" },
                { id: 21, question: "The sign of Jonah refers to", options: ["Miracle", "Resurrection of Jesus", "Judgment", "Preaching"], answer: "B" },
                { id: 22, question: "The early church shared goods to show", options: ["Wealth", "Unity and love", "Power", "Control"], answer: "B" },
                { id: 23, question: "Peter’s vision in Joppa taught that", options: ["Food laws remain", "Gentiles are accepted by God", "Jews are superior", "Animals are holy"], answer: "B" },
                { id: 24, question: "The greatest commandment according to Jesus includes", options: ["Sacrifice", "Love for God and neighbor", "Prayer", "Law"], answer: "B" },
                { id: 25, question: "The tearing of the temple veil signifies", options: ["Destruction", "Access to God through Christ", "Judgment", "End of worship"], answer: "B" },
                { id: 26, question: "The prodigal son’s elder brother represents", options: ["Sinners", "Pharisees/self-righteous people", "Gentiles", "Apostles"], answer: "B" },
                { id: 27, question: "Jesus’ triumphal entry fulfilled prophecy from", options: ["Isaiah", "Zechariah", "Malachi", "Amos"], answer: "B" },
                { id: 28, question: "The baptism of Jesus signifies", options: ["Cleansing", "Identification and approval by God", "Power", "Authority"], answer: "B" },
                { id: 29, question: "The main theme of Ecclesiastes is", options: ["Joy", "Vanity of life without God", "Wisdom", "Judgment"], answer: "B" },
                { id: 30, question: "The fall of man resulted in", options: ["Death and separation from God", "Poverty", "Weakness", "Fear"], answer: "A" }
            ]
        }
    },

    // ========================
    // COMMERCIAL SUBJECTS
    // ========================
    commercial: {
        maths: sharedMaths,
        english: sharedEnglish,
        economics: sharedEconomics,

        commerce: {
            name: "Commerce",
            questions: [
                { id: 1, question: "What is the primary objective of a business?", options: ["Profit maximization", "Social welfare", "Employee satisfaction", "Environmental sustainability"], answer: "A" },
                { id: 2, question: "What is the term for the process of identifying, measuring, and managing financial risks?", options: ["Risk assessment", "Financial planning", "Investment analysis", "Financial engineering"], answer: "A" },
                { id: 3, question: "Which accounting concept assumes that a business will continue to operate for the foreseeable future?", options: ["Going concern", "Accrual accounting", "Matching principle", "Materiality"], answer: "A" },
                { id: 4, question: "What is the term for the amount of money invested by the owner in the business?", options: ["Capital", "Revenue", "Expense", "Liability"], answer: "A" },
                { id: 5, question: "What is the financial statement that shows the financial position of a business at a specific point in time?", options: ["Income statement", "Balance sheet", "Cash flow statement", "Statement of changes in equity"], answer: "B" },
                { id: 6, question: "What is the term for the process of allocating funds to different assets?", options: ["Asset allocation", "Risk management", "Financial planning", "Investment analysis"], answer: "A" },
                { id: 7, question: "What is the type of market where securities are traded after issuance?", options: ["Primary market", "Secondary market", "Tertiary market", "Over-the-counter market"], answer: "B" },
                { id: 8, question: "What is the financial instrument that represents a loan from an investor to a borrower?", options: ["Stock", "Bond", "Derivative", "Commodity"], answer: "B" },
                { id: 9, question: "What is the term for the reduction in value of an asset over time?", options: ["Depreciation", "Amortization", "Depletion", "Obsolescence"], answer: "A" },
                { id: 10, question: "What is the accounting principle that requires expenses to be matched with revenues?", options: ["Matching principle", "Accrual accounting", "Materiality", "Going concern"], answer: "A" },
                { id: 11, question: "What is the term for the amount of money owed by a business to its suppliers?", options: ["Accounts payable", "Accounts receivable", "Inventory", "Cash"], answer: "A" },
                { id: 12, question: "What is the financial statement that shows the inflows and outflows of cash?", options: ["Income statement", "Balance sheet", "Cash flow statement", "Statement of changes in equity"], answer: "C" },
                { id: 13, question: "What is the term for the process of identifying and assessing potential risks?", options: ["Risk assessment", "Risk management", "Risk mitigation", "Risk avoidance"], answer: "A" },
                { id: 14, question: "What is the type of business organization that has limited liability?", options: ["Sole proprietorship", "Partnership", "Corporation", "Cooperative"], answer: "C" },
                { id: 15, question: "A company has 1,000 shares issued at ₦50 each. What is the share capital?", options: ["₦50,000", "₦5,000", "₦500,000", "₦1,000"], answer: "A" },
                { id: 16, question: "A business has current assets of ₦200,000 and current liabilities of ₦80,000. What is the current ratio?", options: ["2.5:1", "1:1", "0.4:1", "4:1"], answer: "A" },
                { id: 17, question: "A machine costs ₦500,000 and depreciates by 20% annually. What is the depreciation for the first year?", options: ["₦100,000", "₦50,000", "₦400,000", "₦25,000"], answer: "A" },
                { id: 18, question: "What is the type of market where commodities are traded?", options: ["Capital market", "Money market", "Commodity market", "Foreign exchange market"], answer: "C" },
                { id: 19, question: "What is the financial instrument that represents ownership in a company?", options: ["Stock", "Bond", "Derivative", "Commodity"], answer: "A" },
                { id: 20, question: "What is the term for the amount of money earned by a business from sales?", options: ["Revenue", "Profit", "Income", "Gain"], answer: "A" },
                { id: 21, question: "What is the accounting concept that requires assets to be recorded at their original cost?", options: ["Historical cost", "Fair value", "Amortized cost", "Realizable value"], answer: "A" },
                { id: 22, question: "What is the term for the process of managing a company's working capital?", options: ["Working capital management", "Capital budgeting", "Financial planning", "Investment analysis"], answer: "A" },
                { id: 23, question: "What is the financial ratio that measures a company's profitability?", options: ["Return on investment", "Return on equity", "Gross margin ratio", "Operating profit margin"], answer: "A" },
                { id: 24, question: "What is the term for the amount of money borrowed by a business?", options: ["Debt", "Equity", "Liability", "Asset"], answer: "A" },
                { id: 25, question: "What is the financial statement that shows the changes in equity?", options: ["Income statement", "Balance sheet", "Cash flow statement", "Statement of changes in equity"], answer: "D" },
                { id: 26, question: "What is the term for the process of evaluating investment opportunities?", options: ["Capital budgeting", "Financial planning", "Investment analysis", "Risk assessment"], answer: "A" },
                { id: 27, question: "What is the type of business organization that is owned by its members?", options: ["Cooperative", "Corporation", "Partnership", "Sole proprietorship"], answer: "A" },
                { id: 28, question: "What is the term for the amount of money paid to shareholders?", options: ["Dividend", "Interest", "Rent", "Royalty"], answer: "A" },
                { id: 29, question: "What is the financial ratio that measures a company's ability to meet its long-term obligations?", options: ["Debt-to-equity ratio", "Interest coverage ratio", "Current ratio", "Return on investment"], answer: "A" },
                { id: 30, question: "What is the term for the process of managing financial risks?", options: ["Risk management", "Financial planning", "Investment analysis", "Hedging"], answer: "A" }
            ]
        },

        accounting: {
            name: "Financial Accounting",
            questions: [
                { id: 1, question: "What is the accounting equation?", options: ["Assets = Liabilities + Equity", "Assets - Liabilities = Equity", "Assets + Liabilities = Equity", "Liabilities = Assets - Equity"], answer: "A" },
                { id: 2, question: "Which of the following is a current asset?", options: ["Building", "Land", "Accounts receivable", "Equipment"], answer: "C" },
                { id: 3, question: "What is the purpose of a trial balance?", options: ["To prepare financial statements", "To verify the equality of debits and credits", "To record transactions", "To prepare general ledger"], answer: "B" },
                { id: 4, question: "Which account increases with a debit?", options: ["Liability", "Equity", "Revenue", "Asset"], answer: "D" },
                { id: 5, question: "What is depreciation?", options: ["Loss in asset value over time", "Profit from asset sales", "Asset classification", "Asset revaluation"], answer: "A" },
                { id: 6, question: "When is revenue recognized under accrual accounting?", options: ["When cash is received", "When goods/services are provided", "When invoice is sent", "When payment terms expire"], answer: "B" },
                { id: 7, question: "What type of account is 'Allowance for Doubtful Debts'?", options: ["Asset", "Contra-asset", "Liability", "Equity"], answer: "B" },
                { id: 8, question: "What is the formula for calculating gross profit?", options: ["Sales - COGS", "Sales - Expenses", "COGS - Expenses", "Revenue - Rent"], answer: "A" },
                { id: 9, question: "Which principle requires that expenses match with revenues?", options: ["Matching principle", "Consistency principle", "Materiality principle", "Going concern"], answer: "A" },
                { id: 10, question: "What is a provision in accounting?", options: ["Estimated future payment for known obligation", "Actual payment made", "Revenue reserve", "Capital reserve"], answer: "A" },
                { id: 11, question: "Which of the following is an intangible asset?", options: ["Goodwill", "Cash", "Inventory", "Building"], answer: "A" },
                { id: 12, question: "What does the balance sheet show?", options: ["Profit or loss", "Financial position", "Cash flows", "Revenue changes"], answer: "B" },
                { id: 13, question: "What is a contingent liability?", options: ["Probable future obligation", "Past obligation with uncertain outcome", "Actual current debt", "Accrued expense"], answer: "B" },
                { id: 14, question: "Which accounting standard is most widely used?", options: ["GAAP", "IFRS", "Nigeria GAAP", "US GAAP"], answer: "B" },
                { id: 15, question: "What is the acid test ratio?", options: ["(Current Assets - Inventory) / Current Liabilities", "Current Assets / Current Liabilities", "Total Assets / Total Liabilities", "Liquid Assets / Total Assets"], answer: "A" },
                { id: 16, question: "What is the purpose of a journal entry?", options: ["Record transactions in chronological order", "Summarize accounts", "Prepare financial statements", "Calculate profit"], answer: "A" },
                { id: 17, question: "Which cost method assumes FIFO inventory flow?", options: ["First-in, first-out", "Last-in, first-out", "Weighted average", "Specific identification"], answer: "A" },
                { id: 18, question: "What is amortization?", options: ["Depreciation of tangible assets", "Depreciation of intangible assets", "Asset revaluation", "Asset disposal"], answer: "B" },
                { id: 19, question: "What is a deferred revenue?", options: ["Cash received before earning", "Cash paid before expense", "Accrued revenue", "Revenue not yet earned"], answer: "A" },
                { id: 20, question: "Which account is credited when goods are purchased on credit?", options: ["Accounts receivable", "Accounts payable", "Inventory", "Cash"], answer: "B" },
                { id: 21, question: "What is the net profit margin ratio used for?", options: ["Measuring efficiency", "Measuring profitability", "Measuring liquidity", "Measuring solvency"], answer: "B" },
                { id: 22, question: "What is a reserve in accounting?", options: ["Amount set aside from profits", "Current liability", "Working capital", "Fixed asset"], answer: "A" },
                { id: 23, question: "Which of the following is an operating expense?", options: ["Interest paid", "Rent for office", "Taxes paid", "Dividend paid"], answer: "B" },
                { id: 24, question: "What is the purpose of a bank reconciliation?", options: ["Verify bank balance matches cash account", "Calculate interest earnings", "Record deposits", "Process withdrawals"], answer: "A" },
                { id: 25, question: "What does COGS stand for?", options: ["Cost of General Services", "Cost of Goods Sold", "Capital on Growth Securities", "Cost of Good Services"], answer: "B" },
                { id: 26, question: "Which accounting principle provides guidelines for measurement?", options: ["Going concern", "Accrual basis", "Historical cost", "Substance over form"], answer: "C" },
                { id: 27, question: "What is a floating charge?", options: ["Security over fixed assets", "Security over current assets", "Security over all assets", "Personal security"], answer: "B" },
                { id: 28, question: "What is capitalizing an expense?", options: ["Recognizing as an asset", "Recording as expense", "Classifying as liability", "Writing off immediately"], answer: "A" },
                { id: 29, question: "What is the purpose of an audit?", options: ["To prepare financial statements", "To verify accuracy of accounts", "To calculate profit", "To determine tax liability"], answer: "B" },
                { id: 30, question: "What is the net working capital formula?", options: ["Current Assets - Current Liabilities", "Total Assets - Total Liabilities", "Revenue - Expenses", "Cash - Payables"], answer: "A" }
            ]
        }
    }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const MAX_MOCK_SUBJECTS = 4;
const QUESTIONS_PER_SUBJECT = 30;

const REQUIRED_SUBJECTS = {
    science: ['english', 'physics'],
    arts: ['english'],
    commercial: ['english']
};

function getAvailableSubjects(category) {
    return Object.keys(questionsData[category] || {});
}

function getRequiredSubjects(category) {
    return REQUIRED_SUBJECTS[category] || ['english'];
}

function getDefaultSubjectSelection(category) {
    const available = getAvailableSubjects(category);
    const required = getRequiredSubjects(category).filter(subject => available.includes(subject));
    const optional = available.filter(subject => !required.includes(subject));
    const needed = Math.max(0, MAX_MOCK_SUBJECTS - required.length);
    return [...required, ...optional.slice(0, needed)];
}

function shuffleQuestions(items) {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getAllQuestions(category, selectedSubjects = null) {
    const subjects = questionsData[category];
    let allQuestions = [];
    const subjectKeys = Array.isArray(selectedSubjects) && selectedSubjects.length
        ? selectedSubjects
        : Object.keys(subjects);

    for (const subjectKey of subjectKeys) {
        const subject = subjects[subjectKey];
        if (!subject) continue;
        subject.questions.slice(0, QUESTIONS_PER_SUBJECT).forEach((q) => {
            allQuestions.push({
                ...q,
                subject: subjectKey,
                subjectName: subject.name,
                globalIndex: allQuestions.length
            });
        });
    }
    return shuffleQuestions(allQuestions);
}

function getSubjectNames(category, selectedSubjects = null) {
    const subjects = questionsData[category];
    const names = {};
    const subjectKeys = Array.isArray(selectedSubjects) && selectedSubjects.length
        ? selectedSubjects
        : Object.keys(subjects);

    for (const subjectKey of subjectKeys) {
        if (!subjects[subjectKey]) continue;
        names[subjectKey] = subjects[subjectKey].name;
    }
    return names;
}

function getTotalQuestions(category, selectedSubjects = null) {
    const subjects = questionsData[category];
    let total = 0;
    const subjectKeys = Array.isArray(selectedSubjects) && selectedSubjects.length
        ? selectedSubjects
        : Object.keys(subjects);

    for (const subjectKey of subjectKeys) {
        if (!subjects[subjectKey]) continue;
        total += Math.min(QUESTIONS_PER_SUBJECT, subjects[subjectKey].questions.length);
    }
    return total;
}

function getSubjectSelectionSummary(category, selectedSubjects = null) {
    const available = getAvailableSubjects(category);
    const required = getRequiredSubjects(category).filter(subject => available.includes(subject));
    const selected = Array.isArray(selectedSubjects) && selectedSubjects.length
        ? selectedSubjects.filter(subject => available.includes(subject))
        : getDefaultSubjectSelection(category);

    return {
        category,
        required,
        selected,
        optional: available.filter(subject => !required.includes(subject))
    };
}
