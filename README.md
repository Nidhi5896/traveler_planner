# Travel Planner App

A comprehensive travel planning application built with React Native and Expo, designed to help users plan their trips, manage itineraries, and translate languages on the go.

![Travel Planner App](https://via.placeholder.com/800x400/4682B4/FFFFFF?text=Travel+Planner+App)

## Features

### Trip Management

- **Create New Trips**: Set up new travel itineraries with destinations, dates, and traveler details
- **Trip Details**: View comprehensive trip information including flights, hotels, and daily activities
- **Location Images**: Automatically fetches destination images to enhance the visual experience

### Smart Itinerary Planning

- **AI-Generated Itineraries**: Get personalized trip plans based on your preferences
- **Wishlist Integration**: Create a wishlist of activities and places to incorporate into your trip
- **Daily Schedule**: View day-by-day breakdown of activities and events

### Multi-Language Support

- **Translation Tool**: Built-in translator supporting 40+ languages worldwide
- **Language Groups**: Indian, European, Asian, and other language categories
- **Text-to-Speech**: Hear pronunciations of translated text (device capability dependent)
- **Direct Google Translate**: Open translations in Google Translate for additional features

## Technology Stack

- **Frontend**: React Native, Expo
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **API Integration**:
  - Pixabay API for location images
  - Google Translate integration
  - Expo Speech for text-to-speech
- **Navigation**: Expo Router

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI
- Android/iOS emulator or physical device for testing

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Nidhi5896/traveler_planner.git
cd traveler_planner
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your device or emulator:
   - Press 'a' for Android
   - Press 'i' for iOS
   - Scan the QR code with Expo Go app for physical devices

## Usage

1. **Login/Register**: Create an account or login to access your trips
2. **Create a Trip**: Add a new trip with destination, dates, and traveler details
3. **View Trip Details**: Access comprehensive information about your planned trip
4. **Translate On-the-Go**: Use the floating translator button in the My Trips section

## Project Structure

```
traveler_planner/
├── app/                  # Main application screens
│   ├── (tabs)/           # Tab-based navigation screens
│   ├── auth/             # Authentication screens
│   ├── create-trip/      # Trip creation flow
│   └── trip-details/     # Trip details screen
├── component/            # Reusable components
│   ├── MyTrips/          # Trip list components
│   ├── TripDetails/      # Trip detail components
│   ├── CreateTrip/       # Trip creation components
│   ├── TranslationService.jsx  # Translation component
│   └── TranslatorButton.jsx    # Floating translator button
├── configs/              # Configuration files
├── constants/            # Application constants
├── context/              # React Context providers
└── services/             # API and service functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the excellent React Native tooling
- Firebase for backend services
- Google Translate for translation services
- Pixabay for location images
