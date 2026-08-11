var cg = ChoreoGraph.instantiate(document.getElementsByTagName("canvas")[0],{
  "size" : [1400,850],
  "levels" : 6,
  "useCamera" : false,
  "imageDirectory" : "art/",
  "animation" : {
    "consistentSpeedDefault" : true,
    "autoFacingDefault" : true,
    "persistentValuesDefault" : false
  },
  "preventDefault" : ["space","left","right","up","down"],
});

let c = cg.c;

let images = {
  "foreground" : {"file":"foreground.png"},
  "background" : {"file":"background.png"},
  "overlay" : {"file":"overlay.png"},
  "cab0" : {"file":"cab0.png","height":30,"width":30},
  "cab1" : {"file":"cab1.png","height":30,"width":30},
  "cab2" : {"file":"cab2.png","height":30,"width":30},
  "benny" : {"file":"benny.png","height":27,"width":27},
  "guest" : {"file":"guest.png","height":7,"width":7},
  "jolly_trolley" : {"file":"jolly_trolley.png","height":50,"width":50},
  "dip_machine_arm" : {"file":"dip_machine_arm.png","height":31,"width":9},
  "roger_zap" : {"file":"roger_zap.png","height":194,"width":191},
  "boom_room_darkness" : {"file":"boom_room_darkness.png","height":112,"width":110},
  "firework_lights" : {"file":"firework_lights.png","height":57,"width":98},
  "portable_hole" : {"file":"portable_hole.png","height":42,"width":69},
  "staff" : {"file":"staff.png","height":7,"width":7},
  "key" : {"file":"key.png"},
  "keydouble" : {"file":"keydouble.png"},
  "b_menu" : {"file":"b_menu.png"},
  "b_sound" : {"file":"b_sound.png"},
  "b_cabs" : {"file":"b_cabs.png"},
  "b_blocks" : {"file":"b_blocks.png"}
};
for (let key in images) {
  cg.createImage({
    "id" : key,
    "file" : images[key].file,
    "height" : images[key].height,
    "width" : images[key].width
  });
}

cg.settings.staticLevels = [
  [
    cg.createGraphic({type:"image",image:cg.images.background,"x":1400/2,"y":850/2,width:1400,height:850,id:"background"})
  ],
  [],[],[],
  [
    cg.createGraphic({type:"image",image:cg.images.foreground,"x":1400/2,"y":850/2,width:1400,height:850,id:"foreground"})
  ],
  [
    cg.createGraphic({type:"image",image:cg.images.overlay,"x":1400/2,"y":850/2,width:1400,height:850,id:"overlay"})
  ]
];

let audio = {
  "dispatch" : ChoreoGraph.AudioController.createSound("dispatch","audio/dispatch.mp3"),
  "ride_1" : ChoreoGraph.AudioController.createSound("ride_1","audio/ride_1.mp3"),
  "ride_2" : ChoreoGraph.AudioController.createSound("ride_2","audio/ride_2.mp3"),
  "ride_3" : ChoreoGraph.AudioController.createSound("ride_3","audio/ride_3.mp3"),
  "ride_4" : ChoreoGraph.AudioController.createSound("ride_4","audio/ride_4.mp3"),
  "ride_5" : ChoreoGraph.AudioController.createSound("ride_5","audio/ride_5.mp3"),
  "ambiance" : ChoreoGraph.AudioController.createSound("ambiance","audio/ambiance.mp3",{autoplay:true,loop:true,fadeIn:2,volume:0.2})
}

let pos_load_1_guests = [[648,419],[653,424]];
let pos_load_2_guests = [[674,390],[680,395]];

let pos_queue = [[700,384],[707,379],[711,372],[718,366],[725,361],[732,357],[742,354],[747,349],[750,342],[747,335],[740,331],[742,323],[733,320],[728,312],[728,301],[733,296],[742,299],[739,310],[751,309],[757,312],[761,316],[766,311],[772,303],[776,294],[788,295],[788,286],[798,278],[805,275],[807,266],[816,264],[813,255],[813,246],[818,234],[811,228],[813,218],[800,221],[791,216],[782,225],[773,219],[761,220],[757,213],[748,209],[737,205],[726,202],[716,199],[713,194],[709,186],[702,181],[697,173],[695,162],[698,154],[706,152],[716,153],[729,160],[742,164],[745,171],[755,166],[765,163],[768,169],[780,172],[788,167],[796,172],[805,163],[813,168],[824,167],[833,173],[844,172],[852,181],[853,194],[845,198],[838,201],[845,210],[836,216],[847,224],[839,231],[845,244],[853,244],[862,251],[874,253],[888,252],[892,244],[899,237],[910,237],[920,246],[910,251],[917,262],[907,273],[897,273],[888,272],[884,282],[892,291],[886,301],[878,308],[869,312],[856,313],[848,307],[848,298],[839,297],[829,292],[827,281],[817,290],[809,304],[805,314],[796,313],[788,321],[798,326],[788,332],[797,340],[806,343],[797,349],[807,356],[807,367],[802,373],[792,374],[781,379],[772,387],[762,389],[750,392],[747,402],[737,399],[729,407],[719,402],[709,409],[700,415],[689,424],[687,434],[675,434],[670,443],[667,453],[656,458],[657,467],[653,475]];

function zap(time) {
  return [[236,206,0,0],[236,206,time,0]]
}
function boom(time) {
  return [[123,200,0,0],[123,200,time,0]]
}
function firework(time) {
  return [[373,320,0,0],[373,320,time,0]]
}
function off(time) {
  return [[-100,0,0,0],[-100,0,time,0]]
}

