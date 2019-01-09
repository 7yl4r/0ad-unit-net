list_items = ""
ALL_CIVS.forEach(function(civ_name){
    civ_color = CIV_COLOR[civ_name]
    list_items += `\t<li style="color:${civ_color}">${civ_name}</li>\n`
})

document.getElementById('civ_key').innerHTML = `
<ul>
${list_items}
</ul>
`
