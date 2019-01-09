CIV_PERCENT = 100.0/N_CIVS
EMPTY_COLOR = "white"

function get_civ_mapdata(civname){
    return `mapData(${civname}, 0, 1, ${EMPTY_COLOR}, ${CIV_COLOR[civname]})`
}

cytoscape({
  container: document.getElementById('cy'),
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        "width": `mapData(civ_count, 0, ${N_CIVS}, 30, 90)`,
        "height": `mapData(civ_count, 0, ${N_CIVS}, 30, 90)`,
        // 'width': '60px',
        // 'height': '60px',
        'content': 'data(id)',
        'pie-size': '90%',
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
        'width': 5,
        'target-arrow-shape': 'triangle',
        'opacity': 0.9
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
        // name: 'concentric',
        // minNodeSpacing: 50,
        name: 'cose',
        // nodeOverlap: 10,
        // componentSpacing: 40,
        // nestingFactor: 1.2,
        // gravity: 1,
        padding: 10
    },
    ready: function(){
        window.cy = this;
    }
});
