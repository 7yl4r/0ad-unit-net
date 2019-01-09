ALL_CIVS = [
    "Athenians", "Britons", "Carthaginians", "Gauls", "Iberians",
    "Macedonians", "Mauryans", "Persians", "Ptolemies", "Romans",
    "Seleucids", "Spartans"
]
ALL_CIV_STR = "Athenians, Britons, Carthaginians, Gauls, Iberians, Macedonians, Mauryans, Persians, Ptolemies, Romans, Seleucids, Spartans"
N_CIVS = ALL_CIVS.length - 1  // 12
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
    civ_count = N_CIVS
    // now add civs not in the list
    ALL_CIVS.forEach(function(civname) {
        if (dat[civname] != 1){
            dat[civname] = 0
            civ_count -= 1
        }
    });
    dat['civ_count'] = civ_count
    console.log(dat)
    return dat
}

UNITS = [
    { data: make_unit_data(
        'Bolt Shooter',
        'Athenians, Spartans, Macedonians, Carthaginians, Romans, Hellenes, Ptolemies'
    )},
    { data: make_unit_data(
        'Cavalry Archer',
        'Persians, Mauryans, Ptolemies, Seleucids',
    )},
    { data: make_unit_data(
        'Cavalry Skirmisher',
        ALL_CIV_STR,
    )},
    { data: make_unit_data(
        'Cavalry Spearman',
        'Carthaginians, Iberians, Macedonians, Persians, Ptolemies, Romans, Seleucids, Spartans',
    )},
    { data: make_unit_data(
        'Cavalry Swordsman',
        'Persians, Celts, Britons, Gauls, Hellenes, Athenians, Carthaginians, Mauryans',
    )},
    // { data: make_unit_data(
    //     'Female Citizen',
    //     ALL_CIV_STR,
    // )},
    // { data: make_unit_data(
    //     'Healer',
    //     ALL_CIV_STR,
    // )},
    { data: make_unit_data(
        'Infantry Archer',
        'Carthaginians, Hellenes, Athenians, Macedonians, Mauryans, Persians, Ptolemies, Seleucids',
    )},
    // { data: make_unit_data(
    //     'Infantry Pikeman',
    //     '??????',
    // )},
    { data: make_unit_data(
        'Infantry Skirmisher',
        'Athenians, Britons, Carthaginians, Gauls, Iberians, Macedonians, Persians, Romans, Seleucids, Spartans',
    )},
    { data: make_unit_data(
        'Infantry Slinger',
        'Hellenes, Athenians, Macedonians, Iberians, Carthaginians, Celts, Britons, Gauls, Ptolemies',
    )},
    { data: make_unit_data(
        'Infantry Spearman',
        ALL_CIV_STR,
    )},
    { data: make_unit_data(
        'Infantry Swordsman',
        'Carthaginians, Spartans, Iberians, Mauryans, Ptolemies, Romans, Seleucids',
    )},
    { data: make_unit_data(
        'Siege Catapult',
        'Athenians, Macedonians, Carthaginians, Romans, Hellenes, Ptolemies, Seleucids',
    )},
    { data: make_unit_data(
        'Siege Ram',
        'Celts, Britons, Gauls, Macedonians, Spartans, Iberians, Persians, Romans',
    )},
    { data: make_unit_data(
        'Siege Tower',
        'Macedonians, Ptolemies, Seleucids, Hellenes',
    )},
    // spartan hoplites?
    // brit war dogs?
    { data: make_unit_data(
        'War Elephant',
        'Persians, Carthaginians, Mauryans',
    )},
];

