#!/bin/bash

# URL to fetch
URL="https://your-backend-url.com/endpoint"

# Output file
OUTPUT="response.txt"

# Check if wget is installed
if ! command -v wget &> /dev/null; then
    echo "wget could not be found. Please install wget and try again."
    exit 1
fi

# Make the HTTP request
echo "Fetching data from $URL..."
wget -q -O "$OUTPUT" "$URL"

# Check if the request was successful
if [ $? -eq 0 ]; then
    echo "Data successfully fetched and saved to $OUTPUT."
else
    echo "Failed to fetch data from $URL. Check the URL or network connection."
fi
