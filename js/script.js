var ICON_SIZE = 100;
var PADDING = 70;
var yPADDING = 40;
var audio = new Audio('./icons/nav.mp3');
var model = {

  cursor: {
    x: 0,
    y: 0 },

  columns: {
    "Users": {
      index: 0,
      title: "Users",
      selectedIndex: 3,
      active: false,
      icon: "icons/users.png",
      items: [
			{ title: "Welcome!", subtitle: "Navigate using the arrow/WASD, enter, and backspace keys!", active: false, icon: "icons/welcome.png", href: "" },
      { title: "Aaryaman Mehta", subtitle: "About Me", active: true, icon: "icons/aaryaman.png", href: "" }] },

    "Projects": {
      index: 1,
      title: "Projects",
      selectedIndex: 0,
      active: false,
      icon: "icons/projects.png",
      items: [
        { title: "Tennis Club Project", subtitle: "", active: false, icon: "icons/tennis.png", href:"" },
        { title: "Egyptian Parkour Unity Game", subtitle: "", active: false, icon: "icons/parkour.png", href:"" },
      { title: "MeetMeHalfway", subtitle: "", active: false, icon: "icons/meetmehalfway.png", href:"" },
      { title: "ELeNA", subtitle: "", active: false, icon: "icons/elena2.png", href:"" },
      { title: "Seam Carving", subtitle: "", active: false, icon: "icons/seam.png", href: "" },
      { title: "Ray Tracing", subtitle: "", active: false, icon: "icons/raytracing.png", href: "" },
      ]},

    "Experience": {
      index: 2,
      title: "Experience",
      selectedIndex: 0,
      active: false,
      icon: "icons/experience.png",
      items: [      
        { title: "Customer Service Associate", subtitle: "Residential Life Services at UMass Amherst", active: false, icon: "icons/csa.png", href:"" },
        { title: "Software Development Team Intern", subtitle: "ISO New England (ISO-NE)", active: false, icon: "icons/engineer.png", href: ""},
        { title: "Front-End Developer Intern", subtitle: "Aspec Sciré", active: false, icon: "icons/frontend.png", href: "" },] },

    "Coursework": {
      index: 3,
      title: "Coursework",
      selectedIndex: 0,
      active: false,
      icon: "icons/coursework.png",
      items: [ //could always add more coursework
        { title: "Introduction to Algorithms", subtitle: "", active: false, icon: "icons/algorithms.png", href:"" },
        { title: "Data Structures", subtitle: "", active: false, icon: "icons/datastructures.png", href: ""},
        { title: "Web Programming", subtitle: "", active: false, icon: "icons/web.png", href: ""},
        { title: "Scalable Web Systems", subtitle: "", active: false, icon: "icons/scalable.png", href: ""},
        { title: "Practice and Applications of Data Management", subtitle: "", active: false, icon: "icons/datamanagement.png", href:"" },
        { title: "Theory and Practice of Software Engineering", subtitle: "", active: false, icon: "icons/engineering.png", href: "" },
        { title: "Introduction to Computer Graphics", subtitle: "", active: false, icon: "icons/graphics.png", href:"" },
        { title: "Game Programming", subtitle: "", active: false, icon: "icons/game.png", href:"" },
        { title: "Artificial Intelligence", subtitle: "", active: false, icon: "icons/ai.png", href:"" },] },

    "Education": {
      index: 4,
      title: "Education",
      selectedIndex: 0,
      active: false,
      icon: "icons/education.png",
      items: [
      { title: "University of Massachusetts Amherst", subtitle: "B.S in Computer Science", active: false, icon: "icons/umass.png" },
      { title: "Canadian International School (Bangalore)", subtitle: "International Baccalaureate Diploma", active: false, icon: "icons/cis.png", href: "" },] },

    "Social": {
      index: 5,
      title: "Social",
      selectedIndex: 0,
      active: false,
      icon: "icons/social.png",
      items: [
      { title: "Contact me!", subtitle: "aaryaman.s.m@gmail.com", active: false, icon: "icons/email.png", href: "https://mail.google.com/mail/?view=cm&tf=0&to=aaryaman.s.m@gmail.com" },
      { title: "LinkedIn", subtitle: "", active: false, icon: "icons/linkedin.png", href:"https://www.linkedin.com/in/aaryamanmehta/" },
      { title: "GitHub", subtitle: "", active: false, icon: "icons/github.png", href: "https://github.com/aaryamanmehta" },
      { title: "Resume", subtitle: "", active: false, icon: "icons/send.png", href: "icons/resume.pdf" },] },
		
    "Skills": {
      index: 6,
      title: "Skills",
      selectedIndex: 0,
      active: false,
      icon: "icons/skills.png",
      items: [
        { title: "JavaScript", subtitle: "", active: false, icon: "icons/js.png", href: "" },
        { title: "Java", subtitle: "", active: false, icon: "icons/java.png", href: "" },
        { title: "Python", subtitle: "", active: false, icon: "icons/python.png", href: "" },
        { title: "C#", subtitle: "", active: false, icon: "icons/csharp.png", href: "" },
        { title: "Svelte", subtitle: "", active: false, icon: "icons/python.png", href: "" },
        { title: "React", subtitle: "", active: false, icon: "icons/react.png", href: "" },
        { title: "Next.js", subtitle: "", active: false, icon: "icons/next.png", href: "" },
        { title: "Express.js", subtitle: "", active: false, icon: "icons/express.png", href: "" },
        { title: "Node.js", subtitle: "", active: false, icon: "icons/node.png", href: "" },
        { title: "HTML/CSS", subtitle: "", active: false, icon: "icons/htmlcss.png", href: "" },
        { title: "Docker", subtitle: "", active: false, icon: "icons/docker.png", href: "" },
        { title: "PM2", subtitle: "", active: false, icon: "icons/pm2.png", href: "" },
        { title: "SQL", subtitle: "", active: false, icon: "icons/postgres.png", href: "" },
        { title: "Git", subtitle: "", active: false, icon: "icons/git.png", href: "" },
        { title: "Jira", subtitle: "", active: false, icon: "icons/jira.png", href: "" },
        { title: "Unity", subtitle: "", active: false, icon: "icons/unity.png", href: "" },
      ] },
	} };

