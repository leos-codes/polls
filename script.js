//Get States' IDs
const mapSvg = document.getElementById("map");
const states = mapSvg.querySelectorAll('[id]');
const statesArray = Array.from(states).map(element => element.id);
const loopLength = statesArray.length;

var statePolls = {
    "AL": calculateLead(38, 57), // Alabama
    "AK": calculateLead(26, 49), // Alaska
    "AZ": calculateLead(45.8, 44.4), // Arizona
    "AR": calculateLead(24, 57), // Arkansas
    "CA": calculateLead(65, 35), // California
    "CO": calculateLead(50, 40), // Colorado
    "CT": calculateLead(49, 40), // Connecticut
    "DE": calculateLead(49, 40), // Delaware
    "FL": calculateLead(43.9, 47.8), // Florida
    "GA": calculateLead(46.6, 46.6), // Georgia
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
    "NE": calculateLead(50, 42), // Nebraska
    "NV": calculateLead(45.2, 44.4), // Nevada
    "NH": calculateLead(52, 47), // New Hampshire
    "NJ": calculateLead(41, 36), // New Jersey
    "NM": calculateLead(51, 40), // New Mexico
    "NY": calculateLead(58, 42), // New York
    "NC": calculateLead(45.8, 45.7), // North Carolina
    "ND": calculateLead(28, 62), // North Dakota
    "OH": calculateLead(44, 56), // Ohio
    "OK": calculateLead(30, 61), // Oklahoma
    "OR": calculateLead(45, 40), // Oregon
    "PA": calculateLead(46.7, 44.9), // Pennsylvania
    "RI": calculateLead(40, 33), // Rhode Island
    "SC": calculateLead(37, 51), // South Carolina
    "SD": calculateLead(37, 51), // South Dakota
    "TN": calculateLead(28, 58), // Tennessee
    "TX": calculateLead(45, 50), // Texas
    "UT": calculateLead(28, 60), // Utah
    "VT": calculateLead(70, 29), // Vermont
    "VA": calculateLead(49, 46), // Virginia
    "WA": calculateLead(40, 37), // Washington
    "WV": calculateLead(28, 55), // West Virginia
    "WI": calculateLead(48, 44.1), // Wisconsin
    "WY": calculateLead(15, 68), // Wyoming
    "DC": calculateLead(85, 5.8)  // Washington, D.C.
};

//Change state color based on lead
for(let i = 0; i < loopLength; i++)
{
    let state = statesArray[i];
    document.getElementById(state).style.fill = statePolls[state][0];

}//end for-loop

function calculateLead(dem, rep) 
{
    let lead, margin;
    margin = 5;
    if (dem > rep)
    {
        lead = dem - rep;
        if (lead > margin)
            return ["#1259E6", lead];
        else
            return ["#71A8EB", lead];
    } 
    else if (rep > dem)
    {
        lead = rep - dem;
        if (lead > margin)
            return ["#E61237", lead];
        else
            return ["#EA7195", lead];
    }
    else
       return ["#DE71EB", 0];

}//end calculateLead