// X Y TIME ROTATION OPACITY
let anim = {
  // GUEST ANIMATIONS
  "go_0" : [[866,803],[844,788],[823,770],[794,765],[774,764],[749,771],[725,774],[706,790],[691,802,6]],
  "go_1" : [[619,803],[641,763],[648,703],[672,653],[682,620],[695,564],[688,537],[697,513],[722,503],[749,502],[774,481],[790,460],[805,446],[793,435],[788,451],[775,470],[754,479],[745,475],[744,495],[726,505],[701,508],[697,519],[694,552],[690,584],[679,599],[687,613],[667,639],[654,672],[624,680],[615,704],[628,740],[609,776],[586,811]],
  "go_2" : [[287,815],[309,783],[339,755],[384,725],[419,715],[468,704],[489,675],[516,657],[560,662],[586,683],[591,715],[617,745],[615,766],[615,790],[597,824]],
  "go_3" : [[591,800],[597,778],[610,748],[610,714],[562,692],[534,664],[494,675],[475,704],[442,716],[427,739],[378,737],[336,734],[316,762],[309,804]],
  "go_4" : [[331,805],[353,759],[389,717],[432,712],[473,685],[467,666],[491,656],[516,651],[552,667],[589,667],[628,667],[662,648],[679,645],[687,622],[693,599],[685,581],[676,568],[676,555],[694,554],[707,570],[699,579],[688,599],[688,633],[688,666],[694,702],[646,721],[636,765],[635,815]],
  "go_5" : [[589,813],[614,779],[657,732],[660,686],[632,662],[584,677],[552,670],[525,665],[503,670],[468,698],[425,722],[389,744],[360,772],[332,806]],
  "go_6" : [[289,798],[298,761],[299,731],[333,740],[369,763],[403,746],[431,716],[478,703],[480,664],[478,635],[517,634],[529,652],[558,686],[609,697],[627,729],[637,768],[627,810],[674,817],[713,794],[731,779],[755,781],[773,798]],
  "go_7" : [[639,804],[638,764],[635,725],[614,689],[575,665],[521,676],[481,684],[448,704],[414,703],[401,726],[355,724],[320,753],[287,770]],
  "go_8" : [[802,796],[818,769],[849,773],[880,773],[905,761],[930,734],[939,699],[941,665],[946,624],[940,595],[879,589],[847,570],[835,552],[807,551],[796,562],[811,577],[827,580],[847,564],[847,554],[819,549],[792,552],[770,565],[750,583],[750,609],[755,631],[749,666],[745,691],[743,707],[770,712],[779,698],[801,692],[818,702],[840,717],[860,708],[881,690],[894,670],[907,677],[929,691],[953,696]],
  "go_9" : [[922,791],[916,734],[927,712],[946,663],[936,588],[940,534],[916,546],[886,517],[855,509],[826,504],[839,487],[862,502],[884,487],[921,494],[929,556],[935,574],[955,613]],
  "go_10" : [[640,797],[652,772],[650,746],[673,734],[669,709],[637,724],[605,724],[613,698],[614,673],[587,666],[568,682],[553,703],[537,688],[525,665],[495,637],[480,648],[463,672],[447,681],[435,698],[403,710],[386,704],[356,704],[329,711],[300,711],[290,734],[297,755],[299,794]],
  "go_11" : [[251,808],[313,809],[372,815],[418,808],[349,776],[351,750],[374,719],[420,700],[462,697],[498,663],[500,641],[540,626],[541,691],[566,705],[616,707],[641,737],[617,773],[627,806]],
  "go_12" : [[644,799],[657,768],[682,742],[688,702],[644,702],[601,675],[586,660],[543,664],[492,677],[458,711],[401,723],[326,723],[305,745],[297,806]],
  "l1_stand_1" : [[648,419,,0],[634,406,0.9,0],[625,400,2,0],["t","add_load_1"],[634,406,0,0]],
  "l1_stand_2" : [[653,424,,0],[631,405,2.9,0],["t","add_load_1"],[631,405,0,0]],
  "l2_stand_1" : [[674,390,,0],[661,378,1.1,0],[652,371,1.9,0],["t","add_load_2"],[652,371,0,0]],
  "l2_stand_2" : [[680,395,,0],[657,377,3,0],["t","add_load_2"],[657,377,0,0]],
  "u1_seat_1" : [[525,506,0,0],[541,521,4,0],[546,529,2,0],[540,538,1,0],["t","add_exit"],[540,538,0,0]],
  "u1_seat_2" : [[530,512,0,0],[541,521,2,0],[546,529,1,0],[540,538,1,0],["t","add_exit"],[540,538,0,0]],
  "u2_seat_1" : [[552,478,0,0],[566,490,2,0],[571,499,2,0],[568,510,3,0],[556,525,2,0],[540,538,3,0],["t","add_exit"],[540,538,0,0]],
  "u2_seat_2" : [[558,483,0,0],[566,490,1,0],[571,499,2,0],[568,510,2,0],[556,525,2,0],[540,538,2,0],["t","add_exit"],[540,538,0,0]],
  "queue_to_l1" : [[700,384,,0],[692,395,1.5,0],[682,406,1.5,0],[670,415,1.5,0],[662,420,1.5,0],[650,421,1,0],["t","add_load_1_wait"],[650,421,0,0]],
  "queue_to_l2" : [[700,384,,0],[693,390,1.5,0],[678,393,1.5,0],["t","add_load_2_wait"],[678,393,0,0]],
  "exit" : [[540,538],["s",8],[534,542],[529,549],[522,561],[509,569],[494,571],[483,581],[468,584],[454,585],[440,588],[434,600],[443,619],[431,634],[438,656],[442,688],[425,705],[391,724],[379,747],[372,767],[367,817]],
  // CAST MEMBER ANIMATIONS
  "restraint_check_wait" : [[689,369]],
  "restraint_check" : [[689,369],["s",10],[676,366],[669,374],[662,380],[662,380,1],[652,392],[642,400],[634,412],[634,412,1],[673,377],[678,369],[681,367],[689,369]],
  // RIDE ELEMENT ANIMATIONS
  "benny" : [[510,432,0,360],[510,432,3,0]],
  "dip_machine_arm_wait" : [[438.5,463,0,0]],
  "dip_machine_arm" : [[438.5,463,0,0],[432,466,3,-30],[432,466,1,-30],[438.5,463,3,0]],
  "roger_zap_wait" : [[-100,0,0,0]],
  "roger_zap" : (zap(0.1).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1)).concat(off(0.2)).concat(zap(0.1)).concat(off(0.05)).concat(zap(0.1))),
  "jolly_trolley" : [[649,824],[649,824,240],[668,796],[688,771],[708,755],[737,743],[768,737],[793,741],[822,743],[848,739],[873,728],[895,711],[914,682],[924,657],[926,628],[919,597],[901,567],[876,546],[847,532],[802,528],[772,539],[748,553],[731,573],[717,597],[709,623],[712,654,,-186],[720,684,,-195],[716,718,,-174],[705,748,,-160],[694,763,,-144],[656,809,,-142],[656,809,360,-142]],
  "boom_room_boom" : (off(0.1).concat(boom(0.5)).concat(off(0.1)).concat(boom(0.7)).concat(off(0.1)).concat(boom(0.1)).concat(off(0.2)).concat(boom(0.3)).concat(off(0.1)).concat(boom(0.7)).concat(off(0.1)).concat(boom(0.4)).concat(off(0.1)).concat(boom(0.5)).concat(off(0.1)).concat(boom(0.7)).concat(off(0.1)).concat(boom(0.1)).concat(off(0.2)).concat(boom(0.3)).concat(off(0.1)).concat(boom(0.7)).concat(off(0.1)).concat(boom(0.4)).concat(off(0.1)).concat(boom(0.5)).concat(off(0.1)).concat(boom(0.7)).concat(off(0.1)).concat(boom(0.1)).concat(off(0.2)).concat(boom(0.3)).concat(off(0.1)).concat(boom(0.7))),
  "boom_room_idle" : [[123,200,0,0]],
  "firework_lights_off" : [[-100,0,0,0]],
  "firework_lights" : (off(0.6).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.4)).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.3)).concat(firework(0.1)).concat(off(0.4)).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.4)).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.3)).concat(firework(0.1)).concat(off(0.4)).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.4)).concat(firework(0.2)).concat(off(0.6)).concat(firework(0.2)).concat(off(0.8)).concat(firework(0.2)).concat(off(0.2)).concat(firework(0.1)).concat(off(0.2)).concat(firework(0.2)).concat(off(0.3)).concat(firework(0.1)).concat(off(0.4))),
  "portable_hole_idle" : [[281,462,0,0]],
  "portable_hole" : [[281,462,0,0],[281,462,2,0],[281,470,1.5,0],[281,470,7,0],[281,462,1,0]],
  // RIDE POSITIONS
  "end_wait_1" : [[300,519,0,105]],
  "end_wait_2" : [[338,531,0,105]],
  "end_wait_1_to_end_wait_2" : [[300,519,0,108],[338,531,,105]],
  "unload_wait_1" : [[461,537,0,82]],
  "unload_wait_2" : [[500,531,0,70]],
  "unload_wait_1_to_unload_1" : [[461,537,0,80],[500,531],[505,529],[512,526,,55],[530,508,,45]],
  "unload_wait_2_to_unload_2" : [[500,531,0,70],[505,529],[512,526,,55],[530,508,,45],[557,479,,45]],
  "unload_unload_wait_1" : [[389,545,0,105]],
  "unload_unload_wait_2" : [[428,542,0,80]],
  "unload_unload_wait_1_to_unload_wait_1" : [[389,545,0,105],[397,546],[407,545],[428,542,,80],[461,537,,80]],
  "unload_unload_wait_2_to_unload_wait_2" : [[428,542,0,80],[461,537,,80],[500,531,,70]],
  "end_wait_1_to_unload_unload_wait_1" : [[300,519,0,105],["s",15],["b",null],[389,545,,105]],
  "end_wait_2_to_unload_unload_wait_2" : [[338,531,0,105],["s",15],["b",null],[389,545,,105],[397,546],[407,545],[428,542,,80]],
  "unload_unload_wait_1" : [[389,545,0,105]],
  "unload_unload_wait_2" : [[428,542,0,80]],
  "load_1" : [[629,401,0,45]],
  "load_2" : [[656,372,0,45]],
  "load_1_to_scene_1" : [[629,401,0,45],["s",10],["e",'inA'],["p",'back'],[629+5,401-5,,45],["e",'linear'],["s",18.4],[629+5,401-5],[629+8,401-8,,45],[663-8,363+10,,45],[663,363,,30]],
  "load_2_to_scene_1" : [[656,372,0,45],["t","audseq_ride_1"],["s",10],["e",'inA'],["p",'front'],[656+5,372-5,,40],["e",'linear'],["s",18.4],[663,363,,30]],
  "load_wait_1" : [[581,454,0,45]],
  "load_wait_2" : [[608,425,0,45]],
  "load_wait_1_to_load_1" : [[581,454,0,45],[629,401,,45]],
  "load_wait_2_to_load_2" : [[608,425,0,45],[656,372,,45]],
  "unload_1" : [[530,508,0,45]],
  "unload_2" : [[557,479,0,45]],
  "unload_1_to_load_wait_1" : [[530,508,,45],[581,454,,45]],
  "unload_2_to_load_wait_2" : [[557,479,,45],[608,425,,45]],
  // THE DIP SPILL
  "scene_1" : [[663,363,,30],["t","unlock_rotation"],[666,354],[664,339],[657,330],["b",1],[644,326],[632,328],[623,335],["t","spin"],[604,347],[578,369],["b",2],[556,386],[548,392],[539,396],[530,397],[521,396],[514,390],[512,382],[514,371],["t","spin"],[519,363],[527,354],[530,343],[532,333,,0]],
  // BULL IN A CHINA SHOP
  "scene_2" : [[532,333,0,0],["b",3],["t","aud_dispatch"],[529,308],[526,299],["t","spin"],[522,293],[517,279],[517,272],[519,267],[523,264],[530,262],["b",4],[536,262],["t","spin"],[570,262],[578,262],[588,264],[597,269],[608,276],["t","spin"],[616,282],[626,285],["b",5],[638,285,,90]],
  // THE STREET
  "scene_3" : [[638,285,0,90],[658,285],[670,283],[681,276],["t","spin"],[689,268],[692,262],[694,253],["b",6],[693,243],[689,237],[682,233],[674,229],["t","spin"],[666,223],[661,217],[658,208],[653,201],[648,197],["t","spin"],["b",7],[641,195],[630,195],[592,195,,-90]],
  // THE BOILER ROOM
  "scene_4" : [[592,195,0,-90],[573,195],["b",8],["t","audseq_ride_2"],[562,193],["t","spin"],[554,191],[546,191],[540,193],[535,196],[530,197],[522,196],["t","spin"],[516,193],[508,191],[500,191],[493,192],[486,195],["b",9],["t","spin"],[482,199],[479,205],[467,227],[462,234],[454,240],[445,245],[436,246],["t","spin"],[425,245],[418,241],["b",10],[412,236],[407,229],[406,223],[406,216],["t","spin"],[406,201],[404,195],[401,188],[395,183],[384,179],["b",11],[377,179],[368,179],["t","spin"],[361,180],[356,183],[352,187],[349,193],[348,199],[348,205],[348,222],[348,234],["b",12],[344,244],[338,256],["t","spin"],[330,265],[322,269],[314,271,,-90]],
  // ZAP
  "scene_5" : [[314,271,0,-90],[304,269],[298,266],[292,261],["t","spin"],[279,252],["b",13],[272,246],[267,240],[265,234],[265,227],[264,219],[261,212],[255,208],["c","if(object.BlockController.trainPosition=='front'){do_roger_zap=true;}"],[252,207],[245,207],["t","spin"],[240,209],[235,212],[230,215],[224,217],["t","spin"],[218,218],[208,218],["b",14],[190,218],["c","if(object.BlockController.trainPosition=='front'){do_boom=true;}"],[175,218,,-90]],
  // CRASH
  "scene_6" : [[175,218,0,-90],["t","audseq_ride_3"],[162,217],["t","spin"],[151,215],[145,211],[141,207],[137,201],[132,195],[127,191],[120,188],["b",15],["t","spin"],[115,187],[108,187],[101,190],[96,196],[95,201],[95,210],[95,247],[95,253],["t","spin"],[96,259],[99,265],[102,270],[109,280],["b",16],[112,284],[116,286],[121,292],["t","spin"],[123,298],[123,305],[121,311],[121,317],[123,324],[128,329],["t","spin"],[131,335],[132,341],["b",17],[132,355],[132,382,,-180]],
  // THE DROP
  "scene_7" : [[132,382,0,180],[132,407],["b",18],[132,477],["b",19],["t","spin"],[132,490],[132,544,,180]],
  // THE STAIRS
  "scene_8" : [[132,544,0,-180],[131,559],["b",20],[130,567],[128,574],["t","spin"],[125,582],[120,593],[113,605],["t","audseq_ride_4"],[108,612],[105,619],[105,626],["b",21],[106,634],["t","spin"],[110,640],[116,644],[125,648],[131,651],[136,654,,-240]],
  // GAG FACTORY STORAGE
  "scene_9" : [[136,654,0,120],[141,656],[146,658],["t","spin"],[153,659],[159,658],[163,656],[168,653],[172,648],[175,642],["b",22],["t","spin"],[176,637],[177,630],[179,623],[181,618],[185,611],[191,606],[197,604],[203,603],["t","spin"],[209,603],[215,604],[221,606],[226,608],[230,611],[234,616],[236,620],[237,624],["t","spin"],[238,630],[238,637],["b",23],[239,641],[243,647],[248,651],[254,654],[260,655],[266,655],[273,653],[279,652],[287,651],[293,651],[298,652],[303,653],[308,655],["t","spin"],[315,656],["b",24],[326,656],[336,656],[341,655],[346,654],[351,649],[353,645],[355,640],[356,635],[356,627],["t","spin"],[356,614],[354,604],[352,597],[348,592],[342,588],["b",25],[336,586],[330,585],[323,586],[317,587],[310,586],[304,586],[298,583],["t","spin"],[295,580],[292,576],[287,572],[281,570],[274,568],["b",26],[266,566],[261,563],[258,560],[254,556],[252,553],[247,549],[242,546],[238,543],[231,539],[226,535],[221,530],[217,526],["b",27],[214,521],[212,518],[210,514],[209,509],[209,504],[209,491,,0]],
  // THE CRATE
  "scene_10" : [[209,491,0,0],[209,477,,0],["t","spin"],[209,450,,0],["b",28],["t","audseq_ride_5"],[209,447,,0],[209,378,,0]],
  // WEASELS DEFEATED
  "scene_11" : [[209,378,0,0],["b",29],[209,355],[209,348],["t","spin"],[211,342],[216,337],[220,334],[225,331],[230,330],[237,331],["b",30],[245,334],[252,338],[257,343],[262,351],["t","spin"],[265,358],[267,366],[270,374],[273,380],[278,386],["b",31],["t","spin"],[283,389],[289,391],["c","if(object.BlockController.trainPosition=='front'){do_fireworks=true;}"],[296,392],[302,391],[309,387],[318,386],[325,387],[331,385],[335,381],["t","spin"],[338,377],[340,369],["b",32],[341,360],[343,353],[345,347],[347,343],[351,339],[356,336],["t","spin"],[363,334],[368,334],[368,334,,90]],
  // THE FINALE
  "scene_12" : [[368,334,0,90],["t","spin"],[374,334],[384,335],[389,337],["b",33],[394,340],[399,344],[403,349],["t","lock_rotation"],[407,354],[419,395],["b",34],[427,420],["c","if(object.BlockController.trainPosition=='front'){do_dip_machine_arm=true;}"],[428,424],[429,431],[428,438],[426,444],[423,450],[418,454],[411,457],["b",35],[403,457],["c","if(object.BlockController.trainPosition=='front'){do_portable_hole=true;}"],[394,456],[334,448],["b",36],[312,445],[303,444],[295,446],[292,448],[289,450],[284,454],[281,459],[279,464],[278,470],[277,475],[277,481],["b",37],[277,489],[278,494],[280,501],["t","reset_rotation"],[282,505],[285,509],[289,513],[294,517],[300,519,,108]],
  // SCENE 5 TO STORAGE
  "remove" : [[175,218,0,-90],[162,217],[151,215],[145,211],[141,207],[137,201],[132,195],[127,191],[120,188],[115,187],[108,187],[101,190],[94,194],[83,196],[70,197],["b",null,7],["p",null],[24,196]],
  // ADD WAIT
  "add_wait" : [[-13,250,0,90],[-13,250,,90],[23,250,,90]],
  // STORAGE TO SCENE 7
  "add" : [[23,250,0,90],[23,250,0,90],[23,250],[71,249],[77,250],[81,252],[87,255],[92,259],[99,265],[102,270],[109,280],["b",16],[112,284],[116,286],[121,292],[123,298],[123,305],[121,311],[121,317],[123,324],[128,329],[131,335],[132,341],["b",17],[132,355],[132,382,,180]],
  // STORAGE
  "storage" : [[-100,-100]]
}
for (let b=1;b<=37;b++) { cg.createBlock({id:b}); }

cg.blocks[37].clear = false; // Close the last block section

