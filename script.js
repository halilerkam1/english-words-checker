// This is the Google Sheets API endpoint to get the values from the spreadsheet
const SPREADSHEET_ID = '1mgwoeQURYnxhOHl2nfdAq5Jv1ZTxcI58QY6QhS1VNII';
const API_KEY = 'AIzaSyAEUvk7zamsYV8mGpwbKsbtzFRuE50mCIg';

// Function to fetch the words from the Google Sheets API
async function fetchWords() {
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/A:A?key=${API_KEY}`
    );
    const data = await response.json();
    return data.values.flat();
}

// Function to dynamically generate the word list checkboxes
async function generateWordList() {
    const words = await fetchWords();
    const wordList = document.getElementById('wordList');
    words.forEach(word => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'word';
        checkbox.value = word;
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(word));
        wordList.appendChild(li);
    });
}

// Function to calculate the percentage of known words
function calculatePercentage() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalWords = checkboxes.length;
    let knownWords = 0;
    const unknownWords = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            knownWords += 1; // Use += 1 instead of ++ to ensure knownWords is treated as a number.
        } else {
            unknownWords.push(checkbox.value);
        }
    });

    if (totalWords === 0) {
        console.log('No words in the list.');
        return;
    }

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            knownWords++;
        } else {
            unknownWords.push(checkbox.value);
        }
    });

    console.log('Known Words:', knownWords);
    console.log('Unknown Words:', unknownWords);

    const percentage = ((knownWords / totalWords) * 100).toFixed(2);
    console.log('Percentage:', percentage);
    const result = document.getElementById('result');
    result.textContent = `Percentage of words known: ${percentage}%`;

    // Display the words user doesn't know
}

// Load the word list when the page is ready
document.addEventListener('DOMContentLoaded', generateWordList);
