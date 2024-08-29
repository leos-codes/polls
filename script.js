let demVotes = 0, repVotes = 0;
let demColor = "black", repColor = "black";
let demText = "", repText = "";

//Get States' IDs
const mapSvg = document.getElementById("map");
const states = mapSvg.querySelectorAll('[id]');
const statesArray = Array.from(states).map(element => element.id);
const loopLength = statesArray.length;

//State status based on polls
var statePolls = {
    "AL": calculateLead(38,57), // Alabama
    "AK": calculateLead(36,55), // Alaska
    "AZ": calculateLead(44.1, 45.8), // Arizona
    "AR": calculateLead(24,57), // Arkansas
    "CA": calculateLead(65,35), // California
    "CO": calculateLead(49,39), // Colorado
    "CT": calculateLead(46,36), // Connecticut
    "DE": calculateLead(46,36), // Delaware
    "FL": calculateLead(43.4,47.8), // Florida
    "GA": calculateLead(45.8, 46.6), // Georgia
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
    "MI": calculateLead(46.9, 43.5), // Michigan
    "MN": calculateLead(49.6, 40.4), // Minnesota
    "MS": calculateLead(37, 49), // Mississippi
    "MO": calculateLead(41, 59), // Missouri
    "MT": calculateLead(39, 57), // Montana
    "NE": calculateLead(42, 50), // Nebraska
    "NV": calculateLead(44.4, 45.2), // Nevada
    "NH": calculateLead(52, 47), // New Hampshire
    "NJ": calculateLead(41, 36), // New Jersey
    "NM": calculateLead(51, 40), // New Mexico
    "NY": calculateLead(58, 42), // New York
    "NC": calculateLead(45.7, 45.8), // North Carolina
    "ND": calculateLead(28, 62), // North Dakota
    "OH": calculateLead(44, 56), // Ohio
    "OK": calculateLead(30, 61), // Oklahoma
    "OR": calculateLead(45, 40), // Oregon
    "PA": calculateLead(46.7, 44.9), // Pennsylvania
    "RI": calculateLead(40, 33), // Rhode Island
    "SC": calculateLead(37, 51), // South Carolina
    "SD": calculateLead(37, 51), // South Dakota
    "TN": calculateLead(28, 58), // Tennessee
    "TX": calculateLead(47,53), // Texas
    "UT": calculateLead(28, 60), // Utah
    "VT": calculateLead(70, 29), // Vermont
    "VA": calculateLead(49, 46), // Virginia
    "WA": calculateLead(51.3,35.8), // Washington
    "WV": calculateLead(28, 55), // West Virginia
    "WI": calculateLead(47.9,44.3), // Wisconsin
    "WY": calculateLead(15, 68), // Wyoming
    "DC": calculateLead(85, 5.8)  // Washington, D.C.
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
    "ME": 4,
    "MD": 10,
    "MA": 11,
    "MI": 15,
    "MN": 10,
    "MS": 6,
    "MO": 10,
    "MT": 4,
    "NE": 5,
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
    "DC": 3
};

//Change state color based on lead
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


//Display info

//states array
const hoverSquare = document.getElementById('hover-square');
const svgMap = document.getElementById('map');

// Cache the bounding rectangle of the SVG map
const svgRect = svgMap.getBoundingClientRect();

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
        else
            colorLead = "#71A8EB";

        hoverSquare.innerHTML = 
        `<div style="text-align: center;" style = "border-style: solid;"><span style="color: ${colorLead};">+${Math.round((statePolls[stateId][1] + Number.EPSILON) * 100) / 100}</span>` +
        `<br><br>` +
        `<span style="color: ${colorDem};">Harris: ${statePolls[stateId][2]}</span>` +
        `<br><br>` +
        `<span style="color: ${colorRep};">Trump: ${statePolls[stateId][3]}</span></div>`;

        // Get mouse position relative to the SVG container
        const mouseX = e.clientX - svgRect.left + 360;
        const mouseY = e.clientY - svgRect.top;

        // Position the square and make it visible
        hoverSquare.style.left = mouseX + 'px';
        hoverSquare.style.top = mouseY + 'px';
        hoverSquare.style.display = 'block';

    }//end if
});

svgMap.addEventListener('mouseout', function (e) 
{
    // Check if the target is a 'path' element
    if (e.target.tagName === 'path') 
        hoverSquare.style.display = 'none';
});


//Show 270 to win
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
    demText = "(Favored to Win)";
}//end demVotes
    
if(repVotes >=  270)
{

    repColor = "#ace0af";
    repText =  "(Favored to Win)";
}
    



document.getElementById("dems-lead").style.color = demColor;
document.getElementById("rep-lead").style.color = repColor;


document.getElementById("dems-lead").innerHTML = `Harris ${demText}:<br><span >${demVotes}</span>`;
document.getElementById("rep-lead").innerHTML = `Trump ${repText}:<br><span>${repVotes}</span>`;