let fancy_anim_names = {
  "end_wait_1" : "UNLOAD WAIT",
  "end_wait_2" : "UNLOAD WAIT",
  "end_wait_1_to_end_wait_2" : "UNLOAD WAIT",
  "end_wait_1_to_unload_unload_wait_1" : "UNLOAD WAIT",
  "end_wait_2_to_unload_unload_wait_2" : "UNLOAD WAIT",
  "unload_unload_wait_1" : "UNLOAD WAIT",
  "unload_unload_wait_2" : "UNLOAD WAIT",
  "unload_unload_wait_1_to_unload_wait_1" : "UNLOAD WAIT",
  "unload_unload_wait_2_to_unload_wait_2" : "UNLOAD WAIT",
  "unload_wait_1" : "UNLOAD WAIT",
  "unload_wait_2" : "UNLOAD WAIT",
  "unload_wait_1_to_unload_1" : "UNLOAD WAIT",
  "unload_wait_2_to_unload_2" : "UNLOAD WAIT",
  "load_1" : "LOAD",
  "load_2" : "LOAD",
  "load_1_to_scene_1" : "SCENE 1",
  "load_2_to_scene_1" : "SCENE 1",
  "load_wait_1" : "LOAD WAIT",
  "load_wait_2" : "LOAD WAIT",
  "load_wait_1_to_load_1" : "LOAD WAIT",
  "load_wait_2_to_load_2" : "LOAD WAIT",
  "unload_1" : "UNLOAD",
  "unload_2" : "UNLOAD",
  "unload_1_to_load_wait_1" : "LOAD WAIT",
  "unload_2_to_load_wait_2" : "LOAD WAIT",
  "scene_1" : "SCENE 1",
  "scene_2" : "SCENE 2",
  "scene_3" : "SCENE 3",
  "scene_4" : "SCENE 4",
  "scene_5" : "SCENE 5",
  "scene_6" : "SCENE 6",
  "scene_7" : "SCENE 7",
  "scene_8" : "SCENE 8",
  "scene_9" : "SCENE 9",
  "scene_10" : "SCENE 10",
  "scene_11" : "SCENE 11",
  "scene_12" : "SCENE 12",
  "remove" : "REMOVING",
  "add_wait" : "ADDING",
  "add" : "ADDING",
  "storage" : "STORAGE"
}

function next_animation(object, animator) {
  if (ChoreoGraph.run<10) { return; }

  let lastAnim = object.Animator.anim.id;
  let newAnim = "";
  if (lastAnim=="scene_1") { newAnim="scene_2"; }
  else if (lastAnim=="scene_2") { newAnim="scene_3"; }
  else if (lastAnim=="scene_3") { newAnim="scene_4"; }
  else if (lastAnim=="scene_4") { newAnim="scene_5"; }
  else if (lastAnim=="scene_5"&&object.removalMark==false) { newAnim="scene_6"; }
  else if (lastAnim=="scene_5"&&object.removalMark==true) { newAnim="remove"; }
  else if (lastAnim=="scene_6") { newAnim="scene_7"; }
  else if (lastAnim=="scene_7") { newAnim="scene_8"; }
  else if (lastAnim=="scene_8") { newAnim="scene_9"; }
  else if (lastAnim=="scene_9") { newAnim="scene_10"; }
  else if (lastAnim=="scene_10") { newAnim="scene_11"; }
  else if (lastAnim=="scene_11") { newAnim="scene_12"; }
  else if ((lastAnim=="scene_12")&&cg.animations.end_wait_1_to_end_wait_2.inUse==false&&cg.animations.end_wait_2.inUse==false) { newAnim="end_wait_1_to_end_wait_2"; }
  else if ((lastAnim=="scene_12")&&cg.animations.end_wait_1.inUse==false) { newAnim="end_wait_1"; }
  else if (lastAnim=="add_wait") { newAnim="add"; }
  else if (lastAnim=="add") { newAnim="scene_7"; }
  else if (lastAnim=="remove") { newAnim="storage"; remove_removal_mark(object.BlockController.train); }
  else if (lastAnim=="end_wait_1_to_end_wait_2") { newAnim="end_wait_2"; }
  else if (lastAnim=="benny") { newAnim="benny"; }
  else if (lastAnim=="dip_machine_arm") { newAnim="dip_machine_arm_wait"; }
  else if (lastAnim=="dip_machine_arm_wait"&&do_dip_machine_arm) { newAnim="dip_machine_arm"; do_dip_machine_arm = false; }
  else if (lastAnim=="roger_zap") { newAnim="roger_zap_wait"; }
  else if (lastAnim=="roger_zap_wait"&&do_roger_zap) { newAnim="roger_zap"; do_roger_zap = false; }
  else if (lastAnim=="firework_lights") { newAnim="firework_lights_off"; }
  else if (lastAnim=="firework_lights_off"&&do_fireworks) { newAnim="firework_lights"; do_fireworks = false; }
  else if (lastAnim=="boom_room_boom") { newAnim="boom_room_idle"; }
  else if (lastAnim=="boom_room_idle"&&do_boom) { newAnim="boom_room_boom"; do_boom = false; }
  else if (lastAnim=="portable_hole") { newAnim="portable_hole_idle"; }
  else if (lastAnim=="portable_hole_idle"&&do_portable_hole) { newAnim="portable_hole"; do_portable_hole = false; }
  else if (lastAnim=="restraint_check") { newAnim="restraint_check_wait"; }
  else if (lastAnim=="restraint_check_wait"&&do_restraint_check_staff) { newAnim="restraint_check"; do_restraint_check_staff = false; }
  else if (lastAnim=="station") { newAnim="scene_1"; }
  else if (lastAnim=="unload_1_to_load_wait_1") { newAnim="load_wait_1"; }
  else if (lastAnim=="unload_2_to_load_wait_2") { newAnim="load_wait_2"; }
  else if (lastAnim=="load_wait_1_to_load_1") { newAnim="load_1"; }
  else if (lastAnim=="load_wait_2_to_load_2") { newAnim="load_2"; }
  else if (lastAnim=="load_1_to_scene_1") { newAnim="scene_1"; }
  else if (lastAnim=="load_2_to_scene_1") { newAnim="scene_1"; }
  else if (lastAnim=="unload_wait_1_to_unload_1") { if (object.Graphic.graphic.image.id!="cab0") { require_unlock[0] = true; } newAnim="unload_1"; }
  else if (lastAnim=="unload_wait_2_to_unload_2") { if (object.Graphic.graphic.image.id!="cab0") { require_unlock[1] = true; } newAnim="unload_2"; }
  else if (lastAnim=="unload_unload_wait_1_to_unload_wait_1") { newAnim="unload_wait_1"; }
  else if (lastAnim=="unload_unload_wait_2_to_unload_wait_2") { newAnim="unload_wait_2"; }
  else if (lastAnim=="end_wait_1_to_unload_unload_wait_1") { newAnim="unload_unload_wait_1"; }
  else if (lastAnim=="end_wait_2_to_unload_unload_wait_2") { newAnim="unload_unload_wait_2"; }
  else if (lastAnim=="load_1"&&do_load_dispatch[0]) { newAnim="load_1_to_scene_1"; do_load_dispatch[0]=false; }
  else if (lastAnim=="load_2"&&do_load_dispatch[1]) { newAnim="load_2_to_scene_1"; do_load_dispatch[1]=false; }
  else if (lastAnim=="load_1"&&guests_to_load_1!=0&&object.Graphic.graphic.image.id!="cab2") { require_lock[0] = true; object.Graphic.graphic.image = cg.images["cab" + (parseInt(object.Graphic.graphic.image.id.replace("cab",""))+1).toString()]; guests_to_load_1--; }
  else if (lastAnim=="load_2"&&guests_to_load_2!=0&&object.Graphic.graphic.image!="cab2") { require_lock[1] = true; object.Graphic.graphic.image = cg.images["cab" + (parseInt(object.Graphic.graphic.image.id.replace("cab",""))+1).toString()]; guests_to_load_2--; }
  else if (lastAnim=="unload_1"&&do_unload_dispatch[0]) { newAnim="unload_1_to_load_wait_1"; do_unload_dispatch[0]=false; }
  else if (lastAnim=="unload_2"&&do_unload_dispatch[1]) { newAnim="unload_2_to_load_wait_2"; do_unload_dispatch[1]=false; }
  else if (lastAnim=="unload_1"&&do_unload[0]) { cg.createEvent({id:"unloading",duration:Math.random()*5+2}); do_unload[0]=false; if (object.Graphic.graphic.image.id=="cab2") { add_guest("u1_seat_1"); add_guest("u1_seat_2"); experienced_guests += 2; } else if (object.Graphic.graphic.image.id=="cab1") { add_guest("u1_seat_1"); experienced_guests += 1;  } object.Graphic.graphic.image=cg.images["cab0"]; }
  else if (lastAnim=="unload_2"&&do_unload[1]) { do_unload[1]=false; if (object.Graphic.graphic.image.id=="cab2") { add_guest("u2_seat_1"); add_guest("u2_seat_2"); experienced_guests += 2; } else if (object.Graphic.graphic.image.id=="cab1") { add_guest("u2_seat_1"); experienced_guests += 1; } object.Graphic.graphic.image=cg.images["cab0"]; }
  else if (lastAnim=="load_wait_1"&&cg.animations.load_1.inUse==false&&cg.animations.load_wait_1_to_load_1.inUse==false&&cg.events.dispatching==undefined) { newAnim="load_wait_1_to_load_1"; }
  else if (lastAnim=="load_wait_2"&&cg.animations.load_2.inUse==false&&cg.animations.load_wait_2_to_load_2.inUse==false&&cg.events.dispatching==undefined) { newAnim="load_wait_2_to_load_2"; }
  else if (lastAnim=="unload_wait_1"&&cg.animations.unload_1.inUse==false&&cg.animations.unload_wait_1_to_unload_1.inUse==false) { newAnim="unload_wait_1_to_unload_1"; }
  else if (lastAnim=="unload_wait_2"&&cg.animations.unload_2.inUse==false&&cg.animations.unload_wait_2_to_unload_2.inUse==false) { newAnim="unload_wait_2_to_unload_2";  }
  else if (lastAnim=="unload_unload_wait_1"&&cg.animations.unload_wait_1.inUse==false&&cg.animations.unload_unload_wait_1_to_unload_wait_1.inUse==false) { newAnim="unload_unload_wait_1_to_unload_wait_1"; }
  else if (lastAnim=="unload_unload_wait_2"&&cg.animations.unload_wait_2.inUse==false&&cg.animations.unload_unload_wait_2_to_unload_wait_2.inUse==false) { newAnim="unload_unload_wait_2_to_unload_wait_2"; }
  else if (lastAnim=="end_wait_1"&&do_dispatch_end[0]) { newAnim="end_wait_1_to_unload_unload_wait_1"; do_dispatch_end[0] = false; }
  else if (lastAnim=="end_wait_2"&&do_dispatch_end[1]) { newAnim="end_wait_2_to_unload_unload_wait_2"; do_dispatch_end[1] = false; }
  
  if (cg.animations[newAnim]) {
    animator.anim = cg.animations[newAnim];
  }
}

for (let key in anim) {
  cg.createAnimation({
    data : anim[key],
    keys : [["Transform","x"],["Transform","y"],"time",["Transform","r"]],
    id : key,
    endCallback : next_animation
  });
}

function add_guest_object(animation) {
  let newGuest = cg.createObject()
  .attach("Animator",{anim:cg.animations[animation],speed:8})
  .attach("Graphic",{level:1,graphic:cg.createGraphic({type:"image",image:cg.images.guest})});
  newGuest.Animator.triggerCallbacks.T = animationEvent;
}

setTimeout(function(){ add_guest_object("go_0") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_1") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_2") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_3") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_4") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_5") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_6") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_7") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_8") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_9") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_10") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_11") }, Math.random()*8);
setTimeout(function(){ add_guest_object("go_12") }, Math.random()*8);

function add_guest(animation_name) { // 2024 me here... I dont know how I ended up with these two function names
  let newGuest = cg.createObject()
  .attach("Animator",{anim:cg.animations[animation_name],selfDestructObject:true})
  .attach("Graphic",{level:3,graphic:cg.createGraphic({type:"image",image:cg.images.guest})});
  newGuest.Animator.triggerCallbacks.T = animationEvent;
}

