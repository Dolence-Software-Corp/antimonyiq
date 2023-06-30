const db = require('./db');


async function fetchPortfolioData() {
    try {
        const response = await fetch('portfolio.json');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}

async function addProject(data) {
    const dbclient = new db('projects');
    dbclient.load();

    dbclient.set('projects', 'wishpo', [
        {
            "title": "Project 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "image": "project1.jpg",
            "demo": "https://example.com/project1-demo",
            "source": "https://github.com/johndoe/project1"
        },
        {
            "title": "Project 2",
            "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "image": "project2.jpg",
            "demo": "https://example.com/project2-demo",
            "source": "https://github.com/johndoe/project2"
        }
    ]);

    dbclient.save();
}


addProject();
// fetchPortfolioData();
  