let mediaRecorder;
let audioChunks = [];

// Set up event listeners
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const timestamp = getCurrentTime();
            displayImage(e.target.result, 'sent', timestamp);
        };
        reader.readAsDataURL(file);
        this.value = ''; // Clear the input after reading the file
    }
});

// Call button functionality
document.getElementById('callButton').addEventListener('click', function() {
    const phoneNumber = "9786345660"; // Replace with the desired phone number
    window.location.href = `tel:${phoneNumber}`;
});

// Voice recording functionality
document.getElementById('recordButton').addEventListener('click', startRecording);
document.getElementById('stopButton').addEventListener('click', stopRecording);

// Greet user on load
window.onload = greetUser;

// Send message function
function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText) {
        const timestamp = getCurrentTime();
        
        // Check for photo request
        if (messageText.toLowerCase().includes("send photo of rajesh")) {
            const imageUrl = 'download.png'; // URL of the image to send
            displayImage(imageUrl, 'received', timestamp);
        } 
        else if(messageText.toLowerCase().includes("send photo of app store")){
            const imageUrl='app-store - Copy.png';
            displayImage(imageUrl,'received',timestamp);
        }
        else if(messageText.toLowerCase().includes("send photo of youtube")){
            const imageUrl='youtube.png';
            displayImage(imageUrl,'recived',timestamp);
        }
        else
    {
            displayMessage(messageText, 'sent', timestamp);
            
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = getAIResponse(messageText);
                displayMessage(aiResponse, 'received', getCurrentTime());
            }, 1000);
        }
        input.value = '';
    }
}

function greetUser() {
    const initialMessage = "Hi!";
    const timestamp = getCurrentTime();
    displayMessage(initialMessage, 'received', timestamp);
}

function displayMessage(text, type, timestamp) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    // Add message text
    messageElement.textContent = text;

    // Add timestamp
    const timestampElement = document.createElement('div');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = timestamp;
    messageElement.appendChild(timestampElement);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}

function displayImage(src, type, timestamp) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;

    // Add image
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.style.maxWidth = '100px'; // Set max width for images
    messageElement.appendChild(imgElement);

    // Add timestamp
    const timestampElement = document.createElement('div');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = timestamp;
    messageElement.appendChild(timestampElement);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}

function getAIResponse(userMessage) {
    const responses = {
        "hello": "Hi there! How can I assist you?",
        "how are you?": "I'm just a program, but I'm doing well!",
        "bye": "Goodbye! Have a nice day!",
        "i need help": "What do you need help with?",
        "default": "I'm not sure how to respond to that."
        ,
'who is the founder of you':'i will created by Rajesh sir',
'tell about rajesh':'plese mention sir after rajesh',
'tell about rajesh sir':'His full name is Rajesh Pandi.His father name is Arumuga pandi,his mother name is Kovil Thangam.He studying 12th std',
'sex':'sorry i can not assist you about this ',
'help me for calculations':'ok i can help you in calculations .ask some questions?',
'who is your favirote actor':'my favirote actor is thalapathy vijay',
'tell about thalapathy vijay':'His full name is Joseph Vijay.His father name is S.A.Chandra sekar,his mother name is sobha.He is actor,singer,dancer and leader of Tamilga vettri kalagam.He is one of the most popular actor in India and Tamil nadu'
,
'what is your name':'I was named as Pheniox by rajesh',
'tell about you':'I will created by Rajesh sir on 28.9.2024.I will assist users like a friend.My nation is India.'
,
'best gaming phone in the world':'Asus rog 8 phone',
'i love you':'oops!.i was a machine.not a human being',
'I Love You ':'oops!.i was a machine.not a human being',
'I love you':'oops!.i was a machine.not a human being',
'I LOVE YOU':'oops!.i was a machine.not a human being',
'saaptiya':'I could not eat anything.Because i am machine',
'tell more':'I will search about this.But is not available in my storage.please ask another',
'helo':'add 1 l',
'helol':'wrong type'

    };

    const normalizedMessage = userMessage.toLowerCase();
    return responses[normalizedMessage] || responses["default"];
}

// Function to get the current date and time
function getCurrentTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const time = now.toLocaleTimeString([], options);
    const date = now.toLocaleDateString();
    return `${date} ${time}`;
}

// Voice recording functions
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const timestamp = getCurrentTime();
            displayAudio(audioUrl, 'sent', timestamp);
            audioChunks = []; // Reset for the next recording
        };

        mediaRecorder.start();
        console.log("Recording started...");
    } catch (error) {
        console.error("Error accessing microphone: ", error);
        alert("Could not start recording. Please check your microphone permissions.");
    }
}

function stopRecording() {
    mediaRecorder.stop();
}

function displayAudio(src, type, timestamp) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;

    // Add audio element
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = src;
    messageElement.appendChild(audioElement);

    // Add timestamp
    const timestampElement = document.createElement('div');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = timestamp;
    messageElement.appendChild(timestampElement);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}