function animationEvent(object,Animator,trigger) {
  let event = trigger[1];
  if ((event=="spin")&&(object.Graphic.graphic.image.id!="cab0")) {
    if (Math.random()>0.5) {
      object.rotationVelocity = object.rotationVelocity-1/2;
    } else {
      object.rotationVelocity = object.rotationVelocity+1/2;
    }
    if (Math.abs(object.rotationVelocity)>1.7) {
      object.rotationVelocity = object.rotationVelocity/2;
    }
  } else if (event=="unlock_rotation") {
    object.rotationLock = false;
  } else if (event=="lock_rotation") {
    object.rotationLock = true;
  } else if (event=="reset_rotation") {
    object.rotationVelocity = 0;
    object.Transform.or = 0;
  } else if (event=="add_load_1") {
    guests_to_load_1++
  } else if (event=="add_load_2") {
    guests_to_load_2++
  } else if (event=="add_load_1_wait") {
    load_1_guests++;
    guests_moveing_l1--;
  } else if (event=="add_load_2_wait") {
    load_2_guests++;
    guests_moveing_l2--;
  } else if (event=="add_exit") {
    add_guest("exit");
  } else if (event.includes("audseq_")) {
    audio_sequence_play(event.replace("audseq_",""));
  } else if (event.includes("aud_")) {
    if (event.replace("aud_","")=="dispatch"&&object.BlockController.trainPosition!="back") { return; }
    audio[event.replace("aud_","")].start();
  }
}

let audio_sequence = [{
  "title" : "ride_1",
  "path_change" : 30
},{
  "title" : "ride_2",
  "path_change" : 30
},{
  "title" : "ride_3",
  "path_change" : 30
},{
  "title" : "ride_4",
  "path_change" : 30
},{
  "title" : "ride_5",
  "path_change" : 50
}]

let audio_prevention_time = 0;
let audpat_stage = 0;
function audio_sequence_play(name) {
  if (audio_prevention_time-cg.clock>0) { return "Audio Time Prevention"; } // Check if the requested audio is the next audio
  if (name!=audio_sequence[audpat_stage].title) { return '"' + name + '" Is Not The Awaited Audio'; } // Check if the requested audio is the next audio
  audio[name].start();

  audio_prevention_time = cg.clock + audio_sequence[audpat_stage].path_change*1000;
  if (audpat_stage==audio_sequence.length-1) { audpat_stage = 0; }
  else { audpat_stage++; }  
}

function timedEvent(evt) {
  if (evt.title=="queue_to_l1") {
    giq--;
    let newGuest = cg.createObject()
    .attach("Animator",{anim:cg.animations.queue_to_l1,selfDestructObject:true})
    .attach("Graphic",{level:3,graphic:cg.createGraphic({type:"image",image:cg.images.guest})});
    newGuest.Animator.triggerCallbacks.T = animationEvent;
  } else if (evt.title=="queue_to_l2") {
    giq--;
    let newGuest = cg.createObject()
    .attach("Animator",{anim:cg.animations.queue_to_l2,selfDestructObject:true})
    .attach("Graphic",{level:3,graphic:cg.createGraphic({type:"image",image:cg.images.guest})});
    newGuest.Animator.triggerCallbacks.T = animationEvent;
  } else if (evt.id=="queue_add_opertuinity") {
    if (operate_queue==false) { return; }
    if (Math.random()>giq/132) {
      giq += Math.round(Math.random() * (4 - 1) + 1);
      if (giq<20) {
        giq += Math.round(Math.random() * (4 - 1) + 1);
      }
    }
  }
}

cg.createEvent({id:"queue_add_opertuinity",duration:5,loop:true,end:timedEvent});

function buttonClicked(button,event) {
  if (game_over) {return;}
  let f = button.id;
  if (f=="pause") {
    cg.paused = true;
    ui_display.pause_menu = true;
  } else if (f=="unpause") {
    cg.paused = false;
    ui_display.pause_menu = false;
  } else if (f=="toggle_audio") {
    ChoreoGraph.AudioController.masterVolume = !ChoreoGraph.AudioController.masterVolume;
  } else if (f=="touch_dispatch_load"&&can_dispatch_load) {
    load_dispatch()
  } else if (f=="touch_dispatch_unload"&&can_dispatch_unload) {
    unload_dispatch()
  } else if (f=="toggle_opperation") {
    operate_queue = (!(operate_queue))
  } else if (f=="touch_gates") {
    if (can_open_gates) {
      gates_state = true;
    } else if (can_close_gates) {
      gates_state = false;
    }
  } else if (f=="touch_lock") {
    lock_restraints();
  } else if (f=="touch_unlock") {
    unlock_restraints();
  } else if (f=="log_session_panel") {
    ui_display.log_session = true;
  } else if (f=="log_session") {
    log_session();
  } else if (f.includes("toggle_block_")) {
    let block_num = parseInt(f.replace("toggle_block_",""));
    cg.blocks[block_num].override = (!(cg.blocks[block_num].override));
  } else if (f=="unlock_all_blocks") {
    for (let block_name in cg.blocks) {
      cg.blocks[block_name].override = false;
    }
  } else if (f=="open_credit") {
    ui_display.credit = true;
  } else if (f=="emergency_stop") {
    e_stop();
  } else if (f=="open_cabs") {
    cg.paused = true;
    ui_display.cabs = true;
  } else if (f=="controls") {
    ui_display.pause_menu = false;
    ui_display.manual = true;
  } else if (f=="open_block_sectioning") {
    ui_display.block_sectioning = true;
    ChoreoGraph.plugins.Visualisation.v.blocks.active = true;
  } else if (f=="close_cabs") {
    cg.paused = false;
    ui_display.cabs = false;
  } else if (f=="close_blocks") {
    ChoreoGraph.plugins.Visualisation.v.blocks.active = false;
    ui_display.block_sectioning = false;
  } else if (f=="close_controls") {
    ui_display.pause_menu = true;
    ui_display.manual = false;
  } else if (f=="close_log") {
    ui_display.log_session = false;
  } else if (f.includes("cab_train_button_")) {
    let train_id = f.replace("cab_train_button_","");
    let train_leader = cg.objects[get_trains()[train_id][0]];
    if (train_leader.Animator.anim.id=="storage") {
      if (can_dispatch_storage) {
        add_train(train_id);
      }
    } else if (train_leader.removalMark) {
      remove_removal_mark(train_leader.BlockController.train);
    } else if (train_leader.removalMark==false) {
      if (train_leader.Animator.anim.id!="scene_5"&&train_leader.Graphic.graphic.image.id=="cab0") {
        mark_for_removal(train_leader.BlockController.train);
      }
    }
  }
}

function log_session() {
  if (sim_session_id==null) { return; }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../submit.php", true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send("sid="+sim_session_id+"&playtime="+Math.floor(ChoreoGraph.playtime/1000)+"&auto=&guests="+experienced_guests+"&dispatches="+full_vehicle_dispatches);
  cg.paused = true;
  game_over = true;
  ui_display.log_session = false;
  ChoreoGraph.AudioController.masterVolume = 0;
}

cg.createButton({x:cg.cw/2,y:150+150/2,width:400,height:150,id:"unpause",check:"pause_menu",down:buttonClicked});
cg.createButton({x:cg.cw/2,y:350+150/2,width:400,height:150,id:"controls",check:"pause_menu",down:buttonClicked});
cg.createButton({type:"circle",x:1320,y:110,radius:60,id:"close_controls",check:"controls",down:buttonClicked});
cg.createButton({x:1050/2,y:cg.ch/2,width:1050,height:cg.ch,id:"close_blocks",check:"blocks",down:buttonClicked});
cg.createButton({type:"polygon",x:0,y:0,cursor:"default",path:[[0,0],[1400,0],[1400,850],[0,850],[0,0],[110,115],[110,740],[1285,740],[1285,275],[985,275],[985,115],[110,115]],id:"close_cabs",check:"cabs",cursor:"default",down:buttonClicked});
cg.createButton({type:"polygon",x:0,y:0,path:[[0,0],[1400,0],[1400,850],[0,850],[0,0],[480,250],[480,600],[920,600],[920,250],[480,250]],id:"close_log",check:"log_menu",down:buttonClicked});
cg.createButton({type:"circle",x:670+120/2,y:7+120/2,radius:60,id:"toggle_audio",check:"game_screen",down:buttonClicked});
cg.createButton({type:"circle",x:807+120/2,y:7+120/2,radius:60,id:"pause",check:"game_screen",down:buttonClicked});
cg.createButton({x:430+200/2,y:30+80/2,width:200,height:80,id:"toggle_opperation",check:"game_screen",down:buttonClicked});
cg.createButton({type:"circle",x:1048+120/2,y:590+120/2,radius:60,id:"open_cabs",check:"game_screen",down:buttonClicked});
cg.createButton({type:"circle",x:1219+120/2,y:590+120/2,radius:60,id:"open_block_sectioning",check:"game_screen",down:buttonClicked});
cg.createButton({type:"circle",x:1219+120/2,y:722+120/2,radius:60,id:"open_credit",check:"game_screen",down:buttonClicked});
cg.createButton({type:"circle",x:1048+120/2,y:722+120/2,radius:60,id:"emergency_stop",check:"game_screen",down:buttonClicked});
cg.createButton({x:100+150/2,y:780+60/2,width:150,height:60,id:"log_session_panel",check:"game_screen",down:buttonClicked});
cg.createButton({x:cg.cw/2,y:470+80/2,width:300,height:80,id:"log_session",check:"can_log_session",down:buttonClicked});

cg.createButton({x:170+150/2,y:470+80/2,width:150,height:80,id:"cab_train_button_a",check:"cabs",down:buttonClicked});
cg.createButton({x:170+150/2,y:620+80/2,width:150,height:80,id:"cab_train_button_b",check:"cabs",down:buttonClicked});
cg.createButton({x:450+150/2,y:170+80/2,width:150,height:80,id:"cab_train_button_c",check:"cabs",down:buttonClicked});
cg.createButton({x:450+150/2,y:320+80/2,width:150,height:80,id:"cab_train_button_d",check:"cabs",down:buttonClicked});
cg.createButton({x:450+150/2,y:470+80/2,width:150,height:80,id:"cab_train_button_e",check:"cabs",down:buttonClicked});
cg.createButton({x:450+150/2,y:620+80/2,width:150,height:80,id:"cab_train_button_f",check:"cabs",down:buttonClicked});
cg.createButton({x:730+150/2,y:170+80/2,width:150,height:80,id:"cab_train_button_g",check:"cabs",down:buttonClicked});
cg.createButton({x:730+150/2,y:320+80/2,width:150,height:80,id:"cab_train_button_h",check:"cabs",down:buttonClicked});
cg.createButton({x:730+150/2,y:470+80/2,width:150,height:80,id:"cab_train_button_i",check:"cabs",down:buttonClicked});
cg.createButton({x:730+150/2,y:620+80/2,width:150,height:80,id:"cab_train_button_j",check:"cabs",down:buttonClicked});
cg.createButton({x:1010+150/2,y:320+80/2,width:150,height:80,id:"cab_train_button_k",check:"cabs",down:buttonClicked});
cg.createButton({x:1010+150/2,y:470+80/2,width:150,height:80,id:"cab_train_button_l",check:"cabs",down:buttonClicked});
cg.createButton({x:1010+150/2,y:620+80/2,width:150,height:80,id:"cab_train_button_m",check:"cabs",down:buttonClicked});

cg.createButton({x:1047+300/2,y:102+60/2,width:300,height:60,id:"touch_dispatch_load",check:"game_screen",down:buttonClicked});
cg.createButton({x:1047+300/2,y:102+70+60/2,width:300,height:60,id:"touch_lock",check:"game_screen",down:buttonClicked});
cg.createButton({x:1047+300/2,y:102+70*2+60/2,width:300,height:60,id:"touch_gates",check:"game_screen",down:buttonClicked});
cg.createButton({x:1047+300/2,y:425+60/2,width:300,height:60,id:"touch_dispatch_unload",check:"game_screen",down:buttonClicked});
cg.createButton({x:1047+300/2,y:425+70+60/2,width:300,height:60,id:"touch_unlock",check:"game_screen",down:buttonClicked});
cg.createButton({x:1135+200/2,y:730+55/2,width:200,height:55,id:"unlock_all_blocks",check:"block_sectioning",down:buttonClicked});

let hasCreatedToggleBlocks = false;

cg.settings.callbacks.updateButtonChecks = function(cg) {
  let not_in_subgame_menu = (ui_display.cabs+ui_display.block_sectioning+ui_display.manual+ui_display.pause_menu+ui_display.welcome+ui_display.log_session==0); // Must all be false, true+true=2, false+true=1, false+false=0
  return {
    "none" : true,
    "pause_screen" : cg.paused,
    "cabs" : ui_display.cabs,
    "log_menu" : ui_display.log_session,
    "pause_menu" : ui_display.pause_menu,
    "controls" : ui_display.manual,
    "game_screen" : (!(cg.paused)&&not_in_subgame_menu),
    "can_log_session" : (ui_display.log_session&&sim_session_id!=null&&full_vehicle_dispatches!=0),
    "blocks" : ui_display.block_sectioning,
    "block_sectioning" : ui_display.block_sectioning
  }
}

let operating = true;

let can_dispatch_load = false;
let do_load_dispatch = [false,false];

