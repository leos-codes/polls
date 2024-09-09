//Date updated
document.getElementById('last-up').innerText = "Last update: Sep 9th, 24; 11:08am";

let demVotes = 0, repVotes = 0;
let demColor = "black", repColor = "black";
let demText = "", repText = "";

//Get States' IDs
const mapSvg = document.getElementById("map");
const states = mapSvg.querySelectorAll('[id]');
const statesArray = Array.from(states).map(element => element.id);
const battlegroundArray = ["MN-map-battleground", "MI-map-battleground", "WI-map-battleground", "PA-map-battleground", "VA-map-battleground", "NV-map-battleground", "AZ-map-battleground", "GA-map-battleground", "NC-map-battleground"];
const loopLength = statesArray.length;

var statePolls = {

    // Battleground states
    //state: calculateLead (Dem, Rep)
    "AZ": calculateLead(45.7, 46.2), // Arizona
    "FL": calculateLead(44.1, 48.5), // Florida
    "GA": calculateLead(46.6, 46.3), // Georgia
    "MI": calculateLead(46.8, 44.9), // Michigan
    "MN": calculateLead(48.9, 41.6), // Minnesota
    "NV": calculateLead(46, 45.5), // Nevada
    "NH": calculateLead(50.3, 43.7), // New Hampshire
    "NC": calculateLead(45.9, 46.7), // North Carolina
    "PA": calculateLead(46.4, 45.8), // Pennsylvania
    "VA": calculateLead(48.2, 43.2), // Virginia
    "WI": calculateLead(47.7, 44.9), // Wisconsin
    //meh states
    "AL": calculateLead(38,57), // Alabama
    "AK": calculateLead(36,55), // Alaska
    "AR": calculateLead(24,57), // Arkansas
    "CA": calculateLead(65,35), // California
    "CO": calculateLead(49,39), // Colorado
    "CT": calculateLead(46,36), // Connecticut
    "DE": calculateLead(46,36), // Delaware
    "HI": calculateLead(42, 34), // Hawaii
    "ID": calculateLead(26, 55), // Idaho
    "IL": calculateLead(43, 34), // Illinois
    "IN": calculateLead(29, 45), // Indiana
    "IA": calculateLead(39, 51), // Iowa
    "KS": calculateLead(31, 47), // Kansas
    "KY": calculateLead(26, 55), // Kentucky
    "LA": calculateLead(33, 48), // Louisiana
    "ME": calculateLead(52, 47), // Maine
    "MD": calculateLead(56, 30), // Maryland
    "MA": calculateLead(47, 29), // Massachusetts
    "MS": calculateLead(37, 49), // Mississippi
    "MO": calculateLead(41, 59), // Missouri
    "MT": calculateLead(39.6, 57), // Montana
    "NE": calculateLead(42, 50), // Nebraska
    "NJ": calculateLead(41, 36), // New Jersey
    "NM": calculateLead(51, 40), // New Mexico
    "NY": calculateLead(58, 42), // New York
    "ND": calculateLead(28, 62), // North Dakota
    "OH": calculateLead(44, 52.6), // Ohio
    "OK": calculateLead(30, 61), // Oklahoma
    "OR": calculateLead(45, 40), // Oregon
    "RI": calculateLead(40, 33), // Rhode Island
    "SC": calculateLead(37, 51), // South Carolina
    "SD": calculateLead(37, 51), // South Dakota
    "TN": calculateLead(28, 58), // Tennessee
    "TX": calculateLead(48.5, 43.9), // Texas
    "UT": calculateLead(28, 60), // Utah
    "VT": calculateLead(70, 29), // Vermont
    "WA": calculateLead(52.5, 38.2), // Washington
    "WV": calculateLead(28, 55), // West Virginia
    "WY": calculateLead(15, 68), // Wyoming
    "DC": calculateLead(85, 5.8),  // Washington, D.C.
    "NE1": calculateLead(1, 99), 
    "NE2": calculateLead(48.9, 43.8), 
    "NE3": calculateLead( 1 ,99), 
    "ME1": calculateLead(1.1, 98.9), 
    "ME2": calculateLead(71, 29) 
};

//EC count per state
var stateEC = {
    "AL": 9,
    "AK": 3,
    "AZ": 11,
    "AR": 6,
    "CA": 54,
    "CO": 10,
    "CT": 7,
    "DE": 3,
    "FL": 30,
    "GA": 16,
    "HI": 4,
    "ID": 4,
    "IL": 19,
    "IN": 11,
    "IA": 6,
    "KS": 6,
    "KY": 8,
    "LA": 8,
    "ME": 2,
    "MD": 10,
    "MA": 11,
    "MI": 15,
    "MN": 10,
    "MS": 6,
    "MO": 10,
    "MT": 4,
    "NE": 2,
    "NV": 6,
    "NH": 4,
    "NJ": 14,
    "NM": 5,
    "NY": 28,
    "NC": 16,
    "ND": 3,
    "OH": 17,
    "OK": 7,
    "OR": 8,
    "PA": 19,
    "RI": 4,
    "SC": 9,
    "SD": 3,
    "TN": 11,
    "TX": 40,
    "UT": 6,
    "VT": 3,
    "VA": 13,
    "WA": 12,
    "WV": 4,
    "WI": 10,
    "WY": 3,
    "DC": 3,
    "NE1": 1, 
    "NE2": 1, 
    "NE3": 1, 
    "ME1": 1, 
    "ME2": 1 
};

//CAHNGE STATE COLOR BASED ON THE LEAD

