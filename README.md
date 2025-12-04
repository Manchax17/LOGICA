# Truth Table Calculator - React Version

A React application that calculates and displays truth tables for logical conjunctions (P ∧ Q ∧ R). This is a conversion of the original vanilla JavaScript application to React.

## Features

- Interactive input for three propositions (P, Q, R)
- Real-time truth table calculation
- Spanish language interface
- Visual representation of truth values
- Conjunction verification and analysis
- Responsive design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── InputSection.js      # Input form for propositions
│   ├── PatternInfo.js       # Truth table pattern information
│   ├── TruthTable.js        # Truth table display
│   ├── ConjunctionDisplay.js # Spanish conjunction display
│   ├── Verification.js      # Conjunction verification
│   └── Analysis.js          # Analysis section
├── App.js                   # Main application component
├── App.css                  # Main styles
├── index.js                 # React entry point
└── index.css                # Global styles
```

## How It Works

The application calculates truth tables for the logical conjunction P ∧ Q ∧ R, which is true only when all three propositions are true. The truth table follows specific patterns:

- P: VVVVFFFF (4 True, 4 False)
- Q: VVFFVVFF (2 True, 2 False, repeat)
- R: VFVFVFVF (alternating True/False)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- React 18
- CSS3 with CSS Variables
- JavaScript ES6+