let can_dispatch_unload = false;
let do_unload_dispatch = [false,false];

let can_lock = false;
let require_lock = [false,false];

let can_toggle_gates = true;
let can_open_gates = true;
let can_close_gates = true;
let gates_state = false; // false is closed

let can_unlock = false;
let require_unlock = [false,false];
let do_unload = [false,false];

let can_dispatch_end = false;
let do_dispatch_end = [false,false];

let do_dip_machine_arm = false;
let do_roger_zap = false;
let do_boom = false;
let do_fireworks = false;
let do_portable_hole = false;

let do_restraint_check_staff = false;

// STATISTICS
let experienced_guests = 0;
let full_vehicle_dispatches = 0;

let last_interaction = 0;

let sim_session_id = null;
let game_over = false;

// Guests in Queue
let giq = 5;

// Guest tracking
let load_1_guests = 0; // Number of guests waiting
let load_2_guests = 0;

let guests_to_load_1 = 0; // Number of guests in the vehicles
let guests_to_load_2 = 0;

let guests_moveing_l1 = 0;
let guests_moveing_l2 = 0;

let operate_queue = true;

let can_dispatch_storage = true;

let ui_display = {
  "pause_menu" : false,
  "block_sectioning" : false,
  "welcome" : false,
  "manual" : false,
  "log_session" : false,
  "cabs" : false
}

// CONTROL FUNCTIONS
function dispatch_next() {
  if (can_dispatch_unload) {
    unload_dispatch()
  } else if (can_dispatch_load) {
    load_dispatch()
  }
}

function load_dispatch() {
  if (gates_state) { return; }
  cg.createEvent({id:"dispatching",duration:2});
  do_load_dispatch = [true,true];
  if (cg.getObject(["Animator","anim","id"],"load_1")?.Graphic.graphic.image.id!="cab0"&&cg.getObject(["Animator","anim","id"],"load_2")?.Graphic.graphic.image.id!="cab0") {
    full_vehicle_dispatches++;
  }
}
function unload_dispatch() {
  do_unload_dispatch = [true,true];
}

function lock_restraints() {
  if (can_lock) {
    do_restraint_check_staff = true;
    do_lock = [true,true];
    require_lock = [false,false];
    cg.createEvent({id:"locking",duration:Math.random()*2+4});
  }
}

function unlock_restraints() {
  if (can_unlock) {
    do_unload = [true,true];
    require_unlock = [false,false];
  }
}

function e_stop() {
  for (let block_name in cg.blocks) {
    cg.blocks[block_name].override = true;
  }
}

function add_train(trainid) {
  let hasAddedFront = false;
  for (let objId in cg.objects) {
    let object = cg.objects[objId];
    if (object.BlockController?.train==trainid) {
      if (hasAddedFront==false) {
        hasAddedFront = true;
        object.Animator.anim = cg.animations.add;
        object.Animator.speed = 18.5;
        object.BlockController.trainPosition = "front";
        object.BlockController.block = 15;
        cg.blocks[15].clear = false;
      } else {
        object.Animator.anim = cg.animations.add_wait;
        object.Animator.speed = 18.5;
        object.BlockController.trainPosition = "back";
        object.BlockController.block = 15;
      }
    }
  }
}

function mark_for_removal(trainid) {
  for (let objId in cg.objects) {
    let object = cg.objects[objId];
    if (object.BlockController?.train==trainid) {
      object.removalMark = true;
    }
  }
}

function remove_removal_mark(trainid) {
  for (let objId in cg.objects) {
    let object = cg.objects[objId];
    if (object.BlockController?.train==trainid) {
      object.removalMark = false;
    }
  }
}

cg.settings.callbacks.keyDown = function(k) { // Must be called keyDown
  if (game_over) {return;}
  switch (k) {
    case "space":
      dispatch_next();
      break;
    case "right":
      if (can_open_gates) {
        gates_state = true;
      }
      break;
    case "left":
      if (can_close_gates) {
        gates_state = false;
      }
      break;
    case "up":
      unlock_restraints();
      break;
    case "down":
      lock_restraints();
      break;
    case "m":
      ChoreoGraph.AudioController.masterVolume = !ChoreoGraph.AudioController.masterVolume;
      break;
    case "escape":
      let not_in_subgame_menu = (ui_display.cabs+ui_display.block_sectioning+ui_display.manual+ui_display.pause_menu+ui_display.welcome==0)
      if (!(cg.paused)&&not_in_subgame_menu) {
        cg.paused = true;
        ui_display.pause_menu = true;
      } else {
        if (ui_display.pause_menu) {
          cg.paused = false;
          ui_display.pause_menu = false;
        }
      }
      break;
    case "b":
      if (ChoreoGraph.Input.keyStates["shift"])
      ChoreoGraph.plugins.Visualisation.v.blocks.active = (!(ChoreoGraph.plugins.Visualisation.v.blocks.active));
      break;
    case "l":
      if (ChoreoGraph.Input.keyStates["shift"])
      ChoreoGraph.plugins.Visualisation.v.animations.active = (!(ChoreoGraph.plugins.Visualisation.v.animations.active));
      break;
    case "k":
      if (ChoreoGraph.Input.keyStates["shift"])
      ChoreoGraph.plugins.Visualisation.v.buttons.active = (!(ChoreoGraph.plugins.Visualisation.v.buttons.active));
      break;
  }
}

cg.createObject({"id":"benny"})
.attach("Animator",{anim:cg.animations.benny})
.attach("Graphic",{level:1,graphic:cg.createGraphic({type:"image",image:cg.images.benny})});
cg.createObject({"id":"jollyTrolley"})
.attach("Animator",{anim:cg.animations.jolly_trolley,speed:10})
.attach("Graphic",{level:1,graphic:cg.createGraphic({type:"image",image:cg.images.jolly_trolley})});
cg.createObject({"id":"dipArm"})
.attach("Animator",{anim:cg.animations.dip_machine_arm_wait})
.attach("Graphic",{level:2,graphic:cg.createGraphic({type:"image",image:cg.images.dip_machine_arm})});
cg.createObject({"id":"rogerZap"})
.attach("Animator",{anim:cg.animations.roger_zap_wait})
.attach("Graphic",{level:2,graphic:cg.createGraphic({type:"image",image:cg.images.roger_zap})});
cg.createObject({"id":"boomRoom"})
.attach("Animator",{anim:cg.animations.boom_room_idle})
.attach("Graphic",{level:2,graphic:cg.createGraphic({type:"image",image:cg.images.boom_room_darkness})});
cg.createObject({"id":"fireworkLights"})
.attach("Animator",{anim:cg.animations.firework_lights_off})
.attach("Graphic",{level:2,graphic:cg.createGraphic({type:"image",image:cg.images.firework_lights})});
cg.createObject({"id":"portableHole"})
.attach("Animator",{anim:cg.animations.portable_hole_idle})
.attach("Graphic",{level:5,graphic:cg.createGraphic({type:"image",image:cg.images.portable_hole})});
cg.createObject({"id":"staffRestraintCheck"})
.attach("Animator",{anim:cg.animations.restraint_check_wait,speed:2})
.attach("Graphic",{level:5,graphic:cg.createGraphic({type:"image",image:cg.images.staff})});

let cabAnims = ["load_1","load_2","end_wait_1","end_wait_2","unload_unload_wait_1","unload_unload_wait_2","unload_wait_1","unload_wait_2","load_wait_1","load_wait_2","unload_1","unload_2","storage","storage","storage","storage","storage","storage","storage","storage","storage","storage","storage","storage","storage","storage"];
let alphabet = "abcdefghijklmnopqrstuvwxyz";

let cabs = [];

let trainsBlockControllers = [];

for (let i=0;i<cabAnims.length;i++) {
  let newCab = cg.createObject({"id":"cab"+i})
  .attach("Graphic",{master:true,level:1,graphic:cg.createGraphic({type:"image",image:cg.images.cab0})})
  .attach("Animator",{anim:cg.animations[cabAnims[i]],speed:15})
  .attach("BlockController",{train:alphabet[Math.floor((i/2))]})
  
  newCab.Animator.triggerCallbacks.P = function(object,Animator,trigger) {
    object.BlockController.trainPosition = trigger[1];
  }

  if (cabAnims[i]=="end_wait_1") {
    newCab.BlockController.block = 37;
    newCab.BlockController.trainPosition = "back";
  }

  if (trainsBlockControllers[alphabet[Math.floor((i/2))]]==undefined) {
    trainsBlockControllers[alphabet[Math.floor((i/2))]] = [];
  }

  trainsBlockControllers[alphabet[Math.floor((i/2))]].push(newCab.BlockController);

  newCab.Animator.triggerCallbacks.T = animationEvent;
  newCab.rotationLock = true;
  newCab.removalMark = false;

  cabs.push(newCab);
}

for (let objId in cg.objects) {
  let object = cg.objects[objId];
  if (object.BlockController) {
    object.BlockController.trainCarriages = trainsBlockControllers[object.BlockController.train];
  }
}

function blockIsClear(block) {
  if (cg.blocks[block]==undefined) {
    console.error("Block " + block + " does not exist.")
    return false;
  }
  if (cg.blocks[block].clear&&cg.blocks[block].override==false) {
    return true;
  }
  return false;
}

cg.settings.callbacks.cursorDown = function() {
  if (ui_display.credit) {
    ui_display.credit = false;
  }
}

cg.settings.callbacks.loopBefore = function() {
  if (load_1_guests>0&&gates_state) {
    if (load_1_guests==1) {
      add_guest("l1_stand_1");
    } else {
      add_guest("l1_stand_1");
      add_guest("l1_stand_2");
    }
    load_1_guests = 0;
  }
  
  if (load_2_guests>0&&gates_state) {
    if (load_2_guests==1) {
      add_guest("l2_stand_1");
    } else {
      add_guest("l2_stand_1");
      add_guest("l2_stand_2");
    }
    load_2_guests = 0;
  }

  for (let i=0;i<cabs.length;i++) {
    let cab = cabs[i];
    let rotationDelta = Math.min(cg.timeDelta,100);
    if (cab.rotationLock) {
      if (cab.Transform.or>1) {
        cab.Transform.or = cab.Transform.or - (rotationDelta/40);
      } else if (cab.Transform.or<-1) {
        cab.Transform.or = cab.Transform.or + (rotationDelta/40);
      } else {
        cab.Transform.or = 0;
      }
      if (cab.rotationVelocity>0.01) {
        cab.rotationVelocity = cab.rotationVelocity - (rotationDelta/2000);
      } else if (cab.rotationVelocity<-0.01) {
        cab.rotationVelocity = cab.rotationVelocity + (rotationDelta/2000);
      } else {
        cab.rotationVelocity = 0;
      }
    }
    // else if (cab.id=="cab1"||true) { // Make cab1 (front of train A) fight rotation
    //   if (cab.Transform.or>1) {
    //     cab.Transform.or = cab.Transform.or - (rotationDelta/60);
    //   } else if (cab.Transform.or<-1) {
    //     cab.Transform.or = cab.Transform.or + (rotationDelta/60);
    //   } else {
    //     cab.Transform.or = 0;
    //   }
    //   if (cab.rotationVelocity>0.01) {
    //     cab.rotationVelocity = cab.rotationVelocity - (rotationDelta/6000);
    //   } else if (cab.rotationVelocity<-0.01) {
    //     cab.rotationVelocity = cab.rotationVelocity + (rotationDelta/6000);
    //   } else {
    //     cab.rotationVelocity = 0;
    //   }
    // }
    cab.Transform.or = cab.Transform.or + (cab.rotationVelocity*rotationDelta)/10; // Changes the offset by the velocity

    if (cab.rotationVelocity>0) {
      cab.rotationVelocity = cab.rotationVelocity - (rotationDelta/100000);
    } else if (cab.rotationVelocity<0) {
      cab.rotationVelocity = cab.rotationVelocity + (rotationDelta/100000);
    }

    if (cab.rotationVelocity>-0.001&&cab.rotationVelocity<0.001) { // Prevent Tiny Velocities
      cab.rotationVelocity = 0;
    }
    if (cab.Transform.or>180) { cab.Transform.or = cab.Transform.or-360; }
    else if (cab.Transform.or<-180) { cab.Transform.or = cab.Transform.or+360; }
  }
  
  cg.addToLevel(2,guests);
  cg.addToLevel(5,gates);
  cg.addToLevel(5,userInterface);
}

