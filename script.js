
const encryptDict = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const decryptDict = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};


function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z\s]/g, ""); 
}


function encryptText(text) {
    return text.split('').map(char => encryptDict[char] || char).join('');
}


function decryptText(text) {
    let result = '';
    let i = 0;

    while (i < text.length) {
        let found = false;

        for (let key in decryptDict) {
            if (text.slice(i, i + key.length) === key) {
                result += decryptDict[key];
                i += key.length;
                found = true;
                break;
            }
        }

        if (!found) {
            result += text[i];
            i++;
        }
    }

    return result;
}

function processText(action) {
    const inputText = document.getElementById('inputText').value;
    const normalizedText = normalizeText(inputText);
    let result = '';

    if (action === 'encrypt') {
        result = encryptText(normalizedText);
        encryptedTextTemp = result;
        document.getElementById('decryptBtn').disabled = false; 
    } else if (action === 'decrypt') {
        result = decryptText(normalizedText);
    }

    document.getElementById('outputText').innerText = result;
    document.getElementById('outputText').style.display = "block";
    document.getElementById('copyBtn').style.display = "inline-block";
    document.getElementById('placeholderImage').style.display = "none";
    document.getElementById('noMessage').style.display = "none";

    document.getElementById('inputText').value = "";
}

document.getElementById('encryptBtn').addEventListener('click', function() {
    processText('encrypt');
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    processText('decrypt');
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const textToCopy = document.getElementById('outputText').innerText;
    navigator.clipboard.writeText(textToCopy).then(function() {
        alert("Texto copiado al portapapeles");
    });
});

document.getElementById('refreshBtn').addEventListener('click', function() {

    document.getElementById('inputText').value = "";
    document.getElementById('outputText').innerText = "";

    document.getElementById('outputText').style.display = "none";
    document.getElementById('copyBtn').style.display = "none";

    document.getElementById('placeholderImage').style.display = "block";
    document.getElementById('noMessage').style.display = "block";

    document.getElementById('decryptBtn').disabled = true;

    encryptedTextTemp = "";
});

document.getElementById('inputText').addEventListener('input', function(event) {
    const normalizedValue = normalizeText(event.target.value);
    document.getElementById('inputText').value = normalizedValue;
});