//add zero position to each column and item
_.each(model.columns, c => {
  c.position = { x: 0, y: 0 };
  _.each(c.items, i => {
    i.position = {
      x: 0,
      y: 0 };

  });
});

var xmbVue = new Vue({
  el: "#xmb",
  data: model,
  methods: {
    handleKey: function (dir, val) {
      this.cursor[dir] += val;
      var nCols = this.nColumns;

      // wrap x
      this.cursor.x = this.cursor.x % nCols;
      if (this.cursor.x < 0) {
        this.cursor.x = this.cursor.x + nCols;
      }

      //wrap y
      var nRows = this.nRows;
      this.cursor.y = this.cursor.y % nRows;
      if (this.cursor.y < 0) {
        this.cursor.y = this.cursor.y + nRows;
      }

      this.highlightCell(this.cursor.x, this.cursor.y);
    },
    highlightCell: function (column, row) {
    const firstRowPadding = 20;
    // Check if the user is on the first column and first item
    const isOnFirstColumn = column === 0;
    const isOnFirstItem = column === 0 && row === 0;

    // Add or remove the hide-video class based on the user's position
    if (isOnFirstColumn && isOnFirstItem) {
      document.getElementById("video").classList.add("hide-video");
    } else {
      document.getElementById("video").classList.remove("hide-video");
    }
      console.log(column, row);
      //update position of elements as well
      var xAccum = (-column - 1) * (ICON_SIZE + PADDING);
      if (column == 0) {
        xAccum += ICON_SIZE + PADDING;
      }
      var yAccum;

      _.each(this.columns, (col, colKey) => {
        col.active = false;
        yAccum = -(ICON_SIZE + yPADDING) * (row + 1);

        col.position.x = xAccum;
        xAccum += ICON_SIZE + PADDING;
        if (column === col.index || column === col.index + 1) {
          xAccum += ICON_SIZE / 2;
        }

        _.each(col.items, (item, rowN) => {
          if (rowN == row && col.index == column) {
            item.active = true;
            col.active = true;
          } else {
            item.active = false;
          }

          // if item is in the first row, add padding
          if (rowN === 0) {
            yAccum += firstRowPadding;
          }

          if (rowN == row) {
            yAccum += ICON_SIZE + yPADDING;
          }
          yAccum += ICON_SIZE + yPADDING;
          item.position.y = yAccum;

        });
      });
      this.cursor.y = row;
      this.cursor.x = column;
    }
  },

  watch: {
    cursor: function (e) {
      console.log('cursor mutated', e);
    }
  },

  computed: {
    nColumns: function () {
      return Object.keys(this.columns).length;
    },
    nRows: function () {
      //get the row at the current index
      var row = this.columnsArray[this.cursor.x];
      if (!row) {
        console.log('invalid row index: ', this.cursor.x);
        return 0;
      }
      return row.items.length; //todo: number of columns in this row
    },
    columnsArray: function () {
      //get columns in an array
      var arr = [];
      Object.keys(this.columns).forEach(key => {
        arr.push(this.columns[key]);
      });
      return _.sortBy(arr, 'index');
    } },

  created: function () {
    _.each(this.columns, column => {
      _.each(column.items, item => {
        item.active = false;
      });
    });
    this.highlightCell(this.cursor.x, this.cursor.y);
  } });


