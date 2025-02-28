const bcrypt = require("bcryptjs");

async function generateHashes() {
    const passwords = {
        recruiter: "recruiterpassword",
        hiringmanager: "hiringmanagerpassword",
        interviewer: "interviewerpassword",
        admin: "adminpassword"
    };

    for (const role in passwords) {
        const hashedPassword = await bcrypt.hash(passwords[role], 10);
        console.log(`${role}: ${hashedPassword}`);
    }
}

generateHashes();
