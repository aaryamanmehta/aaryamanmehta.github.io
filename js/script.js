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
			{ title: "Welcome!", subtitle: "Navigate using the arrow/WASD, enter, and backspace keys!", active: false, icon: "icons/power.png", href: "" },
      { title: "Aaryaman Mehta", subtitle: "About Me", active: true, icon: "icons/000.png", href: "" }] },

    "Projects": {
      index: 1,
      title: "Projects",
      selectedIndex: 0,
      active: false,
      icon: "icons/settings.png",
      items: [
      { title: "MeetMeHalfway", subtitle: "", active: false, icon: "icons/system-update.png", href:"" },
      { title: "EleNa", subtitle: "", active: false, icon: "icons/game-settings.png", href:"" },
      { title: "DynaBoard", subtitle: "", active: false, icon: "icons/video-settings.png", href: "" },
      { title: "Network Settings", subtitle: "Adjusts settings for the Internet connection.", active: false, icon: "icons/network-settings.png", href: "" },]
			 	},

    "Experience": {
      index: 2,
      title: "Experience",
      selectedIndex: 0,
      active: false,
      icon: "icons/photo.png",
      items: [      
        { title: "Customer Service Associate", subtitle: "Residential Life Services at UMass Amherst", active: false, icon: "icons/server-search.png", href:"" },
        { title: "Software Development Team Intern", subtitle: "ISO New England (ISO-NE)", active: false, icon: "icons/photo-gallery.png", href: ""},
        { title: "Front-End Developer Intern", subtitle: "Aspec Sciré", active: false, icon: "icons/playlist.png", href: "" },] },

      
    "Coursework": {
      index: 3,
      title: "Coursework",
      selectedIndex: 0,
      active: false,
      icon: "icons/photo.png",
      items: [ //could always add more coursework
        { title: "Introduction to Algorithms", subtitle: "", active: false, icon: "icons/server-search.png", href:"" },
        { title: "Web Programming", subtitle: "", active: false, icon: "icons/photo-gallery.png", href: ""},
        { title: "Practice and Applications of Data Management", subtitle: "", active: false, icon: "icons/server-search.png", href:"" },
        { title: "Data Structures", subtitle: "", active: false, icon: "icons/photo-gallery.png", href: ""},
        { title: "Theory and Practice of Software Engineering", subtitle: "", active: false, icon: "icons/playlist.png", href: "" },] },

    "Education": {
      index: 4,
      title: "Education",
      selectedIndex: 0,
      active: false,
      icon: "icons/music.png",
      items: [
      { title: "University of Massachusetts Amherst", subtitle: "B.S in Computer Science", active: false, icon: "icons/server-search.png" },
      { title: "Canadian International School (Bangalore)", subtitle: "International Baccalaureate Diploma", active: false, icon: "icons/playlist.png", href: "" },] },

    "Social": {
      index: 5,
      title: "Social",
      selectedIndex: 0,
      active: false,
      icon: "icons/video.png",
      items: [
      { title: "Contact me!", subtitle: "aaryaman.s.m@gmail.com", active: false, icon: "icons/folder.png", href: "https://mail.google.com/mail/?view=cm&tf=0&to=aaryaman.s.m@gmail.com" },
      { title: "LinkedIn", subtitle: "", active: false, icon: "icons/server-search.png", href:"https://www.linkedin.com/in/aaryamanmehta/" },
      { title: "GitHub", subtitle: "", active: false, icon: "icons/upload.png", href: "https://github.com/aaryamanmehta" },] },
		
    "Skills": {
      index: 6,
      title: "Skills",
      selectedIndex: 0,
      active: false,
      icon: "icons/play.png",
      items: [
        { title: "HTML/CSS", subtitle: "", active: false, icon: "icons/folder.png", href: "" },
        { title: "JavaScript", subtitle: "", active: false, icon: "icons/folder.png", href: "" },
        { title: "React", subtitle: "", active: false, icon: "icons/memory-card.png", href: "" },
        { title: "PostgreSQL", subtitle: "", active: false, icon: "icons/folder-remote.png", href: "" },
        { title: "Node.JS", subtitle: "", active: false, icon: "icons/folder-game.png", href: "" },
        { title: "Java", subtitle: "", active: false, icon: "icons/store-logo.png", href: "" },
        { title: "Python", subtitle: "", active: false, icon: "album", href: "https://play.geforcenow.com/" }
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
  if (e.key == "Backspace") {
    linkbackward();
    audio.play();
    movementKeys();
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
      popup.innerHTML = "<p>Hi! I'm Aaryaman Mehta.<br><br>I'm a senior Computer Science student at UMass Amherst. I like to spend my free time at the gym, playing tennis, or gaming. I'm currently enjoying a playthrough of Elden Ring, though I've recently been playing a lot more Mario Kart and Mario Party with my friends. Since college, I've gained experience working with development teams on a number of software projects, collaborating with others to build systems that meet a variety of needs. I've particularly taken a liking to web development and front-end development! <br><br> As I near graduation, I am currently exploring opportunities in software engineering and am eager to contribute my skills to new projects and challenges. I'm always looking to learn and grow as a developer and would welcome the chance to discuss any opportunities that may be available.</p>";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "MeetMeHalfway") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "meetmehalfaay blah blah blah";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "EleNa") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "EleNa blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "DynaBoard") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "DynaBoard blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Customer Service Associate") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Customer Service Associate at Residential Life Services at UMass Amherst<br><br>Amherst, MA<br><br>Feb. 2023 - Present<br><br>As a CSA, I was responsible for assisting with the management of daily operations, including check-ins/check-outs, lock outs, lost keys, maintenance requests, and delivering mail and packages.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Software Development Team Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Software Development Team Intern at ISO New England (ISO-NE)<br><br>Amherst, MA<br><br>Sep. 2022 - Dec. 2022<br><br>At ISO-NE, I collaborated with a team of software developers in Scrum to create a dynamic data comparison GUI that visualizes LMP data.<br><br>The GUI is a dashboard, titled DynaBoard, that performs sanity checks to ensure consistency between a provided data model and a simulation data model, and provides statistical analysis of models. We used Supabase (PostgreSQL DB), Next.JS, and Plotly.JS as a charting library in development.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Front-End Developer Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Front-End Developer Intern at Aspec Sciré<br><br>Bangalore, IND<br><br>May. 2022 - Aug. 2022<br><br>As it was my first internship as a novice programmer, I undertook formal training in React by mentors at Aspec Sciré in order to migrate from Mapbox to Openlayers in Vimana, a platform for processing, visualizing, storing and organizing data collected from drones.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Introduction to Algorithms") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Introduction to Algorithms<br><br>Introduces sorting, searching, string-processing, and graph algorithms, as well as dynamic programming and NP-completeness.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Web Programming") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Web Programming<br><br>Currently taking<br><br>Develops web programming experience, including HTML, CSS, JavaScript, AJAX, JavaScript libraries and web security.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Practice and Applications of Data Management") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Practice and Applications of Data Management<br><br>Currently taking<br><br>Develops data management experience, including SQL, relational schema design, basic transaction implementation, and data visualization tools.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Data Structures") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Data Structures<br><br>Introduces and develops methods for designing and implementing abstract data types, such as linked structures, recursive structures, stacks, queues, binary trees, balanced trees, graphs, and hash tables.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Theory and Practice of Software Engineering") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Theory and Practice of Software Engineering<br><br>Currently taking<br><br>Develops software engineering experience, including requirements engineering, software testing, program analysis and automated software engineering.</p>";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "University of Massachusetts Amherst") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>University of Massachusetts Amherst<br><br>Amherst, MA<br><br>Expected Dec. 2023<br><br>Cumulative GPA of 3.62<br><br>I am a recipient of the Chancellor’s Award Scholarship, and I have been on the Dean's List for all my semesters in college.</p>";
      $('body').off('keyup');
    }
    // could add more coursework ??? 
    else if (currentSubmenu.title === "Canadian International School (Bangalore)") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.innerHTML = "<p>Canadian International School (Bangalore)<br><br>Bangalore, IND<br><br>Aug. 2018 - May 2020<br><br>I received the International Baccalaureate Diploma with a score of 35.</p>";
      $('body').off('keyup');
    }
  }

function linkbackward() {
  popup.classList.remove("visible")
  xmb.classList.remove("invisible");
}