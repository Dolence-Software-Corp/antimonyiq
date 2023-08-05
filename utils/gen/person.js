const usedUsernames = new Set();

async function gen_username() {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    function getRandomChar(set) {
        return set.charAt(Math.floor(Math.random() * set.length));
    }

    function generateSyllable() {
        const pattern = getRandomChar(consonants) + getRandomChar(vowels);
        return pattern;
    }

    function generateUsername() {
        let username = '';
        const targetLength = 10;
        while (username.length < targetLength) {
            const remainingCharacters = targetLength - username.length;
            const syllableCount = Math.min(2, remainingCharacters);
            for (let i = 0; i < syllableCount; i++) {
                username += generateSyllable();
            }
        }

        return username.substr(0, targetLength);
    }

    let username = generateUsername();
    while (usedUsernames.has(username)) {
        username = generateUsername();
    }

    usedUsernames.add(username);
    return username;
}

async function generatePerson() {
    const firstname = null;
    const lastname = null;
    const fullname = null;
    const avatar = null;
    const username = gen_username();

    const Person = {
        firstname: firstname,
        lastname: lastname,
        fullname: fullname,
        username: username,
        avatar: avatar
    }

    return Person;
}

export default {
    generatePerson
};