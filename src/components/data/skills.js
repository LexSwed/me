let techs = [
    {
        title: 'npm',
        url: 'https://www.npmjs.com/'
    },
    {
        title: 'Pug',
        url: 'https://pugjs.org'
    },
    {
        title: 'SCSS',
        url: 'http://sass-lang.com/'
    },
    {
        title: 'Gulp',
        url: 'http://gulpjs.com/'
    },
    {
        title: 'jQuery',
        url: '"https://jquery.com/'
    },
    {
        title: 'Bootstrap',
        url: 'http://getbootstrap.com/'
    },
    {
        title: 'Materialize CSS',
        url: 'http://materializecss.com/'
    }
].map(({ title, url }) => `<a href="${url}" target="_blank" rel="noopener">${title}</a>`).join(', ')
export const whoDescription = [
    {
        title: "Web designer",
        short: "Responsible for creating awesome web pages based on drawn design templates",
        content: `I wrote a lot of HTML, CSS and jQuery for web sites, the latest of which were designed by myself.
                While creating design for a new feature, I always keep in mind all the sides:
                how I will implement it, how user will iteract with it and how this will look like.
                To implement all the ideas I had and to know what I can do, I used different technologies, includes ${techs}`,
        img: "web-design"
    },
    {
        title: "Front-end developer",
        short: "I am a JavaScript developer... as yet",
        content: `I started my way from learning Maths and Software Engineering basics in my University.
        With time, JS evolved in the most popular programming language in the world and I was drawn into it's world.
        I am proud of being a part of the world's largest community in the world, where people generete such a beautiful
        ideas and things that made our Web to look and feel such amazing. I always follow the latest trends and tooling
        and for now this is only the beggining...`,
        img: "front-end"
    }
];
