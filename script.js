// Menu Bar
var menuBtn =document.getElementById("menuBtn");
var sideNav =document.getElementById("sideNav");

sideNav.style.right="-250px";
menuBtn.onclick = function(){
    if(sideNav.style.right == "-250px"){
        sideNav.style.right ="0";
    }
    else{
        sideNav.style.right ="-250px"
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Color theme functionality
    const colorButtons = document.querySelectorAll('.color-btn,.alabama-logo-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bgColor = this.getAttribute('data-bgcolor');
            const textColor = this.getAttribute('data-textcolor');
            const bgImage = this.getAttribute('data-bgimage');
            if (bgImage) {
                document.body.style.backgroundImage = bgImage;
                document.body.style.backgroundColor = 'transparent';
            } else {
                document.body.style.backgroundColor = bgColor;
                document.body.style.backgroundImage = 'none';
            }
            document.body.style.color = textColor;
            updateColors(bgColor, textColor);
        });
    });

    function updateColors(bgColor, textColor) {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.style.color = (bgColor === '#000000') ? '#D50A0A' : textColor;
        });
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.style.color = (bgColor === '#ffffff') ? '#000' : textColor;
        });
        const subtitles = document.querySelectorAll('.sub-title');
        subtitles.forEach(subtitle => {
            subtitle.style.color = (bgColor === '#ffffff') ? '#000' : '#fff';
        });
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.color = (bgColor === '#19dbe6') ? '#000' : textColor;
        });
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.color = (bgColor === '#ffffff') ? '#000' : '#fff';
        }
    }

    // Schedule data
    const schedule = [
        { opponent: "Western Kentucky", result: "W, 63-0", date: "2024-08-31T19:00:00", channel: "ESPN", location: "Tuscaloosa, Ala." },
        { opponent: "USF", result: "W, 42-16", date: "2024-09-07T19:00:00", channel: "ESPN", location: "Tuscaloosa, Ala." },
        { opponent: "Wisconsin", result: "W, 42-10", date: "2024-09-14T12:00:00", channel: "FOX", location: "Madison, Wis." },
        { opponent: "Georgia", result: "w 41-34", date: "2024-09-28T19:30:00", channel: "ABC", location: "Tuscaloosa, Ala." },
        { opponent: "Vanderbilt", result: "L 41-35 ", date: "2024-10-05T16:35:00", channel: "TBA", location: "Nashville, Tenn." },
        { opponent: "South Carolina", result: "W 27-25", date: "2024-10-12T12:00:00", channel: "ABC or ESPN", location: "Tuscaloosa, Ala." },
        { opponent: "Tennessee", result: "L 24-17", date: "2024-10-19T00:00:00", channel: "TBA", location: "Knoxville, Tenn." },
        { opponent: "Missouri", result: "w 34-0", date: "2024-10-26T00:00:00", channel: "TBA", location: "Tuscaloosa, Ala." },
        { opponent: "LSU", result: "", date: "2024-11-09T00:00:00", channel: "TBA", location: "Baton Rouge, La." },
        { opponent: "Mercer", result: "", date: "2024-11-16T14:00:00", channel: "ESPN+/SEC Network+", location: "Tuscaloosa, Ala." },
        { opponent: "Oklahoma", result: "", date: "2024-11-23T00:00:00", channel: "TBA", location: "Norman, Okla." },
        { opponent: "Auburn", result: "", date: "2024-11-30T00:00:00", channel: "TBA", location: "Tuscaloosa, Ala." }
    ];

    function updateSchedule() {
        const scheduleList = document.querySelector('.schedule-list');
        if (!scheduleList) return;

        scheduleList.innerHTML = '';
        const currentDate = new Date();

        const futureGames = schedule.filter(game => new Date(game.date) > currentDate);

        if (futureGames.length === 0) {
            scheduleList.innerHTML = '<p>No upcoming games scheduled.</p>';
        } else {
            futureGames.forEach(game => {
                const gameDate = new Date(game.date);
                const listItem = document.createElement('div');
                listItem.classList.add('schedule-item');
                listItem.innerHTML = `
                    <h3>${game.opponent}</h3>
                    <p>Date: ${gameDate.toLocaleDateString()}</p>
                    <p>Time: ${gameDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p>Channel: ${game.channel}</p>
                    <p>Location: ${game.location}</p>
                `;
                scheduleList.appendChild(listItem);
            });

            // Update countdown for the next game
            updateCountdown(new Date(futureGames[0].date));
        }
    }

    function updateCountdown(nextGameDate) {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
      
        function createDigitElement(value, label) {
          return `
            <div class="countdown-digit">
              <div class="digit-top">${value}</div>
              <div class="digit-bottom">${value}</div>
              <span class="label">${label}</span>
            </div>
          `;
        }
      
        function calculateTimeLeft() {
          const now = new Date();
          const difference = nextGameDate - now;
      
          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
            countdownElement.innerHTML = `
              ${createDigitElement(days, 'Days')}
              ${createDigitElement(hours, 'Hours')}
              ${createDigitElement(minutes, 'Minutes')}
              ${createDigitElement(seconds, 'Seconds')}
            `;
      
            // Animate changing digits
            const digits = countdownElement.querySelectorAll('.countdown-digit');
            digits.forEach(digit => {
              const top = digit.querySelector('.digit-top');
              const bottom = digit.querySelector('.digit-bottom');
              if (top.textContent !== bottom.textContent) {
                digit.classList.add('flip');
                setTimeout(() => {
                  digit.classList.remove('flip');
                  bottom.textContent = top.textContent;
                }, 500);
              }
            });
          } else {
            countdownElement.innerHTML = "Game day!";
          }
        }
      
        calculateTimeLeft();
        setInterval(calculateTimeLeft, 1000);
      }

    // Recent Results Functionality
    const resultsPerPage = 2; // Number of results to display at a time
    let currentResultPage = 1;

    function updateRecentResults() {
        const resultsList = document.querySelector('.results-list');
        const loadMoreBtn = document.getElementById('load-more-results');
        if (!resultsList || !loadMoreBtn) return;

        resultsList.innerHTML = ''; // Clear existing results
        const currentDate = new Date();

        const pastGames = schedule.filter(game => new Date(game.date) < currentDate && game.result);
        pastGames.reverse(); // Show most recent games first

        const visibleResults = pastGames.slice(0, resultsPerPage * currentResultPage); // Paginate results

        visibleResults.forEach(game => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${game.opponent}</h3>
                <p>${game.result}</p>
                <p>${formatDate(new Date(game.date))} | ${formatTime(new Date(game.date))}</p>
                <p>${game.channel} | ${game.location}</p>
            `;
            resultsList.appendChild(resultItem);
        });

        if (visibleResults.length >= pastGames.length) {
            loadMoreBtn.style.display = 'none'; // Hide the button if no more results
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Event listener for Load More button
    const loadMoreBtn = document.getElementById('load-more-results');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentResultPage++; // Increase the page number to show more results
            updateRecentResults();
        });
    }

    // Helper functions for date and time formatting
    function formatDate(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }

    /// Fan Poll functionality
const pollForm = document.getElementById('poll-form');
const pollResults = document.getElementById('poll-results');

function initializeVotes() {
    const storedData = JSON.parse(localStorage.getItem('fanPollData')) || {};
    const currentDate = new Date().toDateString();

    if (storedData.lastResetDate !== currentDate) {
        // It's a new day, reset the votes
        return {
            votes: {},
            lastResetDate: currentDate
        };
    }
    return storedData;
}

let pollData = initializeVotes();

function updateLocalStorage() {
    localStorage.setItem('fanPollData', JSON.stringify(pollData));
}

if (pollForm) {
    pollForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const playerName = document.getElementById('player-name').value;
        if (playerName) {
            pollData.votes[playerName] = (pollData.votes[playerName] || 0) + 1;
            updateLocalStorage();
            updatePollResults();
            pollForm.reset();
        }
    });
}

function updatePollResults() {
    if (pollResults) {
        const sortedVotes = Object.entries(pollData.votes).sort((a, b) => b[1] - a[1]);
        pollResults.innerHTML = '<h3>Current Poll Results:</h3>';
        sortedVotes.forEach(([player, voteCount]) => {
            pollResults.innerHTML += `<p>${player}: ${voteCount} votes</p>`;
        });
    }
}

// Call updatePollResults on page load to display existing votes
updatePollResults();

    // Highlight Reel Functionality
    const highlightVideos = [
        'JGwGXA7hqdg',
        'qx93e3TBktY',
        'yYk0q-HGphE',
        'ae4vpzIxL6k',
    ];

    let currentVideoIndex = 0;
    let player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video-player', {
            height: '315',
            width: '560',
            videoId: highlightVideos[currentVideoIndex],
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        const playButton = document.getElementById('play-video');
        const nextButton = document.getElementById('next-highlight');

        playButton.addEventListener('click', function() {
            if (player.getPlayerState() == YT.PlayerState.PLAYING) {
                player.pauseVideo();
                playButton.textContent = 'Play';
            } else {
                player.playVideo();
                playButton.textContent = 'Pause';
            }
        });

        nextButton.addEventListener('click', function() {
            currentVideoIndex = (currentVideoIndex + 1) % highlightVideos.length;
            player.loadVideoById(highlightVideos[currentVideoIndex]);
            playButton.textContent = 'Pause';
        });
    }

    // Call onYouTubeIframeAPIReady when the API is loaded
    if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
    } else {
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } 

    // Initial calls to set up the page
    updateSchedule();
    updateRecentResults();
    setInterval(updateSchedule, 60000); // Refresh the schedule every minute
});
