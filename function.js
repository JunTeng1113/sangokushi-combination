
function compression(code) {
    code = reverse(code);
    const compressionCode = {
        '0000': 'E', 
        '0001': 'R', 
        '0010': 'T', 
        '0011': 'Y', 
        '0100': 'U', 
        '0101': 'D', 
        '0110': 'F', 
        '0111': 'G', 
        '1000': 'H', 
        '1001': 'J', 
        '1010': 'C', 
        '1011': 'V', 
        '1100': 'B', 
        '1101': 'N', 
        '1110': 'M', 
        '1111': 'X'
    };
    var newCode = "";
    while (code.length > 0) {
        while (code.substring(0, 4).length < 4) {
            code = "0" + code
        }
        newCode += compressionCode[code.substring(0, 4)];
        code = code.substring(4);
    }
    return reverse(newCode);
}

function decompression(code) {
    code = reverse(code);
    const decompressionCode = {
        'E': '0000', 
        'R': '0001', 
        'T': '0010', 
        'Y': '0011', 
        'U': '0100', 
        'D': '0101', 
        'F': '0110', 
        'G': '0111', 
        'H': '1000', 
        'J': '1001', 
        'C': '1010', 
        'V': '1011', 
        'B': '1100', 
        'N': '1101', 
        'M': '1110', 
        'X': '1111'
    };
    var newCode = "";
    while (code.length > 0) {
        newCode += decompressionCode[code.substring(0, 1)];
        code = code.substring(1);
    }
    return reverse(newCode);
}

function reverse(string) {
    return string.split('').reverse().join('');
}

export {compression, decompression, reverse};