// handle movement based on keys
function movementKeys() {
  $('body').on('keyup', function (e) {
  if (e.key == "ArrowUp" || e.key == "W" || e.key == "w") {
    xmbVue.handleKey('y', -1);
  } else if (e.key == "ArrowDown" || e.key == "S" || e.key == "s") {
    xmbVue.handleKey('y', 1);
  } else if (e.key == "ArrowLeft" || e.key == "A" || e.key == "a") {
    xmbVue.handleKey('x', -1);
  } else if (e.key == "ArrowRight" || e.key == "D" || e.key == "d") {
    xmbVue.handleKey('x', 1);
  }
  audio.play();
});
};
movementKeys();

$('body').on('keydown', function (e) {
  if (e.key == "Enter") {
    linkforward();
    audio.play();
  }
});

$('body').on('keydown', function (e) {
  // get the popup menu
  var popup = document.getElementById("popup");
  if (e.key == "Backspace") {
    // if the popup menu is visible
    if (popup.classList.contains("visible")) {
      linkbackward();
      audio.play();
      movementKeys();  
    } else {
      // do nothing
    }
  }
});

function linkforward() {
  var currentSubmenu = xmbVue.columnsArray[xmbVue.cursor.x].items[xmbVue.cursor.y];
  if (currentSubmenu.href) {
    // open link in new tab
    window.open(currentSubmenu.href, '_blank');
  }
  else if (currentSubmenu.title === "Aaryaman Mehta") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Aaryaman Mehta <img src='./icons/aaryaman.png' alt='aaryaman icon'></p> <p>Hi! I'm Aaryaman Mehta.<br><br>I received my Bachelor's in Computer Science at UMass Amherst from September 2020 to December 2023. I like to spend my free time at the gym, listening to music, playing tennis, or gaming. I'm currently enjoying a playthrough of Elden Ring, though I've recently been playing a lot more Mario Kart and Mario Party with my friends. Since college, I've gained experience working with development teams on a number of software projects, collaborating with others to build systems that meet a variety of needs. I've particularly taken a liking to web development and front-end development! <br><br> As a recent graduate, I am currently exploring opportunities in software engineering and am eager to contribute my skills to new projects and challenges. I'm always looking to learn and grow as a developer and would welcome the chance to discuss any opportunities that may be available.</p>";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "Tennis Club Project") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Tennis Club Project <img src='./icons/tennis.png' alt='tennis club icon'></p><p class='tennis'>Tennis Club Project<br><br>The UMass Tennis Club Project is a comprehensive web application designed for the University of Massachusetts Tennis Club. The primary goal is to enhance the club's organization beyond the existing Discord server.<br><br>The website utilizes Svelte for dynamic UI and Express.js for microservices API, featuring three microservices: user-service, tournament-service, and notification-service. An event-bus facilitates communication among these microservices.<br><br>The Home page provides general club information, while the Membership page details membership benefits and payment information. The League page allows users to sign up for tournaments based on their ranking, with email notifications upon successful registration. The Players page lists all registered players, allowing users to view details and contact others for casual matches. The Profile page enables users to edit their information, with email notifications for updates. The Login page facilitates user authentication, albeit without passwords for the project's scope.<br><br>The tech stack includes Docker, Docker Compose, and PM2 for containerization, deployment, and scalability testing. I used Supabase for simple database management. The application aims to provide an aesthetically pleasing and scalable platform for UMass Tennis Club members to access information, register for events, and connect with fellow players.<br><br>The video to the right is a demonstration of the application for the class submission. Please watch it to get an idea of how the application works!</p><video class='tennisvideo' controls><source src='/icons/tennis.mp4' type='video/mp4'></video>";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "Egyptian Parkour Unity Game") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Egyptian Parkour Unity Game <img src='./icons/parkour.png' alt='egyptian parkour game icon'></p><p class='parkour'>Egyptian Parkour Unity Game<br><br>This Unity project is an Educational Parkour game set in Ancient Egypt. The game provides an immersive learning experience by integrating Egyptian historical content into the gameplay. Users must go through parkour challenges in order to retrieve 6 hidden treasures, each historically relevant and informative. The game concludes with an educational quiz, serving as a tool for assessing and reinforcing the knowledge acquired during the gameplay. The aim is to offer an engaging and educational experience through a blend of gaming and historical content.<br><br>I worked along a partner in this project, and my responsibilities primarily involved the implementation of parkour movements, such as ledge grabbing, sliding, and wall running (C# scripts). Additionally, I took charge of designing the parkour map, strategically crafting an environment that would challenge players to utilize these parkour skills effectively in pursuit of the 6 hidden treasures.<br><br>On the other hand, my partner responsible for retrieving assets, creating the environment for which the parkour map was made upon, mummy AI and spawning, treasure implementation, and lastly, the quiz at the end of the game.<br><br>Please check out the video to the left, demonstrating the design and gameplay. </p><video class='gamevideo' controls><source src='/icons/parkour.mp4' type='video/mp4'></video>";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "MeetMeHalfway") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>MeetMeHalfway <img src='./icons/meetmehalfway.png' alt='mmhw icon'></p><p class='mmh'>MeetMeHalfway<br><br>MeetMeHalfway is a web application that suggests convenient points for friend groups to meet one another based on their current locations. It allows a user to invite specific groups of friends to ‘meet up’, following which the app finds an ideal meeting location depending on the initial location of each user.<br><br>The application has a landing page, which is the user authentication. The user can either login into an existing account, or create a new one. MeetMeHalfway works by requesting and storing the user’s location into the database every time the user logs in. Once the user is signed in, they may select an existing friend group that consists of other users of the application. They may then choose to “invite”, which sends an email to the users of the friend group to sign in so as to update their current location, or “meet up”, which calculates a meeting point that exists in the middle between the locations of each user in the friend group.<br><br>Of course, there is a user profile page, and a friend groups page to create, modify, and delete friend groups.<br><br>The video to the right is a demonstration of the application for the class submission. It highlights MeetMeHalfway’s functionality and design.</p><video class='mmvideo' controls><source src='/icons/meetmehalfway.mp4' type='video/mp4'></video>";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "ELeNA") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>EleNa <img src='./icons/elena2.png' alt='elena icon'></p><p class='elena'>ELeNA<br><br>ELeNA is a map-based web application that enables users to decide routes between geographical locations based on elevation preference, and is within a user-specified percentage of the shortest path. ELeNA currently only considers elevation data within the Hampshire County area of Massachusetts, USA, as for university project purposes, we only required to store that data in the database, else we would've had to store several counties worth of elevation data. ELeNA uses OpenStreetMap’s API for for autocomplete functionality, the user would input the origin and destination addresses.<br><br>The user has several options to choose from when calculating the route from the origin and the destination. They may select the shortest path with no elevation. The user may also input a percentage value of the shortest path, essentially a value that limits the total distance between the two locations to x% of the shortest path, and can select whether to maximize or minimize elevation. The route will be displayed depending on the user’s preferences.<br><br>This software may be useful to those who need to plan a route based on elevation preferences, such as hikers, bikers, runners, or any outdoor enthusiasts.<br><br>The images to the left show a small, albeit non-neglible difference in the route between the two locations based on the elevation preference selected. In this case, the elevation factor only changed the very end of the route, hence the difference appears to be little. This is most likely a result of elevation not being much of a influence in this specific route.</p><img src='icons/elenaimage2.png' alt='elenaimage2' class='elena-image2'><img src='icons/elenaimage3.png' alt='elenaimage3' class='elena-image3'>";
      $('body').off('keyup');
    }
    // else if (currentSubmenu.title === "DynaBoard") {
    //   popup.classList.add("visible");
    //   xmb.classList.add("invisible");
    //   popup.innerHTML = "<p class = 'title'>DynaBoard <img src='./icons/dashboard.png' alt='dash icon'></p> DynaBoard blah blah blah";
    //   $('body').off('keyup');
    // }
    else if (currentSubmenu.title === "Seam Carving") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Seam Carving <img src='./icons/seam.png' alt='seam icon'></p> <p class='seam'>Seam Carving<br><br>This project implements the Seam Carving algorithm, which is a technique for resizing images in a content-aware manner. The idea is to remove or add pixels in areas of the image that are less important to preserve, such as regions with uniform color, in order to maintain the overall structure and content of the image. This is done by computing the energy of each pixel in the image, which represents how important that pixel is to the image. Then, a seam is found in the image that has the lowest cumulative energy, and the pixels in that seam are removed. This process is repeated until the desired image size is reached.<br><br> My implementation of the algorithm includes two main functions. The <i>compute_energy</i> function takes an image as input and returns an array of energies for each pixel in the image. The energy is calculated based on the color differences between adjacent pixels using a formula that gives higher values to pixels that are on the edges of the image or have a high contrast with their neighbors.<br><br> The <i>find_vertical_seam</i> function takes an image and its corresponding energy array as input and returns the indices of the pixels in the vertical seam with the lowest cumulative energy. This is done using a path-finding algorithm that finds the minimum-cost path from the top to the bottom of the image. The seam is then removed by shifting the pixels to the left, and the process is repeated until the desired image width is reached. The same process can be applied to the image's height by transposing the image and finding horizontal seams.</p><img src='icons/InputImage.png' alt='Input Image' class='seam-image1'><img src='icons/vertical_carving.gif' alt='Vertical Seam Carving' class='seam-image2'><img src='icons/horizontal_carving.gif' alt='Horizontal Seam Carving' class='seam-image3'>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Ray Tracing") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Ray Tracing <img src='./icons/raytracing.png' alt='raytracing icon'></p> <p class='raytracing'>Ray Tracing<br><br>The project aims to create a simple ray tracer that can generate realistic images by simulating the physics of light. It uses a set of mathematical equations to simulate the path of light from a light source to an observer's eye.<br><br>The ray tracing technique works by casting rays from the observer's eye through each pixel of the image plane into the scene. Each ray is tested for intersection with objects in the scene, and the resulting color of the pixel is computed based on the properties of the intersected object and the light sources in the scene.<br><br>The project implements the basic functionality of ray tracing, including ray-object intersection, reflection, and refraction. It uses the THREE.js library to create and render 3D objects in a scene. The program also includes ambient occlusion, which creates the effect of shadows in a scene by simulating the occlusion of light from objects to create more realistic images</p><img src='icons/raytracingimage1.png' alt='raytracingimage1' class='raytracing-image1'><img src='icons/raytracingimage2.png' alt='raytracingimage2' class='raytracing-image2'><img src='icons/raytracingimage3.png' alt='raytracingimage3' class='raytracing-image3'><img src='icons/raytracingimage4.png' alt='raytracingimage4' class='raytracing-image4'>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Customer Service Associate") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Customer Service Associate <img src='./icons/csa.png' alt='csa icon'> </p><p>Customer Service Associate at Residential Life Services at UMass Amherst<br><br>Amherst, MA<br><br>Feb. 2023 - Dec. 2023<br><br>As a CSA, I was responsible for assisting with the management of daily operations using Salesforce and SqBx, including check-ins/check-outs, lock outs, lost keys, maintenance requests, and delivering mail and packages.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Software Development Team Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Software Development Team Intern <img src='./icons/engineer.png' alt='engineer icon'></p> <p>Software Development Team Intern at ISO New England (ISO-NE)<br><br>Amherst, MA<br><br>Sept. 2022 - Dec. 2022<br><br>At ISO-NE, I collaborated with a team of software developers in Scrum to create a dynamic data comparison GUI that visualizes LMP data.<br><br>The GUI is a dashboard, titled DynaBoard, that performs sanity checks to ensure consistency between a provided data model and a simulation data model, and provides statistical analysis of models. We used Supabase (PostgreSQL DB), Next.js, and Plotly.js as a charting library in development.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Front-End Developer Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Front-End Developer Intern <img src='./icons/frontend.png' alt='frontend icon'></p> <p>Front-End Developer Intern at Aspec Sciré<br><br>Bangalore, IND<br><br>May 2022 - Aug. 2022<br><br>As it was my first internship as a novice programmer, I undertook formal training in React by mentors at Aspec Sciré in order to migrate from Mapbox to Openlayers in Vimana, a platform for processing, visualizing, storing and organizing data collected from drones.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Introduction to Algorithms") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Introduction to Algorithms <img src='./icons/algorithms.png' alt='algorithms icon'></p><p>Introduction to Algorithms<br><br>Introduces sorting, searching, string-processing, and graph algorithms, as well as dynamic programming and NP-completeness.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Web Programming") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Web Programming <img src='./icons/web.png' alt='web icon'></p><p>Web Programming<br><br>Develops web programming experience, including HTML, CSS, JavaScript, AJAX, JavaScript libraries and web security.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Practice and Applications of Data Management") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Practice and Applications of Data Management <img src='./icons/datamanagement.png' alt='datamanagement icon'></p><p>Practice and Applications of Data Management<br><br>Develops data management experience, including SQL, relational schema design, basic transaction implementation, and data visualization tools.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Introduction to Computer Graphics") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Introduction to Computer Graphics <img src='./icons/graphics.png' alt='graphics icon'></p><p>Introduction to Computer Graphics<br><br>Introduces fundamental concepts of 2D and 3D computer graphics, such as image processing, 2D/3D modelling, 3D graphics pipeline, WebGL, shading, texture mapping and ray tracing.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Artificial Intelligence") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Artificial Intelligence <img src='./icons/ai.png' alt='ai icon'></p><p>Artificial Intelligence<br><br>Introduces AI concepts, such as search strategies, knowledge representation, machine learning, and formal logic.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Data Structures") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Data Structures <img src='./icons/datastructures.png' alt='datastructures icon'></p><p>Data Structures<br><br>Introduces and develops methods for designing and implementing abstract data types, such as linked structures, recursive structures, stacks, queues, binary trees, balanced trees, graphs, and hash tables.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Theory and Practice of Software Engineering") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Theory and Practice of Software Engineering <img src='./icons/engineering.png' alt='engineering icon'></p><p>Theory and Practice of Software Engineering<br><br>Develops software engineering experience, including requirements engineering, software testing, program analysis and automated software engineering.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Scalable Web Systems") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Scalable Web Systems <img src='./icons/scalable.png' alt='scalable icon'></p><p>Scalabe Web Systems<br><br>Develops proficiency in defining modern distributed web application architecture concepts and addressing scalability issues. Acquire knowledge about the asynchronous nature of JavaScript, event-loop models in browsers and Node.js, and their impact on web application scalability. Implement micro-service-based web applications, emphasizing the usage of Docker containers. Apply languages like TypeScript and modern UI frameworks to develop scalable web applications.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Game Programming") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Game Programming <img src='./icons/game.png' alt='game icon'></p><p>Game Programming<br><br>Introduces computer game development, including scene modeling, physics engines, animation, character rigging, game AI, game UI, audio effects and networking.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "University of Massachusetts Amherst") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>University of Massachusetts Amherst <img src='./icons/umass.png' alt='umass icon'></p><p>University of Massachusetts Amherst<br><br>Amherst, MA<br><br>Graduated Sept. 2020 - Dec. 2023<br><br>Cumulative GPA of 3.57<br><br>I am a recipient of the Chancellor’s Award Scholarship, and I have been on the Dean's List for all my semesters in college.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Canadian International School (Bangalore)") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p class = 'title'>Canadian International School (Bangalore) <img src='./icons/cis.png' alt='cis icon'></p><p>Canadian International School (Bangalore)<br><br>Bangalore, IND<br><br>Aug. 2018 - May 2020<br><br>I received the International Baccalaureate Diploma with a score of 35.</p>";
      $('body').off('keyup');
    }
  }

function linkbackward() {
  popup.classList.remove("visible")
  xmb.classList.remove("invisible");
}