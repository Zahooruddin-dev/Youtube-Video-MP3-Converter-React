
# YouTube to MP3 Converter

This is a simple React-based YouTube to MP3 converter app that allows users to input a YouTube video URL, convert it to MP3, and download the file once it's ready.

## Features

- Input a YouTube video URL and convert it to MP3 format.
- Provides a link to download the MP3 file once the conversion is complete.
- Displays the status of the conversion (e.g., "Processing...", "Completed", etc.).
- Polls the API for the status until the MP3 file is ready.

## Technologies Used

- React.js for building the user interface.
- Axios for making API requests.
- RapidAPI's YouTube MP3 conversion API.

## Getting Started

To get started with the project, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/youtube-to-mp3-converter.git
    ```

2. Navigate to the project directory:

    ```bash
    cd youtube-to-mp3-converter
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add your RapidAPI key:

    ```bash
    VITE_RAPID_API_KEY=your-rapidapi-key
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:3000`.

### Usage

1. Enter a YouTube video link into the input field.
2. Click the "Search" button.
3. Wait for the conversion to process (the status will be displayed).
4. Once the conversion is completed, click the "Download MP3" button to download your MP3 file.

### Polling Mechanism

The app uses a polling mechanism to check the status of the conversion every few seconds. If the conversion is still in progress, the app will display the message "Still processing...". Once the conversion is completed, the download link will be available.

## Dependencies

- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [RapidAPI YouTube MP3 API](https://rapidapi.com/youtube-mp3/api/youtube-mp3/)

## License

This project is licensed under the MIT License.