cg.settings.callbacks.loopAfter = function() {
  let load1Removal = cg.getObject(["Animator","anim","id"],"load_1");
  if (load1Removal) { load1Removal = load1Removal.removalMark; }
  let load1CabImg = cg.getObject(["Animator","anim","id"],"load_1");
  if (load1CabImg) { load1CabImg = load1CabImg.Graphic.graphic.image.id; }
  let load2CabImg = cg.getObject(["Animator","anim","id"],"load_2");
  if (load2CabImg) { load2CabImg = load2CabImg.Graphic.graphic.image.id; }
  let unload1CabImg = cg.getObject(["Animator","anim","id"],"unload_1");
  if (unload1CabImg) { unload1CabImg = unload1CabImg.Graphic.graphic.image.id; }
  let unload2CabImg = cg.getObject(["Animator","anim","id"],"unload_2");
  if (unload2CabImg) { unload2CabImg = unload2CabImg.Graphic.graphic.image.id; }

  can_dispatch_end = (cg.animations.end_wait_1.inUse&&cg.animations.end_wait_2.inUse&&cg.animations.unload_unload_wait_1.inUse==false&&cg.animations.unload_unload_wait_2.inUse==false&&cg.animations.end_wait_1_to_unload_unload_wait_1.inUse==false&&cg.animations.end_wait_2_to_unload_unload_wait_2.inUse==false&&cg.animations.unload_unload_wait_1_to_unload_wait_1.inUse==false)

  can_dispatch_load = (cg.animations.load_1.inUse&&cg.animations.load_2.inUse&&blockIsClear(1)&&gates_state==false&&(!(cg.events.locking!=undefined))&&(!(require_lock[0]||require_lock[1]))); // Cabs Exist, Block 1 Clear, Gates Closed, Not Locking, No need to lock
  can_dispatch_unload = (cg.animations.unload_1.inUse&&cg.animations.unload_2.inUse&&cg.animations.load_wait_1.inUse==false&&cg.animations.load_wait_2.inUse==false&&unload1CabImg=="cab0"&&unload2CabImg=="cab0"&&(!(cg.events.unloading!=undefined))); // Cabs Exist, Load Wait Clear, Cabs Empty, Not unloading

  can_open_gates = (load1CabImg=="cab0"&&load2CabImg=="cab0"&&load_2_guests!=0&&cg.animations.queue_to_l1.inUse==false&&cg.animations.queue_to_l2.inUse==false&&load1Removal==false); // Empty Vehicle Waiting, Guests Waiting, No Guests Moving, Not Marked For Removal
  can_close_gates = (cg.animations.l1_stand_1.inUse==false&&cg.animations.l1_stand_2.inUse==false&&cg.animations.l2_stand_1.inUse==false&&cg.animations.l2_stand_2.inUse==false); // No Guests Moving Through Gates

  can_dispatch_storage = blockIsClear(15);

  can_unlock = ((require_unlock[0]||require_unlock[1])&&cg.animations.unload_1.inUse&&cg.animations.unload_2.inUse); // Requires Unlock, Cab Exists

  can_lock = ((require_lock[0]||require_lock[1])&&cg.animations.load_1.inUse&&cg.animations.load_2.inUse&&gates_state==false); // Requires Lock, Cab Exists, Gates Closed

  if (gates_state) {
    can_toggle_gates = can_close_gates;
  } else {
    can_toggle_gates = can_open_gates;
  }

  if (can_dispatch_end) {
    do_dispatch_end = [true,true];
  }

  if (gates_state==false&&load_1_guests==0&&load_2_guests==0&&guests_moveing_l1==0&&guests_moveing_l2==0&&giq>4) { // Gates Closed, No guests already waiting, Queue has enough
    if (Math.random()>0.4) {
      cg.createEvent({title:"queue_to_l1",duration:2,end:timedEvent});
      cg.createEvent({title:"queue_to_l1",duration:3,end:timedEvent});
      cg.createEvent({title:"queue_to_l2",duration:0,end:timedEvent});
      cg.createEvent({title:"queue_to_l2",duration:1,end:timedEvent});
      guests_moveing_l1 = 2;
      guests_moveing_l2 = 2;
    } else {
      cg.createEvent({title:"queue_to_l1",duration:2,end:timedEvent});
      cg.createEvent({title:"queue_to_l2",duration:1,end:timedEvent});
      cg.createEvent({title:"queue_to_l2",duration:0,end:timedEvent});
      guests_moveing_l1 = 1;
      guests_moveing_l2 = 2;
    }
  }

  if (cg.getObject(["Animator","anim"],"load_1")?.removalMark) {
    draw_light(615,360,"red",20)
  }
  // This code is for the video, it just makes a big circle over cab1
  // c.beginPath();
  // let pos = [cg.objects.cab1.Transform.x,cg.objects.cab1.Transform.y];
  // c.moveTo(pos[0],pos[1]);
  // c.arc(pos[0],pos[1],20,0,Math.PI*2);
  // c.fillStyle = "#b5b3ff";
  // c.fill();

  if (fancyBlockView) {
    c.fillStyle = "#050020";
    c.fillRect(0,0,840,328);
    c.fillStyle = "#4b42f7";
    c.font = "bold 46px Baloo2";
    let cab1Block = cg.objects.cab1.BlockController.block;
    if (cab1Block!=null) {
      c.textAlign = "center";
      c.fillText("BLOCK "+cab1Block,840/2,80);
    }
    let pos = [102,140];
    let size = 18;
    let separation = 58;
    let row2 = 11;
    let row3 = 23;
    for (let block_num = 0; block_num < Object.keys(cg.blocks).length-1; block_num++) {
      c.save();
      let offset = 0;
      let lastInRow = 11;
      let ofRow = block_num%12;
      if (block_num>row3) {
        offset = separation*2;
        ofRow = block_num-row3-1;
        lastInRow = 12;
      } else if (block_num>row2) {
        offset = separation;
        ofRow = block_num-row2-1;
        lastInRow = 11;
      }
      let x = pos[0]+ofRow*separation;
      if (block_num>row3) {
        x -= separation/2;
      } else if (block_num>row2) {
        c.scale(-1,1);
        c.translate(-840-2,0);
      }
      let y = pos[1]+offset;
      if (block_num+1==cab1Block) {
        c.fillStyle = "#b6b2fb";
        c.beginPath();
        c.arc(x,y,size,0,Math.PI*2);
        c.fill();
      }
      c.strokeStyle = "#4b42f7";
      c.lineWidth = 7;
      c.beginPath();
      c.arc(x,y,size,0,Math.PI*2);
      c.stroke();
      if (ofRow<lastInRow) {
        c.beginPath();
        c.moveTo(x+size,y);
        c.lineTo(x+separation/1.5,y);
        c.stroke();
      }
      c.fillStyle = "#fff";
      c.font = "bold 15px Verdana";
      c.textAlign = "center";
      // c.fillText(block_num,x,y+5);
      c.restore();
    }
    c.strokeStyle = "#4b42f7";
    c.lineWidth = 7;
    c.beginPath();
    c.arc(760,157,size,Math.PI*1.5,Math.PI*2);
    c.arc(760,181,size,0,Math.PI/2);
    c.stroke();
    c.beginPath();
    c.arc(81,216,size,Math.PI*1.5,Math.PI*0.9,true);
    c.lineTo(68,240);
    c.stroke();
  }
}

cg.settings.callbacks.loadingLoop = function(cg,loadedImages) {
  c.fillStyle = "blue";
  c.font = "50px Verdana";
  c.fillText("IMAGES:" + loadedImages + "/" + Object.keys(cg.images).length,100,100);
  c.fillStyle = "#b9786a";
  c.fillRect(0,0,cg.cw,cg.ch);
  draw_fancy_box({
    "x" : 80,
    "y" : 80,
    "width" : cg.cw-80*2,
    "height" : cg.ch-80*2,
    "radius" : 100,
    "boffset" : 0,
    "bwidth" : 80,
    "bg" : "#ccac9d",
    "border" : "#245000"
  });
  c.font = "bold 90px Verdana";
  c.textAlign = "center";
  c.fillStyle = "white";
  c.fillText("LOADING IMAGES...", cg.cw/2, cg.ch/2-30);
  c.font = "bold 35px Verdana";
  c.fillText(loadedImages + "/" + Object.keys(cg.images).length, cg.cw/2, cg.ch/2+60);
}

let fancyBlockView = false;

function draw_fancy_box(box) {
  let x = box["x"];
  let y = box["y"];
  let width = box["width"];
  let height = box["height"];
  let r = box["radius"];
  let boffset = box["boffset"];
  c.lineWidth = box["bwidth"];
  let pi = Math.PI;
  // BACKGROUND
  if (box["bg"]!="") {
    c.fillStyle = box["bg"];
    c.beginPath();
    c.moveTo(x+r,y);
    c.arc(x-r+width,y+r,r,-pi/2,0,false);
    c.arc(x+width-r,y+height-r,r,0,pi/2,false);
    c.arc(x+r,y+height-r,r,pi/2,pi,false);
    c.arc(x+r,y+r,r,pi,-pi/2,false);
    c.fill();
  }
  // BORDER
  if (box["border"]!="") {
    c.strokeStyle = box["border"];
    c.beginPath();
    c.moveTo(x+r+boffset,y+boffset);
    c.arc(x-r+width-boffset,y+r+boffset,r,-pi/2,0,false);
    c.arc(x+width-r-boffset,y+height-r-boffset,r,0,pi/2,false);
    c.arc(x+r+boffset,y+height-r-boffset,r,pi/2,pi,false);
    c.arc(x+r+boffset,y+r+boffset,r,pi,-pi/2,false);
    c.stroke();
  }
}

function get_trains() {
  let trains = {};
  for (let objId in cg.objects) {
    if (cg.objects[objId].BlockController?.train!==undefined) {
      if (trains[cg.objects[objId].BlockController.train]!==undefined) {
        trains[cg.objects[objId].BlockController.train].push(cg.objects[objId].id);
      } else {
        trains[cg.objects[objId].BlockController.train] = [cg.objects[objId].id];
      }
    }
  }
  return trains;
}

function draw_cab_option(x,y,cabs,info) {
  let cab_box_width = 250;
  let cab_box_height = 130;
  draw_fancy_box({"x":x, "y":y, "width":cab_box_width, "height":cab_box_height, "radius":5, "boffset":0, "bwidth":5, "bg":"#333", "border":"#fff"});
  c.lineWidth = 5;
  c.strokeStyle = "#000";
  c.beginPath();
  c.moveTo(x+cab_box_width-cab_box_width/5.8,y+3);
  c.lineTo(x+cab_box_width-cab_box_width/5.8,y+cab_box_height-3)
  c.stroke();
  c.drawImage(cg.objects[cabs[1]].Graphic.graphic.image.image,x+cab_box_width-cab_box_width/5.8-50/2,y+35-50/2,50,50);
  c.drawImage(cg.objects[cabs[0]].Graphic.graphic.image.image,x+cab_box_width-cab_box_width/5.8-50/2,y+95-50/2,50,50);
  c.fillStyle = "#fff";
  c.font = "20px Verdana";
  c.textAlign = "center";
  let fancy_location = fancy_anim_names[cg.objects[cabs[0]].Animator.anim.id];
  c.fillText(fancy_location,x+cab_box_width/2.8,y+25);

  let button_title = "ROW BOAT";
  let button_colour = "#86acff";

  if (cg.objects[cabs[0]].removalMark) {
    button_title = "REMOVING";
    button_colour = "#e07b39";
  } else if (fancy_location=="ADDING") {
    button_title = "ADDING";
    button_colour = "#eda758";
  } else if (fancy_location=="STORAGE") { // All good to add
    if (can_dispatch_storage) {
      button_title = "ADD";
      button_colour = "#eb4034";
    } else { // Ready to add but the ride is not ready
      button_title = "BLOCKED";
      button_colour = "#9c160c";
    }
  } else {
    if (fancy_location=="SCENE 5") { // Scene 5 is the scene that merges off, it can split if it enters while the front is in 5
      button_title = "BLOCKED";
      button_colour = "#9c160c";
    } else {
      if (cg.objects[cabs[0]].Graphic.graphic.image.id=="cab0") {
        button_title = "REMOVE";
        button_colour = "#34eb49";
      } else {
        button_title = "LOADED";
        button_colour = "#9c160c";
      }
    }
  }

  draw_fancy_box({"x":x+15, "y":y+35, "width":cab_box_width-cab_box_width/2.5, "height":cab_box_height-50, "radius":5, "boffset":0, "bwidth":3, "bg":button_colour, "border":"#fff"});
  c.fillStyle = "#fff";
  c.font = "bold 20px Verdana";
  c.textAlign = "center";
  c.fillText(button_title,x+15+cab_box_width/3.3,y+cab_box_height-cab_box_height/2.8);

  // CREATING THE BUTTONS
  // console.log('add_button(' + (x+15).toString() + ', ' + (y+35).toString() + ', ' + (cab_box_width-cab_box_width/2.5).toString() + ', ' + (cab_box_height-50).toString() + ', "cab_train_button_' + info + '", "pointer", "cabs")')
}

