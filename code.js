ALL_CIVS = [
    "Athenians", "Britons", "Carthaginians", "Gauls", "Iberians",
    "Macedonians", "Mauryans", "Persians", "Ptolemies", "Romans",
    "Seleucids", "Spartans"
]
N_CIVS = ALL_CIVS.length - 1  // 12
CIV_PERCENT = 100.0/N_CIVS
EMPTY_COLOR = "white"
CIV_COLOR = {
    Athenians: "blue",
    Britons: "cyan",
    Carthaginians: "red",
    Gauls: "green",
    Iberians: "teal",
    Macedonians: "orange",
    Mauryans: "yellow",
    Persians: "pink",
    Ptolemies: "purple",
    Romans: "maroon",
    Seleucids: "lime",
    Spartans: "olive"
}

function make_unit_data(id, civ_list_str){
    // generate a data object for given id and list of civs copy-pasted
    // from the wiki
    dat = { id: id }
    // add civs in the list
    civ_list_str.split(',').forEach(function(civ_substr){
        dat[civ_substr.trim()] = 1
    });
    // now add civs not in the list
    ALL_CIVS.forEach(function(civname) {
        if (dat[civname] != 1){
            dat[civname] = 0
        }
    });
    return dat
}

UNITS = [
    { data: make_unit_data(
        'Bolt Shooter',
        'Athenians, Spartans, Macedonians, Carthaginians, Romans, Hellenes, Ptolemies'
    )},
    { data: make_unit_data(
        'Cavalry Swordsman',
        'Persians, Celts, Britons, Gauls, Hellenes, Athenians, Carthaginians, Mauryans',
    )},
];

COUNTER_BY_EDGES = [
    { data: { id: 'bs_cavs', weight: 1, source: 'Bolt Shooter', target: 'Cavalry Swordsman' } },
]

function get_civ_mapdata(civname){
    return `mapData(${civname}, 0, 1, ${EMPTY_COLOR}, ${CIV_COLOR[civname]})`
}

cytoscape({
  container: document.getElementById('cy'),
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'width': '60px',
        'height': '60px',
        'content': 'data(id)',
        'pie-size': '80%',
        'pie-1-background-color': get_civ_mapdata("Athenians"),
        'pie-1-background-size': `${CIV_PERCENT}`,
        'pie-2-background-color': get_civ_mapdata("Britons"),
        'pie-2-background-size': `${CIV_PERCENT}`,
        'pie-3-background-color': get_civ_mapdata("Carthaginians"),
        'pie-3-background-size': `${CIV_PERCENT}`,
        'pie-4-background-color': get_civ_mapdata("Gauls"),
        'pie-4-background-size': `${CIV_PERCENT}`,
        'pie-5-background-color': get_civ_mapdata("Iberians"),
        'pie-5-background-size': `${CIV_PERCENT}`,
        'pie-6-background-color': get_civ_mapdata("Macedonians"),
        'pie-6-background-size': `${CIV_PERCENT}`,
        'pie-7-background-color': get_civ_mapdata("Mauryans"),
        'pie-7-background-size': `${CIV_PERCENT}`,
        'pie-8-background-color': get_civ_mapdata("Persians"),
        'pie-8-background-size': `${CIV_PERCENT}`,
        'pie-9-background-color': get_civ_mapdata("Ptolemies"),
        'pie-9-background-size': `${CIV_PERCENT}`,
        'pie-9-background-color': get_civ_mapdata("Romans"),
        'pie-9-background-size': `${CIV_PERCENT}`,
        'pie-10-background-color': get_civ_mapdata("Seleucids"),
        'pie-10-background-size': `${CIV_PERCENT}`,
        'pie-11-background-color': get_civ_mapdata("Spartans"),
        'pie-11-background-size': `${CIV_PERCENT}`
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'width': 4,
        'target-arrow-shape': 'triangle',
        'opacity': 0.5
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'opacity': 1
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),

    elements: {
        nodes: UNITS,
        edges: COUNTER_BY_EDGES
    },
    layout: {
        name: 'circle',
        padding: 10
    },
    ready: function(){
        window.cy = this;
    }
});