COUNTER_BY_EDGES = [
    { data: { id: 'bs_cavs', weight: 1, source: 'Bolt Shooter', target: 'Cavalry Swordsman' } },
    { data: { id: 'cavarch_infskirm', weight: 1, source: 'Cavalry Archer', target: 'Infantry Skirmisher' } },
    { data: { id: 'cavarch_eleph', weight: 1, source: 'Cavalry Archer', target: 'War Elephant' } },
    { data: { id: 'cavsk_infsp', weight: 1, source: 'Cavalry Skirmisher', target: 'Infantry Spearman' } },
    { data: { id: 'cavsk_eleph', weight: 1, source: 'Cavalry Skirmisher', target: 'War Elephant' } },
    { data: { id: 'cavsp_infsp', weight: 1, source: 'Cavalry Spearman', target: 'Infantry Spearman' } },
    { data: { id: 'cavsp_infar', weight: 1, source: 'Cavalry Spearman', target: 'Infantry Archer' } },
    { data: { id: 'cavsp_eleph', weight: 1, source: 'Cavalry Spearman', target: 'War Elephant' } },
    { data: { id: 'cavsw_infsp', weight: 1, source: 'Cavalry Swordsman', target: 'Infantry Spearman' } },
    { data: { id: 'cavsp_cavsk', weight: 1, source: 'Cavalry Swordsman', target: 'Cavalry Skirmisher' } },
    { data: { id: 'cavsp_cavsk', weight: 1, source: 'Cavalry Swordsman', target: 'War Elephant' } },
    // { data: { id: 'fem_cavsw', weight: 1, source: 'Female Citizen', target: 'Cavalry Swordsman' } },
    // { data: { id: 'heal_cavsw', weight: 1, source: 'Healer', target: 'Cavalry Swordsman' } },
    { data: { id: 'infar_cavsk', weight: 1, source: 'Infantry Archer', target: 'Cavalry Skirmisher' } },
    { data: { id: 'infar_cavsw', weight: 1, source: 'Infantry Archer', target: 'Cavalry Swordsman' } },
    { data: { id: 'infsk_infsw', weight: 1, source: 'Infantry Skirmisher', target: 'Infantry Swordsman' } },
    { data: { id: 'infsk_cavsp', weight: 1, source: 'Infantry Skirmisher', target: 'Cavalry Spearman' } },
    { data: { id: 'infsl_cavsp', weight: 1, source: 'Infantry Slinger', target: 'Cavalry Spearman' } },
    { data: { id: 'infsl_cavsw', weight: 1, source: 'Infantry Slinger', target: 'Cavalry Swordsman' } },
    { data: { id: 'infsl_cavsk', weight: 1, source: 'Infantry Slinger', target: 'Cavalry Skirmisher' } },
    { data: { id: 'infsl_cavar', weight: 1, source: 'Infantry Slinger', target: 'Cavalry Archer' } },
    { data: { id: 'infsp_infsw', weight: 1, source: 'Infantry Spearman', target: 'Infantry Swordsman' } },
    { data: { id: 'infsp_infsk', weight: 1, source: 'Infantry Spearman', target: 'Infantry Skirmisher' } },
    { data: { id: 'infsp_cavar', weight: 1, source: 'Infantry Spearman', target: 'Cavalry Archer' } },
    { data: { id: 'infsw_infar', weight: 1, source: 'Infantry Swordsman', target: 'Infantry Archer' } },
    { data: { id: 'infsw_cavsp', weight: 1, source: 'Infantry Swordsman', target: 'Cavalry Spearman' } },
    { data: { id: 'sgcat_cavsw', weight: 1, source: 'Siege Catapult', target: 'Cavalry Swordsman' } },
    { data: { id: 'sgram_cavsw', weight: 1, source: 'Siege Ram', target: 'Cavalry Swordsman' } },
    { data: { id: 'sgtow_cavsw', weight: 1, source: 'Siege Tower', target: 'Cavalry Swordsman' } },
    { data: { id: 'eleph_cavsw', weight: 1, source: 'War Elephant', target: 'Infantry Swordsman' } },
    { data: { id: 'eleph_cavsw', weight: 1, source: 'War Elephant', target: 'Infantry Skirmishers' } },
]