function draw_light(x,y,colour="#86acff",size=50) {
  // c.fillRect(x,y,size,size);
  c.fillStyle = "black";
  c.beginPath();
  c.arc(x+size/2,y+size/2,size/2.2,0,Math.PI*2);
  c.fill();
  c.fillStyle = colour;
  c.beginPath();
  c.arc(x+size/2,y+size/2,size/2.7,0,Math.PI*2);
  c.fill();
}

ChoreoGraph.graphicTypes.userInterface = new class userInterface {
  draw(g) {
    c.textBaseline = "alphabetic";

    // AUDIO CROSS OUT
    if (ChoreoGraph.AudioController.masterVolume==0) {
      c.beginPath()
      c.lineWidth = 8;
      c.strokeStyle = "#000";
      c.moveTo(703,92);
      c.lineTo(755,40);
      c.stroke()
    }

    c.strokeStyle = "black";
    c.lineWidth = 10;
    c.beginPath();
    if (gates_state) {
      c.moveTo(1290+10,247+50-10)
      c.lineTo(1290+50-10,247+10)
    } else {
      c.moveTo(1290+10,247+10)
      c.lineTo(1290+50-10,247+50-10)
    }
    c.stroke()

    c.strokeStyle = "#4d4d4d";
    c.lineWidth = 20;
    c.beginPath();
    // QUEUE OPERATION SIGN
    c.moveTo(430+40,0);
    c.lineTo(430+40,50);
    c.moveTo(630-40,0);
    c.lineTo(630-40,50);
    // QUEUE SIGN
    c.moveTo(80+40,0);
    c.lineTo(80+40,50);
    c.moveTo(380-40,0);
    c.lineTo(380-40,50);
    c.stroke();

    draw_fancy_box({
      "x" : 100,
      "y" : 780,
      "width" : 150,
      "height" : 60,
      "radius" : 10,
      "boffset" : 0,
      "bwidth" : 5,
      "bg" : "#f8f8f8",
      "border" : "#000"
    });
    c.fillStyle = "black";
    c.font = "bold 35px Verdana";
    c.textAlign = "center";
    c.fillText("LOG",100+73,822)

    draw_fancy_box({
      "x" : 430,
      "y" : 30,
      "width" : 200,
      "height" : 80,
      "radius" : 5,
      "boffset" : 0,
      "bwidth" : 5,
      "bg" : "#f8f8f8",
      "border" : "#000"
    });

    let open_close_colour = "#e3461b";
    let open_close_name = "CLOSED";
    if (operate_queue) {
      open_close_colour = "#1be322";
      open_close_name = "OPEN";
    }
    draw_fancy_box({
      "x" : 445,
      "y" : 42.5,
      "width" : 170,
      "height" : 55,
      "radius" : 5,
      "boffset" : 0,
      "bwidth" : 5,
      "bg" : "#f8f8f8",
      "border" : open_close_colour
    });
    c.fillStyle = "#000";
    c.font = "bold 35px Verdana";
    c.textAlign = "center";
    c.fillText(open_close_name,530,82);

    // QUEUE COUNT
    draw_fancy_box({"x":80, "y":30, "width":300, "height":80, "radius":5, "boffset":0, "bwidth":5,"bg":"#f8f8f8", "border":"#000"});

    c.fillStyle = "#000";
    c.fillText("GUESTS "+giq,230,82);


    c.font = "bold 35px Verdana";
    c.textAlign = "center";
    // LOAD TITLE SIGN
    draw_fancy_box({"x":1027+50, "y":10, "width":340-100, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#dc0a14", "border":"#fff"});
    c.fillStyle = "#fff";
    c.fillText("LOAD",1027+340/2, 52);
    // UNLOAD TITLE SIGN
    draw_fancy_box({"x":1027+50, "y":335, "width":340-100, "height":60, "radius":5, "boffset":0,"bwidth":5, "bg":"#dc0a14", "border":"#fff"});
    c.fillStyle = "#fff";
    c.fillText("UNLOAD",1027+340/2, 377);

    // LOAD INFORMATION
    draw_fancy_box({"x":1027, "y":83, "width":340, "height":240, "radius":5, "boffset":0, "bwidth":5,"bg":"#f8f8f8", "border":"#000"});

    // UNLOAD INFORMATION
    draw_fancy_box({"x":1027, "y":403, "width":340, "height":170, "radius":5, "boffset":0, "bwidth":5,"bg":"#f8f8f8", "border":"#000"});

    // Load and Unload Controls with touch and non-touch version
    // DISPATCH BUTTON
    if (can_dispatch_load) {
      if (cg.getObject(["Animator","anim","id"],"load_1")?.Graphic.graphic.image.id=="cab0") {
        draw_fancy_box({"x":1027+20, "y":102, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#005a8c", "border":"#000"});
      } else {
        draw_fancy_box({"x":1027+20, "y":102, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#008450", "border":"#000"});
      }
    } else {
      draw_fancy_box({"x":1027+20, "y":102, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#b81d13", "border":"#000"});
    }

    if (cg.events.locking!=undefined) {
      draw_fancy_box({"x":1027+20, "y":172, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#efb700", "border":"#000"});
    } else if (can_lock) {
      draw_fancy_box({"x":1027+20, "y":172, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#008450", "border":"#000"});
    } else {
      draw_fancy_box({"x":1027+20, "y":172, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#b81d13", "border":"#000"});
    }

    if (gates_state) {
      draw_light(1290,127+2*60,"#008450");
      c.strokeStyle = "black";
      c.lineWidth = 10;
      c.beginPath();
      c.moveTo(1290+10,247+50-10)
      c.lineTo(1290+50-10,247+10)
      c.stroke()
    } else {
      draw_light(1290,127+2*60,"#b81d13");
      c.strokeStyle = "black";
      c.lineWidth = 10;
      c.beginPath();
      c.moveTo(1290+10,247+10)
      c.lineTo(1290+50-10,247+50-10)
      c.stroke()
    }

    if (can_toggle_gates) { // Gate Indicator
      draw_fancy_box({"x":1027+20, "y":242, "width":230, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#008450", "border":"#000"});
    } else {
      draw_fancy_box({"x":1027+20, "y":242, "width":230, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#b81d13", "border":"#000"});
    }

    if (can_dispatch_unload) {
      draw_fancy_box({"x":1027+20, "y":425, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#008450", "border":"#000"});
    } else {
      draw_fancy_box({"x":1027+20, "y":425, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#b81d13", "border":"#000"});
    }
    if (cg.events.unloading!=undefined) {
      draw_fancy_box({"x":1027+20, "y":425+70, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#efb700", "border":"#000"});
    } else if (can_unlock) {
      draw_fancy_box({"x":1027+20, "y":425+70, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#008450", "border":"#000"});
    } else {
      draw_fancy_box({"x":1027+20, "y":425+70, "width":340-40, "height":60, "radius":5, "boffset":0, "bwidth":5, "bg":"#b81d13", "border":"#000"});
    }

    c.fillStyle = "#fff";
    c.fillText("DISPATCH",1027+340/2, 145);
    c.fillText("RESTRAINTS",1027+340/2, 145+70);
    c.fillText("GATES",995+340/2, 145+70*2);
    c.fillText("DISPATCH",1027+340/2, 400+70);
    c.fillText("RESTRAINTS",1027+340/2, 400+70*2);

    let aBlockIsOverriden = false;
    for (let bid in cg.blocks) {
      let block = cg.blocks[bid];
      if (block.override) {
        aBlockIsOverriden = true;
        break;
      }
    }

    if (aBlockIsOverriden&&cg.clock%1000>500) {
      c.beginPath();
      c.arc(1310,650,5,0,Math.PI*2);
      c.fillStyle = "red";
      c.fill();
    }

    if (ui_display.pause_menu) {
      c.globalAlpha = 0.3;
      c.fillStyle = "black";
      c.fillRect(0,0,cg.cw,cg.ch);
      c.globalAlpha = 1;
      c.fillStyle = "#ffffff";
      c.font = "bold 50px Verdana";
      c.textAlign = "center";
      c.fillText("PAUSED", cg.cw/2, cg.ch/2)
      draw_fancy_box({
        "x" : cg.cw/2-200,
        "y" : 125,
        "width" : 400,
        "height" : cg.ch-250,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });

      c.strokeStyle = "#fff";
      c.lineWidth = 15;
      c.beginPath();
      c.moveTo(cg.cw/2-200,325); c.lineTo(cg.cw/2+200,325);
      c.moveTo(cg.cw/2-200,525); c.lineTo(cg.cw/2+200,525);
      c.stroke();
      c.font = "bold 70px Verdana";
      c.fillStyle = "#fff";
      if (cg.buttons.unpause.hovered) { c.fillStyle = "#caede7"; }
      c.fillText("Play",cg.cw/2,250);
      c.fillStyle = "#fff";
      if (cg.buttons.controls.hovered) { c.fillStyle = "#caede7"; }
      c.fillText("Controls",cg.cw/2,450);

      c.fillStyle = "#fff";
      c.font = "bold 30px Verdana";
      c.textAlign = "right";
      c.fillText("Dispatches: " + full_vehicle_dispatches,cg.cw/2+85,600);
      c.fillText("Guests: " + experienced_guests,cg.cw/2+85,670);
    }
    if (ui_display.cabs) {
      c.globalAlpha = 0.3;
      c.fillStyle = "black";
      c.fillRect(0,0,cg.cw,cg.ch);
      c.globalAlpha = 1;
      draw_fancy_box({
        "x" : 100,
        "y" : 100,
        "width" : cg.cw-200,
        "height" : cg.ch-200,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#555",
        "border" : "#fff"
      });
      c.textAlign = "left";
      c.font = "bold 70px Verdana";
      c.fillStyle = "#fff";
      c.fillText("CABS",160,200);

      c.font = "20px Verdana";
      c.fillText("Remove or add cabs",150,250+25*0);
      c.fillText("to the ride circuit.",150,250+25*1);
      c.fillText("A loaded cab cannot be.",150,270+25*2);
      c.fillText("removed. You can only",150,270+25*3);
      c.fillText("add cabs when blocks",150,270+25*4);
      c.fillText("15 is clear.",150,270+25*5);

      let trains = get_trains();

      draw_cab_option(155+300*0,135+150*2,trains["a"],0);
      draw_cab_option(155+300*0,135+150*3,trains["b"],1);

      draw_cab_option(155+280*1,135+150*0,trains["c"],2);
      draw_cab_option(155+280*1,135+150*1,trains["d"],3);
      draw_cab_option(155+280*1,135+150*2,trains["e"],4);
      draw_cab_option(155+280*1,135+150*3,trains["f"],5);

      draw_cab_option(155+280*2,135+150*0,trains["g"],6);
      draw_cab_option(155+280*2,135+150*1,trains["h"],7);
      draw_cab_option(155+280*2,135+150*2,trains["i"],8);
      draw_cab_option(155+280*2,135+150*3,trains["j"],9);

      draw_cab_option(155+280*3,135+150*1,trains["k"],10);
      draw_cab_option(155+280*3,135+150*2,trains["l"],11);
      draw_cab_option(155+280*3,135+150*3,trains["m"],12);

      draw_fancy_box({"x":155+280*3+150, "y":135, "width":100, "height":100, "radius":5, "boffset":0,"bwidth":5, "bg":"#999", "border":"#fff"});
      c.lineWidth = 5;
      c.strokeStyle = "#fff";
      c.beginPath();
      c.moveTo(155+280*3+150,135);
      c.lineTo(155+280*3+150+100,135+100)
      
      c.moveTo(155+280*3+150+100,135);
      c.lineTo(155+280*3+150,135+100)
      c.stroke();
    }
    if (ui_display.log_session) {
      draw_fancy_box({
        "x" : cg.cw/2-220,
        "y" : 250,
        "width" : 440,
        "height" : 350,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });
      c.textAlign = "center";
      c.font = "bold 50px Verdana";
      c.fillStyle = "#fff";
      c.fillText("LOG SESSION",cg.cw/2,cg.ch/2-90);
      c.font = "20px Verdana";
      if (sim_session_id==null) {
        c.fillText("You must be logged in to log sessions.",cg.cw/2,cg.ch/2-30);
        c.fillText("Creating an account will allow you to",cg.cw/2,cg.ch/2+30*1);
        c.fillText("keep track of statistics from when",cg.cw/2,cg.ch/2+30*2);
        c.fillText("you play simulations and statistics",cg.cw/2,cg.ch/2+30*3);
        c.fillText("will show on your profile.",cg.cw/2,cg.ch/2+30*4);
      } else if (full_vehicle_dispatches==0) {
        c.fillText("You must dispatch a vehicle",cg.cw/2,cg.ch/2-30);
        c.fillText("before logging.",cg.cw/2,cg.ch/2-30+30*1);
        c.fillText("What is the point of a session",cg.cw/2,cg.ch/2+30*2);
        c.fillText("with no proper statistics?",cg.cw/2,cg.ch/2+30*3);
      } else {
        c.fillText("This will end the session",cg.cw/2,cg.ch/2-40);
        c.fillText("and log all statistics so they",cg.cw/2,cg.ch/2-40+30*1);
        c.fillText("show on your profile.",cg.cw/2,cg.ch/2-40+30*2);

        draw_fancy_box({
          "x" : cg.cw/2-150,
          "y" : 470,
          "width" : 300,
          "height" : 80,
          "radius" : 30,
          "boffset" : 0,
          "bwidth" : 8,
          "bg" : "#27a886",
          "border" : "#fff"
        });
        c.font = "bold 30px Verdana";
        c.fillStyle = "#fff";
        c.fillText("LOG SESSION",cg.cw/2,cg.ch/2+97);
      }
    }
    if (ui_display.block_sectioning) {
      draw_fancy_box({"x":1027, "y":25, "width":340, "height":800, "radius":5, "boffset":0, "bwidth":5,"bg":"#f8f8f8", "border":"#000"});
      draw_fancy_box({"x":1135, "y":730, "width":200, "height":55, "radius":5, "boffset":0, "bwidth":5,"bg":"#f8f8f8", "border":"#000"});
      let pos = [1055,58];
      let textOffset = [30,42];
      let bbs = 70; // Block Button Size
      let separation = 74;
      let innerBorder = 10;
      for (let block_num = 0; block_num < Object.keys(cg.blocks).length-1; block_num++) { // -1 to remove null
        if (cg.blocks[block_num+1].clear) {
          c.fillStyle = "#008450";
        } else {
          c.fillStyle = "#b81d13";
        }
        c.beginPath();
        c.arc(pos[0]-innerBorder/2+separation*(block_num%4)+bbs/2,pos[1]-innerBorder/2+(Math.floor(block_num/4))*separation+bbs/2,bbs/2,0,Math.PI*2);
        c.fill();
        if (cg.blocks[block_num+1].override) {
          draw_light(pos[0]+separation*(block_num%4)-innerBorder/4,pos[1]+(Math.floor(block_num/4))*separation-innerBorder/4,"#b81d13",bbs-innerBorder/2);
        } else {
          draw_light(pos[0]+separation*(block_num%4)-innerBorder/4,pos[1]+(Math.floor(block_num/4))*separation-innerBorder/4,"#008450",bbs-innerBorder/2);
        }
        c.fillStyle = "white";
        c.font = "bold 32px Arial";
        c.textAlign = "center";
        c.fillText(block_num+1,pos[0]+separation*(block_num%4)+textOffset[0],pos[1]+(Math.floor(block_num/4))*separation+textOffset[1])
        if (hasCreatedToggleBlocks==false) {
          cg.createButton({type:"circle",x:pos[0]+separation*(block_num%4)+30,y:pos[1]+(Math.floor(block_num/4))*separation+30,radius:bbs/1.8,id:"toggle_block_"+(block_num+1),check:"block_sectioning",down:buttonClicked});
        }
      }
      hasCreatedToggleBlocks = true;
      c.font = "bold 30px Verdana";
      c.fillStyle = "black";
      c.fillText("Unlock All",1234,769)
      c.font = "bold 8px Verdana";
      c.textAlign = "left";
    }
    if (ui_display.manual) {
      c.globalAlpha = 0.3;
      c.fillStyle = "black";
      c.fillRect(0,0,cg.cw,cg.ch);
      c.globalAlpha = 1;

      c.fillStyle = "#ffffff";
      c.font = "bold 50px Verdana";
      c.textAlign = "center";
      draw_fancy_box({ // Button list box
        "x" : cg.cw/2-550,
        "y" : 50,
        "width" : 500,
        "height" : cg.ch-100,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });
      draw_fancy_box({ // White button background
        "x" : cg.cw/2-505,
        "y" : 150,
        "width" : 180,
        "height" : cg.ch-300,
        "radius" : 10,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#27a886",
        "border" : "#27a886"
      });
      draw_fancy_box({ // Yellow Sign Buttons
        "x" : cg.cw/2+50,
        "y" : 50,
        "width" : 500,
        "height" : cg.ch-100,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });
      draw_fancy_box({ // Yellow Sign background
        "x" : cg.cw/2+95,
        "y" : 150,
        "width" : 140,
        "height" : cg.ch-300,
        "radius" : 10,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#27a886",
        "border" : "#27a886"
      });
      draw_fancy_box({ // Close Button
        "x" : 1280,
        "y" : 70,
        "width" : 80,
        "height" : 80,
        "radius" : 30,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });
      c.drawImage(cg.images.keydouble.image, 205, 165+110*0, 160, 80);
      c.drawImage(cg.images.key.image, 245, 165+110*1, 80, 80);
      c.drawImage(cg.images.key.image, 245, 165+110*2, 80, 80);
      c.drawImage(cg.images.key.image, 245, 165+110*3, 80, 80);
      c.drawImage(cg.images.key.image, 245, 165+110*4, 80, 80);

      c.drawImage(cg.images.b_menu.image, 800, 150+140*0, 130, 130);
      c.drawImage(cg.images.b_sound.image, 800, 150+140*1, 130, 130);
      c.drawImage(cg.images.b_cabs.image, 800, 150+140*2, 130, 130);
      c.drawImage(cg.images.b_blocks.image, 800, 150+140*3, 130, 130);

      c.font = "bold 19px Verdana";
      c.textAlign = "left";
      c.fillStyle = "white";
      c.fillText("DISPATCH", 405, 165+110*0+50);
      c.fillText("OPEN GATES", 405, 165+110*1+50);
      c.fillText("CLOSE GATES", 405, 165+110*2+50);
      c.fillText("OPEN RESTRAINTS", 405, 165+110*3+50);
      c.fillText("CLOSE RESTRAINTS", 405, 165+110*4+50);

      c.fillText("OPEN PAUSE MENU", 970, 165+140*0+50);
      c.fillText("TOGGLE AUDIO", 970, 165+140*1+50);
      c.fillText("ADD OR REMOVE CABS", 970, 165+140*2+50);
      c.fillText("BLOCK SECTIONS", 970, 165+140*3+50);

      c.font = "bold 30px Arial";
      c.textAlign = "center";
      c.fillText("SPACE", 285, 165+110*0+50);
      c.font = "bold 50px Arial";
      c.fillText("X", 1320, 127);

      c.fillStyle = "white";
      c.lineWidth = 3;
      c.beginPath();
      c.moveTo(285-15,205+110*1-15);
      c.lineTo(285-15,205+110*1+15);
      c.lineTo(285+15,205+110*1);
      c.fill();
      c.beginPath();
      c.moveTo(285+15,205+110*2+15);
      c.lineTo(285+15,205+110*2-15);
      c.lineTo(285-15,205+110*2);
      c.fill();
      c.beginPath();
      c.moveTo(285-15,205+110*3+15);
      c.lineTo(285+15,205+110*3+15);
      c.lineTo(285,205+110*3-15);
      c.fill();
      c.beginPath();
      c.moveTo(285-15,205+110*4-15);
      c.lineTo(285+15,205+110*4-15);
      c.lineTo(285,205+110*4+15);
      c.fill();
    }
    if (ui_display.credit) {
      draw_fancy_box({
        "x" : cg.cw/2-200,
        "y" : cg.ch/2-100,
        "width" : 400,
        "height" : 200,
        "radius" : 50,
        "boffset" : 0,
        "bwidth" : 15,
        "bg" : "#1a6a55",
        "border" : "#fff"
      });
      c.font = "bold 35px Verdana";
      c.textAlign = "center";
      c.fillStyle = "white";
      c.fillText("MADE BY WILLBY", cg.cw/2, cg.ch/2+10);
    }
    if (game_over) {
      c.fillStyle = "#b9786a";
      c.fillRect(0,0,cg.cw,cg.ch);
      draw_fancy_box({
        "x" : 80,
        "y" : 80,
        "width" : cg.cw-80*2,
        "height" : cg.ch-80*2,
        "radius" : 100,
        "boffset" : 0,
        "bwidth" : 80,
        "bg" : "#ccac9d",
        "border" : "#245000"
      });
      c.font = "bold 90px Verdana";
      c.textAlign = "center";
      c.fillStyle = "white";
      c.fillText("SESSION LOGGED", cg.cw/2, cg.ch/2-30);
      c.font = "bold 35px Verdana";
      c.fillText("To play another simulation return to the simulator list.", cg.cw/2, cg.ch/2+60);
    }
  }
}
let userInterface = cg.createGraphic({type:"userInterface",id:"userInterface",x:0,y:0});
ChoreoGraph.graphicTypes.guests = new class guests {
  draw(g) {
    let guests_to_draw = [];

    for (g = 0; g < load_1_guests; g++) {
      if (!(g>=pos_load_1_guests.length)) {
        guests_to_draw.push([pos_load_1_guests[g][0],pos_load_1_guests[g][1]])
      }
    }
    for (g = 0; g < load_2_guests; g++) {
      if (!(g>=pos_load_2_guests.length)) {
        guests_to_draw.push([pos_load_2_guests[g][0],pos_load_2_guests[g][1]])
      }
    }
    for (g = 0; g < giq; g++) {
      if (!(g>=pos_queue.length)) {
        guests_to_draw.push([pos_queue[g][0],pos_queue[g][1]])
      }
    }

    for (g = 0; g < guests_to_draw.length; g++) {
      c.drawImage(cg.images.guest.image,guests_to_draw[g][0]-7/2,guests_to_draw[g][1]-7/2,7,7);
    }
  }
}
let guests = cg.createGraphic({type:"guests",id:"guests",x:0,y:0});

ChoreoGraph.graphicTypes.gates = new class gates {
  draw(g) {
    if (!(gates_state)) {
      c.strokeStyle = "#9d9d9d";
      c.lineWidth = 2.5;
      c.beginPath();
      c.moveTo(638,422);
      c.lineTo(675,383);
      c.stroke();
    }
  }
}
let gates = cg.createGraphic({type:"gates",id:"gates",x:0,y:0});


function showMode() {
  cg.objects.cab1.attach("Camera",{smoothing:0.95});
  cg.settings.useCamera = true;
  cg.cnvs.width = 500;
  cg.cnvs.height = 300;
  cg.cw = 500;
  cg.ch = 300;
}

function automate() {
  cg.createEvent({id:"automation",duration:2.3,loop:true,end:function(){
    cg.settings.callbacks.keyDown("up");
    cg.settings.callbacks.keyDown("down");
    cg.settings.callbacks.keyDown("left");
    cg.settings.callbacks.keyDown("right");
    cg.settings.callbacks.keyDown("space");
  }});
}
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.active = true;
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.key = ["Animator","anim","id"];
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.key = ["Transform","y"];
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.key = ["BlockController","trainPosition"];
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.key = ["Animator","free"];
// ChoreoGraph.plugins.Visualisation.v.objectAnnotation.key = ["rotationVelocity"];
ChoreoGraph.plugins.Visualisation.v.animations.markerStyle.size = 7;
ChoreoGraph.plugins.Visualisation.v.animations.markerStyle.fontSize = 10;
ChoreoGraph.plugins.Visualisation.v.objectAnnotation.style = {textColour:"#ffff49",font:"10px Arial"};
ChoreoGraph.plugins.Visualisation.v.objectAnnotation.offset = [0,-20];

ChoreoGraph.plugins.Visualisation.v.blocks.animations[cg.id] = [cg.animations.scene_1,cg.animations.scene_2,cg.animations.scene_3,cg.animations.scene_4,cg.animations.scene_5,cg.animations.scene_6,cg.animations.scene_7,cg.animations.scene_8,cg.animations.scene_9,cg.animations.scene_10,cg.animations.scene_11,cg.animations.scene_12];

ChoreoGraph.plugins.Visualisation.v.blocks.showNullMarkers = false;

cg.camera.x = cg.cw/2;
cg.camera.y = cg.ch/2;
cg.settings.useCamera = true;

window.onbeforeunload = function(e) {
  if (!(game_over)&&sim_session_id!=null) {
    return "You have not logged your session.";
  }
};

ChoreoGraph.start();
// RRCTS 1.2