//Modile version
for(let i = 0; i < 9; i++)
{
    let state = battlegroundArray[i];
    document.getElementById(state).style.fill = statePolls[state.slice(0,2)][0];
}//end for loop

//Computer version
for(let i = 0; i < loopLength; i++)
{
    let state = statesArray[i];
    document.getElementById(state).style.fill = statePolls[state][0];

}//end for-loop

function calculateLead(dem, rep) 
{
    let lead, margin, color;

    margin = 4.5;
    lead = 0;//0 by default -> tie

    if (dem > rep)
    {
        lead = dem - rep;
        if (lead > margin)
            color = "#71A8EB";
        else
            color = "#D2E0FB";
    } 
    else if (rep > dem)
    {
        lead = rep - dem;
        if (lead > margin)
            color = "#d27776";
        else
            color = "#ffc5c4";
    }
    else
       color = "#DE71EB";

    return [color, lead, dem, rep];

}//end calculateLead


//DISPLAY INFO
const hoverSquare = document.getElementById('hover-square');

//SVG ID = map
const svgMap = document.getElementById('map');

svgMap.addEventListener('mouseover', function (e) 
{
    let colorLead, colorDem, colorRep;

    colorDem =  "#71A8EB";
    colorRep = "#d27776";
    // Check if the target is a 'path' element
    if (e.target.tagName === 'path') 
    {
        // Get State ID 
        let stateId = e.target.id;

        if (statePolls[stateId][0] == "#d27776" || statePolls[stateId][0] == "#ffc5c4")
            colorLead = "#d27776";
        else if (statePolls[stateId][0] == "#71A8EB" || statePolls[stateId][0] == "#D2E0FB")
            colorLead = "#71A8EB";
        else
        colorLead = "#DE71EB";

        hoverSquare.innerHTML = 
        `<div style="text-align: center;" style = "border-style: solid;">
            <span>${stateId}: ${stateEC[stateId]} vote(s)</span><br><br>
            <span style="color: ${colorLead};">+${Math.round((statePolls[stateId][1] + Number.EPSILON) * 100) / 100}</span>` +
            `<br><br>` +
            `<span style="color: ${colorDem};">Harris: ${statePolls[stateId][2]}</span>` +
            `<br><br>` +
            `<span style="color: ${colorRep};">Trump: ${statePolls[stateId][3]}</span></div>` +
            `<br><br>` +
        `</div>`;

        // Position the square and make it visible
        hoverSquare.style.left = e.clientX + 'px';
        hoverSquare.style.top = e.clientY + 'px';
        hoverSquare.style.display = 'block';

    }//end if
});

svgMap.addEventListener('mouseout', function (e) 
{
    // Check if the target is a 'path' element
    if (e.target.tagName === 'path') 
        hoverSquare.style.display = 'none';
});

//SVG ID = battleground-states
const svgBgMap = document.getElementById('map-battleground');

svgBgMap.addEventListener('mouseover', function (e) 
{

    let colorLead, colorDem, colorRep;

    colorDem =  "#71A8EB";
    colorRep = "#d27776";
    // Check if the target is a 'path' element
    if (e.target.tagName === 'path') 
    {
        // Get State ID 
        let stateId = String(e.target.id).slice(0,2);
        
        if (statePolls[stateId][0] == "#d27776" || statePolls[stateId][0] == "#ffc5c4")
            colorLead = "#d27776";
        else if (statePolls[stateId][0] == "#71A8EB" || statePolls[stateId][0] == "#D2E0FB")
            colorLead = "#71A8EB";
        else
            colorLead = "#DE71EB";

        hoverSquare.innerHTML = 
        `<div style="text-align: center;" style = "border-style: solid;">
            <span>${stateId}: ${stateEC[stateId]} vote(s)</span><br><br>
            <span style="color: ${colorLead};">+${Math.round((statePolls[stateId][1] + Number.EPSILON) * 100) / 100}</span>` +
            `<br><br>` +
            `<span style="color: ${colorDem};">Harris: ${statePolls[stateId][2]}</span>` +
            `<br><br>` +
            `<span style="color: ${colorRep};">Trump: ${statePolls[stateId][3]}</span></div>` +
            `<br><br>` +
        `</div>`;

        // Position the square and make it visible
        hoverSquare.style.left = e.clientX + 'px';
        hoverSquare.style.top = e.clientY + 'px';
        hoverSquare.style.display = 'block';

    }//end if
});

svgBgMap.addEventListener('mouseout', function (e) 
{
    // Check if the target is a 'path' element
    if (e.target.tagName === 'path') 
        hoverSquare.style.display = 'none';
});


//SHOW 270 TO WIN

//Change state color based on lead
for(let i = 0; i < loopLength; i++)
{
    let state = statesArray[i];
    if(statePolls[state][0] == "#71A8EB" || statePolls[state][0] == "#D2E0FB" )
        demVotes += stateEC[state];

}//end for-loop
repVotes = 538 - demVotes;

var elem = document.getElementById("toWinBar");
var width = demVotes * 100 / 538;
elem.style.width = width + "%";

if(demVotes >=  270)
{
    demColor = "#ace0af";
    demText = "(✔)";
}//end if
    
if(repVotes >=  270)
{

    repColor = "#ace0af";
    repText =  "(✔)";
}//end if


document.getElementById("dems-lead").style.color = demColor;
document.getElementById("rep-lead").style.color = repColor;


document.getElementById("dems-lead").innerHTML = `Harris ${demText}:<br><span >${demVotes}</span>`;
document.getElementById("rep-lead").innerHTML = `Trump ${repText}:<br><span>${repVotes}</span>`;
