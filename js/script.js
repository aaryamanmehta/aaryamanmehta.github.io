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


    "Education": {
      index: 3,
      title: "Education",
      selectedIndex: 0,
      active: false,
      icon: "icons/music.png",
      items: [
      { title: "University of Massachusetts Amherst", subtitle: "B.S in Computer Science", active: false, icon: "icons/server-search.png" },
      { title: "Canadian International School (Bangalore)", subtitle: "International Baccalaureate Diploma", active: false, icon: "icons/playlist.png", href: "" },] },


    "Social": {
      index: 4,
      title: "Social",
      selectedIndex: 0,
      active: false,
      icon: "icons/video.png",
      items: [
      { title: "Contact me!", subtitle: "", active: false, icon: "icons/folder.png", href: "mailto:aaryaman.s.m@gmail.com" },
      { title: "LinkedIn", subtitle: "", active: false, icon: "icons/server-search.png", href:"" },
      { title: "GitHub", subtitle: "", active: false, icon: "icons/upload.png", href: "" },] },
		
    "Skills": {
      index: 5,
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
    window.location.href = currentSubmenu.href;
  }
  else if (currentSubmenu.title === "Aaryaman Mehta") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "Aaryaman Mehta blah blah blah";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "MeetMeHalfway") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "meetmehalfaay blah blah blah";
      $('body').off('keyup');    
    }
    else if (currentSubmenu.title === "EleNa") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "EleNa blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "DynaBoard") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "DynaBoard blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Customer Service Associate") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "Customer Service Associate blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Software Development Team Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "Software Development Team Intern blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Front-End Developer Intern") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "Front-End Developer Intern blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "University of Massachusetts Amherst") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "University of Massachusetts Amherst blah blah blah";
      $('body').off('keyup');
    }
    else if (currentSubmenu.title === "Canadian International School (Bangalore)") {
      popup.classList.add("visible");
      xmb.classList.add("invisible");
      popup.textContent = "Canadian International School (Bangalore) blah blah blah";
      $('body').off('keyup');
    }
  }

function linkbackward() {
  popup.classList.remove("visible")
  xmb.classList.remove("invisible");
}