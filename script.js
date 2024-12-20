//Date updated
document.getElementById('last-up').innerText = "Last update: Nov 5th, 24; 9:07am";

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
    "AZ": calculateLead(46.9, 49.3), // Arizona
    "FL": calculateLead(44.9, 51.3), // Florida
    "GA": calculateLead(47.7, 48.9), // Georgia
    "MI": calculateLead(48.4, 47.2), // Michigan
    "MN": calculateLead(50.0, 44.7), // Minnesota
    "NV": calculateLead(47.9, 48.5), // Nevada
    "NH": calculateLead(52.6, 44.3), // New Hampshire
    "NC": calculateLead(47.7, 48.8), // North Carolina
    "PA": calculateLead(48.1, 48.2), // Pennsylvania
    "VA": calculateLead(49.9, 44), // Virginia
    "WI": calculateLead(48.7, 47.7), // Wisconsin
    //meh states
    "AL": calculateLead(38,57), // Alabama
    "AK": calculateLead(43.7, 52.5), // Alaska
    "AR": calculateLead(24,57), // Arkansas
    "CA": calculateLead(59.2, 33.2), // California
    "CO": calculateLead(53.8, 41.4), // Colorado
    "CT": calculateLead(46,36), // Connecticut
    "DE": calculateLead(46,36), // Delaware
    "HI": calculateLead(42, 34), // Hawaii
    "ID": calculateLead(26, 55), // Idaho
    "IL": calculateLead(43, 34), // Illinois
    "IN": calculateLead(39.7, 56.9), // Indiana
    "IA": calculateLead(45.4, 49.8), // Iowa
    "KS": calculateLead(31, 47), // Kansas
    "KY": calculateLead(26, 55), // Kentucky
    "LA": calculateLead(33, 48), // Louisiana
    "ME": calculateLead(51, 42.4), // Maine
    "MD": calculateLead(60.7, 33.3), // Maryland
    "MA": calculateLead(60.3, 33.7), // Massachusetts
    "MS": calculateLead(37, 49), // Mississippi
    "MO": calculateLead(40.1, 54.2), // Missouri
    "MT": calculateLead(38.5, 57.7), // Montana
    "NE": calculateLead(39.5, 55.2), // Nebraska
    "NJ": calculateLead(55.3, 40.1), // New Jersey
    "NM": calculateLead(49.8, 43.8), // New Mexico
    "NY": calculateLead(56.4, 40.3), // New York
    "ND": calculateLead(28, 62), // North Dakota
    "OH": calculateLead(44.7, 52.5), // Ohio
    "OK": calculateLead(30, 61), // Oklahoma
    "OR": calculateLead(45, 40), // Oregon
    "RI": calculateLead(53.7, 39.7), // Rhode Island
    "SC": calculateLead(42.1, 53.6), // South Carolina
    "SD": calculateLead(37, 51), // South Dakota
    "TN": calculateLead(28, 58), // Tennessee
    "TX": calculateLead(43.9, 52.1), // Texas
    "UT": calculateLead(32.7, 58.3), // Utah
    "VT": calculateLead(70, 29), // Vermont
    "WA": calculateLead(55, 38.2), // Washington
    "WV": calculateLead(28, 55), // West Virginia
    "WY": calculateLead(15, 68), // Wyoming
    "DC": calculateLead(85, 5.8),  // Washington, D.C.
    "NE1": calculateLead(1, 99), 
    "NE2": calculateLead(52.5, 42.9), 
    "NE3": calculateLead( 1 ,99), 
    "ME1": calculateLead(58.8, 36.5), 
    "ME2": calculateLead(43.8, 48.6) 
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

    margin = 3;
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
