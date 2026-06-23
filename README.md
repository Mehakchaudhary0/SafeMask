## SafeMask🎭 – Disguised Emergency Safety Application

## Overview

SafeMask is a Python-based personal safety application designed to provide a discreet way for users to trigger emergency assistance when they are in danger.

The application appears and functions as a normal calculator, allowing it to remain unnoticed by people nearby. When a predefined secret pattern or code is entered, SafeMask silently activates emergency protocols without displaying any visible alerts.

## Problem Statement

In many emergency situations, especially when someone is being monitored or threatened, opening a safety application or calling for help directly may not be possible.

SafeMask addresses this problem by disguising itself as a calculator while providing a hidden emergency activation mechanism.

## Key Features

### Calculator Disguise

* Functions as a normal calculator.
* Supports basic arithmetic operations.
* Appears completely legitimate to observers.

### Secret Emergency Trigger

* Hidden activation through a predefined pattern or code.
* Trigger remains invisible to anyone watching the screen.
* No suspicious pop-ups or notifications.

### Silent Location Sharing

* Automatically retrieves the user's location.
* Sends emergency location data to pre-selected trusted contacts.
* Operates silently in the background.

### Emergency Contact System

* Supports multiple emergency contacts.
* Contacts can be configured in advance.
* Sends emergency alerts to all registered contacts.

### Stealth Operation

* No visible emergency interface.
* No alert sounds.
* No confirmation messages displayed on screen.

## Technology Stack

* Html,Css,js
* Python
* Flask
* Location Services / GPS APIs
* SMS or Messaging APIs
* JSON Configuration Storage

## How It Works

1. User launches SafeMask.
2. Application opens as a normal calculator.
3. User performs regular calculations without any indication of hidden functionality.
4. In an emergency, the user enters a predefined secret trigger.
5. SafeMask silently:

   * Collects current location.
   * Generates an emergency alert.
   * Sends the location to trusted contacts.
     
6. Calculator interface remains visible to avoid drawing attention.

## Project Architecture

```text
SafeMask
│
├── Calculator Interface
├── Secret Pattern Detector
├── Location Module
├── Emergency Alert Module
├── Contact Management System
└── Configuration Storage
```

## Use Cases

* Personal safety emergencies.
* Situations where openly requesting help is unsafe.
* Rapid location sharing with family or trusted contacts.
* Discreet emergency communication.

## Future Enhancements

* Live location tracking.
* Audio recording during emergencies.
* Emergency evidence collection.
* Integration with emergency response services.
* Mobile application version (Android/iOS).
* AI-based threat detection.
* voice distress alert

## Disclaimer

SafeMask is an educational and safety-focused project intended for responsible use. Users should comply with local laws and privacy regulations when sharing location data or sending emergency alerts.

## Author

Developed as a Python-based safety application project focused on discreet emergency assistance and real-world problem solving.

## Project Status

🚧 Currently Under Development

                              
